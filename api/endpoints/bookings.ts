import { api } from '../client';
import { CreateBookingRequest } from '../types/requests';
import { BookingResponse } from '../types/responses';

export const bookingApi = {
  /**
   * Create a new booking
   * POST /api/bookings
   */
  create: (data: CreateBookingRequest) => 
    api.post<BookingResponse>('/bookings', data),
};
