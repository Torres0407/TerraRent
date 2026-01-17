
import React from 'react';
import { LandlordLayout } from './LandlordLayout';

export const LandlordCalendar: React.FC = () => {
  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-primary dark:text-white tracking-tighter">Stay Availability</h1>
            <p className="text-text-muted font-medium">Manage seasonal pricing and architectural block-out dates.</p>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-3 border-2 border-primary/10 rounded-xl text-xs font-black uppercase tracking-widest text-primary hover:bg-sand-light transition-all">Sync External iCal</button>
             <button className="px-8 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20">Block Dates</button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-surface-dark rounded-[3rem] shadow-2xl border border-primary/5 overflow-hidden">
          <div className="p-10 border-b border-primary/5 flex justify-between items-center bg-sand-light/10">
            <h2 className="text-2xl font-black text-primary uppercase tracking-tighter">November 2024</h2>
            <div className="flex gap-6">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/40">
                <span className="size-3 bg-primary rounded-full shadow-lg"></span> Internal Stay
              </span>
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/40">
                <span className="size-3 bg-accent rounded-full shadow-lg"></span> Direct Booking
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-7 text-center bg-white dark:bg-surface-dark py-6 border-b border-primary/5">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} className="text-[10px] font-black text-primary/30 uppercase tracking-[0.3em]">{d}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-primary/5">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-surface-dark min-h-[140px] p-6 flex flex-col justify-between hover:bg-sand-light/5 transition-all group relative">
                <div className="flex justify-between items-start">
                  <span className={`text-lg font-black tracking-tighter ${i+1 === 24 ? 'text-accent' : 'text-primary/20 group-hover:text-primary'}`}>{i+1}</span>
                  <span className="text-[10px] font-black text-accent uppercase tracking-widest">$425</span>
                </div>
                
                {i === 1 && (
                   <div className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg transform -rotate-1">
                      Check-in: Sarah J.
                   </div>
                )}
                {i > 1 && i < 5 && (
                   <div className="bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      Reserved
                   </div>
                )}
                {i === 10 && (
                   <div className="bg-accent text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg transform rotate-1">
                      Maintenance
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};
