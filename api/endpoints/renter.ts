import { api } from '../client';
import {
    BookingResponse,
    PropertyResponse,
    RenterDashboardResponse
} from '../types/responses';

export const renterApi = {
  /**
   * Get renter dashboard data
   * GET /api/renter/dashboard
   */
  getDashboard: () => 
    api.get<RenterDashboardResponse>('/renter/dashboard'),

  /**
   * Get saved/favorite properties
   * GET /api/renter/saved-properties
   */
  getSavedProperties: () => 
    api.get<PropertyResponse[]>('/renter/saved-properties'),

  /**
   * Save a property to favorites
   * POST /api/renter/saved-properties/{propertyId}
   */
  saveProperty: (propertyId: number) => 
    api.post(`/renter/saved-properties/${propertyId}`),

  /**
   * Create a rental application
   * POST /api/renter/applications
   */
  createApplication: (data: { userId: number; propertyId: number; status?: string }) => 
    api.post('/renter/applications', data),

  /**
   * Create a booking
   * POST /api/renter/bookings
   */
  createBooking: (data: { userId: number; propertyId: number; bookingDate: string; status?: string }) => 
    api.post<BookingResponse>('/renter/bookings', data),

  /**
   * Schedule a property tour
   * POST /api/renter/tours
   */
  createTour: (data: { userId: number; propertyId: number; tourDate: string; status?: string }) => 
    api.post('/renter/tours', data),

  /**
   * Create a price negotiation offer
   * POST /api/renter/negotiations/{applicationId}/offers
   */
  createNegotiation: (applicationId: number, data: { offer: number; status?: string }) => 
    api.post(`/renter/negotiations/${applicationId}/offers`, data),
};