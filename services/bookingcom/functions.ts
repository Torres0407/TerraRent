import { bookingComApi, BookingSearchRequest, CreateExternalBookingRequest } from '../../api/endpoints/bookingCom';

/**
 * Booking.com Affiliate API Service
 * Handles fetching live accommodation inventory
 */
export const bookingComService = {
  /**
   * Search hotels or accommodations by parameters
   */
  async searchAccommodations(request: BookingSearchRequest): Promise<any> {
    try {
      const response = await bookingComApi.search({
        ...request,
        bookerCountry: request.bookerCountry || 'us',
        platform: request.platform || 'desktop',
        numberOfRooms: request.numberOfRooms || 1,
        numberOfAdults: request.numberOfAdults || 2,
      });
      return response.data;
    } catch (error) {
      console.error('❌ BookingCom API call failed:', error);
      throw error;
    }
  },

  /**
   * Book an external accommodation
   */
  async bookAccommodation(request: CreateExternalBookingRequest): Promise<any> {
    try {
      const response = await bookingComApi.book(request);
      return response.data;
    } catch (error) {
      console.error('❌ BookingCom API booking failed:', error);
      throw error;
    }
  },
};
