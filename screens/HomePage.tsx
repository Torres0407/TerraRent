import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PropertyCard } from '../components/PropertyCard';
import { TRUST_INDICATORS } from '../constants';
import { useFeaturedProperties } from '../services/properties/hooks';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Use the new hook - automatically handles loading, error, and data
  const { properties, loading: isLoading, error } = useFeaturedProperties();

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative flex min-h-[650px] flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <div 
            className="h-full w-full bg-cover bg-center" 
            style={{
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000')"
            }}
          ></div>
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-7xl drop-shadow-lg">
            Find your sanctuary.<br/>Rent better.
          </h1>
          <p className="max-w-xl text-lg font-medium text-white/90 sm:text-2xl drop-shadow-md">
            Discover premium homes that connect you with nature and architectural comfort.
          </p>
          <div className="mt-8 w-full max-w-4xl rounded-full bg-white p-2 shadow-2xl ring-1 ring-black/5 sm:flex sm:items-center">
            <div className="flex flex-1 flex-col sm:flex-row">
              <div className="relative flex flex-1 items-center border-b border-gray-100 px-6 py-3 sm:border-b-0 sm:border-r">
                <span className="material-symbols-outlined text-accent mr-3">search</span>
                <div className="flex w-full flex-col text-left">
                  <label className="text-xs font-bold text-primary uppercase" htmlFor="location">Location</label>
                  <input className="w-full border-none p-0 text-sm font-medium text-gray-700 focus:ring-0 placeholder:text-gray-400" id="location" placeholder="Where do you want to go?" type="text"/>
                </div>
              </div>
              <div className="relative flex flex-1 items-center border-b border-gray-100 px-6 py-3 sm:border-b-0 sm:border-r">
                <span className="material-symbols-outlined text-accent mr-3">calendar_month</span>
                <div className="flex w-full flex-col text-left">
                  <label className="text-xs font-bold text-primary uppercase">Dates</label>
                  <input className="w-full border-none p-0 text-sm font-medium text-gray-700 focus:ring-0 placeholder:text-gray-400" placeholder="Add dates" type="text"/>
                </div>
              </div>
              <div className="relative flex flex-[0.7] items-center px-6 py-3">
                <span className="material-symbols-outlined text-accent mr-3">group</span>
                <div className="flex w-full flex-col text-left">
                  <label className="text-xs font-bold text-primary uppercase">Guests</label>
                  <input className="w-full border-none p-0 text-sm font-medium text-gray-700 focus:ring-0 placeholder:text-gray-400" placeholder="Add guests" type="text"/>
                </div>
              </div>
            </div>
            <button onClick={() => navigate('/search')} className="mt-2 w-full rounded-full bg-primary px-10 py-4 text-base font-bold text-white transition-all hover:bg-primary-hover sm:mt-0 sm:w-auto shadow-lg hover:shadow-xl active:scale-95">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-sand-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {TRUST_INDICATORS.map((item, i) => (
              <div key={i} className="flex items-start gap-5 group">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-primary">{item.title}</h3>
                  <p className="mt-2 text-base text-text-muted leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Curated Collections</h2>
            <Link to="/search" className="text-sm font-bold text-accent hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest">
              View all <span className="material-symbols-outlined" style={{fontSize: '18px'}}>arrow_forward</span>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center text-text-muted font-semibold">Loading sanctuaries...</div>
          ) : error ? (
            <div className="text-center text-red-600 font-semibold">{error}</div>
          ) : properties.length === 0 ? (
            <div className="text-center text-text-muted font-semibold">No properties available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {properties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-dark py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to host your own sanctuary?</h2>
          <p className="text-white/70 text-lg md:text-xl mb-10">Join our community of hosts and share your unique architectural space with nature lovers worldwide.</p>
          <button className="bg-accent text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary transition-all shadow-xl">
            List Your Property
          </button>
        </div>
      </section>
    </main>
  );
};