"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { PRODUCTS, formatPrice } from "@/lib/data"

interface TickerItem {
  id: string
  brand: string
  name: string
  price: number
  change24h: number
  flash: boolean
}

export default function MarketTicker() {
  const [items, setItems] = useState<TickerItem[]>(
    PRODUCTS.map((p) => ({
      id: p.id,
      brand: p.brandDisplay,
      name: p.name,
      price: p.price,
      change24h: 0,
      flash: false,
    }))
  )
  const [flashingIds, setFlashingIds] = useState<Set<string>>(new Set())
  const prevPrices = useRef<Record<string, number>>({})

  async function fetchPrices() {
    try {
      const res = await fetch("/api/prices", { cache: "no-store" })
      if (!res.ok) return
      const data: Record<string, { current: number; change24h: number; flash: { flashPrice: number } | null }> = await res.json()

      const newFlashing = new Set<string>()

      setItems((prev) =>
        prev.map((item) => {
          const live = data[item.id]
          if (!live) return item
          const isFlash = live.flash !== null
          const newPrice = isFlash ? live.flash!.flashPrice : live.current
          if (prevPrices.current[item.id] !== undefined && prevPrices.current[item.id] !== newPrice) {
            newFlashing.add(item.id)
          }
          prevPrices.current[item.id] = newPrice
          return { ...item, price: newPrice, change24h: live.change24h, flash: isFlash }
        })
      )

      if (newFlashing.size > 0) {
        setFlashingIds(newFlashing)
        setTimeout(() => setFlashingIds(new Set()), 1500)
      }
    } catch {
      // silently fail
    }
  }

  useEffect(() => {
    fetchPrices()
    const id = setInterval(fetchPrices, 30_000)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Duplicate items for seamless infinite scroll
  const doubled = [...items, ...items]

  return (
    <div className="bg-charcoal border-y border-stone/20 py-3 overflow-hidden select-none">
      <div className="flex">
        <div className="flex gap-0 animate-marquee">
          {doubled.map((item, i) => {
            const isUp = item.change24h >= 0
            const isFlashing = flashingIds.has(item.id)
            return (
              <Link
                key={`${item.id}-${i}`}
                href={`/product/${item.id}`}
                className={`flex items-center gap-3 px-6 border-r border-stone/20 transition-colors hover:bg-white/5 ${
                  item.flash ? "bg-gold/10" : ""
                }`}
              >
                {item.flash && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
                  </span>
                )}
                <span className="text-[10px] tracking-widest uppercase text-stone whitespace-nowrap">
                  {item.brand}
                </span>
                <span className="text-xs text-stone-light whitespace-nowrap max-w-32 truncate">
                  {item.name}
                </span>
                <span
                  className={`text-sm font-medium tabular-nums whitespace-nowrap transition-colors duration-700 ${
                    isFlashing
                      ? isUp ? "text-green-400" : "text-red-400"
                      : item.flash
                      ? "text-gold"
                      : "text-warm-white"
                  }`}
                >
                  {formatPrice(item.price)}
                </span>
                <span
                  className={`text-[10px] font-medium whitespace-nowrap ${
                    isUp ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {isUp ? "▲" : "▼"} {Math.abs(item.change24h).toFixed(1)}%
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
