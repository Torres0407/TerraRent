
import React from 'react';
import { LandlordLayout } from './LandlordLayout';

export const LandlordMedia: React.FC = () => {
  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-12">
        <div className="space-y-3">
          <h1 className="text-5xl font-black text-primary dark:text-white tracking-tighter">Showcase your sanctuary</h1>
          <p className="text-xl text-text-muted font-medium">Exceptional photography is the #1 driver for architectural stays.</p>
        </div>
        
        <div className="border-[3px] border-dashed border-primary/10 rounded-[3rem] p-16 flex flex-col items-center justify-center bg-white dark:bg-surface-dark group cursor-pointer hover:border-accent hover:bg-sand-light/5 transition-all duration-500">
          <div className="size-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform shadow-lg">
            <span className="material-symbols-outlined text-4xl">cloud_upload</span>
          </div>
          <h3 className="font-black text-2xl text-primary dark:text-white uppercase tracking-tighter">Drag & drop high-res visuals</h3>
          <p className="text-text-muted mt-2 font-medium">Support for JPG, PNG, and 4K video walk-throughs.</p>
          <button className="mt-8 px-10 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">Select from device</button>
        </div>

        <div className="space-y-8">
           <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-widest">Active Gallery (8)</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
                "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1000",
                "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000"
              ].map((src, i) => (
                <div key={i} className="bg-white dark:bg-surface-dark p-4 rounded-[2rem] shadow-xl border border-primary/5 group relative overflow-hidden">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                    <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <button className="size-10 rounded-full bg-white text-primary hover:text-accent transition-colors"><span className="material-symbols-outlined">edit</span></button>
                       <button className="size-10 rounded-full bg-white text-red-600 hover:bg-red-50 transition-colors"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                  </div>
                  <div className="px-2 pb-2">
                     <p className="text-[10px] font-black text-primary/30 uppercase tracking-widest mb-1">{i === 0 ? 'Primary Cover' : 'Architectural Detail'}</p>
                     <input className="w-full text-xs font-bold text-primary bg-transparent border-none p-0 focus:ring-0 placeholder:text-primary/20" placeholder="Add evocative caption..." />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </LandlordLayout>
  );
};
