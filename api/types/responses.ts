// Auth Response Types
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: 'RENTER' | 'LANDLORD' | 'ADMIN';
  status: 'PENDING_VERIFICATION' | 'ACTIVE' | 'SUSPENDED' | 'VERIFIED';
}

// Property Response Types
export interface PropertyResponse {
  id: number;
  title: string;
  description: string;
  address: string;
  annualPrice: number;
  nightlyPrice?: number;
  bedrooms: number;
  bathrooms: number;
  type?: string;
  coordinates?: string;
  status?: 'PENDING' | 'LIVE' | 'REJECTED' | 'DELETED';
  landlordId: number;
  averageRating?: number;
  numberOfReviews?: number;
  images?: ImageResponse[];
  amenities?: AmenityResponse[];
}

export interface ImageResponse {
  id: number;
  url: string;
  isPrimary: boolean;
}

export interface AmenityResponse {
  id: number;
  name: string;
}

// Pagination Response Types
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// Dashboard Response Types
export interface RenterDashboardResponse {
  savedPropertiesCount: number;
  activeApplicationsCount: number;
  upcomingBookingsCount: number;
  totalSpent: number;
}

export interface LandlordDashboardResponse {
  totalRevenue: number;
  occupancyRate: number;
  totalProperties: number;
  activeListings: number;
}

export interface AdminDashboardResponse {
  totalUsers: number;
  totalProperties: number;
  pendingVerifications: number;
  openReports: number;
}

// Booking Response Types
export interface BookingResponse {
  id: number;
  property: PropertyResponse;
  bookingDate: string;
  status: string;
}

// Message Response Types
export interface MessageResponse {
  id: number;
  sender: UserResponse;
  content: string;
  timestamp: string;
}

export interface ConversationResponse {
  id: number;
  user1: UserResponse;
  user2: UserResponse;
  property: PropertyResponse;
}