/**
 * VAULTED Price Engine
 *
 * Prices move like a living market — nobody controls them, nobody can predict them.
 * Three forces act on each price every tick (every 5 minutes):
 *
 *   1. Brownian drift     — Gaussian noise, the core randomness
 *   2. Mean reversion     — prices orbit an equilibrium (~68% of base), like a rubber band
 *   3. Demand pressure    — views in the last hour push price gently upward
 *
 * On top of this, a Poisson process fires rare Flash Collapse events:
 *   — ~1.5 times per week per item
 *   — Minimum 48h between events
 *   — Price drops to 18–28% of base for 20–90 minutes, then snaps back
 *
 * Guardrails:
 *   — Floor:         25% of base  (normal trading)
 *   — Ceiling:       112% of base (normal trading)
 *   — Flash floor:   18% of base  (during flash only)
 */

export interface PriceTick {
  newPrice: number
  flash: FlashEvent | null
}

export interface FlashEvent {
  flashPrice: number
  endsAt: number      // unix ms
  durationMinutes: number
}

// Per-category volatility (std dev as fraction of price per tick)
const VOLATILITY: Record<string, number> = {
  bags:        0.025,
  shoes:       0.045,
  accessories: 0.055,
  belts:       0.060,
  clothing:    0.035,
  jewelry:     0.050,
}
const DEFAULT_VOLATILITY = 0.040

const EQUILIBRIUM_RATIO      = 0.68   // prices orbit 68% of base
const MEAN_REVERSION_SPEED   = 0.06   // how fast they snap back (per tick)
const MAX_TICK_CHANGE        = 0.08   // cap single-tick move at ±8%
const FLOOR_RATIO            = 0.25
const CEILING_RATIO          = 1.12
const FLASH_FLOOR_RATIO      = 0.18
const FLASH_DEPTH_VARIANCE   = 0.10   // flash goes to 18–28% of base
const FLASH_MIN_MINUTES      = 20
const FLASH_MAX_MINUTES      = 90
const FLASH_RATE_PER_WEEK    = 1.5
const MIN_HOURS_BETWEEN_FLASH = 48
const TICKS_PER_HOUR         = 12     // one tick every 5 minutes
const MAX_DEMAND_VIEWS        = 15    // views to reach max demand pressure

/** Box-Muller transform — true Gaussian random from uniform inputs */
function gaussian(mean = 0, std = 1): number {
  let u = 0, v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

/**
 * Compute a single price tick for one product.
 *
 * @param category          product category (bags, shoes, etc.)
 * @param currentPrice      price at start of this tick
 * @param basePrice         original listing price (never changes)
 * @param demandViews       how many page views in the last hour
 * @param hoursSinceFlash   hours since the last flash event (Infinity if never)
 * @param flashCurrentlyActive  whether a flash is already running
 */
export function computePriceTick(
  category: string,
  currentPrice: number,
  basePrice: number,
  demandViews: number,
  hoursSinceFlash: number,
  flashCurrentlyActive: boolean
): PriceTick {
  // While a flash is active the price is frozen at the flash price — don't move it
  if (flashCurrentlyActive) {
    return { newPrice: currentPrice, flash: null }
  }

  const equilibrium = basePrice * EQUILIBRIUM_RATIO
  const vol = VOLATILITY[category] ?? DEFAULT_VOLATILITY

  // 1. Brownian noise — Gaussian, scaled to current price, capped at ±8%
  const rawNoise   = gaussian(0, vol) * currentPrice
  const brownian   = clamp(rawNoise, -MAX_TICK_CHANGE * currentPrice, MAX_TICK_CHANGE * currentPrice)

  // 2. Mean reversion — gentle pull toward equilibrium
  const reversion  = (equilibrium - currentPrice) * MEAN_REVERSION_SPEED

  // 3. Demand pressure — more eyeballs → slight upward nudge
  const demandScore    = clamp(demandViews / MAX_DEMAND_VIEWS, 0, 1)
  const demandPressure = demandScore * 0.015 * equilibrium

  let newPrice = currentPrice + brownian + reversion + demandPressure
  newPrice = clamp(newPrice, basePrice * FLOOR_RATIO, basePrice * CEILING_RATIO)

  // 4. Flash Collapse — Poisson process
  let flash: FlashEvent | null = null
  if (hoursSinceFlash >= MIN_HOURS_BETWEEN_FLASH) {
    const probPerTick = FLASH_RATE_PER_WEEK / (7 * 24 * TICKS_PER_HOUR)
    if (Math.random() < probPerTick) {
      const durationMinutes = FLASH_MIN_MINUTES + Math.random() * (FLASH_MAX_MINUTES - FLASH_MIN_MINUTES)
      const depthRatio      = FLASH_FLOOR_RATIO + Math.random() * FLASH_DEPTH_VARIANCE
      const flashPrice      = Math.round(basePrice * depthRatio)
      flash = {
        flashPrice,
        endsAt: Date.now() + durationMinutes * 60 * 1000,
        durationMinutes: Math.round(durationMinutes),
      }
      newPrice = flashPrice
    }
  }

  return { newPrice: Math.round(newPrice), flash }
}

/**
 * Starting price when a product is first added to Redis.
 * Begins near equilibrium with a little noise so not all items start at identical prices.
 */
export function initializePrice(basePrice: number): number {
  const equilibrium = basePrice * EQUILIBRIUM_RATIO
  const jitter = (Math.random() - 0.5) * 0.12 * equilibrium
  return Math.round(clamp(equilibrium + jitter, basePrice * FLOOR_RATIO, basePrice * CEILING_RATIO))
}
