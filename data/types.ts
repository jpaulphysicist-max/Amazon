export type HolidayId =
  | 'new-year'
  | 'presidents-day'
  | 'memorial-day'
  | 'juneteenth'
  | 'independence-day'
  | 'labor-day'
  | 'columbus-day'
  | 'veterans-day'
  | 'halloween'
  | 'thanksgiving'
  | 'christmas';

export interface HolidayInfo {
  id: HolidayId;
  name: string;
  shortName: string;
  dateStr: string;
  season: 'Winter' | 'Spring' | 'Summer' | 'Fall';
  tagline: string;
  accentColor: string;
  icon: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5
  title: string;
  date: string;
  content: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  userVotedHelpful?: boolean;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  holidayId: HolidayId;
  department: string;
  price: number;
  listPrice?: number;
  rating: number;
  ratingCount: number;
  isPrime: boolean;
  isBestSeller?: boolean;
  isAmazonChoice?: boolean;
  dealTag?: string;
  inStock: boolean;
  stockCount?: number;
  image: string;
  galleryImages?: string[];
  about: string[];
  specs: Record<string, string>;
  reviews: Review[];
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  deliveryEstimate: string;
  status: 'Preparing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
}
