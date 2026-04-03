/**
 * GET /api/prices
 * Returns current price + flash state for every product.
 * Used by product cards to poll for live updates.
 */
import { NextResponse } from "next/server"
import { PRODUCTS } from "@/lib/data"
import { getLivePrice, getOrInitPrice } from "@/lib/redis"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Fetch live price for every product in parallel
    const entries = await Promise.all(
      PRODUCTS.map(async (p) => {
        await getOrInitPrice(p.id, p.originalPrice)

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
