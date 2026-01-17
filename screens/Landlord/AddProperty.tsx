import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { landlordApi } from '../../api/endpoints/landlord';
import { LandlordLayout } from './LandlordLayout';

export const LandlordAddProperty: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Modern Villa');
  const [feature, setFeature] = useState('Mountain Views');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const newProperty = await landlordApi.createProperty({
        title,
        type,
        description: `A beautiful ${type} with ${feature.toLowerCase()}.`,
        location: 'TBD',
        price: 0,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000'
      });
      navigate(`/landlord/media/${newProperty.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create property. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LandlordLayout>
      <div className="min-h-full flex items-center justify-center p-6 md:p-12 bg-sand-light/20">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 border border-primary/5 space-y-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-4">
            <span className="text-xs font-black text-accent uppercase tracking-[0.3em]">Sanctuary Onboarding</span>
            <h2 className="text-5xl font-black text-primary tracking-tighter leading-none">Let's define your space</h2>
            <p className="text-xl text-text-muted font-medium max-w-xl">Share the architectural story of your property and what makes it a sanctuary.</p>
          </div>
          
          <div className="space-y-10">
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined">error</span>
                {error}
              </div>
            )}
            <div className="space-y-3">
              <label className="block text-primary font-black text-xs uppercase tracking-[0.2em]">Sanctuary Title</label>
              <input 
                className="w-full px-6 py-5 rounded-[1.5rem] border-primary/10 bg-sand-light/10 text-primary text-xl font-bold focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-primary/20" 
                placeholder="e.g. Minimalist Forest Pavilion" 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="block text-primary font-black text-xs uppercase tracking-[0.2em]">Architectural Type</label>
                  <select 
                    className="w-full px-6 py-5 rounded-[1.5rem] border-primary/10 bg-sand-light/10 text-primary text-lg font-bold focus:ring-4 focus:ring-accent/20 transition-all cursor-pointer"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                      <option>Modern Villa</option>
                      <option>Nordic Cabin</option>
                      <option>Eco Lodge</option>
                      <option>Urban Loft</option>
                  </select>
              </div>
              <div className="space-y-3">
                  <label className="block text-primary font-black text-xs uppercase tracking-[0.2em]">Primary Feature</label>
                  <select 
                    className="w-full px-6 py-5 rounded-[1.5rem] border-primary/10 bg-sand-light/10 text-primary text-lg font-bold focus:ring-4 focus:ring-accent/20 transition-all cursor-pointer"
                    value={feature}
                    onChange={(e) => setFeature(e.target.value)}
                  >
                      <option>Mountain Views</option>
                      <option>Ocean Access</option>
                      <option>Desert Seclusion</option>
                      <option>Lush Gardens</option>
                  </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 pt-4">
               {['Max Capacity', 'Bedrooms', 'Studio Workspaces', 'Eco Bathrooms'].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-sand-light/10 rounded-2xl border border-primary/5 hover:border-accent transition-colors">
                   <span className="text-lg font-black text-primary uppercase tracking-tighter">{item}</span>
                   <div className="flex items-center gap-6">
                     <button type="button" className="size-10 rounded-full border-2 border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all font-black">-</button>
                     <span className="font-black text-2xl text-primary w-8 text-center">2</span>
                     <button type="button" className="size-10 rounded-full border-2 border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all font-black">+</button>
                   </div>
                 </div>
               ))}
            </div>
            
            <div className="flex justify-between items-center pt-10 border-t border-primary/5">
              <Link to="/landlord/properties" className="font-black text-primary/40 uppercase tracking-[0.2em] text-xs hover:text-primary transition-colors">Exit Setup</Link>
              <button disabled={isLoading} type="submit" className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2">
                {isLoading && <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>}
                {isLoading ? 'Saving...' : 'Next Step: Media'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </LandlordLayout>
  );
};