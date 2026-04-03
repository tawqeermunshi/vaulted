import { Redis } from "@upstash/redis"
import { initializePrice } from "@/lib/priceEngine"

const redisUrl   = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

// Singleton Redis client — may be null in dev without env vars
export const redis: Redis | null =
  redisUrl && redisToken
    ? new Redis({ url: redisUrl, token: redisToken })
    : null

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
  if (!redis) return null
  return redis.get<number>(k.price(id))
}

export async function getFlash(id: string): Promise<FlashState | null> {
  if (!redis) return null
  return redis.get<FlashState>(k.flash(id))
}

export async function getLastFlashTime(id: string): Promise<number | null> {
  if (!redis) return null
  return redis.get<number>(k.lastFlash(id))
}

export async function getDemandViews(id: string): Promise<number> {
  if (!redis) return 0
  return (await redis.get<number>(k.demand(id))) ?? 0
}

export async function getPriceHistory(id: string): Promise<PricePoint[]> {
  if (!redis) return []
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

  const oldest = history[history.length - 1]
  let change24h =
    oldest && oldest.price !== 0
      ? parseFloat((((price - oldest.price) / oldest.price) * 100).toFixed(2))
      : 0

  if (change24h === 0 && history.length < 2) {
    let h = 0
    for (let i = 0; i < id.length; i++) h = (Math.imul(31, h) + id.charCodeAt(i)) | 0
    change24h = parseFloat((((Math.abs(h) % 1000) / 1000) * 11 - 5.5).toFixed(2))
  }

  return { current: price, history, flash, change24h, demandViews }
}

// ─── Write helpers ────────────────────────────────────────────────────────────

export async function setPrice(id: string, price: number): Promise<void> {
  if (!redis) return
  await redis.set(k.price(id), price)
}

export async function pushHistory(
  id: string,
  price: number,
  ts: number = Date.now()
): Promise<void> {
  if (!redis) return
  const point: PricePoint = { price, ts }
  const key = k.history(id)
  await redis.lpush(key, point)
  await redis.ltrim(key, 0, 287)
}

/**
 * Returns persisted live price, or lazily initializes Redis with a 24h baseline
 * so change% is non-zero before the first cron tick.
 */
export async function getOrInitPrice(
  id: string,
  originalPrice: number
): Promise<number> {
  if (!redis) return initializePrice(originalPrice)

  const cur = await getCurrentPrice(id)
  if (cur !== null) return cur

  const startPrice = initializePrice(originalPrice)
  const dir = Math.random() < 0.5 ? -1 : 1
  const pct = 0.025 + Math.random() * 0.055
  let open24h = Math.round(startPrice * (1 + dir * pct))
  const lo = Math.round(originalPrice * 0.25)
  const hi = Math.round(originalPrice * 1.12)
  open24h = Math.max(lo, Math.min(hi, open24h))
  if (open24h === startPrice) {
    const bump = Math.max(1, Math.round(startPrice * 0.035))
    open24h = Math.max(lo, Math.min(hi, startPrice + (Math.random() < 0.5 ? -bump : bump)))
  }

  await pushHistory(id, open24h, Date.now() - 24 * 60 * 60 * 1000)
  await pushHistory(id, startPrice)
  await setPrice(id, startPrice)
  return startPrice
}

export async function setFlash(id: string, flash: FlashState): Promise<void> {
  if (!redis) return
  const ttlSeconds = Math.ceil((flash.endsAt - Date.now()) / 1000)
  await redis.set(k.flash(id), flash, { ex: ttlSeconds })
  await redis.set(k.lastFlash(id), Date.now(), { ex: 7 * 24 * 60 * 60 })
}

export async function recordView(id: string): Promise<number> {
  if (!redis) return 0
  const key = k.demand(id)
  const count = await redis.incr(key)
  if (count === 1) {
    await redis.expire(key, 3600)
  }
  return count
}
