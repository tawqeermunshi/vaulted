import ProductCard from "@/components/ProductCard";
import {
  PRODUCTS,
  BRANDS,
  CATEGORIES,
  CONDITION_LABELS,
  type Category,
  type Condition,
} from "@/lib/data";
import Link from "next/link";

interface BrowsePageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    condition?: string;
    sort?: string;
    q?: string;
  }>;
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams;
  const { category, brand, condition, sort = "newest", q } = params;

  let products = [...PRODUCTS];

  if (category) {
    products = products.filter((p) => p.category === (category as Category));
  }
  if (brand) {
    products = products.filter((p) => p.brand === brand);
  }
  if (condition) {
    products = products.filter(
      (p) => p.condition === (condition as Condition)
    );
  }
  if (q) {
    const query = q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brandDisplay.toLowerCase().includes(query) ||
        p.color.toLowerCase().includes(query)
    );
  }

  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
  else if (sort === "discount")
    products.sort(
      (a, b) =>
        (1 - a.price / a.originalPrice) - (1 - b.price / b.originalPrice)
    );

  const activeLabel =
    (category && CATEGORIES.find((c) => c.value === category)?.label) ||
    (brand && BRANDS.find((b) => b.slug === brand)?.name) ||
    "All Items";

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      {/* Header */}
      <div className="border-b border-stone-light/50 bg-warm-white sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-light text-charcoal">
              {activeLabel}
            </h1>
            <p className="text-xs text-stone mt-0.5">
              {products.length} item{products.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone hidden sm:block">Sort by</span>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "newest", label: "Newest" },
                { value: "price-asc", label: "Price ↑" },
                { value: "price-desc", label: "Price ↓" },
                { value: "discount", label: "Discount" },
              ].map((option) => (
                <Link
                  key={option.value}
                  href={`/browse?${new URLSearchParams({
                    ...(category ? { category } : {}),
                    ...(brand ? { brand } : {}),
                    ...(condition ? { condition } : {}),
                    ...(q ? { q } : {}),
                    sort: option.value,
                  })}`}
                  className={`text-[10px] tracking-widest uppercase px-3 py-1.5 border transition-all ${
                    sort === option.value
                      ? "bg-charcoal text-warm-white border-charcoal"
                      : "border-stone-light text-stone-dark hover:border-charcoal"
                  }`}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 md:py-12">
        <div className="flex gap-10">
          {/* Sidebar Filters */}
          <aside className="w-52 shrink-0 hidden lg:block">
            {/* Category */}
            <FilterGroup title="Category">
              {CATEGORIES.map((cat) => (
                <FilterLink
                  key={cat.value}
                  href={`/browse?category=${cat.value}${sort !== "newest" ? `&sort=${sort}` : ""}`}
                  active={category === cat.value}
                  label={cat.label}
                />
              ))}
            </FilterGroup>

            {/* Brand */}
            <FilterGroup title="Maison">
              {BRANDS.map((b) => (
                <FilterLink
                  key={b.slug}
                  href={`/browse?brand=${b.slug}${sort !== "newest" ? `&sort=${sort}` : ""}`}
                  active={brand === b.slug}
                  label={b.name}
                />
              ))}
            </FilterGroup>

            {/* Condition */}
            <FilterGroup title="Condition">
              {(
                Object.keys(CONDITION_LABELS) as Array<
                  keyof typeof CONDITION_LABELS
                >
              ).map((key) => (
                <FilterLink
                  key={key}
                  href={`/browse?condition=${key}${sort !== "newest" ? `&sort=${sort}` : ""}`}
                  active={condition === key}
                  label={CONDITION_LABELS[key]}
                />
              ))}
            </FilterGroup>

            {/* Clear */}
            {(category || brand || condition) && (
              <Link
                href="/browse"
                className="text-[10px] tracking-widest uppercase text-stone hover:text-charcoal transition-colors block mt-2"
              >
                Clear All Filters
              </Link>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filters */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 lg:hidden">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.value}
                  href={`/browse?category=${cat.value}`}
                  className={`text-[10px] tracking-widest uppercase px-3 py-1.5 border whitespace-nowrap transition-all ${
                    category === cat.value
                      ? "bg-charcoal text-warm-white border-charcoal"
                      : "border-stone-light text-stone-dark hover:border-charcoal"
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {products.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-3xl text-charcoal mb-4">
                  No items found
                </p>
                <p className="text-stone mb-8">
                  Try adjusting your filters or browse all items.
                </p>
                <Link
                  href="/browse"
                  className="text-xs tracking-widest uppercase border border-charcoal text-charcoal px-6 py-3 hover:bg-charcoal hover:text-warm-white transition-all"
                >
                  Clear Filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant="compact"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h3 className="text-[10px] tracking-widest uppercase text-stone mb-4 border-b border-stone-light/50 pb-2">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterLink({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`block text-sm transition-colors ${
        active
          ? "text-charcoal font-medium"
          : "text-stone hover:text-charcoal"
      }`}
    >
      {active && (
        <span className="inline-block w-1.5 h-1.5 bg-gold rounded-full mr-2 mb-0.5" />
      )}
      {label}
    </Link>
  );
}
