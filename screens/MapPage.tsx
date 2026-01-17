import React, { useState } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { useProperties } from '../services/properties/hooks';

export const MapPage: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  // Use the properties hook
  const { properties, loading: isLoading, error } = useProperties({}, 0, 20);

  return (
    <div className="flex-1 flex overflow-hidden relative h-[calc(100vh-80px)]">
      {/* Left Panel: List */}
      <div className="w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto bg-background-light p-6 md:p-10 border-r border-primary/5 no-scrollbar">
        <div className="max-w-[800px] mx-auto flex flex-col gap-8 pb-20">
          <div className="space-y-2">
            <h2 className="text-[#141613] text-2xl font-black leading-tight">Nearby Stays</h2>
            <p className="text-text-muted text-sm font-medium">Explore curated architecture within your reach.</p>
          </div>
          
          <div className="flex flex-col gap-6">
            {isLoading ? (
              <p className="text-text-muted">Loading stays...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : properties.length === 0 ? (
              <p className="text-text-muted">No properties available in this area.</p>
            ) : (
              properties.map((prop) => (
                <div 
                  key={prop.id} 
                  onMouseEnter={() => setHoveredId(prop.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`transition-all duration-300 transform ${hoveredId === prop.id ? 'scale-[1.02]' : ''}`}
                >
                  <PropertyCard property={prop} layout="list" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: Map (Simulated) */}
      <div className="hidden lg:block w-[55%] xl:w-[60%] h-full relative bg-[#e5e3df] overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80 mix-blend-multiply" 
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000")',
            filter: 'grayscale(30%) sepia(10%) contrast(110%)'
          }}
        ></div>
        
        {properties.map((prop, i) => {
          const top = `${20 + (i * 12) % 60}%`;
          const left = `${15 + (i * 20) % 70}%`;
          const isActive = hoveredId === prop.id;

          return (
            <div 
              key={prop.id} 
              className="absolute transition-all duration-500" 
              style={{ top, left }}
            >
              <button 
                className={`px-4 py-2 rounded-full shadow-2xl font-bold text-sm transition-all duration-300 border-2 ${
                  isActive 
                  ? 'bg-primary text-white border-white scale-125 z-20' 
                  : 'bg-white text-primary border-transparent scale-100 hover:scale-110 z-10'
                }`}
              >
                ${prop.price}
              </button>
            </div>
          );
        })}

        <div className="absolute top-6 right-6 flex flex-col gap-2">
          <button className="bg-white p-3 rounded-full shadow-lg hover:bg-neutral-50">
            <span className="material-symbols-outlined">add</span>
          </button>
          <button className="bg-white p-3 rounded-full shadow-lg hover:bg-neutral-50">
            <span className="material-symbols-outlined">remove</span>
          </button>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <button className="bg-primary text-white px-8 py-3 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2 hover:bg-primary-hover">
            <span className="material-symbols-outlined">my_location</span>
            Search This Area
          </button>
        </div>
      </div>
    </div>
  );
};