import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, CONDITION_LABELS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import LivePrice from "@/components/LivePrice";
import ViewRecorder from "@/components/ViewRecorder";
import { getOrInitPrice } from "@/lib/redis";

// Product detail is dynamic — price changes every tick
export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) notFound();

  // Fetch current price server-side for the initial render (no flash of wrong price)
  const initialPrice = await getOrInitPrice(product.id, product.originalPrice);

  const related = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.brand === product.brand || p.category === product.category)
  ).slice(0, 4);

  return (
    <div className="pt-16 md:pt-20">
      {/* Record this view for the demand signal */}
      <ViewRecorder productId={product.id} />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <nav className="flex items-center gap-2 text-[11px] tracking-wide text-stone">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-charcoal transition-colors">Browse</Link>
          <span>/</span>
          <Link href={`/brand/${product.brand}`} className="hover:text-charcoal transition-colors">
            {product.brandDisplay}
          </Link>
          <span>/</span>
          <span className="text-charcoal truncate max-w-40">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden bg-cream">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.authenticated && (
                <div className="absolute top-4 left-4 bg-charcoal text-warm-white text-[10px] tracking-widest uppercase px-3 py-1.5 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  Authenticated
                </div>
              )}
            </div>

            {/* Condition bar */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-[10px] tracking-widest uppercase text-stone">Condition</span>
              <span className="text-xs font-medium text-charcoal">
                {CONDITION_LABELS[product.condition]}
              </span>
              <div className="flex-1 h-0.5 bg-stone-light rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full"
                  style={{
                    width:
                      product.condition === "pristine" ? "100%" :
                      product.condition === "excellent" ? "82%" :
                      product.condition === "very-good" ? "65%" : "45%",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <Link
              href={`/brand/${product.brand}`}
              className="text-[11px] tracking-[0.3em] uppercase text-gold hover:text-gold-muted transition-colors mb-3"
            >
              {product.brandDisplay}
            </Link>

            <h1 className="font-serif text-3xl md:text-4xl font-light text-charcoal leading-tight">
              {product.name}
            </h1>

            {/* Meta tags */}
            <div className="mt-4 flex flex-wrap gap-3">
              {product.color && (
                <span className="text-xs text-stone border border-stone-light px-3 py-1">{product.color}</span>
              )}
              {product.size && (
                <span className="text-xs text-stone border border-stone-light px-3 py-1">{product.size}</span>
              )}
              {product.material && (
                <span className="text-xs text-stone border border-stone-light px-3 py-1">{product.material}</span>
              )}
              {product.year && (
                <span className="text-xs text-stone border border-stone-light px-3 py-1">{product.year}</span>
              )}
            </div>

            {/* ── Live Price Block ──────────────────────────────────────── */}
            <div className="mt-8">
              <LivePrice
                productId={product.id}
                basePrice={product.originalPrice}
                initialPrice={initialPrice}
                variant="detail"
              />
            </div>

            {/* Market note */}
            <p className="mt-3 text-[10px] tracking-wide text-stone flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Price updates live · refreshes every 5 min
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-col gap-3">
              <button className="w-full bg-charcoal text-warm-white text-xs tracking-widest uppercase py-4 hover:bg-charcoal-soft transition-colors">
                Purchase Now
              </button>
            </div>

            {/* Trust signals */}
            <div className="mt-6 space-y-3">
              {[
                { icon: "🛡️", text: "Authenticity Guaranteed — verified by our experts" },
                { icon: "🔄", text: "7-Day Returns — if not as described" },
                { icon: "🔒", text: "Secure Checkout — bank-grade encryption" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-xs text-stone-dark">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="my-8 border-t border-stone-light/50" />

            {/* Description */}
            <div>
              <h3 className="text-[10px] tracking-widest uppercase text-stone mb-3">Description</h3>
              <p className="text-sm text-stone-dark leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-8 p-4 border border-stone-light/50 bg-cream/30">
              <h3 className="text-[10px] tracking-widest uppercase text-stone mb-2">VAULTED inventory</h3>
              <p className="text-xs text-stone-dark leading-relaxed">
                We acquire, authenticate, and list every piece ourselves — so you shop curated stock with a single standard of quality.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="bg-cream py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-8">
              <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-2">You May Also Like</p>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">Similar Pieces</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
