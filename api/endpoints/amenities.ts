import { api } from '../client';
import { AmenityResponse } from '../types/responses';

export const amenityApi = {
  /**
   * Get all available amenities
   * GET /api/amenities
   */
  getAll: () => 
    api.get<AmenityResponse[]>('/amenities'),
};