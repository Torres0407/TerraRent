
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PROPERTIES } from '../constants';
import { PropertyCard } from '../components/PropertyCard';
import { searchPropertiesAI } from '../services/geminiService';

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(PROPERTIES);
  const [isSearchingAI, setIsSearchingAI] = useState(false);

  const handleAISearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearchingAI(true);
    const resultIds = await searchPropertiesAI(searchQuery);
    if (resultIds.length > 0) {
      const results = PROPERTIES.filter(p => resultIds.includes(p.id));
      setFilteredProperties(results);
    }
    setIsSearchingAI(false);
  };

  useEffect(() => {
    if (!searchQuery) {
      setFilteredProperties(PROPERTIES);
    }
  }, [searchQuery]);

  return (
    <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8 gap-10">
      {/* Sidebar Filter */}
      <aside className="hidden lg:block w-80 shrink-0 space-y-10 self-start sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary hover:underline">Home</Link>
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-800">Search</span>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-primary/5">
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            <button onClick={() => setSearchQuery('')} className="text-sm font-semibold text-accent hover:text-accent/80">Reset all</button>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Smart AI Search</h3>
            <div className="relative group">
              <input 
                className="w-full bg-sand-light/30 border border-primary/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 text-gray-700" 
                placeholder="Try 'cozy winter cabin'..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                type="text"
              />
              <button 
                onClick={handleAISearch}
                disabled={isSearchingAI}
                className="absolute right-2 top-2 size-8 flex items-center justify-center bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isSearchingAI ? 'hourglass_empty' : 'auto_awesome'}
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Price Range</h3>
            <div className="flex gap-4">
              <input type="number" placeholder="Min" className="w-1/2 rounded-xl border-primary/10 text-sm py-2 px-3"/>
              <input type="number" placeholder="Max" className="w-1/2 rounded-xl border-primary/10 text-sm py-2 px-3"/>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">Bedrooms</h3>
            <div className="flex gap-2">
              {['Any', '1+', '2+', '3+', '4+'].map((opt) => (
                <button 
                  key={opt}
                  className={`h-10 px-3 flex items-center justify-center rounded-xl border text-sm font-bold transition-all ${
                    opt === '2+' ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-gray-600 border-primary/10 hover:border-primary hover:text-primary'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Listings Area */}
      <section className="flex-1 min-w-0">
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-[#141613] tracking-tight mb-4">
            Search Results
          </h1>
          <p className="text-text-muted text-lg max-w-2xl">
            {isSearchingAI ? 'Our AI is curating the best matches for you...' : 'Premium properties curated for those who value nature and design.'}
          </p>
          
          <div className="flex items-center justify-between mt-12 pb-6 border-b border-primary/5">
            <p className="text-gray-500 font-medium">Showing <span className="text-gray-900 font-bold">{filteredProperties.length}</span> unique homes</p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
              <select className="form-select bg-transparent border-none text-sm font-bold text-gray-900 focus:ring-0 cursor-pointer pr-8 py-0">
                <option>Newest Listings</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              <span className="material-symbols-outlined text-6xl mb-4 text-gray-300">search_off</span>
              <p className="text-xl font-bold">No properties found matching your criteria.</p>
              <button onClick={() => setSearchQuery('')} className="mt-4 text-accent font-bold hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
