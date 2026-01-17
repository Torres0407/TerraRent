import { api } from '../client';
import {
  BookingResponse,
  LandlordDashboardResponse,
  PropertyResponse
} from '../types/responses';

export const landlordApi = {
  /**
   * Get landlord dashboard metrics
   * GET /api/landlord/dashboard/metrics
   */
  getDashboard: () => 
    api.get<LandlordDashboardResponse>('/landlord/dashboard/metrics'),
  
  // Keep the old method for backward compatibility
  getDashboardMetrics: () => 
    api.get<LandlordDashboardResponse>('/landlord/dashboard/metrics'),

  /**
   * Get landlord's properties
   * GET /api/landlord/properties
   */
  getProperties: () => 
    api.get<PropertyResponse[]>('/landlord/properties'),

  /**
   * Get a single property by ID
   * GET /api/landlord/properties/{id}
   */
  getPropertyById: (id: string | number) => 
    api.get<PropertyResponse>(`/landlord/properties/${id}`),

  /**
   * Create a new property listing
   * POST /api/landlord/properties
   */
  createProperty: (data: Partial<PropertyResponse>) => 
    api.post<PropertyResponse>('/landlord/properties', data),

  /**
   * Update a property
   * PUT /api/landlord/properties/{id}
   */
  updateProperty: (id: string | number, data: Partial<PropertyResponse>) => 
    api.put<PropertyResponse>(`/landlord/properties/${id}`, data),

  /**
   * Update property pricing
   * PUT /api/landlord/properties/{id}/pricing
   */
  updatePricing: (id: string | number, pricingData: { price?: number; pricing?: any }) => 
    api.put<PropertyResponse>(`/landlord/properties/${id}/pricing`, pricingData, {
      headers: { 'Content-Type': 'application/json' }
    }),

  /**
   * Upload media for a property
   * POST /api/landlord/properties/{id}/media
   */
  uploadMedia: (id: string | number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/landlord/properties/${id}/media`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  /**
   * Get property availability
   * GET /api/landlord/properties/{id}/availability
   */
  getPropertyAvailability: (id: string | number) => 
    api.get<BookingResponse[]>(`/landlord/properties/${id}/availability`),
  
  // Alias for consistency
  getAvailability: (id: string | number) => 
    api.get<BookingResponse[]>(`/landlord/properties/${id}/availability`),

  /**
   * Get rental applications for landlord
   * GET /api/landlord/applications
   */
  getApplications: () => 
    api.get('/landlord/applications'),

  /**
   * Get booking requests
   * GET /api/landlord/requests
   */
  getBookingRequests: () => 
    api.get<BookingResponse[]>('/landlord/requests'),
};