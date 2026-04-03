import { Redis } from "@upstash/redis"

// Singleton Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// ─── Key helpers ────────────────────────────────────────────────────────────

const k = {
  price:      (id: string) => `vaulted:price:${id}`,
  history:    (id: string) => `vaulted:history:${id}`,
  flash:      (id: string) => `vaulted:flash:${id}`,
  lastFlash:  (id: string) => `vaulted:lastflash:${id}`,
  demand:     (id: string) => `vaulted:demand:${id}`,
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PricePoint {
  price: number
  ts: number
}

export interface FlashState {
  flashPrice: number
  endsAt: number
  durationMinutes: number
}

export interface LivePrice {
  current: number
  history: PricePoint[]
  flash: FlashState | null
  change24h: number   // % change vs 24h ago, e.g. -3.2
  demandViews: number
}

// ─── Read helpers ─────────────────────────────────────────────────────────────

export async function getCurrentPrice(id: string): Promise<number | null> {
  const val = await redis.get<number>(k.price(id))
  return val
}

export async function getFlash(id: string): Promise<FlashState | null> {
  return redis.get<FlashState>(k.flash(id))
}

export async function getLastFlashTime(id: string): Promise<number | null> {
  return redis.get<number>(k.lastFlash(id))
}

export async function getDemandViews(id: string): Promise<number> {
  return (await redis.get<number>(k.demand(id))) ?? 0
}

export async function getPriceHistory(id: string): Promise<PricePoint[]> {
  const raw = await redis.lrange<PricePoint>(k.history(id), 0, -1)
  return raw ?? []
}

/** Full LivePrice payload for a single product */
export async function getLivePrice(id: string, basePrice: number): Promise<LivePrice> {
  const [current, history, flash, demandViews] = await Promise.all([
    getCurrentPrice(id),
    getPriceHistory(id),
    getFlash(id),
    getDemandViews(id),
  ])

  const price = current ?? basePrice

  // 24h change: compare to the oldest point we have (up to 288 entries = 24h)
  const oldest = history[history.length - 1]
  const change24h =
    oldest && oldest.price !== 0
      ? parseFloat((((price - oldest.price) / oldest.price) * 100).toFixed(2))
      : 0

  return { current: price, history, flash, change24h, demandViews }
}

// ─── Write helpers ────────────────────────────────────────────────────────────

export async function setPrice(id: string, price: number): Promise<void> {
  await redis.set(k.price(id), price)
}

/** Push a new price point to history, keeping max 288 entries (~24h at 5-min ticks) */
export async function pushHistory(id: string, price: number): Promise<void> {
  const point: PricePoint = { price, ts: Date.now() }
  const key = k.history(id)
  await redis.lpush(key, point)
  await redis.ltrim(key, 0, 287)
}

/** Store a flash event with a TTL so Redis auto-expires it when the window closes */
export async function setFlash(id: string, flash: FlashState): Promise<void> {
  const ttlSeconds = Math.ceil((flash.endsAt - Date.now()) / 1000)
  await redis.set(k.flash(id), flash, { ex: ttlSeconds })
  // Record when this flash happened (keep for 7 days to enforce min gap)
  await redis.set(k.lastFlash(id), Date.now(), { ex: 7 * 24 * 60 * 60 })
}

/** Increment demand view counter; TTL resets on each view (1-hour sliding window) */
export async function recordView(id: string): Promise<number> {
  const key = k.demand(id)
  const count = await redis.incr(key)
  // Only set TTL on first view (NX = only if key didn't already have a TTL)
  // We expire after 1h — views older than that stop counting
  if (count === 1) {
    await redis.expire(key, 3600)
  }
  return count
}
