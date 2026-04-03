"use client"

import { useEffect, useRef, useState } from "react"
import type { FlashState } from "@/lib/redis"
import PriceSparkline from "./PriceSparkline"
import FlashBadge from "./FlashBadge"

interface PriceData {
  current: number
  change24h: number
  flash: FlashState | null
  history: { price: number; ts: number }[]
}

interface Props {
  productId: string
  basePrice: number
  initialPrice: number
  /** "card" = compact ticker for product grid; "detail" = full chart for product page */
  variant?: "card" | "detail"
}

const POLL_INTERVAL_MS = 30_000   // 30 seconds

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

/**
 * LivePrice polls /api/prices/[id] every 30 seconds and animates price changes.
 * On price change: briefly flashes green (up) or red (down), then settles.
 */
export default function LivePrice({ productId, basePrice, initialPrice, variant = "card" }: Props) {
  const [data, setData] = useState<PriceData>({
    current: initialPrice,
    change24h: 0,
    flash: null,
    history: [],
  })
  const [flashColor, setFlashColor] = useState<"up" | "down" | null>(null)
  const prevPriceRef = useRef(initialPrice)

  async function fetchPrice() {
    try {
      const res = await fetch(`/api/prices/${productId}`, { cache: "no-store" })
      if (!res.ok) return
      const json: PriceData = await res.json()

      const prev = prevPriceRef.current
      if (json.current !== prev) {
        setFlashColor(json.current > prev ? "up" : "down")
        setTimeout(() => setFlashColor(null), 1200)
        prevPriceRef.current = json.current
      }

      setData(json)
    } catch {
      // silently fail — stale price is fine
    }
  }

  useEffect(() => {
    fetchPrice()
    const id = setInterval(fetchPrice, POLL_INTERVAL_MS)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  const isFlash     = data.flash !== null && data.flash.endsAt > Date.now()
  const displayPrice = isFlash ? data.flash!.flashPrice : data.current
  const isUp         = data.change24h >= 0

  // ── Card variant (compact, on product grid) ──────────────────────────────
  if (variant === "card") {
    return (
      <div className="mt-2">
        {isFlash && (
          <span className="inline-block text-[9px] tracking-widest uppercase bg-charcoal text-gold px-2 py-0.5 mb-1">
            ⚡ Flash
          </span>
        )}
        <div className="flex items-baseline gap-2">
          <span
            className={`text-base font-medium transition-colors duration-700 ${
              flashColor === "up"
                ? "text-green-600"
                : flashColor === "down"
                ? "text-red-500"
                : isFlash
                ? "text-gold"
                : "text-charcoal"
            }`}
          >
            {formatPrice(displayPrice)}
          </span>
          <span className="text-xs text-stone line-through">{formatPrice(basePrice)}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-medium ${isUp ? "text-green-600" : "text-red-500"}`}>
            {isUp ? "▲" : "▼"} {Math.abs(data.change24h).toFixed(1)}%
          </span>
          {data.history.length >= 2 && (
            <PriceSparkline history={data.history} width={60} height={18} />
          )}
        </div>
      </div>
    )
  }

  // ── Detail variant (full chart on product page) ───────────────────────────
  return (
    <div>
      {isFlash && data.flash && (
        <div className="mb-4">
          <FlashBadge flash={data.flash} basePrice={basePrice} />
        </div>
      )}

      <div className="p-5 bg-cream">
        {/* Price row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span
              className={`font-serif text-4xl font-light transition-colors duration-700 ${
                flashColor === "up"
                  ? "text-green-600"
                  : flashColor === "down"
                  ? "text-red-500"
                  : isFlash
                  ? "text-gold"
                  : "text-charcoal"
              }`}
            >
              {formatPrice(displayPrice)}
            </span>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-sm text-stone line-through">{formatPrice(basePrice)}</span>
              <span className={`text-xs font-medium ${isUp ? "text-green-600" : "text-red-500"}`}>
                {isUp ? "▲" : "▼"} {Math.abs(data.change24h).toFixed(1)}% (24h)
              </span>
            </div>
          </div>

          {/* Savings callout */}
          <div className="text-right shrink-0">
            <p className="text-xs text-stone">You save</p>
            <p className="text-base font-medium text-gold">
              {formatPrice(basePrice - displayPrice)}
            </p>
            <p className="text-xs text-stone">
              ({Math.round((1 - displayPrice / basePrice) * 100)}% off retail)
            </p>
          </div>
        </div>

        {/* Sparkline chart */}
        {data.history.length >= 2 && (
          <div className="mt-4 pt-4 border-t border-stone-light/40">
            <p className="text-[10px] tracking-widest uppercase text-stone mb-2">24h price</p>
            <PriceSparkline history={data.history} width={320} height={52} />
          </div>
        )}
      </div>
    </div>
  )
}
