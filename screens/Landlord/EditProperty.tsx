
import React from 'react';
import { Link } from 'react-router-dom';
import { LandlordLayout } from './LandlordLayout';

export const LandlordEditProperty: React.FC = () => {
  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-primary/5 pb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-primary dark:text-white tracking-tighter">Edit Sanctuary</h1>
            <p className="text-text-muted font-medium uppercase text-[10px] tracking-[0.3em]">Joshua Tree Modern • California, USA</p>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-3 border-2 border-primary/10 rounded-xl text-xs font-black uppercase tracking-widest text-primary hover:bg-sand-light transition-all">Preview Listing</button>
             <button className="px-8 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20">Save Changes</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-surface-dark p-6 rounded-[2rem] border border-primary/5 shadow-xl">
              <div className="aspect-[4/3] bg-cover bg-center rounded-2xl mb-8 shadow-md" style={{backgroundImage: "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000')"}}></div>
              <nav className="flex flex-col gap-2">
                <button className="w-full text-left px-5 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-all">Basic Details</button>
                <Link to="/landlord/media" className="block w-full text-left px-5 py-4 hover:bg-sand-light/30 text-primary/60 rounded-2xl font-bold text-xs uppercase tracking-widest">Media Manager</Link>
                <Link to="/landlord/pricing" className="block w-full text-left px-5 py-4 hover:bg-sand-light/30 text-primary/60 rounded-2xl font-bold text-xs uppercase tracking-widest">Pricing & Fees</Link>
                <Link to="/landlord/calendar" className="block w-full text-left px-5 py-4 hover:bg-sand-light/30 text-primary/60 rounded-2xl font-bold text-xs uppercase tracking-widest">Availability</Link>
              </nav>
            </div>
            
            <div className="p-6 bg-red-50 rounded-3xl border border-red-100 space-y-4">
               <h4 className="font-black text-red-700 uppercase text-[10px] tracking-widest">Danger Zone</h4>
               <button className="w-full py-3 rounded-xl border border-red-200 text-xs font-bold text-red-600 hover:bg-red-100">Unlist Sanctuary</button>
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-9 space-y-10">
            <div className="bg-white dark:bg-surface-dark p-10 md:p-14 rounded-[3rem] border border-primary/5 shadow-xl space-y-12">
               <div className="space-y-10">
                 <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-widest">General Information</h3>
                 
                 <div className="grid grid-cols-1 gap-10">
                   <div className="space-y-3">
                     <label className="block text-[10px] font-black text-primary/40 uppercase tracking-widest">Display Title</label>
                     <input type="text" className="w-full px-6 py-5 rounded-2xl border-primary/10 bg-sand-light/10 text-lg font-bold text-primary focus:ring-accent" defaultValue="Joshua Tree Modern architectural gem" />
                   </div>
                   
                   <div className="space-y-3">
                     <label className="block text-[10px] font-black text-primary/40 uppercase tracking-widest">Narrative Description</label>
                     <textarea className="w-full px-6 py-5 rounded-2xl border-primary/10 bg-sand-light/10 text-base font-medium text-primary leading-relaxed focus:ring-accent h-48" defaultValue="Ultra-modern architectural gem in the heart of the desert, featuring floor-to-ceiling windows and premium grounding amenities. This space has been curated for maximum creative output and restorative peace."></textarea>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black text-primary/40 uppercase tracking-widest">Category</label>
                        <select className="w-full px-6 py-5 rounded-2xl border-primary/10 bg-sand-light/10 font-bold text-primary focus:ring-accent">
                          <option>Design Stay</option>
                          <option>Eco Retreat</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black text-primary/40 uppercase tracking-widest">Max Guests</label>
                        <input type="number" className="w-full px-6 py-5 rounded-2xl border-primary/10 bg-sand-light/10 font-bold text-primary focus:ring-accent" defaultValue="4" />
                      </div>
                   </div>
                 </div>
               </div>
               
               <div className="pt-12 border-t border-primary/5 space-y-10">
                 <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-widest">Curated Amenities</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Star Gazing Deck', 'Heated Salt Pool', 'Fiber Connectivity', 'Chef Kitchen', 'Organic Linens', 'EV Charging'].map(a => (
                      <label key={a} className="flex items-center gap-4 p-5 rounded-2xl bg-sand-light/10 border border-primary/5 cursor-pointer hover:bg-sand-light/30 transition-all">
                        <input type="checkbox" defaultChecked className="rounded text-accent focus:ring-accent" />
                        <span className="text-sm font-bold text-primary">{a}</span>
                      </label>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};
