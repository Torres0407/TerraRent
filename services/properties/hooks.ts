import { useEffect, useState } from 'react';
import { handleApiError } from '../../api/client';
import { PropertyFilterRequest } from '../../api/types/requests';
import { PropertyResponse } from '../../api/types/responses';
import { propertyService } from './functions';

/**
 * Hook to fetch all properties with filters and pagination
 */
export const useProperties = (
  filter?: PropertyFilterRequest,
  page: number = 0,
  size: number = 10
) => {
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await propertyService.getProperties(filter, page, size);
        setProperties(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [JSON.stringify(filter), page, size]);

  return { properties, loading, error, totalPages, totalElements };
};

/**
 * Hook to fetch a single property by ID
 */
export const useProperty = (id: string | number) => {
  const [property, setProperty] = useState<PropertyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await propertyService.getPropertyById(id);
        setProperty(data);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  return { property, loading, error };
};

/**
 * Hook to search properties
 */
export const usePropertySearch = () => {
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (address: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await propertyService.searchProperties(address);
      setProperties(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  return { properties, loading, error, search };
};

/**
 * Hook to get featured properties for homepage
 */
export const useFeaturedProperties = () => {
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await propertyService.getFeaturedProperties();
        setProperties(data);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { properties, loading, error };
};