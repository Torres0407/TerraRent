
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LandlordLayout } from './LandlordLayout';

export const LandlordAddProperty: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LandlordLayout>
      <div className="min-h-full flex items-center justify-center p-6 md:p-12 bg-sand-light/20">
        <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 border border-primary/5 space-y-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-4">
            <span className="text-xs font-black text-accent uppercase tracking-[0.3em]">Sanctuary Onboarding</span>
            <h2 className="text-5xl font-black text-primary tracking-tighter leading-none">Let's define your space</h2>
            <p className="text-xl text-text-muted font-medium max-w-xl">Share the architectural story of your property and what makes it a sanctuary.</p>
          </div>
          
          <div className="space-y-10">
            <div className="space-y-3">
              <label className="block text-primary font-black text-xs uppercase tracking-[0.2em]">Sanctuary Title</label>
              <input className="w-full px-6 py-5 rounded-[1.5rem] border-primary/10 bg-sand-light/10 text-primary text-xl font-bold focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-primary/20" placeholder="e.g. Minimalist Forest Pavilion" type="text"/>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <label className="block text-primary font-black text-xs uppercase tracking-[0.2em]">Architectural Type</label>
                  <select className="w-full px-6 py-5 rounded-[1.5rem] border-primary/10 bg-sand-light/10 text-primary text-lg font-bold focus:ring-4 focus:ring-accent/20 transition-all cursor-pointer">
                      <option>Modern Villa</option>
                      <option>Nordic Cabin</option>
                      <option>Eco Lodge</option>
                      <option>Urban Loft</option>
                  </select>
              </div>
              <div className="space-y-3">
                  <label className="block text-primary font-black text-xs uppercase tracking-[0.2em]">Primary Feature</label>
                  <select className="w-full px-6 py-5 rounded-[1.5rem] border-primary/10 bg-sand-light/10 text-primary text-lg font-bold focus:ring-4 focus:ring-accent/20 transition-all cursor-pointer">
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
                     <button className="size-10 rounded-full border-2 border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all font-black">-</button>
                     <span className="font-black text-2xl text-primary w-8 text-center">2</span>
                     <button className="size-10 rounded-full border-2 border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all font-black">+</button>
                   </div>
                 </div>
               ))}
            </div>
            
            <div className="flex justify-between items-center pt-10 border-t border-primary/5">
              <Link to="/landlord/properties" className="font-black text-primary/40 uppercase tracking-[0.2em] text-xs hover:text-primary transition-colors">Exit Setup</Link>
              <button onClick={() => navigate('/landlord/media')} className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">Next Step: Media</button>
            </div>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};
