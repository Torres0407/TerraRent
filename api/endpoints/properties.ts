import { api } from '../client';
import { PageResponse, PropertyFilterRequest, PropertyResponse } from '../types/responses';

export const propertyApi = {
  /**
   * Get all properties with filters and pagination
   * GET /api/properties
   */
  getAll: (params?: PropertyFilterRequest & { page?: number; size?: number }) => 
    api.get<PageResponse<PropertyResponse>>('/properties', { params }),

  /**
   * Get property by ID
   * GET /api/properties/{id}
   */
  getById: (id: string | number) => 
    api.get<PropertyResponse>(`/properties/${id}`),

  /**
   * Create new property
   * POST /api/properties
   */
  create: (data: Partial<PropertyResponse>) => 
    api.post<PropertyResponse>('/properties', data),
};