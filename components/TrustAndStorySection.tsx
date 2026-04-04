import { STORY_TRUST_DISCLAIMER } from "@/lib/trustCopy";

const pillars = [
  {
    title: "What we verify",
    body: "Every item is authenticated in-house. We inspect materials, hardware, stamps, stitching, and provenance signals before it is listed. Condition is graded honestly — you see the wear we see.",
  },
  {
    title: "What the story is",
    body: "Personal vignettes celebrate why a piece mattered — travel, milestones, quiet rituals. They are shared to honour the object’s journey, not to replace a certificate.",
  },
  {
    title: "Why that matters",
    body: "For first-time luxury buyers, resale can feel cold. A name and a price aren’t enough. Story restores warmth; verification restores nerve.",
  },
];

export default function TrustAndStorySection() {
  return (
    <section className="py-20 md:py-28 px-6 lg:px-12 bg-cream border-y border-stone-light/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-20 max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">Trust &amp; narrative</p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-charcoal">
            Confidence first. Romance second.
          </h2>
          <p className="mt-5 font-editorial-serif text-stone-dark text-base leading-relaxed">
            VAULTED pairs rigorous authentication with human context — so you know what is true
            about the object, and what is simply true about the life it lived.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center md:text-left">
              <h3 className="font-serif text-xl font-light text-charcoal mb-3">{pillar.title}</h3>
              <p className="font-editorial-serif text-sm text-stone-dark leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-14 md:mt-18 max-w-3xl mx-auto text-center text-[11px] text-stone leading-relaxed">
          {STORY_TRUST_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
