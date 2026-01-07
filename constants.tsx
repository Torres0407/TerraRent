
import { Property, FAQItem, Feature } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Tuscan Stone Villa',
    location: 'Tuscany, Italy',
    price: 350,
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000',
    description: 'Immersed in the Chianti hills, this stone farmhouse offers a private pool and panoramic views.',
    isSuperhost: true,
    type: 'Villa',
    coordinates: { lat: 43.7696, lng: 11.2558 }
  },
  {
    id: '2',
    title: 'Nordic A-Frame',
    location: 'Reykjavík, Iceland',
    price: 220,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000',
    description: 'A minimalist wooden cabin perfect for viewing the northern lights from the comfort of a heated deck.',
    type: 'Cabin',
    coordinates: { lat: 64.1265, lng: -21.8174 }
  },
  {
    id: '3',
    title: 'Joshua Tree Modern',
    location: 'California, USA',
    price: 450,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000',
    description: 'Ultra-modern architectural gem in the heart of the desert, featuring floor-to-ceiling windows.',
    type: 'Modern',
    coordinates: { lat: 34.1333, lng: -116.3131 }
  },
  {
    id: '4',
    title: 'Ubud Eco Lodge',
    location: 'Bali, Indonesia',
    price: 180,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000',
    description: 'Sustainable luxury tucked away in the lush jungles of Ubud, featuring an open-air bamboo structure.',
    type: 'Lodge',
    coordinates: { lat: -8.5069, lng: 115.2625 }
  },
  {
    id: '5',
    title: 'The Aspen Loft',
    location: 'Boulder, Colorado',
    price: 240,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
    description: 'A cozy mountain loft with modern touches and immediate access to trailheads.',
    type: 'Loft',
    coordinates: { lat: 40.0150, lng: -105.2705 }
  },
  {
    id: '6',
    title: 'Alpine Studio',
    location: 'Vail, Colorado',
    price: 190,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1449156001533-cb39c7324c60?auto=format&fit=crop&q=80&w=1000',
    description: 'Perfect for solo adventurers or couples looking for a chic retreat near the slopes.',
    type: 'Studio',
    coordinates: { lat: 39.6403, lng: -106.3742 }
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
