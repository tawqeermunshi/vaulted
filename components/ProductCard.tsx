import Image from "next/image";
import Link from "next/link";
import { Product, getDiscount, CONDITION_LABELS } from "@/lib/data";
import LivePrice from "./LivePrice";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
  initialPrice?: number;
}

export default function ProductCard({
  product,
  variant = "default",
  initialPrice,
}: ProductCardProps) {
  const discount = getDiscount(product.price, product.originalPrice);
  const startPrice = initialPrice ?? product.price;

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-cream">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/4]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
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

          {/* Static discount vs retail — always visible */}
          <div className="absolute top-3 right-3">
            <span className="bg-warm-white/95 text-charcoal text-[10px] font-medium px-2 py-1">
              -{discount}% retail
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="pt-3 pb-1 px-0.5">
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

          {/* Live price ticker */}
          <LivePrice
            productId={product.id}
            basePrice={product.originalPrice}
            initialPrice={startPrice}
            variant="card"
          />
        </div>
      </div>
    </Link>
  );
}
