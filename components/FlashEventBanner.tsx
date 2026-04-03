"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PRODUCTS, formatPrice } from "@/lib/data"

interface ActiveFlash {
  productId: string
  productName: string
  brand: string
  flashPrice: number
  originalPrice: number
  endsAt: number
}

function msToCountdown(ms: number): string {
  if (ms <= 0) return "00:00"
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}

export default function FlashEventBanner() {
  const [flash, setFlash] = useState<ActiveFlash | null>(null)
  const [remaining, setRemaining] = useState(0)

  async function checkForFlash() {
    try {
      const res = await fetch("/api/prices", { cache: "no-store" })
      if (!res.ok) return
      const data: Record<string, { current: number; change24h: number; flash: { flashPrice: number; endsAt: number } | null }> = await res.json()

      for (const product of PRODUCTS) {
        const live = data[product.id]
        if (live?.flash && live.flash.endsAt > Date.now()) {
          setFlash({
            productId: product.id,
            productName: product.name,
            brand: product.brandDisplay,
            flashPrice: live.flash.flashPrice,
            originalPrice: product.originalPrice,
            endsAt: live.flash.endsAt,
          })
          setRemaining(live.flash.endsAt - Date.now())
          return
        }
      }
      setFlash(null)
    } catch {
      // silent
    }
  }

  useEffect(() => {
    checkForFlash()
    const pollId = setInterval(checkForFlash, 30_000)
    return () => clearInterval(pollId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Live countdown
  useEffect(() => {
    if (!flash) return
    const id = setInterval(() => {
      const r = flash.endsAt - Date.now()
      if (r <= 0) { setFlash(null); clearInterval(id) }
      else setRemaining(r)
    }, 1000)
    return () => clearInterval(id)
  }, [flash])

  if (!flash) return null

  const pctOff = Math.round((1 - flash.flashPrice / flash.originalPrice) * 100)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:bottom-6 md:left-auto md:right-6 md:max-w-sm">
      <Link href={`/product/${flash.productId}`}>
        <div className="bg-charcoal border-t border-gold md:border md:border-gold shadow-2xl p-4 flex items-center gap-4 hover:bg-charcoal-soft transition-colors">
          {/* Pulse */}
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gold" />
          </span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-[9px] tracking-[0.3em] uppercase text-gold font-medium">
              ⚡ Flash Price Active
            </p>
            <p className="text-sm font-medium text-warm-white truncate">
              {flash.brand} · {flash.productName}
            </p>
            <p className="text-xs text-stone mt-0.5">
              <span className="text-gold font-medium">{formatPrice(flash.flashPrice)}</span>
              {" "}
              <span className="line-through">{formatPrice(flash.originalPrice)}</span>
              {" · "}
              <span className="text-gold">{pctOff}% off retail</span>
            </p>
          </div>

          {/* Countdown */}
          <div className="text-right shrink-0">
            <p className="text-[9px] tracking-widest uppercase text-stone">Ends in</p>
            <p className="text-xl font-mono font-medium text-warm-white tabular-nums">
              {msToCountdown(remaining)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
