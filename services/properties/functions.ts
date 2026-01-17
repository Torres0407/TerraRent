import { propertyApi } from '../../api/endpoints/properties';
import { PropertyFilterRequest } from '../../api/types/requests';
import { PageResponse, PropertyResponse } from '../../api/types/responses';

/**
 * Property Service
 * Handles property-related business logic
 */
export const propertyService = {
  /**
   * Get all properties with optional filters and pagination
   */
  async getProperties(
    filter?: PropertyFilterRequest,
    page: number = 0,
    size: number = 10
  ): Promise<PageResponse<PropertyResponse>> {
    const response = await propertyApi.getAll({
      ...filter,
      page,
      size,
    });
    return response.data;
  },

  /**
   * Get property by ID
   */
  async getPropertyById(id: string | number): Promise<PropertyResponse> {
    const response = await propertyApi.getById(id);
    return response.data;
  },

  /**
   * Search properties by address
   */
  async searchProperties(address: string, page: number = 0): Promise<PropertyResponse[]> {
    const response = await propertyApi.getAll({
      address,
      page,
      size: 20,
    });
    return response.data.content;
  },

  /**
   * Filter properties by price range
   */
  async filterByPrice(
    minPrice: number,
    maxPrice: number,
    page: number = 0
  ): Promise<PropertyResponse[]> {
    const response = await propertyApi.getAll({
      minPrice,
      maxPrice,
      page,
      size: 20,
    });
    return response.data.content;
  },

  /**
   * Filter properties by bedrooms
   */
  async filterByBedrooms(
    minBedrooms: number,
    maxBedrooms?: number,
    page: number = 0
  ): Promise<PropertyResponse[]> {
    const response = await propertyApi.getAll({
      minBedrooms,
      maxBedrooms,
      page,
      size: 20,
    });
    return response.data.content;
  },

  /**
   * Get featured properties (first page, limited)
   */
  async getFeaturedProperties(): Promise<PropertyResponse[]> {
    const response = await propertyApi.getAll({
      page: 0,
      size: 4,
    });
    return response.data.content;
  },
};