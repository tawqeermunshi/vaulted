/**
 * GET /api/prices/[id]
 * Full price data for a single product — current price, 24h history, flash state.
 * Used by the product detail page for the sparkline chart.
 */
import { NextResponse } from "next/server"
import { PRODUCTS } from "@/lib/data"
import { getLivePrice, setPrice, pushHistory } from "@/lib/redis"
import { initializePrice } from "@/lib/priceEngine"
import { redis } from "@/lib/redis"

export const dynamic = "force-dynamic"

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params
  const product = PRODUCTS.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  try {
    // Lazy-initialize
    const existing = await redis.get(`vaulted:price:${id}`)
    if (existing === null) {
      const startPrice = initializePrice(product.originalPrice)
      await setPrice(id, startPrice)
      await pushHistory(id, startPrice)
    }

    const live = await getLivePrice(id, product.originalPrice)

    return NextResponse.json({
      current:    live.current,
      base:       product.originalPrice,
      change24h:  live.change24h,
      flash:      live.flash,
      history:    live.history,
      demandViews: live.demandViews,
    })
  } catch (err) {
    console.error(`[/api/prices/${id}]`, err)
    return NextResponse.json({ error: "Failed to fetch price" }, { status: 500 })
  }
}
