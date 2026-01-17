import { useEffect, useState } from 'react';
import { handleApiError } from '../../api/client';
import { amenityApi } from '../../api/endpoints/amenities';
import { AmenityResponse } from '../../api/types/responses';

/**
 * Hook to fetch all amenities
 */
export const useAmenities = () => {
  const [amenities, setAmenities] = useState<AmenityResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmenities = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await amenityApi.getAll();
        setAmenities(response.data);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        setAmenities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  return { amenities, loading, error };
};