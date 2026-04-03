/**
 * POST /api/demand/[id]
 * Records a product page view to build the demand signal.
 * Increments a Redis counter that expires after 1 hour.
 * Called client-side when a user lands on a product detail page.
 */
import { NextResponse } from "next/server"
import { PRODUCTS } from "@/lib/data"
import { recordView } from "@/lib/redis"

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(_req: Request, { params }: Params) {
  const { id } = await params
  const product = PRODUCTS.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  try {
    const views = await recordView(id)
    return NextResponse.json({ views })
  } catch (err) {
    console.error(`[/api/demand/${id}]`, err)
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
