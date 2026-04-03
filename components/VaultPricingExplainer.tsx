"use client"

import { useEffect, useRef, useState } from "react"

// Simulated price path for the animated chart
const CHART_POINTS = [
  { x: 0,   y: 62,  label: null },
  { x: 5,   y: 60,  label: null },
  { x: 10,  y: 65,  label: null },
  { x: 15,  y: 58,  label: null },
  { x: 20,  y: 56,  label: null },
  { x: 25,  y: 61,  label: null },
  // Demand spike
  { x: 32,  y: 54,  label: "demand" },
  { x: 38,  y: 50,  label: null },
  { x: 44,  y: 52,  label: null },
  { x: 50,  y: 57,  label: null },
  // Normal drift
  { x: 56,  y: 55,  label: null },
  { x: 62,  y: 59,  label: null },
  { x: 66,  y: 57,  label: null },
  // Flash collapse
  { x: 70,  y: 82,  label: "flash" },
  { x: 74,  y: 83,  label: null },
  { x: 78,  y: 84,  label: null },
  // Snap back
  { x: 82,  y: 60,  label: "snapback" },
  { x: 88,  y: 58,  label: null },
  { x: 94,  y: 62,  label: null },
  { x: 100, y: 60,  label: null },
]

const W = 320
const H = 100
const PAD = 12

function toSvgX(x: number) { return PAD + (x / 100) * (W - PAD * 2) }
function toSvgY(y: number) { return PAD + (y / 100) * (H - PAD * 2) }

function buildPath(points: typeof CHART_POINTS, count: number) {
  return points.slice(0, count)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toSvgX(p.x).toFixed(1)} ${toSvgY(p.y).toFixed(1)}`)
    .join(" ")
}

export default function VaultPricingExplainer() {
  const [drawn, setDrawn] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Start animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let frame = 0
    const total = CHART_POINTS.length
    const id = setInterval(() => {
      frame++
      setDrawn(Math.min(frame, total))
      if (frame >= total) clearInterval(id)
    }, 120)
    return () => clearInterval(id)
  }, [visible])

  const path = buildPath(CHART_POINTS, drawn)
  const demandReached = drawn >= 7
  const flashReached  = drawn >= 14
  const snapReached   = drawn >= 17

  const demandPt  = CHART_POINTS[6]
  const flashPt   = CHART_POINTS[13]
  const snapPt    = CHART_POINTS[16]

  return (
    <section className="py-20 md:py-28 bg-charcoal text-warm-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start mb-16">
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">
              Vault Pricing
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">
              Prices move like
              <br />
              <em className="italic text-gold">a living market.</em>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-stone text-base leading-relaxed">
              No fixed prices. No predictable patterns. Every piece on VAULTED
              trades like a luxury asset — driven by demand, drift, and rare
              moments of extraordinary value.
            </p>
            <p className="text-stone text-base leading-relaxed mt-4">
              If you hesitate, the price moves on. If you watch closely, you
              catch moments others miss.
            </p>
          </div>
        </div>

        {/* Animated chart + annotations */}
        <div ref={ref} className="bg-charcoal-soft border border-stone/20 p-6 md:p-10 mb-14">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* SVG Chart */}
            <div className="w-full md:w-auto shrink-0">
              <p className="text-[10px] tracking-widest uppercase text-stone mb-3">
                Simulated price chart · Hermès Birkin 30
              </p>
              <div className="relative">
                <svg
                  width={W}
                  height={H}
                  viewBox={`0 0 ${W} ${H}`}
                  className="w-full max-w-sm"
                >
                  {/* Grid lines */}
                  {[25, 50, 75].map((y) => (
                    <line
                      key={y}
                      x1={PAD} y1={toSvgY(y)}
                      x2={W - PAD} y2={toSvgY(y)}
                      stroke="#9c949133"
                      strokeWidth="0.5"
                    />
                  ))}

                  {/* Floor / ceiling markers */}
                  <line x1={PAD} y1={toSvgY(20)} x2={W - PAD} y2={toSvgY(20)}
                    stroke="#b8965a44" strokeWidth="1" strokeDasharray="3 3" />
                  <text x={PAD + 2} y={toSvgY(20) - 3} fontSize="6" fill="#b8965a88">floor</text>
                  <line x1={PAD} y1={toSvgY(10)} x2={W - PAD} y2={toSvgY(10)}
                    stroke="#b8965a44" strokeWidth="1" strokeDasharray="3 3" />
                  <text x={PAD + 2} y={toSvgY(10) - 3} fontSize="6" fill="#b8965a88">ceiling</text>

                  {/* Main price path */}
                  {drawn > 1 && (
                    <path
                      d={path}
                      fill="none"
                      stroke="#b8965a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Flash collapse highlight */}
                  {flashReached && (
                    <rect
                      x={toSvgX(70)} y={PAD}
                      width={toSvgX(82) - toSvgX(70)}
                      height={H - PAD * 2}
                      fill="#b8965a14"
                    />
                  )}

                  {/* Annotation dots */}
                  {demandReached && (
                    <circle cx={toSvgX(demandPt.x)} cy={toSvgY(demandPt.y)} r="3" fill="#6b8f71" />
                  )}
                  {flashReached && (
                    <circle cx={toSvgX(flashPt.x)} cy={toSvgY(flashPt.y)} r="3" fill="#b8965a" />
                  )}
                  {snapReached && (
                    <circle cx={toSvgX(snapPt.x)} cy={toSvgY(snapPt.y)} r="3" fill="#7a8fb0" />
                  )}

                  {/* Current price dot */}
                  {drawn > 0 && (
                    <circle
                      cx={toSvgX(CHART_POINTS[drawn - 1].x)}
                      cy={toSvgY(CHART_POINTS[drawn - 1].y)}
                      r="3"
                      fill="#faf7f2"
                    />
                  )}
                </svg>
              </div>
            </div>

            {/* Event annotations */}
            <div className="flex flex-col gap-4 w-full">
              <Annotation
                active={demandReached}
                color="bg-green-700"
                label="Demand Pressure"
                body="Multiple buyers viewed this piece within the same hour. Their attention pushed the price upward. Scarcity is real."
              />
              <Annotation
                active={flashReached}
                color="bg-gold"
                label="⚡ Flash Collapse"
                body="An unpredictable, rare event — the price dropped to 22% of retail for 43 minutes. The buyer who acted fast saved over ₹20,00,000 on a Birkin-tier piece."
              />
              <Annotation
                active={snapReached}
                color="bg-blue-700"
                label="Snap Back"
                body="The flash window closed. Price recovered to the drift range. The opportunity passed — until the next one."
              />
            </div>
          </div>
        </div>

        {/* Three forces */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              number: "I",
              title: "Market Drift",
              body: "Prices move continuously via a Gaussian random walk — like a stock. Slightly biased toward equilibrium. Never fully predictable.",
              color: "text-stone-light",
            },
            {
              number: "II",
              title: "Demand Signal",
              body: "The more buyers view an item, the more upward pressure they create. Real demand moves real prices. Be early.",
              color: "text-green-400",
            },
            {
              number: "III",
              title: "Flash Collapse",
              body: "~1–2 times per week, per item, the price briefly collapses. The window lasts 20–90 minutes. There is no pattern. There is no warning.",
              color: "text-gold",
            },
          ].map((f) => (
            <div key={f.number} className="border-t border-stone/20 pt-6">
              <div className="flex items-baseline gap-3 mb-3">
                <span className={`font-serif text-3xl font-light ${f.color}`}>{f.number}</span>
                <span className="font-serif text-lg text-warm-white">{f.title}</span>
              </div>
              <p className="text-sm text-stone leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Annotation({
  active,
  color,
  label,
  body,
}: {
  active: boolean
  color: string
  label: string
  body: string
}) {
  return (
    <div
      className={`flex gap-3 transition-all duration-500 ${
        active ? "opacity-100 translate-y-0" : "opacity-20 translate-y-2"
      }`}
    >
      <div className={`w-1 shrink-0 rounded-full mt-1 ${color}`} />
      <div>
        <p className="text-xs font-medium text-warm-white mb-1">{label}</p>
        <p className="text-xs text-stone leading-relaxed">{body}</p>
      </div>
    </div>
  )
}
