import { useState } from 'react';
import { handleApiError } from '../../api/client';
import { CreateBookingRequest } from '../../api/types/requests';
import { BookingResponse } from '../../api/types/responses';
import { bookingService } from './functions';

/**
 * Hook to create a booking
 */
export const useCreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (data: CreateBookingRequest): Promise<BookingResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const booking = await bookingService.createBooking(data);
      return booking;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading, error };
};