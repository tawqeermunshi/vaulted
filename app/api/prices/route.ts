/**
 * GET /api/prices
 * Returns current price + flash state for every product.
 * Used by product cards to poll for live updates.
 */
import { NextResponse } from "next/server"
import { PRODUCTS } from "@/lib/data"
import { redis, getLivePrice, setPrice, pushHistory } from "@/lib/redis"
import { initializePrice } from "@/lib/priceEngine"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Fetch live price for every product in parallel
    const entries = await Promise.all(
      PRODUCTS.map(async (p) => {
        // Lazy-initialize: if no price in Redis yet, set a starting price
        const existing = await redis.get(`vaulted:price:${p.id}`)
        if (existing === null) {
          const startPrice = initializePrice(p.originalPrice)
          await setPrice(p.id, startPrice)
          await pushHistory(p.id, startPrice)
        }

        const live = await getLivePrice(p.id, p.originalPrice)
        return [
          p.id,
          {
            current:    live.current,
            change24h:  live.change24h,
            flash:      live.flash,
          },
        ] as const
      })
    )

    return NextResponse.json(Object.fromEntries(entries))
  } catch (err) {
    console.error("[/api/prices]", err)
    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 })
  }
}
