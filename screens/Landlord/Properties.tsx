import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { landlordApi } from '../../api/endpoints/landlord';
import { Property } from '../../types';
import { LandlordLayout } from './LandlordLayout';

export const LandlordProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await landlordApi.getProperties();
        setProperties(data);
      } catch (err) {
        console.error("Failed to fetch landlord properties:", err);
        setError("Failed to load properties.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-wrap justify-between gap-6 items-end">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-primary dark:text-white tracking-tighter">Architectural Portfolio</h1>
            <p className="text-text-muted font-medium">Manage and refine your collection of verified sanctuaries.</p>
          </div>
          <Link to="/landlord/add-property" className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">
            <span className="material-symbols-outlined">add</span> List Sanctuary
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Portfolio Value", val: "$4.2M", icon: "account_balance" },
            { label: "Occupied Units", val: "10 / 12", icon: "check_circle" },
            { label: "RevPAR", val: "$310", icon: "trending_up" }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-primary/5 shadow-lg shadow-black/[0.01]">
              <div className="flex items-center gap-3 text-accent font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                <span className="material-symbols-outlined text-lg">{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
              <p className="text-4xl font-black text-primary dark:text-white tracking-tighter">{stat.val}</p>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-muted font-semibold">Loading your properties...</p>
          </div>
        ) : error ? (
          <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-red-200">
            <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
            <p className="text-red-500 font-semibold mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((prop) => (
              <div key={prop.id} className="bg-white dark:bg-surface-dark rounded-[2.5rem] border border-primary/5 overflow-hidden shadow-xl shadow-black/[0.02] hover:shadow-2xl transition-all group flex flex-col">
                <div className="relative h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{backgroundImage: `url('${prop.image}')`}}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white rounded-full text-[10px] font-black text-primary uppercase tracking-widest shadow-lg">
                    {prop.isSuperhost ? 'Premier Stay' : 'Verified'}
                  </div>
                  <div className="absolute bottom-6 right-6 text-white font-black text-xl">
                    ${prop.price}<span className="text-xs uppercase opacity-70 ml-1">/ night</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-primary dark:text-white tracking-tighter group-hover:text-accent transition-colors">{prop.title}</h3>
                    <p className="text-text-muted text-sm font-medium mt-1">{prop.location}</p>
                  </div>
                  <div className="mt-auto flex justify-between items-center pt-6 border-t border-primary/5">
                     <div className="flex items-center gap-1.5 text-accent">
                        <span className="material-symbols-outlined text-lg">star</span>
                        <span className="text-sm font-black">{prop.rating}</span>
                     </div>
                     <Link to={`/landlord/edit-property/${prop.id}`} className="text-xs font-black text-primary uppercase tracking-widest hover:underline underline-offset-4">Manage Sanctuary</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LandlordLayout>
  );
};