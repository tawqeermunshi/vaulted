import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice, getDiscount, CONDITION_LABELS } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

export default function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const discount = getDiscount(product.price, product.originalPrice);

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-cream">
        {/* Image */}
        <div
          className={`relative overflow-hidden ${
            variant === "compact" ? "aspect-[3/4]" : "aspect-[3/4]"
          }`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.authenticated && (
              <span className="bg-charcoal text-warm-white text-[10px] tracking-widest uppercase px-2 py-1">
                Authenticated
              </span>
            )}
            {product.condition === "pristine" && (
              <span className="bg-gold text-charcoal text-[10px] tracking-widest uppercase px-2 py-1">
                Pristine
              </span>
            )}
          </div>

          {/* Discount badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-warm-white/95 text-charcoal text-[10px] font-medium px-2 py-1">
              -{discount}%
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="pt-3 pb-1 px-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] tracking-widest uppercase text-stone mb-0.5">
                {product.brandDisplay}
              </p>
              <h3 className="text-sm font-medium text-charcoal leading-snug truncate">
                {product.name}
              </h3>
              <p className="text-[11px] text-stone mt-0.5">
                {product.color}
                {product.size ? ` · ${product.size}` : ""}
                {" · "}
                {CONDITION_LABELS[product.condition]}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-medium text-charcoal">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-stone line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </div>

          {/* Seller */}
          {variant === "default" && (
            <div className="mt-2 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[10px] text-stone">
                {product.seller.name}
                {product.seller.verified && " · Verified Seller"}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
