
import React from 'react';
import { Link } from 'react-router-dom';
import { PROPERTIES } from '../../constants';
import { PropertyCard } from '../../components/PropertyCard';

export const RecentlyViewed: React.FC = () => {
  return (
    <div className="bg-background-light font-display min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/5 px-10 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">forest</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight uppercase">TerraRent</h2>
        </Link>
        <Link to="/dashboard" className="text-sm font-bold text-primary">Back to Dashboard</Link>
      </header>
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-primary mb-3 tracking-tighter">Recently Viewed</h1>
            <p className="text-text-muted text-lg font-medium">Timeline of sanctuaries that caught your eye.</p>
          </div>
          <button className="text-sm font-bold text-accent hover:underline">Clear History</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {PROPERTIES.map((prop) => (
            <div key={prop.id} className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Viewed 2 hours ago</span>
              <PropertyCard property={prop} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
