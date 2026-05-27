
import { Property, FAQItem, Feature, Amenity, ImageService, BeforeAfterImage, PricingPackage } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Wheatbaker Mansion',
    location: 'Ikoyi, Lagos, Nigeria',
    price: 280,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000',
    description: 'Nestled in a peaceful sanctuary in Ikoyi, this premium boutique mansion features signature spa facilities and fine dining.',
    isSuperhost: true,
    type: 'Boutique Hotel',
    coordinates: { lat: 6.4529, lng: 3.4411 }
  },
  {
    id: '2',
    title: 'Fraser Suites Penthouse',
    location: 'Central Area, Abuja, Nigeria',
    price: 340,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
    description: 'An architectural penthouse showcasing floor-to-ceiling windows with panoramic views of the Abuja skyline and premium wellness suites.',
    type: 'Penthouse',
    coordinates: { lat: 9.0563, lng: 7.4985 }
  },
  {
    id: '3',
    title: 'Eko Pearl Luxury Condo',
    location: 'Victoria Island, Lagos, Nigeria',
    price: 410,
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000',
    description: 'High-rise waterfront glass residence overlooking the Atlantic ocean, complete with Olympic swimming pool and automated luxury suites.',
    isSuperhost: true,
    type: 'Luxury Condo',
    coordinates: { lat: 6.4227, lng: 3.4285 }
  },
  {
    id: '4',
    title: 'Obudu Mountain Chalet',
    location: 'Obudu Plateau, Cross River, Nigeria',
    price: 195,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
    description: 'Perched in the lush clouds of Obudu, this cozy wooden mountain lodge is a perfect getaway featuring local fires and natural bird views.',
    type: 'Chalet',
    coordinates: { lat: 6.5312, lng: 9.3872 }
  },
  {
    id: '5',
    title: 'Swiss International Palms Suite',
    location: 'GRA Phase II, Port Harcourt, Nigeria',
    price: 220,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
    description: 'A modern, premium architectural suite situated in the clean, highly-secure heart of Port Harcourt with an elegant swimming garden.',
    type: 'Executive Suite',
    coordinates: { lat: 4.8156, lng: 7.0498 }
  },
  {
    id: '6',
    title: 'Bristol Palace Residence',
    location: 'Tarauni, Kano, Nigeria',
    price: 165,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1449156001533-cb39c7324c60?auto=format&fit=crop&q=80&w=1000',
    description: 'An elegant palace-style residence bringing premium service and cultural aesthetics to northern Nigeria in style.',
    type: 'Apartment',
    coordinates: { lat: 12.0022, lng: 8.5919 }
  }
];

export const TRUST_INDICATORS: Feature[] = [
  { icon: 'verified_user', title: 'Verified Quality', description: 'Every home is personally vetted for comfort and design.' },
  { icon: 'support_agent', title: '24/7 Concierge', description: 'Premium support for hosts and guests, any time of day.' },
  { icon: 'nature_people', title: 'Carbon Neutral Stays', description: 'We offset the carbon footprint of every booking made.' }
];

export const FAQS: FAQItem[] = [
  { question: "How do I book a viewing?", answer: "You can schedule a viewing directly from the property page by selecting an available time slot." },
  { question: "What is the cancellation policy?", answer: "For long-term stays, cancellations must be made at least 30 days prior to check-in for a full refund." },
  { question: "Are utilities included?", answer: "Most short-term rentals include all utilities. For long-term rentals, utilities are typically excluded." },
  { question: "How are properties vetted?", answer: "Our team performs a 100-point inspection covering cleanliness, amenities, safety, and local connectivity." }
];

export const AMENITIES: Amenity[] = [
  { id: 'a1', name: 'High-speed Fiber WiFi', icon: 'wifi', category: 'Core' },
  { id: 'a2', name: 'Dedicated Workspace', icon: 'work', category: 'Core' },
  { id: 'a3', name: 'Air Conditioning', icon: 'ac_unit', category: 'Core' },
  { id: 'a4', name: 'Washer & Dryer', icon: 'local_laundry_service', category: 'Core' },
  { id: 'a5', name: 'Private Pool', icon: 'pool', category: 'Wellness' },
  { id: 'a6', name: 'Hot Tub', icon: 'hot_tub', category: 'Wellness' },
  { id: 'a7', name: 'Sauna', icon: 'sauna', category: 'Wellness' },
  { id: 'a8', name: 'Gym Equipment', icon: 'fitness_center', category: 'Wellness' },
  { id: 'a9', name: 'Yoga Mats', icon: 'self_improvement', category: 'Wellness' },
  { id: 'a10', name: '4K Smart TV', icon: 'tv', category: 'Entertainment' },
  { id: 'a11', name: 'Sonos Sound System', icon: 'speaker_group', category: 'Entertainment' },
  { id: 'a12', name: 'Record Player', icon: 'album', category: 'Entertainment' },
  { id: 'a13', name: 'Board Games', icon: 'casino', category: 'Entertainment' },
  { id: 'a14', name: 'Full Chef\'s Kitchen', icon: 'kitchen', category: 'Kitchen' },
  { id: 'a15', name: 'Espresso Machine', icon: 'coffee_maker', category: 'Kitchen' },
  { id: 'a16', name: 'Blender', icon: 'blender', category: 'Kitchen' },
  { id: 'a17', name: 'BBQ Grill', icon: 'outdoor_grill', category: 'Outdoor' },
  { id: 'a18', name: 'Fire Pit', icon: 'fireplace', category: 'Outdoor' },
  { id: 'a19', name: 'Outdoor Dining Area', icon: 'deck', category: 'Outdoor' },
  { id: 'a20', name: 'EV Charger', icon: 'ev_charger', category: 'Core' },
];

export const IMAGE_SERVICES: ImageService[] = [
  { icon: 'camera', title: 'Professional Photoshoot', description: 'Our vetted architectural photographers capture your property\'s best angles in stunning 4K.' },
  { icon: 'auto_awesome', title: 'AI Image Enhancement', description: 'Our Gemini-powered model analyzes and enhances your photos, optimizing light, color, and composition.' },
  { icon: 'vrpano', title: 'Virtual Staging & Tours', description: 'Digitally furnish empty spaces or create immersive 3D tours to attract more qualified tenants.' }
];

export const BEFORE_AFTER_GALLERY: BeforeAfterImage[] = [
  { id: 'g1', before: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=50&w=1200&sat=-100', after: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200', title: 'Living Room Brightness', description: 'AI-powered light correction turns a dim space into a bright, welcoming interior.' },
  { id: 'g2', before: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&q=50&w=1200&bri=-10', after: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&q=80&w=1200', title: 'Color Vibrancy', description: 'Enhance the natural colors of your furniture and decor to make your listing pop.' },
  { id: 'g3', before: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=50&w=1200&gray=1', after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', title: 'Exterior Curb Appeal', description: 'From sky replacement to lawn greening, we make your exterior shot unforgettable.' }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  { title: 'AI Enhancement', price: '$99', priceSub: 'per listing', features: ['Up to 20 photos', 'Color & Light Correction', 'AI Composition Suggestions', '24-hour turnaround'], isFeatured: false },
  { title: 'Pro Photoshoot', price: '$499', priceSub: 'per property', features: ['Full-day shoot', '30 high-res photos', 'Includes AI Enhancement', 'Drone photography add-on'], isFeatured: true },
  { title: 'Virtual Suite', price: '$249', priceSub: 'per room', features: ['Digital Staging', '3D Matterport Tour', 'Virtual Renovation Ideas', 'Great for new builds'], isFeatured: false }
];
