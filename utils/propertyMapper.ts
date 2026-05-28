import { PropertyResponse } from '../api/types/responses';
import { Property } from '../types';

/**
 * Maps a single backend PropertyResponse to a fully-compatible frontend Property shape,
 * maintaining both old and new properties to ensure full backwards-compatibility.
 */
export const mapPropertyResponseToProperty = (response: any): any => {
  if (!response) return null;

  // 1. Coordinates parsing (from "lat,lng" string to { lat, lng })
  let lat = 6.4529;
  let lng = 3.4411;
  if (response.coordinates) {
    if (typeof response.coordinates === 'string') {
      const parts = response.coordinates.split(',');
      if (parts.length === 2) {
        const parsedLat = parseFloat(parts[0].trim());
        const parsedLng = parseFloat(parts[1].trim());
        if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
          lat = parsedLat;
          lng = parsedLng;
        }
      }
    } else if (typeof response.coordinates === 'object') {
      lat = response.coordinates.lat ?? lat;
      lng = response.coordinates.lng ?? lng;
    }
  }

  // 2. Image resolution (primary image or fallback)
  const primaryImage = response.images?.find((img: any) => img.isPrimary) || response.images?.[0];
  const imageUrl = primaryImage?.url || response.image || 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800';

  // 3. Cost & Rating conversions
  const priceVal = response.nightlyPrice ?? response.annualPrice ?? response.price ?? 0;
  const ratingVal = response.averageRating ?? response.rating ?? 4.5;
  const locationVal = response.address || response.location || '';

  return {
    ...response,
    id: response.id?.toString() || '',
    rawId: response.id,
    location: locationVal,
    address: locationVal,
    price: priceVal,
    rating: ratingVal,
    image: imageUrl,
    coordinates: { lat, lng },
    rawCoordinates: typeof response.coordinates === 'string' ? response.coordinates : undefined,
    isSuperhost: response.isSuperhost ?? false,
  };
};
