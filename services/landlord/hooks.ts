import { useEffect, useState } from 'react';
import { handleApiError } from '../../api/client';
import {
    BookingResponse,
    LandlordDashboardResponse,
    PropertyResponse
} from '../../api/types/responses';
import { landlordService } from './functions';

/**
 * Hook to fetch landlord dashboard metrics
 */
export const useLandlordDashboard = () => {
  const [data, setData] = useState<LandlordDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const dashboardData = await landlordService.getDashboardMetrics();
        setData(dashboardData);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { data, loading, error };
};

/**
 * Hook to get landlord's properties
 */
export const useLandlordProperties = () => {
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await landlordService.getProperties();
      setProperties(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return { properties, loading, error, refetch: fetchProperties };
};

/**
 * Hook to get single landlord property
 */
export const useLandlordProperty = (id: number) => {
  const [property, setProperty] = useState<PropertyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await landlordService.getPropertyById(id);
        setProperty(data);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
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
 * Hook to create property
 */
export const useCreateProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProperty = async (data: Partial<PropertyResponse>) => {
    setLoading(true);
    setError(null);
    
    try {
      const property = await landlordService.createProperty(data);
      return property;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProperty, loading, error };
};

/**
 * Hook to update property
 */
export const useUpdateProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProperty = async (id: number, data: Partial<PropertyResponse>) => {
    setLoading(true);
    setError(null);
    
    try {
      const property = await landlordService.updateProperty(id, data);
      return property;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProperty, loading, error };
};

/**
 * Hook to delete property
 */
export const useDeleteProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProperty = async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await landlordService.deleteProperty(id);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProperty, loading, error };
};

/**
 * Hook to get booking requests
 */
export const useBookingRequests = () => {
  const [requests, setRequests] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await landlordService.getBookingRequests();
        setRequests(data);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return { requests, loading, error };
};