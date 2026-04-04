import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, listingDisplayTitle } from "@/lib/data";

/** Homepage strip — curated pieces with a line of story */
export default function FromTheVault() {
  const picks = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="bg-charcoal border-y border-stone/20 py-14 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-2">From the vault</p>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-warm-white mb-10 max-w-xl">
          Every piece carries a chapter. Here are a few we love.
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {picks.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-soft mb-3">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <p className="text-[10px] tracking-widest uppercase text-stone mb-1">{p.brandDisplay}</p>
              <p className="font-serif text-sm font-light text-warm-white group-hover:text-gold-light transition-colors line-clamp-3 leading-snug">
                {listingDisplayTitle(p)}
              </p>
              <p className="mt-1.5 text-[11px] text-stone line-clamp-1" title={p.name}>
                {p.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
