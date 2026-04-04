import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, listingDisplayTitle } from "@/lib/data";

/** Replaces “today’s movers” — editorial picks, not price motion */
export default function StoriesWeLove() {
  const picks = [...PRODUCTS].filter((p) => p.storyBody || p.provenance?.headline).slice(0, 6);

  return (
    <section className="py-20 md:py-28 px-6 lg:px-12 bg-warm-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">Stories we love</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal">
            Pre-loved doesn&apos;t have to feel anonymous
          </h2>
          <p className="mt-4 font-editorial-serif text-stone-dark text-sm md:text-base leading-relaxed">
            Real memories, real wear, real reasons pieces move on — so your first luxury buy feels
            human, not hollow.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {picks.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="group grid grid-cols-[minmax(0,120px)_1fr] gap-5 items-start border-b border-stone-light/50 sm:border-0 pb-8 sm:pb-0"
            >
              <div className="relative aspect-[3/4] w-full max-w-[120px] overflow-hidden bg-cream">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="120px"
                />
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-stone">{p.brandDisplay}</p>
                <h3 className="font-serif text-lg font-light text-charcoal mt-1 group-hover:text-gold-muted transition-colors leading-snug">
                  {listingDisplayTitle(p)}
                </h3>
                <p className="mt-1 text-xs text-stone">{p.name}</p>
                {p.storyBody && (
                  <p className="mt-3 font-editorial-serif text-sm text-stone-dark leading-relaxed line-clamp-3">
                    {p.storyBody.length > 160 ? `${p.storyBody.slice(0, 157)}…` : p.storyBody}
                  </p>
                )}
                <span className="inline-block mt-3 text-[10px] tracking-widest uppercase text-gold">
                  Read the story
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
