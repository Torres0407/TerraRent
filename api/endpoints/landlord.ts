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
getDashboard: async () => {
  const res = await api.get('/landlord/dashboard/metrics');

  return {
    user: { firstname: 'Landlord', lastname: '' }, // default user
    stats: {
      totalRevenue: res.data.totalRevenue || 0,
      occupancyRate: res.data.occupancyRate || 0,
      totalProperties: res.data.totalProperties || 0,
      activeListings: res.data.activeListings || 0,
    },
    liveBookings: res.data.liveBookings || [],
    priorityActions: res.data.priorityActions || [],
  };
},


  // Keep the old method for backward compatibility
  getDashboardMetrics: () => 
    api.get<LandlordDashboardResponse>('/landlord/dashboard/metrics'),

  /**
   * Get landlord's properties
   * GET /api/landlord/properties
   */
  getProperties: async () => {
    const res = await api.get('/landlord/properties');
    return res.data;
  },

  /**
   * Get a single property by ID
   * GET /api/landlord/properties/{id}
   */
  getPropertyById: async (id: string | number) => {
    const res = await api.get(`/landlord/properties/${id}`);
    return res.data;
  },

  /**
   * Create a new property listing
   * POST /api/landlord/properties
   */
createProperty: (data: Partial<PropertyResponse>) => {
  const token = localStorage.getItem('token');
  return api.post<PropertyResponse>('/landlord/properties', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
},

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
  getBookingRequests: async () => {
    const res = await api.get('/landlord/requests');
    return res.data;
  },
};