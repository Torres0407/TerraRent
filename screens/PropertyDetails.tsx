import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProperty } from '../services/properties/hooks';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Use the property hook - automatically handles loading and error states
  const { property, loading: isLoading, error } = useProperty(Number(id));
  
  if (isLoading) {
    return (
      <main className="layout-container flex grow flex-col items-center justify-center pb-20">
        <p className="text-text-muted font-semibold">Loading sanctuary details...</p>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="layout-container flex grow flex-col items-center justify-center pb-20">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-primary/10 mb-4">home_pin</span>
          <h1 className="text-2xl font-bold text-primary mb-2">Sanctuary Not Found</h1>
          <p className="text-text-muted">The property you're looking for might not exist or has been unlisted.</p>
          <Link to="/search" className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm">Return to Search</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="layout-container flex grow flex-col items-center pb-20">
      <div className="w-full max-w-[1200px] px-4 md:px-6 lg:px-8 py-10 flex flex-col gap-8">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap gap-2 text-sm text-neutral-500 uppercase tracking-widest font-bold">
          <Link to="/search" className="hover:text-primary transition-colors">Rentals</Link>
          <span>/</span>
          <span className="text-neutral-900">{property.title}</span>
        </nav>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <h1 className="text-primary text-3xl md:text-5xl font-black leading-tight tracking-tight">{property.title}</h1>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-sm font-bold hover:underline">
                <span className="material-symbols-outlined">share</span>Share
              </button>
              <button className="flex items-center gap-2 text-sm font-bold hover:underline">
                <span className="material-symbols-outlined">favorite</span>Save
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-neutral-600 font-medium">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-accent" style={{fontSize: '18px'}}>star</span>
              {property.averageRating || 4.5} · <span className="underline cursor-pointer">{property.numberOfReviews || 0} reviews</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined" style={{fontSize: "18px"}}>location_on</span>
              {property.address}
            </div>
          </div>
        </div>

        {/* Hero Gallery */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl relative group">
          <div className="md:col-span-2 md:row-span-2 relative cursor-pointer overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
              style={{backgroundImage: `url('${property.images?.[0]?.url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'}')`}}
            ></div>
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="hidden md:block relative group cursor-pointer overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110" 
                style={{backgroundImage: `url('https://images.unsplash.com/photo-${1500000000000 + (i * 100000)}?auto=format&fit=crop&q=80&w=800')`}}
              ></div>
            </div>
          ))}
          <button className="absolute bottom-6 right-6 bg-white px-6 py-3 rounded-xl shadow-lg font-bold text-sm flex items-center gap-2 hover:bg-neutral-50 active:scale-95 transition-all">
            <span className="material-symbols-outlined">grid_view</span>
            Show all photos
          </button>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-6">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            <div className="flex justify-between items-center pb-8 border-b border-primary/5">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-primary">Whole {property.type} hosted by Owner</h2>
                <p className="text-text-muted">4 guests · {property.bedrooms} bedrooms · {property.bedrooms} beds · {property.bathrooms} baths</p>
              </div>
              <div className="size-16 rounded-full bg-sand-light border-2 border-primary/10 overflow-hidden">
                <img src="https://picsum.photos/seed/owner/100" className="object-cover" alt="Owner" />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-black text-primary uppercase tracking-wider">The Space</h3>
              <p className="text-neutral-600 text-lg leading-relaxed">
                {property.description} This home has been specifically designed to provide a deep sense of calm and grounding. High ceilings, organic textures, and plenty of natural light define the interior spaces.
              </p>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Whether you're looking for a creative retreat or a quiet escape with loved ones, this property offers all the modern amenities you need while keeping you deeply connected to the natural world just outside the windows.
              </p>
              <button className="self-start text-primary font-bold underline hover:text-accent">Read more</button>
            </div>

            {/* Amenities */}
            <div className="flex flex-col gap-8 pb-12 border-b border-primary/5">
              <h3 className="text-2xl font-black text-primary uppercase tracking-wider">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {icon: 'nature', label: 'Forest views'},
                  {icon: 'wifi', label: 'High-speed Fiber WiFi'},
                  {icon: 'kitchen', label: 'Full Chef\'s kitchen'},
                  {icon: 'fireplace', label: 'Indoor stone fireplace'},
                  {icon: 'workspace_premium', label: 'Dedicated workspace'},
                  {icon: 'local_laundry_service', label: 'Washer & Dryer'}
                ].map((amenity, i) => (
                  <div key={i} className="flex items-center gap-4 text-neutral-600">
                    <span className="material-symbols-outlined text-primary/60">{amenity.icon}</span>
                    <span className="text-lg font-medium">{amenity.label}</span>
                  </div>
                ))}
              </div>
              <button className="self-start border-2 border-primary px-8 py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition-all">
                Show all 28 amenities
              </button>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl p-8 shadow-2xl border border-primary/5 flex flex-col gap-8">
              <div className="flex justify-between items-baseline">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-primary">${property.price}</span>
                  <span className="text-neutral-500 font-bold uppercase tracking-tighter text-sm">/ night</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <span className="material-symbols-outlined text-accent" style={{fontSize: '18px'}}>star</span>
                  {property.averageRating || 4.5} · <span className="text-neutral-400 font-medium underline">{property.numberOfReviews || 0} reviews</span>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-200">
                <div className="flex divide-x divide-gray-200">
                  <div className="flex-1 p-4 cursor-pointer hover:bg-sand-light/20">
                    <label className="block text-[10px] font-black uppercase text-primary">Check-In</label>
                    <span className="text-sm font-medium">Add date</span>
                  </div>
                  <div className="flex-1 p-4 cursor-pointer hover:bg-sand-light/20">
                    <label className="block text-[10px] font-black uppercase text-primary">Check-Out</label>
                    <span className="text-sm font-medium">Add date</span>
                  </div>
                </div>
                <div className="p-4 cursor-pointer hover:bg-sand-light/20">
                  <label className="block text-[10px] font-black uppercase text-primary">Guests</label>
                  <span className="text-sm font-medium">1 guest</span>
                </div>
              </div>

              <button className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 transform active:scale-95">
                Reserve Now
              </button>
              
              <div className="text-center space-y-4">
                <p className="text-sm text-neutral-500 font-medium">You won't be charged yet</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-neutral-600">
                    <span className="underline">${property.price} x 5 nights</span>
                    <span>${property.price * 5}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span className="underline">Cleaning fee</span>
                    <span>$80</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span className="underline">TerraRent service fee</span>
                    <span>$120</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-primary/10 flex justify-between font-black text-xl text-primary">
                  <span>Total</span>
                  <span>${property.price * 5 + 80 + 120}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};