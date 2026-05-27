import { api } from '@/api/client';
import { landlordApi } from '../../api/endpoints/landlord';
import {
  BookingResponse,
  LandlordDashboardResponse,
  PropertyResponse
} from '../../api/types/responses';

/**
 * Landlord Service
 * Handles landlord-specific business logic
 */
export const landlordService = {
  /**
   * Get landlord dashboard metrics
   */
  async getDashboardMetrics(): Promise<LandlordDashboardResponse> {
    const response = await landlordApi.getDashboardMetrics();
    return response.data;
  },

  /**
   * Get all properties owned by landlord
   */
  getProperties: async (): Promise<PropertyResponse[]> => {
  const res = await api.get<PropertyResponse[]>("/properties/my");
  return res.data;
},


  /**
   * Get single property by ID
   */
  async getPropertyById(id: number): Promise<PropertyResponse> {
    return landlordApi.getPropertyById(id);
  },

  /**
   * Create a new property listing
   */
  async createProperty(data: Partial<PropertyResponse>): Promise<PropertyResponse> {
    const response = await landlordApi.createProperty(data);
    return response.data;
  },

  /**
   * Update an existing property
   */
  async updateProperty(id: number, data: Partial<PropertyResponse>): Promise<PropertyResponse> {
    const response = await landlordApi.updateProperty(id, data);
    return response.data;
  },

  /**
   * Delete a property
   */
  async deleteProperty(id: number): Promise<void> {
    await landlordApi.deleteProperty(id);
  },

  /**
   * Update property pricing
   */
  async updatePricing(id: number, price: number): Promise<PropertyResponse> {
    const response = await landlordApi.updatePricing(id, { price });
    return response.data;
  },

  /**
   * Upload media for property
   */
  async uploadMedia(id: number, file: File): Promise<void> {
    await landlordApi.uploadMedia(id, file);
  },

  /**
   * Get property availability/bookings
   */
  async getPropertyAvailability(id: number): Promise<BookingResponse[]> {
    const response = await landlordApi.getPropertyAvailability(id);
    return response.data;
  },

  /**
   * Get rental applications
   */
  async getApplications(): Promise<any[]> {
    const response = await landlordApi.getApplications();
    return response.data;
  },

  /**
   * Get booking requests
   */
  async getBookingRequests(): Promise<BookingResponse[]> {
    const response = await landlordApi.getBookingRequests();
    return response.data;
  },
};