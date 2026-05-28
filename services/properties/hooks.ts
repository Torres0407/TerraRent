import { useEffect, useState } from 'react';
import { handleApiError } from '../../api/client';
import { PropertyFilterRequest } from '../../api/types/requests';
import { PropertyResponse } from '../../api/types/responses';
import { Property } from '../../types';
import { mapPropertyResponseToProperty } from '../../utils/propertyMapper';
import { propertyService } from './functions';
import { PROPERTIES } from '../../constants';

/**
 * Hook to fetch all properties with filters and pagination
 */
export const useProperties = (
  filter?: PropertyFilterRequest,
  page: number = 0,
  size: number = 10
) => {
  const [properties, setProperties] = useState<Property[]>([]);
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
        const mapped = (data.content || []).map(mapPropertyResponseToProperty);
        if (mapped.length === 0 && page === 0) {
          // Fallback to mock data if backend has no properties
          setProperties(PROPERTIES);
          setTotalPages(1);
          setTotalElements(PROPERTIES.length);
        } else {
          setProperties(mapped);
          setTotalPages(data.totalPages);
          setTotalElements(data.totalElements);
        }
      } catch (err) {
        // Fallback to mock data on error (e.g. backend offline or empty database)
        setProperties(PROPERTIES);
        setTotalPages(1);
        setTotalElements(PROPERTIES.length);
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
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // If it's a numeric mock ID (or not a valid UUID format)
        const isUuid = typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        if (!isUuid) {
          // Find in mock data
          const mockProp = PROPERTIES.find(p => p.id.toString() === id.toString());
          if (mockProp) {
            setProperty(mockProp);
            setLoading(false);
            return;
          }
        }

        const data = await propertyService.getPropertyById(id);
        setProperty(mapPropertyResponseToProperty(data));
      } catch (err) {
        // Fallback to mock data if backend fetch fails
        const mockProp = PROPERTIES.find(p => p.id.toString() === id.toString());
        if (mockProp) {
          setProperty(mockProp);
        } else {
          const errorMessage = handleApiError(err);
          setError(errorMessage);
          setProperty(null);
        }
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
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (address: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await propertyService.searchProperties(address);
      const mapped = (data || []).map(mapPropertyResponseToProperty);
      if (mapped.length === 0) {
        // Fallback to filtering mock properties by address keyword
        const filteredMock = PROPERTIES.filter(p => 
          p.location.toLowerCase().includes(address.toLowerCase()) ||
          p.title.toLowerCase().includes(address.toLowerCase())
        );
        setProperties(filteredMock);
      } else {
        setProperties(mapped);
      }
    } catch (err) {
      // Fallback on error
      const filteredMock = PROPERTIES.filter(p => 
        p.location.toLowerCase().includes(address.toLowerCase()) ||
        p.title.toLowerCase().includes(address.toLowerCase())
      );
      setProperties(filteredMock);
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
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await propertyService.getFeaturedProperties();
        const mapped = (data || []).map(mapPropertyResponseToProperty);
        if (mapped.length === 0) {
          setProperties(PROPERTIES.slice(0, 3)); // Fallback to first 3 mock properties
        } else {
          setProperties(mapped);
        }
      } catch (err) {
        setProperties(PROPERTIES.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { properties, loading, error };
};