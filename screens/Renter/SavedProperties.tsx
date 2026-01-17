
import React from 'react';
import { Link } from 'react-router-dom';
import { PROPERTIES } from '../../constants';
import { PropertyCard } from '../../components/PropertyCard';

export const SavedProperties: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/5 bg-white dark:bg-background-dark px-10 py-4 shadow-sm">
        <Link to="/" className="flex items-center gap-4 text-primary dark:text-white">
          <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
            <span className="material-symbols-outlined">forest</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tighter uppercase">TerraRent</h2>
        </Link>
        <Link to="/dashboard" className="text-sm font-bold text-primary hover:text-accent flex items-center gap-2">
          <span className="material-symbols-outlined">dashboard</span> Dashboard
        </Link>
      </header>
      
      <main className="flex-grow px-4 md:px-10 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-primary/5">
            <div>
              <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter">Saved Properties</h1>
              <p className="text-text-muted mt-2 font-medium">Keep track of the sanctuaries you love most.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/10 bg-white text-sm font-bold text-primary hover:bg-sand-light transition-all">
                Filter <span className="material-symbols-outlined text-[20px]">filter_list</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-all shadow-lg">
                Compare All
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-10">
            {PROPERTIES.slice(0, 4).map((prop) => (
              <div key={prop.id} className="relative group">
                <PropertyCard property={prop} />
                <div className="absolute top-4 right-4 z-10">
                  <button className="size-10 rounded-full bg-accent text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined filled">favorite</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
