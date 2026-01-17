import { api } from '../client';
import { UserResponse } from '../types/responses';

export const userApi = {
  /**
   * Get user by ID
   * GET /api/v1/users/{id}
   */
  getById: (id: number) => 
    api.get<UserResponse>(`/v1/users/${id}`),

  /**
   * Get user by email
   * GET /api/v1/users/email/{email}
   */
  getByEmail: (email: string) => 
    api.get<UserResponse>(`/v1/users/email/${email}`),
};