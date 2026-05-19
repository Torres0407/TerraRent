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

export const bookingComApi = {
  /**
   * Search hotels via Booking.com Affiliate API
   * POST /api/booking-com/search
   */
  search: (data: BookingSearchRequest) =>
    api.post<any>('/booking-com/search', data),
};
