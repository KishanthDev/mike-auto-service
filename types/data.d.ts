export interface BusinessHour {
  day: string;
  hours: string;
}

export type Certification = string;

export type GalleryImage = string;

export interface Review {
  author: string;
  rating: number;
  content: string;
}

export interface Service {
  title: string;
  description: string;
  price: string;
}

export interface Data {
  businessHours: BusinessHour[];
  certifications: Certification[];
  images: GalleryImage[];
  reviews: Review[];
  services: Service[];
}
