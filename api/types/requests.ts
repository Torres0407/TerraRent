// Auth Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: 'ROLE_RENTER' | 'ROLE_LANDLORD' | 'ROLE_ADMIN';
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface ResendVerificationRequest {
  email: string;
}

// Property Filter Request Types
export interface PropertyFilterRequest {
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
}

// Booking Request Types
export interface CreateBookingRequest {
  propertyId: number;
  userId: number;
  bookingDate: string;
  status?: string;
}

// Message Request Types
export interface SendMessageRequest {
  recipientId: number;
  propertyId?: number;
  content: string;
}

// Review Request Types
export interface CreateReviewRequest {
  propertyId: number;
  tenantId: number;
  rating: number;
  comment: string;
}