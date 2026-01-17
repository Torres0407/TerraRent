import { useEffect, useState } from 'react';
import { handleApiError } from '../../api/client';
import { PropertyResponse, RenterDashboardResponse } from '../../api/types/responses';
import { renterService } from './functions';

/**
 * Hook to fetch renter dashboard data
 */
export const useRenterDashboard = () => {
  const [data, setData] = useState<RenterDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const dashboardData = await renterService.getDashboard();
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
 * Hook to get saved properties
 */
export const useSavedProperties = () => {
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await renterService.getSavedProperties();
      setProperties(data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  return { properties, loading, error, refetch: fetchSavedProperties };
};

/**
 * Hook to save/favorite a property
 */
export const useSaveProperty = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProperty = async (propertyId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await renterService.saveProperty(propertyId);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { saveProperty, loading, error };
};

/**
 * Hook to create rental application
 */
export const useCreateApplication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createApplication = async (propertyId: number, userId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await renterService.createApplication(propertyId, userId);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createApplication, loading, error };
};

/**
 * Hook to create booking
 */
export const useCreateBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (propertyId: number, userId: number, bookingDate: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await renterService.createBooking(propertyId, userId, bookingDate);
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

/**
 * Hook to schedule tour
 */
export const useCreateTour = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTour = async (propertyId: number, userId: number, tourDate: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await renterService.createTour(propertyId, userId, tourDate);
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTour, loading, error };
};