"use client"

import type { PricePoint } from "@/lib/redis"

interface Props {
  history: PricePoint[]
  width?: number
  height?: number
  className?: string
}

/**
 * A minimal SVG sparkline. No dependencies.
 * Renders a single path tracing the price history oldest→newest.
 */
export default function PriceSparkline({
  history,
  width = 80,
  height = 28,
  className = "",
}: Props) {
  if (history.length < 2) return null

  // History is stored newest-first (LPUSH), so reverse for chronological order
  const points = [...history].reverse()

  const prices = points.map((p) => p.price)
  const min    = Math.min(...prices)
  const max    = Math.max(...prices)
  const range  = max - min || 1

  const pad = 2

  const toX = (i: number) =>
    pad + (i / (points.length - 1)) * (width - pad * 2)

  const toY = (price: number) =>
    pad + (1 - (price - min) / range) * (height - pad * 2)

  // Build SVG path
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(p.price).toFixed(1)}`)
    .join(" ")

  const first = prices[0]
  const last  = prices[prices.length - 1]
  const isUp  = last >= first
  const color = isUp ? "#6b8f71" : "#b05a5a"

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
