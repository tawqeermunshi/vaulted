export type Condition = "pristine" | "excellent" | "very-good" | "good";
export type Category =
  | "bags"
  | "shoes"
  | "clothing"
  | "accessories"
  | "belts"
  | "jewelry";

export interface Product {
  id: string;
  name: string;
  brand: string;
  brandDisplay: string;
  category: Category;
  price: number;
  originalPrice: number;
  condition: Condition;
  color: string;
  material?: string;
  size?: string;
  year?: number;
  image: string;
  seller: {
    name: string;
    verified: boolean;
    location: string;
    rating: number;
    salesCount: number;
  };
  description: string;
  authenticated: boolean;
  featured?: boolean;
}

export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  founded: number;
  country: string;
}

export const BRANDS: Brand[] = [
  {
    slug: "hermes",
    name: "Hermès",
    tagline: "The pinnacle of French luxury",
    description:
      "Founded in Paris in 1837, Hermès is synonymous with the ultimate in craftsmanship. Each piece is made by a single artisan and may take up to 48 hours to complete.",
    founded: 1837,
    country: "France",
  },
  {
    slug: "louis-vuitton",
    name: "Louis Vuitton",
    tagline: "Icons of French craftsmanship",
    description:
      "The world's most valuable luxury brand, Louis Vuitton has been synonymous with travel, elegance, and craftsmanship since 1854.",
    founded: 1854,
    country: "France",
  },
  {
    slug: "chanel",
    name: "Chanel",
    tagline: "Timeless Parisian elegance",
    description:
      "Gabrielle 'Coco' Chanel revolutionised women's fashion in 1910. Today, the house remains the epitome of Parisian chic.",
    founded: 1910,
    country: "France",
  },
  {
    slug: "gucci",
    name: "Gucci",
    tagline: "Italian luxury redefined",
    description:
      "From a Florentine leather goods shop founded in 1921, Gucci has grown into one of the world's most recognisable luxury houses.",
    founded: 1921,
    country: "Italy",
  },
  {
    slug: "prada",
    name: "Prada",
    tagline: "Milanese intellectual fashion",
    description:
      "Since 1913, Prada has stood at the intersection of fashion and intellect — classic craftsmanship with a subversive edge.",
    founded: 1913,
    country: "Italy",
  },
  {
    slug: "dior",
    name: "Christian Dior",
    tagline: "Haute couture at its finest",
    description:
      "Christian Dior's 1947 New Look transformed fashion. Today the house blends heritage with contemporary vision under its creative directors.",
    founded: 1946,
    country: "France",
  },
  {
    slug: "balenciaga",
    name: "Balenciaga",
    tagline: "Avant-garde luxury fashion",
    description:
      "Founded by Cristóbal Balenciaga in 1917, the house is now fashion's most provocative voice, redefining what luxury means.",
    founded: 1919,
    country: "Spain",
  },
  {
    slug: "saint-laurent",
    name: "Saint Laurent",
    tagline: "Parisian rock and roll luxury",
    description:
      "Yves Saint Laurent's 1961 founding house brought a new kind of power to women's fashion — sensual, sharp, and unapologetically Parisian.",
    founded: 1961,
    country: "France",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Birkin 30 Togo Leather",
    brand: "hermes",
    brandDisplay: "Hermès",
    category: "bags",
    price: 8500,
    originalPrice: 32000,
    condition: "excellent",
    color: "Noir",
    material: "Togo leather",
    size: "30cm",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1548036161-18aab9282e5a?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Sophie M.",
      verified: true,
      location: "Paris",
      rating: 4.9,
      salesCount: 47,
    },
    description:
      "A stunning Hermès Birkin 30 in Noir Togo leather with palladium hardware. Purchased directly from Hermès Paris in 2021. Full set including original orange box, dust bag, lock, keys, and original receipt. Minimal wear — this bag has been stored and handled with extreme care. Authentication card and clochette included.",
    authenticated: true,
    featured: true,
  },
  {
    id: "2",
    name: "Neverfull MM Monogram",
    brand: "louis-vuitton",
    brandDisplay: "Louis Vuitton",
    category: "bags",
    price: 1050,
    originalPrice: 2100,
    condition: "very-good",
    color: "Brown Monogram",
    material: "Coated canvas",
    size: "MM",
    year: 2019,
    image:
      "https://images.unsplash.com/photo-1584385645851-a03c65be3745?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Emma L.",
      verified: true,
      location: "London",
      rating: 4.8,
      salesCount: 23,
    },
    description:
      "Classic Louis Vuitton Neverfull MM in the iconic monogram canvas with rose ballerine interior. Light signs of use on corners, overall in great shape. Comes with original dust bag. Interior is spotless with no staining or odour.",
    authenticated: true,
    featured: true,
  },
  {
    id: "3",
    name: "Classic Flap Medium Caviar",
    brand: "chanel",
    brandDisplay: "Chanel",
    category: "bags",
    price: 4800,
    originalPrice: 10200,
    condition: "pristine",
    color: "Navy",
    material: "Caviar leather",
    size: "Medium",
    year: 2022,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Isabella K.",
      verified: true,
      location: "Milan",
      rating: 5.0,
      salesCount: 12,
    },
    description:
      "Barely used Chanel Classic Flap in deep navy caviar leather with gold hardware. Authentication card included. Worn twice to events — absolutely pristine. Comes with original box, dust bag, and Chanel ribbon.",
    authenticated: true,
    featured: true,
  },
  {
    id: "4",
    name: "GG Marmont Shoulder Bag",
    brand: "gucci",
    brandDisplay: "Gucci",
    category: "bags",
    price: 980,
    originalPrice: 2650,
    condition: "excellent",
    color: "Black",
    material: "Matelassé chevron leather",
    year: 2020,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Aria S.",
      verified: true,
      location: "Dubai",
      rating: 4.7,
      salesCount: 31,
    },
    description:
      "Gucci GG Marmont small shoulder bag in black matelassé chevron leather with antique gold hardware. Signature GG logo plate on back. Comes with original dust bag. Light use, hardware is bright and scratch-free.",
    authenticated: true,
  },
  {
    id: "5",
    name: "Galleria Saffiano Leather Tote",
    brand: "prada",
    brandDisplay: "Prada",
    category: "bags",
    price: 1650,
    originalPrice: 4200,
    condition: "excellent",
    color: "Caramel",
    material: "Saffiano leather",
    year: 2020,
    image:
      "https://images.unsplash.com/photo-1566150253941-50a19b3d3c52?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Priya N.",
      verified: true,
      location: "New York",
      rating: 4.9,
      salesCount: 19,
    },
    description:
      "Prada Galleria bag in warm caramel Saffiano leather with silver hardware. The structured silhouette is quintessentially Prada. Light use, interior is immaculate. Comes with dust bag.",
    authenticated: true,
    featured: true,
  },
  {
    id: "6",
    name: "Saddle Bag Grained Calfskin",
    brand: "dior",
    brandDisplay: "Christian Dior",
    category: "bags",
    price: 2200,
    originalPrice: 5500,
    condition: "very-good",
    color: "Tan",
    material: "Grained calfskin",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Clara B.",
      verified: true,
      location: "Paris",
      rating: 4.8,
      salesCount: 8,
    },
    description:
      "Iconic Christian Dior Saddle bag in tan grained calfskin with silver 'CD' clasp. The curved silhouette is unmistakably Dior. Some light wear on the base corners. Comes with original packaging and dust bag.",
    authenticated: true,
  },
  {
    id: "7",
    name: "Track Sneakers",
    brand: "balenciaga",
    brandDisplay: "Balenciaga",
    category: "shoes",
    price: 380,
    originalPrice: 950,
    condition: "very-good",
    color: "White / Grey",
    size: "EU 41",
    year: 2022,
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Lucas M.",
      verified: false,
      location: "Berlin",
      rating: 4.5,
      salesCount: 6,
    },
    description:
      "Balenciaga Track sneakers in white with grey and black panel details. The signature chunky multi-layer sole. Worn 3–4 times, in excellent shape. Comes with original box and extra laces.",
    authenticated: true,
  },
  {
    id: "8",
    name: "Tribute Platform Sandals",
    brand: "saint-laurent",
    brandDisplay: "Saint Laurent",
    category: "shoes",
    price: 460,
    originalPrice: 1150,
    condition: "excellent",
    color: "Nude",
    size: "EU 37",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Nina D.",
      verified: true,
      location: "Monaco",
      rating: 4.9,
      salesCount: 14,
    },
    description:
      "YSL Tribute platform sandals in nude satin with suede details. The stiletto adds an elongating 4.5 inches. Worn twice for events, pristine condition. Original box and dust bag included.",
    authenticated: true,
  },
  {
    id: "9",
    name: "Reversible Monogram Belt 90cm",
    brand: "louis-vuitton",
    brandDisplay: "Louis Vuitton",
    category: "belts",
    price: 260,
    originalPrice: 590,
    condition: "excellent",
    color: "Brown / Black",
    size: "90cm",
    year: 2020,
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60fe8ff?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "James K.",
      verified: true,
      location: "Hong Kong",
      rating: 4.7,
      salesCount: 28,
    },
    description:
      "Louis Vuitton reversible belt in classic monogram canvas and smooth black leather. Gold LV initials buckle. Barely worn — comes with original box.",
    authenticated: true,
  },
  {
    id: "10",
    name: "GG Marmont Leather Belt 85cm",
    brand: "gucci",
    brandDisplay: "Gucci",
    category: "belts",
    price: 210,
    originalPrice: 490,
    condition: "very-good",
    color: "Black",
    size: "85cm",
    year: 2021,
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Marco V.",
      verified: true,
      location: "Rome",
      rating: 4.8,
      salesCount: 22,
    },
    description:
      "Gucci GG Marmont belt in black leather with antique gold double G buckle. A classic that elevates any outfit. Light use, hardware is pristine. Comes with original box.",
    authenticated: true,
  },
  {
    id: "11",
    name: "Kelly 25 Epsom Leather",
    brand: "hermes",
    brandDisplay: "Hermès",
    category: "bags",
    price: 11500,
    originalPrice: 38000,
    condition: "pristine",
    color: "Gold",
    material: "Epsom leather",
    size: "25cm",
    year: 2023,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Amélie F.",
      verified: true,
      location: "Geneva",
      rating: 5.0,
      salesCount: 5,
    },
    description:
      "Hermès Kelly 25 Sellier in Gold Epsom leather with palladium hardware. A 2023 piece in pristine, barely-touched condition. All accessories included — lock, keys, clochette, mirror, rain cover, felt pouch, and original receipt from Hermès Geneva.",
    authenticated: true,
    featured: true,
  },
  {
    id: "12",
    name: "Re-Edition 2000 Nylon Mini Bag",
    brand: "prada",
    brandDisplay: "Prada",
    category: "bags",
    price: 580,
    originalPrice: 1650,
    condition: "excellent",
    color: "Blush Pink",
    material: "Re-Nylon",
    year: 2022,
    image:
      "https://images.unsplash.com/photo-1584917865442-de516b5e7b0e?w=600&auto=format&fit=crop&q=80",
    seller: {
      name: "Yuki T.",
      verified: true,
      location: "Tokyo",
      rating: 4.9,
      salesCount: 33,
    },
    description:
      "Prada Re-Edition 2000 in blush pink Re-Nylon. The iconic mini hobo silhouette that defined the early 2000s revival. Minimal use, comes with Prada dust bag and original packaging.",
    authenticated: true,
  },
];

export const CONDITION_LABELS: Record<Condition, string> = {
  pristine: "Pristine",
  excellent: "Excellent",
  "very-good": "Very Good",
  good: "Good",
};

export const CONDITION_COLORS: Record<Condition, string> = {
  pristine: "#b8965a",
  excellent: "#6b8f71",
  "very-good": "#7a8fb0",
  good: "#9c9491",
};

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "bags", label: "Bags" },
  { value: "shoes", label: "Shoes" },
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
  { value: "belts", label: "Belts" },
  { value: "jewelry", label: "Jewelry" },
];

export function getDiscount(price: number, originalPrice: number): number {
  return Math.round((1 - price / originalPrice) * 100);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
