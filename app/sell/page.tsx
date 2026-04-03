import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "List Your Item",
    body: "Complete our detailed listing form with photos, brand, condition, and your asking price. Our guided process takes 10–15 minutes.",
  },
  {
    number: "02",
    title: "Expert Review",
    body: "Our authentication team reviews your listing within 48 hours. We may request additional photos to confirm authenticity.",
  },
  {
    number: "03",
    title: "Go Live",
    body: "Once approved, your listing goes live to our global audience of luxury buyers. Your item is visible immediately.",
  },
  {
    number: "04",
    title: "Get Paid",
    body: "When your item sells, funds are released to your account within 3–5 business days. We handle payment, you keep 85% of the sale price.",
  },
];

const FAQS = [
  {
    q: "What brands do you accept?",
    a: "We accept items from all recognised luxury houses including Hermès, Chanel, Louis Vuitton, Gucci, Prada, Dior, Balenciaga, Saint Laurent, Bottega Veneta, Valentino, Fendi, and many more.",
  },
  {
    q: "What condition should my item be in?",
    a: "We accept items in Good condition and above. Items must be authentic, in wearable condition, and accurately described. We do not accept items with broken hardware, significant tears, or extreme wear.",
  },
  {
    q: "How much does VAULTED charge?",
    a: "VAULTED charges a 15% commission on the final sale price. You receive 85% of whatever your item sells for. There are no listing fees.",
  },
  {
    q: "How long does authentication take?",
    a: "Our team typically reviews new listings within 24–48 hours. We may request additional photos or documentation before approving your listing.",
  },
  {
    q: "What if my item doesn't sell?",
    a: "You can keep your listing active, adjust your price, or request to delist at any time. There are no fees for unlisted items.",
  },
];

export default function SellPage() {
  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="bg-charcoal text-warm-white py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-5">
              Sell on VAULTED
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
              Your luxury
              <br />
              <em className="italic">deserves</em>
              <br />
              an audience.
            </h1>
            <p className="mt-8 text-stone text-lg leading-relaxed max-w-md">
              Reach thousands of discerning buyers. We authenticate your items,
              handle the payments, and ensure a seamless experience from listing
              to sale.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="#list-form"
                className="inline-flex items-center justify-center bg-gold text-charcoal text-xs tracking-widest uppercase px-8 py-4 hover:bg-gold-light transition-colors font-medium"
              >
                List an Item
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-charcoal-soft border-t border-stone/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <div className="grid grid-cols-3 gap-8 max-w-lg">
            {[
              { value: "85%", label: "Seller Payout" },
              { value: "48h", label: "Authentication" },
              { value: "2,400+", label: "Active Buyers" },
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
      </section>

      {/* How it works */}
      <section className="py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
              The Process
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-charcoal">
              Selling is simple.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step) => (
              <div key={step.number}>
                <span className="font-serif text-6xl font-light text-stone-light/50">
                  {step.number}
                </span>
                <h3 className="font-serif text-xl text-charcoal mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-stone-dark leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* List Form */}
      <section
        id="list-form"
        className="bg-cream py-20 md:py-28 px-6 lg:px-12"
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
              Start Here
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal">
              Tell us about your item
            </h2>
          </div>

          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField label="Your Name" type="text" placeholder="Full name" />
              <FormField
                label="Email Address"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <FormField
              label="Brand"
              type="select"
              placeholder="Select a maison"
              options={[
                "Hermès",
                "Louis Vuitton",
                "Chanel",
                "Gucci",
                "Prada",
                "Christian Dior",
                "Balenciaga",
                "Saint Laurent",
                "Bottega Veneta",
                "Other",
              ]}
            />

            <FormField
              label="Item Name"
              type="text"
              placeholder="e.g. Birkin 30, Classic Flap Medium"
            />

            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                label="Category"
                type="select"
                placeholder="Select category"
                options={[
                  "Bags",
                  "Shoes",
                  "Clothing",
                  "Accessories",
                  "Belts",
                  "Jewelry",
                ]}
              />
              <FormField
                label="Condition"
                type="select"
                placeholder="Select condition"
                options={["Pristine", "Excellent", "Very Good", "Good"]}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                label="Asking Price (USD)"
                type="number"
                placeholder="e.g. 2500"
              />
              <FormField
                label="Year of Purchase"
                type="number"
                placeholder="e.g. 2021"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest uppercase text-stone mb-2">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Describe the item — materials, colour, condition details, what's included..."
                className="w-full bg-warm-white border border-stone-light text-charcoal placeholder-stone text-sm px-4 py-3 outline-none focus:border-charcoal transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest uppercase text-stone mb-2">
                Photos
              </label>
              <div className="border-2 border-dashed border-stone-light hover:border-stone transition-colors p-10 text-center cursor-pointer">
                <svg
                  className="w-8 h-8 text-stone mx-auto mb-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="text-sm text-stone">
                  Upload photos of your item
                </p>
                <p className="text-xs text-stone/70 mt-1">
                  Include front, back, hardware, interior, and date codes
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-charcoal text-warm-white text-xs tracking-widest uppercase py-4 hover:bg-charcoal-soft transition-colors"
            >
              Submit Listing for Review
            </button>

            <p className="text-[11px] text-stone text-center leading-relaxed">
              By submitting, you agree to our{" "}
              <Link
                href="/terms"
                className="underline hover:text-charcoal transition-colors"
              >
                Seller Terms
              </Link>
              . Our team will review your listing and respond within 48 hours.
            </p>
          </form>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-28 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
              Questions
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-charcoal">
              Frequently Asked
            </h2>
          </div>

          <div className="space-y-0 divide-y divide-stone-light/50">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="font-medium text-charcoal mb-2">{faq.q}</h3>
                <p className="text-sm text-stone-dark leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  type,
  placeholder,
  options,
}: {
  label: string;
  type: string;
  placeholder: string;
  options?: string[];
}) {
  if (type === "select") {
    return (
      <div>
        <label className="block text-[10px] tracking-widest uppercase text-stone mb-2">
          {label}
        </label>
        <select className="w-full bg-warm-white border border-stone-light text-charcoal text-sm px-4 py-3 outline-none focus:border-charcoal transition-colors appearance-none">
          <option value="" disabled selected>
            {placeholder}
          </option>
          {options?.map((opt) => (
            <option key={opt} value={opt.toLowerCase().replace(/\s+/g, "-")}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-[10px] tracking-widest uppercase text-stone mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-warm-white border border-stone-light text-charcoal placeholder-stone text-sm px-4 py-3 outline-none focus:border-charcoal transition-colors"
      />
    </div>
  );
}
