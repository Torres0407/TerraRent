
import React from 'react';
import { LandlordLayout } from './LandlordLayout';

export const LandlordRequests: React.FC = () => {
  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-primary dark:text-white tracking-tighter">Booking Petitions</h1>
          <p className="text-xl text-text-muted font-medium">Curate the guests who will experience your sanctuaries.</p>
        </div>
        
        <div className="space-y-8">
          {[
            { 
              name: "Sarah Jenkins", 
              img: "https://picsum.photos/seed/sarah/200", 
              property: "Tuscan Stone Villa", 
              dates: "Oct 12 - Oct 15", 
              total: "$1,450", 
              msg: "Hi Eleanor! We are visiting Tuscany for our 10th wedding anniversary. Your villa looks like the perfect romantic escape we've been searching for. Looking forward to potentially staying there!", 
              verified: true 
            },
            { 
              name: "Michael Chen", 
              img: "https://picsum.photos/seed/michael/200", 
              property: "Joshua Tree Modern", 
              dates: "Nov 05 - Nov 10", 
              total: "$2,625", 
              msg: "Hello. I am a landscape photographer coming to the desert for a private project. I need a space with plenty of natural light and a dedicated workspace. Your modern gem seems ideal.", 
              verified: true 
            }
          ].map((req, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-primary/5 shadow-2xl flex flex-col lg:flex-row gap-12 group transition-all hover:shadow-black/[0.05]">
              <div className="flex flex-col items-center text-center lg:w-48 shrink-0 space-y-4">
                <div className="size-24 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group-hover:scale-105 transition-transform">
                   <img src={req.img} alt={req.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-lg text-primary dark:text-white leading-tight">{req.name}</h4>
                  {req.verified && <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent mt-1 block">Verified Tenant</span>}
                </div>
              </div>
              
              <div className="flex-1 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-primary dark:text-white tracking-tighter">{req.property}</h3>
                    <p className="text-xs font-black text-primary/40 uppercase tracking-widest mt-1">{req.dates}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-primary/40 uppercase tracking-widest">Total Payout</p>
                    <p className="text-3xl font-black text-primary dark:text-white tracking-tighter">{req.total}</p>
                  </div>
                </div>
                
                <div className="bg-sand-light/10 p-8 rounded-[2rem] border border-primary/5 relative">
                   <span className="material-symbols-outlined absolute -top-3 -left-3 text-accent bg-white rounded-full p-1 shadow-sm">format_quote</span>
                   <p className="text-sm font-medium text-primary/70 leading-relaxed italic">"{req.msg}"</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                   <button className="flex-1 bg-primary text-white font-black py-5 rounded-2xl flex justify-center items-center gap-2 shadow-xl shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all">
                     Accept Reservation <span className="material-symbols-outlined text-lg">check_circle</span>
                   </button>
                   <button className="flex-1 border-2 border-primary/10 text-primary/60 font-black py-5 rounded-2xl hover:bg-sand-light transition-all">
                     Decline
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LandlordLayout>
  );
};
