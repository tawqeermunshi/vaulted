import Link from "next/link";

const SHOP_LINKS = [
  { href: "/browse", label: "All Items" },
  { href: "/browse?category=bags", label: "Bags" },
  { href: "/browse?category=shoes", label: "Shoes" },
  { href: "/browse?category=clothing", label: "Clothing" },
  { href: "/browse?category=accessories", label: "Accessories" },
  { href: "/browse?category=belts", label: "Belts" },
  { href: "/browse?category=jewelry", label: "Jewelry" },
];

const BRAND_LINKS = [
  { href: "/brand/hermes", label: "Hermès" },
  { href: "/brand/chanel", label: "Chanel" },
  { href: "/brand/louis-vuitton", label: "Louis Vuitton" },
  { href: "/brand/gucci", label: "Gucci" },
  { href: "/brand/prada", label: "Prada" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About VAULTED" },
  { href: "/authentication", label: "Authentication" },
  { href: "/sell", label: "Sell With Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="font-sans bg-charcoal text-warm-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-3xl tracking-[0.2em] uppercase text-warm-white"
            >
              Vaulted
            </Link>
            <p className="mt-4 font-editorial-serif text-stone text-sm leading-relaxed max-w-xs tracking-wide">
              The destination for authenticated pre-loved luxury. Every piece
              verified. Every listing curated by us. Every purchase guaranteed.
            </p>
            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-xs tracking-widest uppercase text-stone mb-3">
                Join the Vault
              </p>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-charcoal-soft border border-stone/30 text-warm-white placeholder-stone text-sm px-4 py-2.5 outline-none focus:border-gold transition-colors"
                />
                <button className="bg-gold text-charcoal text-xs tracking-widest uppercase px-4 py-2.5 hover:bg-gold-light transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone hover:text-warm-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone mb-5">
              Brands
            </h4>
            <ul className="space-y-3">
              {BRAND_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone hover:text-warm-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone hover:text-warm-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-dark">
            © 2025 VAULTED. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-stone-dark hover:text-warm-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-stone-dark hover:text-warm-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-xs text-stone-dark hover:text-warm-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
