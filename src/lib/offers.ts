export interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  image: string;
  expiresIn: string;
  expiresAt: string;
  badge: string;
  code: string;
  category: string;
  details: string[];
  createdAt: string;
  featured: boolean;
}

const offers: Offer[] = [
  {
    id: 1,
    title: "Back to School Bundle",
    description:
      "Get everything you need for the new school year in one package",
    discount: "30% OFF",
    image: "/placeholder.svg?height=400&width=600",
    expiresIn: "5 days",
    expiresAt: "2025-06-15T00:00:00.000Z",
    badge: "Popular",
    code: "SCHOOL30",
    category: "school",
    details: [
      "Valid on all back to school items",
      "Includes notebooks, pens, pencils, and more",
      "Bundle discount applies automatically at checkout",
      "Free shipping on orders over $50",
      "Cannot be combined with other offers",
    ],
    createdAt: "2025-05-01T00:00:00.000Z",
    featured: true,
  },
  {
    id: 2,
    title: "Art Supplies Sale",
    description: "Premium art supplies for all your creative projects",
    discount: "25% OFF",
    image: "/placeholder.svg?height=400&width=600",
    expiresIn: "3 days",
    expiresAt: "2025-06-10T00:00:00.000Z",
    badge: "Limited Time",
    code: "ART25",
    category: "art",
    details: [
      "Valid on all art supplies",
      "Includes paints, brushes, canvases, and more",
      "Discount applies to items marked 'Art Supplies'",
      "Free shipping on orders over $75",
      "Limit one use per customer",
    ],
    createdAt: "2025-05-05T00:00:00.000Z",
    featured: true,
  },
  {
    id: 3,
    title: "Office Essentials",
    description: "Stock up on office supplies with our special bundle",
    discount: "20% OFF",
    image: "/placeholder.svg?height=400&width=600",
    expiresIn: "7 days",
    expiresAt: "2025-06-20T00:00:00.000Z",
    badge: "Best Value",
    code: "OFFICE20",
    category: "office",
    details: [
      "Valid on all office supplies",
      "Includes staplers, paper clips, sticky notes, and more",
      "Discount applies to items marked 'Office Essentials'",
      "Free shipping on orders over $100",
      "Bulk discounts available for businesses",
    ],
    createdAt: "2025-05-03T00:00:00.000Z",
    featured: true,
  },
  {
    id: 4,
    title: "Summer Journaling Kit",
    description: "Everything you need to document your summer adventures",
    discount: "15% OFF",
    image: "/placeholder.svg?height=400&width=600",
    expiresIn: "10 days",
    expiresAt: "2025-06-25T00:00:00.000Z",
    badge: "New",
    code: "SUMMER15",
    category: "seasonal",
    details: [
      "Valid on all journaling supplies",
      "Includes journals, pens, washi tape, and stickers",
      "Perfect for documenting your summer memories",
      "Free shipping on orders over $35",
      "Get a free bookmark with every purchase",
    ],
    createdAt: "2025-05-10T00:00:00.000Z",
    featured: false,
  },
  {
    id: 5,
    title: "Bullet Journal Starter Pack",
    description: "Start your bullet journaling journey with this complete kit",
    discount: "35% OFF",
    image: "/placeholder.svg?height=400&width=600",
    expiresIn: "4 days",
    expiresAt: "2025-06-12T00:00:00.000Z",
    badge: "Bestseller",
    code: "BUJO35",
    category: "art",
    details: [
      "Includes dotted journal, fine liners, and stencils",
      "Perfect for beginners and experienced journalers",
      "Free online workshop access with purchase",
      "Free shipping on all orders",
      "30-day satisfaction guarantee",
    ],
    createdAt: "2025-05-08T00:00:00.000Z",
    featured: false,
  },
  {
    id: 6,
    title: "Teacher Appreciation Bundle",
    description: "Special discount for teachers on classroom supplies",
    discount: "40% OFF",
    image: "/placeholder.svg?height=400&width=600",
    expiresIn: "14 days",
    expiresAt: "2025-06-30T00:00:00.000Z",
    badge: "Teachers Only",
    code: "TEACH40",
    category: "school",
    details: [
      "Valid with teacher ID verification",
      "Includes classroom organization, grading supplies, and more",
      "Additional 5% donation to school of your choice",
      "Free shipping on all orders",
      "Bulk discounts available for schools",
    ],
    createdAt: "2025-05-15T00:00:00.000Z",
    featured: false,
  },
  {
    id: 7,
    title: "Desk Organization Sale",
    description: "Tidy up your workspace with our premium organizers",
    discount: "22% OFF",
    image: "/placeholder.svg?height=400&width=600",
    expiresIn: "6 days",
    expiresAt: "2025-06-18T00:00:00.000Z",
    badge: "Trending",
    code: "TIDY22",
    category: "office",
    details: [
      "Valid on all desk organizers and accessories",
      "Includes pen holders, drawer dividers, and more",
      "Free personalization on select items",
      "Free shipping on orders over $50",
      "Buy 2 get 1 free on select items",
    ],
    createdAt: "2025-05-12T00:00:00.000Z",
    featured: false,
  },
  {
    id: 8,
    title: "Graduation Gift Sets",
    description: "Perfect gifts for the graduate in your life",
    discount: "18% OFF",
    image: "/placeholder.svg?height=400&width=600",
    expiresIn: "9 days",
    expiresAt: "2025-06-22T00:00:00.000Z",
    badge: "Gift Idea",
    code: "GRAD18",
    category: "seasonal",
    details: [
      "Valid on all graduation gift sets",
      "Includes premium pens, journals, and planners",
      "Free gift wrapping service",
      "Free shipping on all orders",
      "Add a personalized note at checkout",
    ],
    createdAt: "2025-05-18T00:00:00.000Z",
    featured: false,
  },
];

// Simulate API calls with delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getFeaturedOffers(): Promise<Offer[]> {
  await delay(300); // Simulate network delay
  return offers.filter((offer) => offer.featured);
}

export async function getAllOffers(): Promise<Offer[]> {
  await delay(500); // Simulate network delay
  return offers;
}

export async function getOfferById(id: number): Promise<Offer | undefined> {
  await delay(200); // Simulate network delay
  return offers.find((offer) => offer.id === id);
}

export async function getRelatedOffers(
  currentOfferId: number
): Promise<Offer[]> {
  await delay(300); // Simulate network delay
  const currentOffer = offers.find((offer) => offer.id === currentOfferId);

  if (!currentOffer) {
    return [];
  }

  // Get offers in the same category, excluding the current one
  return offers
    .filter(
      (offer) =>
        offer.id !== currentOfferId && offer.category === currentOffer.category
    )
    .slice(0, 3); // Limit to 3 related offers
}
