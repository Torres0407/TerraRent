
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
  media?: { id: string; url: string; caption: string; isCover?: boolean }[];
  pricing?: {
    weekendSurcharge: number;
    minStay: number;
    cleaningFee: number;
    securityDeposit: number;
    amenityFee: number;
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

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: 'Core' | 'Wellness' | 'Entertainment' | 'Kitchen' | 'Outdoor';
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SearchState {
  status: ApiStatus;
  results: Property[];
  query: string;
}

// --- Image Services Types ---
export interface ImageService {
  icon: string;
  title: string;
  description: string;
}

export interface PricingPackage {
  title: string;
  price: string;
  priceSub: string;
  features: string[];
  isFeatured: boolean;
}

export interface BeforeAfterImage {
  id: string;
  before: string;
  after: string;
  title: string;
  description: string;
}


// --- Renter Types ---

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: 'RENTER' | 'LANDLORD' | 'AGENT' | 'ADMIN';
  avatarUrl?: string;
  status?: 'ACTIVE' | 'PENDING' | 'SUSPENDED';
  createdAt?: string; // ISO date string
}

export interface Booking {
  id: string;
  property: Property;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  totalPrice: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
}

export interface BookingSummary {
  bookingId: string;
  propertyTitle: string;
  propertyImage: string;
  location: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  hostName: string;
}

export interface ApplicationStatus {
  propertyTitle: string;
  status: 'Under Review' | 'Approved' | 'Rejected';
  applicationId: string;
}

export interface RenterDashboardData {
  user: User;
  upcomingBooking?: Booking;
  applicationStatus?: ApplicationStatus;
  savedProperties: Property[];
}

// --- Landlord Types ---

export interface LandlordDashboardStats {
  totalRevenue: number;
  occupancyRate: number;
  activeProperties: number;
  newRequests: number;
}

export interface BookingRequest {
  id: string;
  user: {
    firstname: string;
    lastname: string;
    avatarUrl: string;
    isVerified: boolean;
  };
  property: {
    title: string;
  };
  startDate: string;
  endDate: string;
  totalPayout: number;
  message: string;
}

export interface LandlordApplication {
  id: string;
  user: {
    firstname: string;
    lastname: string;
    avatarUrl: string;
  };
  property: {
    title: string;
  };
  compatibilityScore: number;
  financialTrust: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface LandlordDashboardData {
  user: User;
  stats: LandlordDashboardStats;
  liveBookings: (Booking & { user: User })[];
  priorityActions: {
    type: string;
    message: string;
  }[];
}

// --- New Types for Admin Console ---

export interface AdminDashboardStats {
  totalRevenue: number;
  activeRentals: number;
  newUsers: number;
  queueItems: number;
}

export interface RecentActivity {
  id: string;
  type: 'NEW_USER' | 'NEW_PROPERTY' | 'HIGH_REVENUE_BOOKING';
  description: string;
  timestamp: string; // ISO date string
  user?: User;
  property?: Property;
  amount?: number;
}

export interface AdminDashboardData {
  stats: AdminDashboardStats;
  topPerformingProperties: Property[];
  recentActivities: RecentActivity[];
}

export interface VerificationRequest {
    id: string;
    user: User;
    documentType: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    submittedAt: string; // ISO date string
}

export interface Report {
    id: string;
    entityType: 'PROPERTY' | 'USER';
    entityId: string;
    entityName: string;
    reason: string;
    status: 'PENDING' | 'REVIEWED' | 'ACTION_TAKEN';
    reportedAt: string; // ISO date string
    imageUrl?: string;
}
