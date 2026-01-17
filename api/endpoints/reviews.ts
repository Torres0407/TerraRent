import { api } from '../client';
import { CreateReviewRequest } from '../types/requests';

export const reviewApi = {
  /**
   * Create a review for a property
   * POST /api/reviews
   */
  create: (data: CreateReviewRequest) => 
    api.post('/reviews', data),
};