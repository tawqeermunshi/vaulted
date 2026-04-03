"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PRODUCTS, formatPrice } from "@/lib/data"

interface Mover {
  id: string
  name: string
  brand: string
  image: string
  price: number
  originalPrice: number
  change24h: number
  flash: boolean
}

export default function TodaysMovers() {
  const [movers, setMovers] = useState<{ drops: Mover[]; rises: Mover[] }>({
    drops: [],
    rises: [],
  })
  const [loading, setLoading] = useState(true)

  async function fetchMovers() {
    try {
      const res = await fetch("/api/prices", { cache: "no-store" })
      if (!res.ok) return
      const data: Record<string, { current: number; change24h: number; flash: { flashPrice: number } | null }> = await res.json()

      const enriched: Mover[] = PRODUCTS.map((p) => {
        const live = data[p.id]
        const isFlash = live?.flash != null
        return {
          id: p.id,
          name: p.name,
          brand: p.brandDisplay,
          image: p.image,
          price: isFlash ? live.flash!.flashPrice : (live?.current ?? p.price),
          originalPrice: p.originalPrice,
          change24h: live?.change24h ?? 0,
          flash: isFlash,
        }
      })

      const sorted = [...enriched].sort((a, b) => a.change24h - b.change24h)
      setMovers({
        drops: sorted.slice(0, 3),
        rises: sorted.slice(-3).reverse(),
      })
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovers()
    const id = setInterval(fetchMovers, 60_000)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return null

  return (
    <section className="py-16 md:py-20 px-6 lg:px-12 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
              Live Market
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal">
              Today&apos;s Movers
            </h2>
            <p className="text-stone text-sm mt-2">
              Prices updating every 5 minutes · based on real market drift
            </p>
          </div>
          <Link
            href="/browse"
            className="hidden sm:block text-[11px] tracking-widest uppercase text-stone-dark border-b border-stone pb-0.5 hover:text-charcoal transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Biggest Drops — buying opportunities */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-red-500 text-sm">▼</span>
              <h3 className="text-xs tracking-widest uppercase text-charcoal font-medium">
                Biggest Drops · Buy Opportunities
              </h3>
            </div>
            <div className="space-y-3">
              {movers.drops.map((item, i) => (
                <MoverRow key={item.id} item={item} rank={i + 1} direction="down" />
              ))}
            </div>
          </div>

          {/* Biggest Rises — watch these before they spike higher */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-green-600 text-sm">▲</span>
              <h3 className="text-xs tracking-widest uppercase text-charcoal font-medium">
                On the Rise · Act Before They Peak
              </h3>
            </div>
            <div className="space-y-3">
              {movers.rises.map((item, i) => (
                <MoverRow key={item.id} item={item} rank={i + 1} direction="up" />
              ))}
            </div>
          </div>
        </div>

        {/* Market context note */}
        <div className="mt-10 border-t border-stone-light/50 pt-6 flex items-start gap-3">
          <div className="w-1 h-full bg-gold shrink-0 mt-1" />
          <p className="text-xs text-stone leading-relaxed max-w-2xl">
            <span className="text-charcoal font-medium">How to read this:</span> Drops mean the
            current price is lower than it was 24 hours ago — this is your buying window. Rises mean
            momentum is building — act now or pay more later. Neither trend is guaranteed to continue.
          </p>
        </div>
      </div>
    </section>
  )
}

function MoverRow({
  item,
  rank,
  direction,
}: {
  item: Mover
  rank: number
  direction: "up" | "down"
}) {
  const pctOff = Math.round((1 - item.price / item.originalPrice) * 100)
  const isDown = direction === "down"

  return (
    <Link href={`/product/${item.id}`} className="group flex items-center gap-4 bg-warm-white hover:bg-cream-dark transition-colors p-3">
      {/* Rank */}
      <span className="font-serif text-2xl font-light text-stone-light/60 w-6 shrink-0 text-center">
        {rank}
      </span>

      {/* Image */}
      <div className="relative w-12 h-14 shrink-0 overflow-hidden bg-cream">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="48px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] tracking-widest uppercase text-stone">{item.brand}</p>
        <p className="text-sm font-medium text-charcoal truncate">{item.name}</p>
        {item.flash && (
          <span className="text-[9px] tracking-widest uppercase text-gold">⚡ Flash price</span>
        )}
      </div>

      {/* Price + change */}
      <div className="text-right shrink-0">
        <p className={`text-base font-medium tabular-nums ${item.flash ? "text-gold" : "text-charcoal"}`}>
          {formatPrice(item.price)}
        </p>
        <p className="text-xs text-stone line-through">{formatPrice(item.originalPrice)}</p>
        <p className={`text-[10px] font-medium ${isDown ? "text-red-500" : "text-green-600"}`}>
          {isDown ? "▼" : "▲"} {Math.abs(item.change24h).toFixed(1)}% · {pctOff}% off retail
        </p>
      </div>
    </Link>
  )
}
