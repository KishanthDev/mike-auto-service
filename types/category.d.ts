export interface Subcategory {
    name: string;
    businesses: any[]; // Temporary placeholder, not used for now
  }
  
  export interface Category {
    category: string;
    subcategories: Subcategory[];
  }