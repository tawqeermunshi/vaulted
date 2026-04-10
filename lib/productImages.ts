/** Must stay aligned with `Category` in `lib/data.ts`. */
export type ListingCategory =
  | "bags"
  | "shoes"
  | "clothing"
  | "accessories"
  | "belts"
  | "jewelry";

/**
 * Each URL is chosen to match the **specific SKU** in `lib/data.ts` (product type, scale, and
 * typical wearer), not just the category — so a card case never inherits a men’s suiting shot.
 *
 * Unsplash / Pexels — hotlink per each platform’s guidelines.
 */
export const u = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=85`;

/** Same photo, different focal crop — varies grids without drifting off-subject. */
export const uF = (id: string, fpX: number, fpY: number) =>
  `${u(id)}&fp-x=${fpX}&fp-y=${fpY}`;

export const p = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

/**
 * One URL per catalog `id` ("1"…"45").
 */
export const STORY_FIRST_LISTING_IMAGES: Record<string, string> = {
  // Bags
  "1": u("photo-1496747611176-843222e1e57c"),
  "2": u("photo-1483985988355-763728e1935b"),
  "3": u("photo-1594633313593-bab3825d0caf"),
  "4": u("photo-1584917865442-de89df76afd3"),
  "5": u("photo-1590874103328-eac38a683ce7"),
  "6": u("photo-1590874103328-eac38a683ce7"),
  "11": u("photo-1539109136881-3be0616acf4b"),
  "12": u("photo-1441986300917-64674bd600d8"),
  "15": u("photo-1553062407-98eeb64c6a62"),
  "16": p("5418957"),
  "20": p("13924894"),
  "24": p("1152077"),
  "26": uF("photo-1496747611176-843222e1e57c", 0.35, 0.6),
  "30": uF("photo-1496747611176-843222e1e57c", 0.65, 0.45),
  "31": uF("photo-1483985988355-763728e1935b", 0.4, 0.55),
  "33": uF("photo-1594633313593-bab3825d0caf", 0.5, 0.35),
  "39": uF("photo-1539109136881-3be0616acf4b", 0.55, 0.45),
  "41": uF("photo-1594223274512-ad4803739b7c", 0.45, 0.35),
  "44": uF("photo-1584917865442-de89df76afd3", 0.5, 0.5),
  "45": uF("photo-1441986300917-64674bd600d8", 0.5, 0.4),

  // Shoes
  "7": u("photo-1460353581641-37baddab0fa2"),
  "8": u("photo-1543163521-1bf539c55dd2"),
  "13": u("photo-1594633312681-425c7b97ccd1"),
  "17": u("photo-1549298916-b41d501d3772"),
  "19": u("photo-1525966222134-fcfa99b8ae77"),
  "21": u("photo-1542291026-7eec264c27ff"),
  "22": u("photo-1606107557195-0e29a4b5b4aa"),
  "35": uF("photo-1460353581641-37baddab0fa2", 0.5, 0.75),
  "36": u("photo-1620799140408-edc6dcb6d633"),
  "38": uF("photo-1515886657613-9f3515b0c78f", 0.5, 0.65),

  // Belts
  "9": p("4937224"),
  "10": u("photo-1572804013309-59a88b7e92f1"),
  "34": p("4937225"),

  // Jewelry
  "14": u("photo-1596944924616-7b38e7cfac36"),
  "23": u("photo-1535632066927-ab7c9ab60908"),
  "43": u("photo-1599643478518-a784e5dc4c8f"),

  // Small leather goods, silk, eyewear
  "18": u("photo-1594223274512-ad4803739b7c"),
  "28": p("3943735"),
  "29": u("photo-1558769132-cb1aea458c5e"),
  "32": u("photo-1621184455862-c163dfb30e0f"),
  "37": p("7680469"),
  "40": p("3943735"),

  // Clothing
  "25": p("6311392"),
  "27": u("photo-1551028719-00167b16eac5"),
  "42": u("photo-1591047139829-d91aecb6caea"),
};

const BAGS = [
  u("photo-1496747611176-843222e1e57c"),
  u("photo-1539109136881-3be0616acf4b"),
  p("5418957"),
] as const;

const SHOES = [u("photo-1460353581641-37baddab0fa2"), u("photo-1543163521-1bf539c55dd2")] as const;
const BELTS = [p("4937224"), p("4937225")] as const;
const ACCESSORIES = [p("7680469"), u("photo-1621184455862-c163dfb30e0f")] as const;
const JEWELRY = [u("photo-1596944924616-7b38e7cfac36"), u("photo-1535632066927-ab7c9ab60908")] as const;
const CLOTHING = [p("6311392"), u("photo-1551028719-00167b16eac5")] as const;

const BY_CATEGORY: Record<ListingCategory, readonly string[]> = {
  bags: BAGS,
  shoes: SHOES,
  belts: BELTS,
  accessories: ACCESSORIES,
  jewelry: JEWELRY,
  clothing: CLOTHING,
};

/** Story-first URL per product; falls back to category pool only if id unknown. */
export function listingPhoto(category: ListingCategory, productId: string): string {
  const story = STORY_FIRST_LISTING_IMAGES[productId];
  if (story) return story;
  const pool = BY_CATEGORY[category];
  const n = parseInt(productId, 10);
  const idx = Number.isFinite(n) ? Math.abs(n - 1) % pool.length : 0;
  return pool[idx]!;
}

/** Homepage hero — celebration, human scale. */
export const HERO_EDITORIAL =
  "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=82";

/** Sell CTA — hands & bouquet. */
export const SELL_CTA_IMAGE =
  "https://images.unsplash.com/photo-1684244276932-6ae853774c4d?ixlib=rb-4.1.0&auto=format&fit=crop&w=1600&q=82";
