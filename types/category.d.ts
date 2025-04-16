export interface Subcategory {
  name: string;
  businesses: {
    id: string;
    businessName: string;
    description: string;
    location: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
      latitude: number;
      longitude: number;
    };
    contact: {
      phone: string;
      email: string;
      website: string;
    };
    ratings: number;
    highlights: string[];
    cta: {
      bookUrl: string;
    };
  }[];
}

export interface Category {
  category: string;
  subcategories: Subcategory[];
}
