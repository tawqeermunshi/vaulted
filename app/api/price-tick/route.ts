/**
 * POST /api/price-tick
 * Runs one price tick for every product — called every 5 minutes by Vercel Cron.
 * Protected by CRON_SECRET in production.
 *
 * Also accepts GET for manual triggering in development.
 */
import { NextResponse } from "next/server"
import { PRODUCTS } from "@/lib/data"
import {
  getFlash,
  getLastFlashTime,
  getDemandViews,
  getOrInitPrice,
  setPrice,
  pushHistory,
  setFlash,
} from "@/lib/redis"
import { computePriceTick } from "@/lib/priceEngine"

export const dynamic = "force-dynamic"

async function runTick() {
  const results: Record<string, { price: number; flash: boolean }> = {}

  await Promise.all(
    PRODUCTS.map(async (product) => {
      let currentPrice = await getOrInitPrice(product.id, product.originalPrice)

      const flash           = await getFlash(product.id)
      const lastFlashTs     = await getLastFlashTime(product.id)
      const demandViews     = await getDemandViews(product.id)
      const flashActive     = flash !== null

      // Hours since last flash (Infinity if never happened)
      const hoursSinceFlash =
        lastFlashTs === null
          ? Infinity
          : (Date.now() - lastFlashTs) / (1000 * 60 * 60)

      // Run the algorithm
      const tick = computePriceTick(
        product.category,
        currentPrice,
        product.originalPrice,
        demandViews,
        hoursSinceFlash,
        flashActive
      )

      // Persist
      await setPrice(product.id, tick.newPrice)
      await pushHistory(product.id, tick.newPrice)

      if (tick.flash) {
        await setFlash(product.id, {
          flashPrice:      tick.flash.flashPrice,
          endsAt:          tick.flash.endsAt,
          durationMinutes: tick.flash.durationMinutes,
        })
      }

      results[product.id] = { price: tick.newPrice, flash: tick.flash !== null }
    })
  )

  return results
}

// Called by Vercel Cron (POST with Authorization header)
export async function POST(req: Request) {
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const auth = req.headers.get("authorization")
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  try {
    const results = await runTick()
    return NextResponse.json({ ok: true, ticked: Object.keys(results).length, results })
  } catch (err) {
    console.error("[/api/price-tick]", err)
    return NextResponse.json({ error: "Tick failed" }, { status: 500 })
  }
}

// GET — dev only, no auth required
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Use POST in production" }, { status: 405 })
  }
  try {
    const results = await runTick()
    return NextResponse.json({ ok: true, ticked: Object.keys(results).length, results })
  } catch (err) {
    console.error("[/api/price-tick]", err)
    return NextResponse.json({ error: "Tick failed" }, { status: 500 })
  }
}
