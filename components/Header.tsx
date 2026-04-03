"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/browse", label: "Shop" },
  { href: "/browse?category=bags", label: "Bags" },
  { href: "/browse?category=shoes", label: "Shoes" },
  { href: "/browse?category=accessories", label: "Accessories" },
  { href: "/sell", label: "Sell" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "bg-warm-white/95 backdrop-blur-sm border-b border-stone-light/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className={`font-serif text-2xl md:text-3xl font-light tracking-[0.2em] uppercase transition-colors ${
            transparent ? "text-warm-white" : "text-charcoal"
          }`}
        >
          Vaulted
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-widest uppercase transition-colors hover:text-gold font-medium ${
                transparent ? "text-warm-white/80" : "text-stone-dark"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-5">
          <button
            aria-label="Search"
            className={`transition-colors hover:text-gold ${
              transparent ? "text-warm-white/80" : "text-stone-dark"
            }`}
          >
            <SearchIcon />
          </button>
          <Link
            href="/sell"
            className={`text-xs tracking-widest uppercase border px-4 py-2 transition-all hover:bg-gold hover:border-gold hover:text-charcoal ${
              transparent
                ? "border-warm-white/40 text-warm-white"
                : "border-stone-light text-charcoal"
            }`}
          >
            List an Item
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden transition-colors ${
            transparent ? "text-warm-white" : "text-charcoal"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-warm-white border-t border-stone-light/50">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-widest uppercase text-stone-dark hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/sell"
              onClick={() => setMenuOpen(false)}
              className="mt-2 text-xs tracking-widest uppercase border border-charcoal text-charcoal px-4 py-3 text-center hover:bg-charcoal hover:text-warm-white transition-all"
            >
              List an Item
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
