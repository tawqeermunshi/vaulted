/** Must stay aligned with `Category` in `lib/data.ts`. */
export type ListingCategory =
  | "bags"
  | "shoes"
  | "clothing"
  | "accessories"
  | "belts"
  | "jewelry";

/**
 * Listing art = the **category product** clearly in frame, in a lived moment when possible
 * (street, travel, getting ready, celebration, boutique), not empty scenery or generic crowds.
 *
 * Unsplash / Pexels — hotlink per each platform’s guidelines.
 */
export const u = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=85`;

/** Same photo, different focal crop — varies grids without losing the same story beat. */
export const uF = (id: string, fpX: number, fpY: number) =>
  `${u(id)}&fp-x=${fpX}&fp-y=${fpY}`;

export const p = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

/**
 * One URL per catalog `id` ("1"…"45"). Keys align with `lib/data.ts` product ids.
 */
export const STORY_FIRST_LISTING_IMAGES: Record<string, string> = {
  // Bags — handbag / tote / backpack clearly visible
  "1": u("photo-1496747611176-843222e1e57c"), // woven bag, sea light
  "2": u("photo-1483985988355-763728e1935b"), // arms full of shopping bags
  "3": u("photo-1594633313593-bab3825d0caf"), // croc-embossed bag, model
  "4": u("photo-1594223274512-ad4803739b7c"), // teal bag, desk moment
  "5": u("photo-1584917865442-de89df76afd3"), // structured color bag
  "6": u("photo-1590874103328-eac38a683ce7"), // woven + leather bag, window light
  "11": u("photo-1539109136881-3be0616acf4b"), // crossbody, Milan square
  "12": u("photo-1441986300917-64674bd600d8"), // boutique, bags on shelves
  "15": u("photo-1553062407-98eeb64c6a62"), // backpack, quiet interior
  "16": p("5418957"), // shoulder bag, fitting-room energy
  "20": p("13924894"), // large tote with model
  "24": p("1152077"), // messenger bag, warm leather
  "26": uF("photo-1496747611176-843222e1e57c", 0.35, 0.6),
  "30": uF("photo-1496747611176-843222e1e57c", 0.65, 0.45),
  "31": uF("photo-1483985988355-763728e1935b", 0.4, 0.55),
  "33": uF("photo-1594633313593-bab3825d0caf", 0.5, 0.35),
  "39": uF("photo-1539109136881-3be0616acf4b", 0.55, 0.45),
  "41": uF("photo-1594223274512-ad4803739b7c", 0.45, 0.35),
  "44": uF("photo-1584917865442-de89df76afd3", 0.5, 0.5),
  "45": uF("photo-1441986300917-64674bd600d8", 0.5, 0.4),

  // Shoes — footwear is the hero (on foot or styled as shoes)
  "7": u("photo-1460353581641-37baddab0fa2"), // Nike on asphalt
  "8": u("photo-1515886657613-9f3515b0c78f"), // white boots, court
  "13": u("photo-1543163521-1bf539c55dd2"), // floral heels
  "17": u("photo-1549298916-b41d501d3772"), // sneaker, fabric backdrop
  "19": u("photo-1525966222134-fcfa99b8ae77"), // low-top sneaker
  "21": u("photo-1542291026-7eec264c27ff"), // running shoe
  "22": u("photo-1620799140408-edc6dcb6d633"), // heels on display
  "35": u("photo-1606107557195-0e29a4b5b4aa"), // bright trainer
  "36": uF("photo-1460353581641-37baddab0fa2", 0.5, 0.75),
  "38": uF("photo-1515886657613-9f3515b0c78f", 0.5, 0.65),

  // Belts — waist belt visible
  "9": p("4937224"),
  "10": p("4937225"),
  "34": p("1927251"), // winter outing, leather belt on suit

  // Jewelry — rings, stacks, watch
  "14": u("photo-1515934751635-c81c6bc9a2d8"), // bands on bouquet
  "23": u("photo-1596944924616-7b38e7cfac36"), // gold on skin
  "43": u("photo-1490367532201-b9bc1dc483f6"), // watch + cuffs, getting ready

  // Accessories — sunglasses, small goods, watch in context
  "18": u("photo-1621184455862-c163dfb30e0f"), // mirrored sunnies, laugh
  "28": u("photo-1469334031218-e382a71b716b"), // sunnies + stacks
  "29": u("photo-1529139574466-a303027c1d8b"), // bold sunnies, sky
  "32": u("photo-1596462502278-27bfdc403348"), // earrings in flat moment
  "37": u("photo-1515562141207-7a88fb7ce338"), // layered jewelry flat
  "40": u("photo-1507679799987-c73779587ccf"), // dress watch, suiting

  // Clothing — garment is the focus
  "25": u("photo-1595777457583-95e059d581b8"), // gown, twirl outdoors
  "27": u("photo-1594633312681-425c7b97ccd1"), // trousers fit
  "42": u("photo-1591047139829-d91aecb6caea"), // jacket, hand on hanger
};

const BAGS = [
  u("photo-1496747611176-843222e1e57c"),
  u("photo-1539109136881-3be0616acf4b"),
  p("5418957"),
] as const;

const SHOES = [u("photo-1460353581641-37baddab0fa2"), u("photo-1543163521-1bf539c55dd2")] as const;
const BELTS = [p("4937224"), p("4937225")] as const;
const ACCESSORIES = [u("photo-1621184455862-c163dfb30e0f"), u("photo-1515562141207-7a88fb7ce338")] as const;
const JEWELRY = [u("photo-1515934751635-c81c6bc9a2d8"), u("photo-1596944924616-7b38e7cfac36")] as const;
const CLOTHING = [u("photo-1595777457583-95e059d581b8"), u("photo-1591047139829-d91aecb6caea")] as const;

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
