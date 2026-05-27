import { api } from '../client';

export interface BookingSearchRequest {
  cityId: string;
  checkin: string;
  checkout: string;
  bookerCountry?: string;
  platform?: string;
  numberOfRooms?: number;
  numberOfAdults?: number;
}

export interface CreateExternalBookingRequest {
  hotelId: string;
  title: string;
  description: string;
  address: string;
  nightlyPrice: number;
  imageUrl?: string;
  bookingDate: string; // Format: YYYY-MM-DD
  latitude?: number;
  longitude?: number;
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

export const bookingComApi = {
  /**
   * Search hotels via Booking.com Affiliate API
   * POST /api/booking-com/search
   */
  search: (data: BookingSearchRequest) =>
    api.post<any>('/booking-com/search', data),

  /**
   * Book an accommodation from external live data
   * POST /api/booking-com/book
   */
  book: (data: CreateExternalBookingRequest) =>
    api.post<any>('/booking-com/book', data),
};
