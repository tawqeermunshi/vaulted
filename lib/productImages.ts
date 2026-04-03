/** Must stay aligned with `Category` in `lib/data.ts`. */
export type ListingCategory =
  | "bags"
  | "shoes"
  | "clothing"
  | "accessories"
  | "belts"
  | "jewelry";

/**
 * Luxury / fashion photography only. URLs use Unsplash's current ixlib format
 * (plain photo URLs often 404 now).
 */
const u = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=82`;

const BAGS = [
  u("photo-1553062407-98eeb64c6a62"),
  u("photo-1590874103328-eac38a683ce7"),
  u("photo-1543163521-1bf539c55dd2"),
  u("photo-1600185365483-26d7a4cc7519"),
  u("photo-1594633312681-425c7b97ccd1"),
  u("photo-1529139574466-a303027c1d8b"),
  u("photo-1594223274512-ad4803739b7c"),
  u("photo-1539533018447-63fcce2678e3"),
  u("photo-1483985988355-763728e1935b"),
  u("photo-1503342217505-b0a15ec3261c"),
  u("photo-1512436991641-6745cdb1723f"),
  u("photo-1496747611176-843222e1e57c"),
  u("photo-1620799140408-edc6dcb6d633"),
  u("photo-1594633313593-bab3825d0caf"),
] as const;

const SHOES = [
  u("photo-1600185365926-3a2ce3cdb9eb"),
  u("photo-1605464315542-bda3e2f4e605"),
  u("photo-1460353581641-37baddab0fa2"),
  u("photo-1560769629-975ec94e6a86"),
  u("photo-1595950653106-6c9ebd614d3a"),
  u("photo-1549298916-b41d501d3772"),
  u("photo-1608231387042-66d1773070a5"),
  u("photo-1606107557195-0e29a4b5b4aa"),
  u("photo-1591561954557-26941169b49e"),
] as const;

const BELTS = [
  u("photo-1611085583191-a3b181a88401"),
  u("photo-1553062407-98eeb64c6a62"),
  u("photo-1590874103328-eac38a683ce7"),
  u("photo-1543163521-1bf539c55dd2"),
  u("photo-1600185365483-26d7a4cc7519"),
] as const;

const ACCESSORIES = [
  u("photo-1572635196237-14b3f281503f"),
  u("photo-1515378791036-0648a3ef77b2"),
  u("photo-1522312346375-d1a52e2b99b3"),
  u("photo-1603561596112-0a132b757442"),
  u("photo-1518791841217-8f162f1e1131"),
  u("photo-1445205170230-053b83016050"),
  u("photo-1509631179647-0177331693ae"),
  u("photo-1539533018447-63fcce2678e3"),
] as const;

const JEWELRY = [
  u("photo-1515562141207-7a88fb7ce338"),
  u("photo-1535632066927-ab7c9ab60908"),
  u("photo-1611591437281-460bfbe1220a"),
  u("photo-1599643478518-a784e5dc4c8f"),
  u("photo-1603561596112-0a132b757442"),
  u("photo-1522312346375-d1a52e2b99b3"),
] as const;

const CLOTHING = [
  u("photo-1551028719-00167b16eac5"),
  u("photo-1591047139829-d91aecb6caea"),
  u("photo-1489987707025-afc232f7ea0f"),
  u("photo-1434389677669-e08b4cac3105"),
  u("photo-1469334031218-e382a71b716b"),
  u("photo-1515886657613-9f3515b0c78f"),
  u("photo-1525507119028-ed4c629a60a3"),
  u("photo-1441984904996-e0b6ba687e04"),
  u("photo-1601925260368-ae2f83cf8b7f"),
  u("photo-1490481651871-ab68de25d43d"),
] as const;

const BY_CATEGORY: Record<ListingCategory, readonly string[]> = {
  bags: BAGS,
  shoes: SHOES,
  belts: BELTS,
  accessories: ACCESSORIES,
  jewelry: JEWELRY,
  clothing: CLOTHING,
};

/** Pick a consistent photo for this SKU from the category-appropriate pool. */
export function listingPhoto(category: ListingCategory, productId: string): string {
  const pool = BY_CATEGORY[category];
  const n = parseInt(productId, 10);
  const idx = Number.isFinite(n) ? Math.abs(n - 1) % pool.length : 0;
  return pool[idx]!;
}

export const HERO_EDITORIAL =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=82";

export const SELL_CTA_IMAGE =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&auto=format&fit=crop&w=1600&q=82";
