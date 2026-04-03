import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import MarketTicker from "@/components/MarketTicker";
import VaultPricingExplainer from "@/components/VaultPricingExplainer";
import TodaysMovers from "@/components/TodaysMovers";
import { PRODUCTS, BRANDS } from "@/lib/data";
import { HERO_EDITORIAL, SELL_CTA_IMAGE } from "@/lib/productImages";

const FEATURED = PRODUCTS.filter((p) => p.featured).slice(0, 6);

const BRAND_NAMES = [
  "Hermès",
  "Louis Vuitton",
  "Chanel",
  "Gucci",
  "Prada",
  "Christian Dior",
  "Balenciaga",
  "Saint Laurent",
  "Bottega Veneta",
  "Valentino",
  "Fendi",
  "Givenchy",
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end bg-charcoal overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={HERO_EDITORIAL}
            alt="Luxury fashion editorial"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 md:pb-28 pt-32">
          <div className="max-w-3xl">
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-6">
              Pre-Loved Luxury Marketplace
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-warm-white leading-[0.95] tracking-tight">
              Wear the
              <br />
              <em className="italic">world&apos;s finest</em>
              <br />
              for less.
            </h1>
            <p className="mt-8 text-stone-light text-lg md:text-xl leading-relaxed max-w-lg font-light">
              Authenticated luxury from Hermès, Chanel, Louis Vuitton, and more
              — available at 20–70% below retail.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/browse"
                className="inline-flex items-center justify-center bg-gold text-charcoal text-xs tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors font-medium"
              >
                Shop Now
              </Link>
              <Link
                href="/sell"
                className="inline-flex items-center justify-center border border-warm-white/30 text-warm-white text-xs tracking-widest uppercase px-8 py-4 hover:border-warm-white/70 transition-colors"
              >
                Sell an Item
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 flex gap-10 md:gap-16">
              {[
                { value: "2,400+", label: "Luxury Items" },
                { value: "100%", label: "Authenticated" },
                { value: "60+", label: "Countries" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl md:text-4xl font-light text-warm-white">
                    {stat.value}
                  </p>
                  <p className="text-[10px] tracking-widest uppercase text-stone mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] tracking-widest uppercase text-warm-white rotate-90 mb-4 origin-center">
            Scroll
          </span>
          <div className="w-px h-12 bg-warm-white/50" />
        </div>
      </section>

      {/* LIVE MARKET TICKER */}
      <MarketTicker />

      {/* EDITORIAL STATEMENT */}
      <section className="py-20 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-6">
              The VAULTED Promise
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight">
              Luxury deserves a
              <br />
              <em className="italic text-gold">second life.</em>
            </h2>
          </div>
          <div>
            <p className="text-stone-dark text-lg leading-relaxed mb-6">
              A Birkin held once. A Chanel worn twice. These pieces deserve more
              than a wardrobe shelf. VAULTED curates authenticated pre-loved luxury
              and prices it like a living market.
            </p>
            <p className="text-stone-dark text-base leading-relaxed">
              Every item is expertly authenticated. We own our inventory before it
              hits the site. Every purchase is protected. This is luxury resale done right.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="px-6 lg:px-12 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
                New Arrivals
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal">
                Recently Vaulted
              </h2>
            </div>
            <Link
              href="/browse"
              className="text-[11px] tracking-widest uppercase text-stone-dark hover:text-charcoal transition-colors border-b border-stone pb-0.5 hidden sm:block"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {FEATURED.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              href="/browse"
              className="inline-block text-xs tracking-widest uppercase border border-charcoal text-charcoal px-6 py-3 hover:bg-charcoal hover:text-warm-white transition-all"
            >
              View All Items
            </Link>
          </div>
        </div>
      </section>

      {/* TODAY'S MOVERS */}
      <TodaysMovers />

      {/* VAULT PRICING EXPLAINER */}
      <VaultPricingExplainer />

      {/* HOW IT WORKS */}
      <section className="bg-cream py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
              Simple. Secure. Trusted.
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-charcoal">
              How VAULTED Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "Browse & Discover",
                body: "Explore authenticated luxury from the houses you love. Filter by brand, condition, price, and category.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Expert Authentication",
                body: "Our team of luxury experts verifies every listing before it goes live. We check materials, hardware, stitching, date codes, and provenance.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Buy with Confidence",
                body: "Secure checkout, buyer protection on every order, and our 7-day return guarantee. If it's not as described, you're fully covered.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="group">
                <div className="text-gold mb-6">{item.icon}</div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-serif text-5xl font-light text-stone-light/60">
                    {item.step}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-charcoal">
                    {item.title}
                  </h3>
                </div>
                <p className="text-stone-dark text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND SPOTLIGHTS */}
      <section className="py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
                Shop by House
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal">
                Iconic Maisons
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BRANDS.slice(0, 8).map((brand) => (
              <Link
                key={brand.slug}
                href={`/brand/${brand.slug}`}
                className="group relative aspect-square overflow-hidden bg-cream flex items-center justify-center hover:bg-cream-dark transition-colors"
              >
                <div className="text-center p-6">
                  <p className="font-serif text-xl md:text-2xl font-light text-charcoal group-hover:text-gold-muted transition-colors">
                    {brand.name}
                  </p>
                  <p className="text-[10px] tracking-widest uppercase text-stone mt-2">
                    Est. {brand.founded}
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-4 h-4 text-gold"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-charcoal text-warm-white py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
              Why VAULTED
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-warm-white">
              Built on Trust
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {[
              {
                title: "Expert Authentication",
                body: "Every piece is reviewed by our team of luxury specialists with combined decades of experience.",
              },
              {
                title: "Vault-owned stock",
                body: "We buy and authenticate before listing — one standard, no anonymous third parties.",
              },
              {
                title: "Buyer Protection",
                body: "If an item doesn't match its listing, we cover your return and refund — no questions asked.",
              },
              {
                title: "Secure Payments",
                body: "Bank-grade encryption, 3D Secure, and fraud monitoring protect every transaction on VAULTED.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-stone/20 pt-6">
                <div className="w-8 h-0.5 bg-gold mb-5" />
                <h3 className="font-serif text-xl text-warm-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELL CTA */}
      <section className="relative py-24 md:py-36 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={SELL_CTA_IMAGE}
            alt="Sell your luxury items"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-warm-white/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">
            For Sellers
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-charcoal leading-tight">
            Your luxury
            <br />
            <em className="italic">finds its next</em>
            <br />
            chapter here.
          </h2>
          <p className="mt-8 text-stone-dark text-lg leading-relaxed max-w-lg mx-auto">
            List your luxury pieces and reach thousands of buyers who appreciate
            fine craftsmanship. We handle authentication, you receive the
            proceeds.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sell"
              className="inline-flex items-center justify-center bg-charcoal text-warm-white text-xs tracking-widest uppercase px-8 py-4 hover:bg-charcoal-soft transition-colors"
            >
              Start Selling
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center border border-charcoal/30 text-charcoal text-xs tracking-widest uppercase px-8 py-4 hover:border-charcoal transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
