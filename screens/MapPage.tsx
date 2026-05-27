import React, { useState, useEffect, useRef } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { useProperties } from '../services/properties/hooks';

export const MapPage: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Use the properties hook
  const { properties, loading: isLoading, error } = useProperties({}, 0, 20);

  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});

  // Setup Leaflet map on load
  useEffect(() => {
    // Inject Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Inject Leaflet JS
    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      const L = (window as any).L;
      if (!L || !document.getElementById('live-map') || mapRef.current) return;

      // Center on Lagos, Nigeria
      mapRef.current = L.map('live-map', {
        center: [6.4529, 3.4411],
        zoom: 12,
        zoomControl: true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(mapRef.current);
    }

    return () => {
      // Clean up leaflet map if needed
    };
  }, []);

  // Update map markers when properties are loaded
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapRef.current || properties.length === 0) return;

    // Clear previous markers
    Object.values(markersRef.current).forEach((marker: any) => {
      marker.remove();
    });
    markersRef.current = {};

    const bounds = L.latLngBounds([]);

    properties.forEach((prop) => {
      const lat = prop.coordinates?.lat || 6.4529;
      const lng = prop.coordinates?.lng || 3.4411;

      bounds.extend([lat, lng]);

      const customIcon = L.divIcon({
        className: `custom-map-price-pin-${prop.id}`,
        html: `<div style="background-color: white; color: #3f4936; border: 2px solid #3f4936; border-radius: 999px; padding: 4px 10px; font-weight: 800; font-size: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); white-space: nowrap; transition: all 0.2s;">$${prop.price}</div>`,
        iconSize: [50, 24],
        iconAnchor: [25, 12]
      });

      const marker = L.marker([lat, lng], { icon: customIcon })
        .addTo(mapRef.current)
        .bindPopup(`<b>${prop.title}</b><br/>${prop.location}<br/><b>$${prop.price}/night</b>`);

      markersRef.current[prop.id] = marker;
    });

    // Fit bounds of all properties on map
    if (properties.length > 0) {
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [properties]);

  // Handle hovered marker effects
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapRef.current) return;

    properties.forEach((prop) => {
      const marker = markersRef.current[prop.id];
      if (!marker) return;

      const isHovered = hoveredId === prop.id;
      
      // Update HTML content to represent hover state
      const div = marker.getElement();
      if (div) {
        const innerDiv = div.querySelector('div');
        if (innerDiv) {
          if (isHovered) {
            innerDiv.style.backgroundColor = '#3f4936';
            innerDiv.style.color = 'white';
            innerDiv.style.transform = 'scale(1.2)';
            innerDiv.style.zIndex = '999';
            
            // Programmatically open popup and pan
            marker.openPopup();
            mapRef.current.panTo(marker.getLatLng());
          } else {
            innerDiv.style.backgroundColor = 'white';
            innerDiv.style.color = '#3f4936';
            innerDiv.style.transform = 'scale(1.0)';
            innerDiv.style.zIndex = '1';
          }
        }
      }
    });
  }, [hoveredId, properties]);

  return (
    <div className="flex-1 flex overflow-hidden relative h-[calc(100vh-80px)]">
      {/* Left Panel: List */}
      <div className="w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto bg-background-light p-6 md:p-10 border-r border-primary/5 no-scrollbar">
        <div className="max-w-[800px] mx-auto flex flex-col gap-8 pb-20">
          <div className="space-y-2">
            <h2 className="text-[#141613] text-2xl font-black leading-tight">Nearby Stays</h2>
            <p className="text-text-muted text-sm font-medium">Explore curated architecture across Nigeria.</p>
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
                  onMouseEnter={() => setHoveredId(prop.id.toString())}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`transition-all duration-300 transform ${hoveredId === prop.id.toString() ? 'scale-[1.02]' : ''}`}
                >
                  <PropertyCard property={prop} layout="list" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Panel: Map */}
      <div className="hidden lg:block w-[55%] xl:w-[60%] h-full relative bg-[#e5e3df] overflow-hidden">
        <div id="live-map" className="w-full h-full relative z-10"></div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <button 
            onClick={() => {
              if (mapRef.current) {
                mapRef.current.setView([6.4529, 3.4411], 12);
              }
            }}
            className="bg-primary text-white px-8 py-3 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2 hover:bg-primary-hover transition-colors"
          >
            <span className="material-symbols-outlined">my_location</span>
            Recenter on Lagos
          </button>
        </div>
      </div>
    </div>
  );
};