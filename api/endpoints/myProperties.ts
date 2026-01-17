import { api } from '../client';
import { PropertyResponse } from '../types/responses';

export const myPropertiesApi = {
  /**
   * Get all properties for current authenticated user
   * GET /api/my-properties
   */
  getAll: () => 
    api.get<PropertyResponse[]>('/my-properties'),

  /**
   * Get a single property by ID (must be owned by current user)
   * GET /api/my-properties/{id}
   */
  getById: (id: number) => 
    api.get<PropertyResponse>(`/my-properties/${id}`),

  /**
   * Create a new property
   * POST /api/my-properties
   */
  create: (data: Partial<PropertyResponse>) => 
    api.post<PropertyResponse>('/my-properties', data),

  /**
   * Update an existing property
   * PUT /api/my-properties/{id}
   */
  update: (id: number, data: Partial<PropertyResponse>) => 
    api.put<PropertyResponse>(`/my-properties/${id}`, data),

  /**
   * Delete a property
   * DELETE /api/my-properties/{id}
   */
  delete: (id: number) => 
    api.delete(`/my-properties/${id}`),
};