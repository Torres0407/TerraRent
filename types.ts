
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  isSuperhost?: boolean;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}
