import { bookingApi } from '../../api/endpoints/bookings';
import { CreateBookingRequest } from '../../api/types/requests';
import { BookingResponse } from '../../api/types/responses';

/**
 * Booking Service
 * Handles booking business logic
 */
export const bookingService = {
  /**
   * Create a new booking
   */
  async createBooking(data: CreateBookingRequest): Promise<BookingResponse> {
    const response = await bookingApi.create(data);
    return response.data;
  },
};