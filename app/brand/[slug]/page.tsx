import { notFound } from "next/navigation";
import Link from "next/link";
import { BRANDS, PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = BRANDS.find((b) => b.slug === slug);

  if (!brand) notFound();

  const products = PRODUCTS.filter((p) => p.brand === slug);

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-charcoal text-warm-white py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl">
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">
              Est. {brand.founded} · {brand.country}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight">
              {brand.name}
            </h1>
            <p className="mt-2 font-serif text-xl italic text-stone">
              {brand.tagline}
            </p>
            <p className="mt-6 font-editorial-serif text-stone text-base leading-relaxed max-w-md tracking-wide">
              {brand.description}
            </p>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div>
              <p className="font-serif text-3xl font-light text-warm-white">
                {products.length}
              </p>
              <p className="text-[10px] tracking-widest uppercase text-stone mt-0.5">
                Items Available
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl font-light text-warm-white">
                100%
              </p>
              <p className="text-[10px] tracking-widest uppercase text-stone mt-0.5">
                Authenticated
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
              Shop {brand.name}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
              Available Now
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24 bg-cream">
              <p className="font-serif text-3xl text-charcoal mb-4">
                No items currently available
              </p>
              <p className="text-stone mb-8">
                New {brand.name} pieces arrive regularly. Check back soon.
              </p>
              <Link
                href="/browse"
                className="text-xs tracking-widest uppercase border border-charcoal text-charcoal px-6 py-3 hover:bg-charcoal hover:text-warm-white transition-all"
              >
                Browse All Brands
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other Brands */}
      <section className="bg-cream py-16 md:py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-2">
              Explore More
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
              Other Maisons
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {BRANDS.filter((b) => b.slug !== slug).map((b) => (
              <Link
                key={b.slug}
                href={`/brand/${b.slug}`}
                className="border border-stone-light text-stone-dark text-xs tracking-widest uppercase px-5 py-2.5 hover:border-charcoal hover:text-charcoal transition-all"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
