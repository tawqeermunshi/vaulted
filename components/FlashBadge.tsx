"use client"

import { useEffect, useState } from "react"
import type { FlashState } from "@/lib/redis"

interface Props {
  flash: FlashState
  basePrice: number
}

function msToCountdown(ms: number): string {
  if (ms <= 0) return "00:00"
  const totalSeconds = Math.floor(ms / 1000)
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  if (h > 0) {
    return `${h}h ${String(m).padStart(2, "0")}m`
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

/**
 * Pulsing flash-sale badge with live countdown.
 * Disappears automatically when the flash window expires.
 */
export default function FlashBadge({ flash, basePrice }: Props) {
  const [remaining, setRemaining] = useState(flash.endsAt - Date.now())

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(flash.endsAt - Date.now())
    }, 1000)
    return () => clearInterval(id)
  }, [flash.endsAt])

  if (remaining <= 0) return null

  const savings = Math.round((1 - flash.flashPrice / basePrice) * 100)

  return (
    <div className="relative overflow-hidden bg-charcoal border border-gold/40 px-3 py-2.5 flex items-center gap-3">
      {/* Pulse ring */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
      </span>

      <div className="min-w-0">
        <p className="text-[9px] tracking-[0.3em] uppercase text-gold font-medium leading-none mb-0.5">
          Flash Price — {savings}% off retail
        </p>
        <p className="text-xs text-warm-white font-medium tabular-nums leading-none">
          Ends in {msToCountdown(remaining)}
        </p>
      </div>
    </div>
  )
}
