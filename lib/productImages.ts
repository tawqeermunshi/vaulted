/** Must stay aligned with `Category` in `lib/data.ts`. */
export type ListingCategory =
  | "bags"
  | "shoes"
  | "clothing"
  | "accessories"
  | "belts"
  | "jewelry";

/**
 * Unsplash — hotlinked per their guidelines. Each listing uses a unique,
 * candid moment: weddings, receptions, hands, street ceremonies, dance floor,
 * getting-ready energy — not catalog flat-lays.
 */
export const u = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=85`;

/**
 * One image per catalog `id` ("1"…"45") so grids never repeat the same frame.
 * Verified HTTP 200 with ixlib=rb-4.1.0 as of integration.
 */
export const STORY_FIRST_LISTING_IMAGES: Record<string, string> = {
  "1": u("photo-1761211488173-a7154314420a"), // tender moment — celebration
  "2": u("photo-1771315023021-c9f3c45b1e05"), // reception — shared plate, candid
  "3": u("photo-1519741497674-611481863552"), // ceremony arch — guests, real day
  "4": u("photo-1773219382308-ac76a2d798fd"), // couple in wedding attire — street
  "5": u("photo-1760669346716-f9f1e9b089fb"), // couple — quiet joy
  "6": u("photo-1759308730169-9156cb9fe8fe"), // outdoor ceremony — hands
  "7": u("photo-1775126964327-aae7ba8d4259"), // shoe raised — crowded celebration
  "8": u("photo-1748260526938-4fa5472eb796"), // dance floor — disco light
  "9": u("photo-1679599423066-c419b4b16ce9"), // two wedding bands — close
  "10": u("photo-1626619485175-904897294d80"), // ring on finger — soft light
  "11": u("photo-1606216794074-735e91aa2c92"), // couple — laughter, outdoor celebration
  "12": u("photo-1660946213643-abfb452e04b3"), // bouquet in hand
  "13": u("photo-1765871905607-3676540588b0"), // family walking — outdoor
  "14": u("photo-1602969975150-24262038bbcb"), // wrists — bracelets, personal
  "15": u("photo-1722078514112-8fc9f3dc332e"), // table detail — reception
  "16": u("photo-1775126964349-182e59bf6962"), // running together — unposed
  "17": u("photo-1773219382308-aba75ad02fd6"), // wedding attire — city walk
  "18": u("photo-1507313398864-ae061f43d184"), // intertwined hands
  "19": u("photo-1613637819407-98ac477ba128"), // ring — intimate, monochrome mood
  "20": u("photo-1522142257700-1445b61b6142"), // bride & groom hands
  "21": u("photo-1551095597-b6c007a2150d"), // two hands — gentle hold
  "22": u("photo-1483985988355-763728e1935b"), // shopping street — real life
  "23": u("photo-1529139574466-a303027c1d8b"), // friends — urban candid
  "24": u("photo-1512436991641-6745cdb1723f"), // fashion in motion — editorial real
  "25": u("photo-1496747611176-843222e1e57c"), // street style — daylight
  "26": u("photo-1600185365483-26d7a4cc7519"), // bag in hand — lifestyle context
  "27": u("photo-1594633312681-425c7b97ccd1"), // wardrobe moment — personal
  "28": u("photo-1558618666-fcd25c85cd64"), // toast — glasses, gathering
  "29": u("photo-1522673607200-164d1b6ce486"), // getting-ready energy — dress & light
  "30": u("photo-1594223274512-ad4803739b7c"), // city fashion — candid stride
  "31": u("photo-1503342217505-b0a15ec3261c"), // show / crowd — occasion dressing
  "32": u("photo-1522335789203-aabd1fc54bc9"), // portrait — soft editorial
  "33": u("photo-1515886657613-9f3515b0c78f"), // full-length — confident pose
  "34": u("photo-1469334031218-e382a71b716b"), // outdoor fashion — wind & fabric
  "35": u("photo-1434389677669-e08b4cac3105"), // fabric & silhouette — tactile
  "36": u("photo-1543163521-1bf539c55dd2"), // accessories flat — still personal styling
  "37": u("photo-1553062407-98eeb64c6a62"), // leather goods — warm still life
  "38": u("photo-1590874103328-eac38a683ce7"), // product in lived interior
  "39": u("photo-1539533018447-63fcce2678e3"), // editorial stack — curated life
  "40": u("photo-1620799140408-edc6dcb6d633"), // detail shot — craft & texture
  "41": u("photo-1594633313593-bab3825d0caf"), // boutique light — discovery
  "42": u("photo-1664918189510-d752244761c1"), // couple holding hands — walk
  "43": u("photo-1657425991870-421806ec0569"), // hands & ring — quiet focus
  "44": u("photo-1601925260368-ae2f83cf8b7f"), // fashion editorial — moody personal
  "45": u("photo-1490481651871-ab68de25d43d"), // closet / rail — second life, real wardrobe
};

/** Fallback pool if an id is missing from the map (should not happen for current catalog). */
const BAGS = [
  u("photo-1600185365483-26d7a4cc7519"),
  u("photo-1594633312681-425c7b97ccd1"),
] as const;

const SHOES = [u("photo-1775126964327-aae7ba8d4259"), u("photo-1748260526938-4fa5472eb796")] as const;
const BELTS = [u("photo-1679599423066-c419b4b16ce9"), u("photo-1626619485175-904897294d80")] as const;
const ACCESSORIES = [u("photo-1543163521-1bf539c55dd2"), u("photo-1553062407-98eeb64c6a62")] as const;
const JEWELRY = [u("photo-1602969975150-24262038bbcb"), u("photo-1613637819407-98ac477ba128")] as const;
const CLOTHING = [u("photo-1522673607200-164d1b6ce486"), u("photo-1515886657613-9f3515b0c78f")] as const;

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

/** Homepage hero — celebration, human scale, not a stock product grid. */
export const HERO_EDITORIAL =
  "https://images.unsplash.com/photo-1758810411287-a362740f269e?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=82";

/** Sell CTA — hands & bouquet, “next chapter” energy. */
export const SELL_CTA_IMAGE =
  "https://images.unsplash.com/photo-1684244276932-6ae853774c4d?ixlib=rb-4.1.0&auto=format&fit=crop&w=1600&q=82";
