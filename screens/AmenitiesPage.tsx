import { groupBy } from 'lodash';
import React, { useMemo } from 'react';
import { useAmenities } from '../services/amenities/hooks';

export const AmenitiesPage: React.FC = () => {
  // Use the new hook - automatically handles loading and error
  const { amenities, loading: isLoading, error } = useAmenities();

  // Group amenities by category (memoized for performance)
  const groupedAmenities = useMemo(() => {
    return groupBy(amenities, 'category');
  }, [amenities]);

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-20">
      <div className="flex flex-col items-center text-center gap-4 mb-16">
        <span className="text-accent font-black tracking-[0.3em] uppercase text-sm">Our Standard</span>
        <h1 className="text-primary text-4xl md:text-7xl font-black tracking-tighter">Curated Comforts</h1>
        <p className="text-text-muted text-xl font-medium max-w-2xl">
          Every TerraRent stay is equipped with thoughtful amenities to ground you in comfort and connect you with nature.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center text-text-muted">Loading amenities...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : amenities.length === 0 ? (
        <div className="text-center text-text-muted">No amenities available.</div>
      ) : (
        <div className="space-y-16">
          {Object.entries(groupedAmenities).map(([category, items]) => (
            <section key={category}>
              <div className="flex items-center gap-4 border-b border-primary/10 pb-4 mb-8">
                <h2 className="text-2xl font-black text-primary uppercase tracking-widest">{category}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {items.map(amenity => (
                  <div 
                    key={amenity.id} 
                    className="flex items-center gap-5 p-6 bg-white rounded-2xl shadow-sm border border-primary/5 hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    <span className="material-symbols-outlined text-3xl text-accent">{amenity.icon}</span>
                    <span className="font-bold text-primary">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
};