import { renterApi } from '../../api/endpoints/renter';
import { PropertyResponse, RenterDashboardResponse } from '../../api/types/responses';

/**
 * Renter Service
 * Handles renter-specific business logic
 */
export const renterService = {
  /**
   * Get renter dashboard data
   */
  async getDashboard(): Promise<RenterDashboardResponse> {
    const response = await renterApi.getDashboard();
    return response.data;
  },

  /**
   * Get saved/favorite properties
   */
  async getSavedProperties(): Promise<PropertyResponse[]> {
    const response = await renterApi.getSavedProperties();
    return response.data;
  },

  /**
   * Save a property to favorites
   */
  async saveProperty(propertyId: number): Promise<void> {
    await renterApi.saveProperty(propertyId);
  },

  /**
   * Create a rental application
   */
  async createApplication(propertyId: number, userId: number): Promise<void> {
    await renterApi.createApplication({
      userId,
      propertyId,
      status: 'PENDING',
    });
  },

  /**
   * Create a booking
   */
  async createBooking(propertyId: number, userId: number, bookingDate: string): Promise<void> {
    await renterApi.createBooking({
      userId,
      propertyId,
      bookingDate,
      status: 'PENDING',
    });
  },

  /**
   * Schedule a property tour
   */
  async createTour(propertyId: number, userId: number, tourDate: string): Promise<void> {
    await renterApi.createTour({
      userId,
      propertyId,
      tourDate,
      status: 'SCHEDULED',
    });
  },

  /**
   * Create a price negotiation offer
   */
  async createNegotiation(applicationId: number, offerAmount: number): Promise<void> {
    await renterApi.createNegotiation(applicationId, {
      offer: offerAmount,
      status: 'PENDING',
    });
  },
};