import React, { useEffect, useState } from 'react';
import { adminApi } from '../../api/endpoints/admin';
import { Property } from '../../types';
import { AdminLayout } from './AdminLayout';

export const AdminProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'PENDING' | 'LIVE' | 'REJECTED' | 'DELETED' | undefined>(undefined);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getProperties(statusFilter);
      setProperties(response.data);
    } catch (err) {
      console.error("Failed to fetch admin properties:", err);
      setError("Failed to load properties.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [statusFilter]);

  return (
    <AdminLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <header className="flex flex-wrap items-center justify-between gap-8">
            <div className="space-y-2">
                <h2 className="text-5xl font-black text-primary tracking-tighter leading-none">Stay Registry</h2>
                <p className="text-xl text-text-muted font-medium">Global oversight of all curated sanctuaries on the platform.</p>
            </div>
            <div className="flex gap-4">
               <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all">Bulk Audit</button>
            </div>
        </header>

        <div className="bg-white rounded-[3.5rem] border border-primary/5 shadow-2xl overflow-hidden">
            <div className="p-8 bg-sand-light/10 border-b border-primary/5 flex items-center justify-between">
               <div className="relative w-96">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/30">search</span>
                  <input className="w-full pl-12 pr-6 py-3 rounded-2xl border border-primary/5 bg-white font-bold text-sm focus:ring-accent" placeholder="Filter by Title or ID..." />
               </div>
               <div className="flex gap-3">
                  {[
                    { label: 'All', value: undefined },
                    { label: 'Live', value: 'LIVE' as const },
                    { label: 'Pending', value: 'PENDING' as const },
                    { label: 'Rejected', value: 'REJECTED' as const }
                  ].map(filter => (
                    <button 
                      key={filter.label}
                      onClick={() => setStatusFilter(filter.value)}
                      className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                        statusFilter === filter.value 
                          ? 'bg-primary text-white' 
                          : 'bg-white border border-primary/5 text-primary/60 hover:text-primary'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
               </div>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              {isLoading ? (
                <div className="p-10 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-text-muted font-semibold">Loading properties...</p>
                </div>
              ) : error ? (
                <div className="p-10 text-center">
                  <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
                  <p className="text-red-500 font-semibold mb-4">{error}</p>
                  <button 
                    onClick={fetchProperties} 
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : properties.length === 0 ? (
                <div className="p-10 text-center text-text-muted">No properties found.</div>
              ) : (
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] border-b border-primary/5 bg-sand-light/5">
                            <th className="py-8 px-10">Architectural Asset</th>
                            <th className="py-8 px-10">Location</th>
                            <th className="py-8 px-10">Economic Profile</th>
                            <th className="py-8 px-10">Market State</th>
                            <th className="py-8 px-10 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                        {properties.map((p) => (
                            <tr key={p.id} className="hover:bg-sand-light/5 transition-colors group">
                                <td className="py-8 px-10 border-b border-primary/5">
                                    <div className="flex items-center gap-6">
                                       <div className="size-20 rounded-[2rem] bg-cover bg-center shadow-xl border-4 border-white group-hover:scale-105 transition-transform shrink-0" style={{backgroundImage: `url('${p.image}')`}}></div>
                                       <div className="min-w-0">
                                          <p className="font-black text-primary text-xl tracking-tighter truncate">{p.title}</p>
                                          <p className="text-[10px] font-black text-accent uppercase tracking-widest mt-1">{p.type}</p>
                                       </div>
                                    </div>
                                </td>
                                <td className="py-8 px-10 border-b border-primary/5 text-text-muted font-bold">{p.location}</td>
                                <td className="py-8 px-10 border-b border-primary/5">
                                   <p className="text-xl font-black text-primary">${p.price}</p>
                                   <p className="text-[10px] uppercase font-black text-primary/30 tracking-widest">Base Rate</p>
                                </td>
                                <td className="py-8 px-10 border-b border-primary/5">
                                   <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                     p.status === 'LIVE' ? 'bg-green-50 text-green-700 border border-green-100' :
                                     p.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                     'bg-red-50 text-red-700 border border-red-100'
                                   }`}>
                                      {p.status === 'LIVE' && <span className="size-1.5 rounded-full bg-green-600 shadow-[0_0_8px_rgba(22,163,74,0.6)]"></span>}
                                      {p.status || 'Live'} Listing
                                   </span>
                                </td>
                                <td className="py-8 px-10 border-b border-primary/5 text-right">
                                   <button className="px-6 py-2.5 rounded-xl border-2 border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all">Moderate</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              )}
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};