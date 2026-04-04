import type { Product } from "@/lib/data";
import { STORY_TRUST_DISCLAIMER } from "@/lib/trustCopy";

interface Props {
  product: Product;
}

const fields: { key: keyof NonNullable<Product["provenance"]>; label: string }[] = [
  { key: "acquired", label: "How it entered the wardrobe" },
  { key: "worn", label: "Where life took it" },
  { key: "memory", label: "A moment worth keeping" },
  { key: "sentiment", label: "What it meant" },
];

export default function ProductStory({ product }: Props) {
  const { provenance, storyBody } = product;
  const hasStructured =
    provenance &&
    (provenance.headline ||
      provenance.acquired ||
      provenance.worn ||
      provenance.memory ||
      provenance.sentiment);

  if (!hasStructured && !storyBody) return null;

  return (
    <div className="mt-10 p-6 md:p-8 border border-stone-light/60 bg-cream/40 rounded-sm">
      <p className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4">
        From the previous chapter
      </p>

      <dl className="space-y-5">
        {fields.map(({ key, label }) => {
          const val = provenance?.[key];
          if (!val || typeof val !== "string") return null;
          return (
            <div key={key}>
              <dt className="text-[10px] tracking-widest uppercase text-stone mb-1">{label}</dt>
              <dd className="font-editorial-serif text-sm text-stone-dark leading-relaxed">{val}</dd>
            </div>
          );
        })}
      </dl>

      {storyBody && (
        <div className="mt-8 pt-8 border-t border-stone-light/50">
          <p className="font-editorial-serif text-sm md:text-base text-charcoal leading-relaxed tracking-wide">
            {storyBody}
          </p>
        </div>
      )}

      <p className="mt-8 text-[11px] text-stone leading-relaxed border-t border-stone-light/40 pt-6">
        {STORY_TRUST_DISCLAIMER}
      </p>
    </div>
  );
}
