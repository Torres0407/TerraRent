
import React from 'react';
import { LandlordLayout } from './LandlordLayout';

export const LandlordAnalytics: React.FC = () => {
  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-primary dark:text-white tracking-tighter">Market Intelligence</h1>
            <p className="text-xl text-text-muted font-medium">Data-driven insights to optimize your sanctuary's reach.</p>
          </div>
          <div className="flex p-1 bg-sand-light/20 rounded-2xl border border-primary/5">
            <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest bg-primary text-white rounded-xl shadow-lg transition-all">30 Days</button>
            <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-primary/40 hover:text-primary transition-all">90 Days</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { label: 'Total Views', val: '3,402', change: '+18%', color: 'primary' },
            { label: 'Inquiry Rate', val: '12.8%', change: '+2%', color: 'accent' },
            { label: 'Confirmed Stays', val: '45', change: '+5', color: 'primary' }
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-primary/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <span className="material-symbols-outlined text-[120px]">{['visibility', 'chat_bubble', 'check_circle'][i]}</span>
              </div>
              <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mb-4">{stat.label}</p>
              <div className="flex items-baseline gap-4">
                <h3 className="text-5xl font-black text-primary dark:text-white tracking-tighter">{stat.val}</h3>
                <span className="text-xs font-black text-green-600 uppercase">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-surface-dark p-12 rounded-[4rem] border border-primary/5 shadow-2xl space-y-12">
          <div className="flex justify-between items-center">
             <h3 className="text-2xl font-black text-primary dark:text-white uppercase tracking-tighter">Traffic Momentum</h3>
             <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/40">
                  <span className="size-2 bg-primary rounded-full"></span> Direct
                </span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/40">
                  <span className="size-2 bg-accent rounded-full"></span> Social
                </span>
             </div>
          </div>
          
          <div className="h-80 w-full flex items-end justify-between gap-3 px-4">
            {[40,65,30,85,55,95,45,75,60,90,55,100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col gap-2 group cursor-pointer h-full justify-end">
                <div className="w-full bg-sand-light/20 rounded-2xl relative overflow-hidden group-hover:bg-sand-light/40 transition-all" style={{height: `${h}%`}}>
                  <div className="absolute bottom-0 w-full bg-primary rounded-2xl group-hover:bg-accent transition-all duration-700 delay-100" style={{height: `${Math.max(0, h-10)}%`}}></div>
                </div>
                <span className="text-[9px] font-black text-primary/20 uppercase text-center">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="bg-sand-light/10 p-12 rounded-[3.5rem] border border-primary/5 space-y-8">
              <h3 className="text-xl font-black text-primary uppercase tracking-widest">Guest Origin</h3>
              <div className="space-y-6">
                 {[
                   { label: 'Europe', pct: 45 },
                   { label: 'North America', pct: 32 },
                   { label: 'Asia', pct: 18 },
                   { label: 'Others', pct: 5 }
                 ].map(o => (
                   <div key={o.label} className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-primary">
                       <span>{o.label}</span>
                       <span>{o.pct}%</span>
                     </div>
                     <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                       <div className="h-full bg-accent rounded-full" style={{width: `${o.pct}%`}}></div>
                     </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-primary text-white p-12 rounded-[3.5rem] shadow-2xl flex flex-col justify-center space-y-6">
              <span className="material-symbols-outlined text-accent text-5xl">auto_awesome</span>
              <h3 className="text-3xl font-black tracking-tighter">AI Opportunity Alert</h3>
              <p className="text-white/70 text-lg font-medium leading-relaxed">Guests from <span className="text-white font-black">Berlin</span> are viewing your Nordic Cabin 4x more than average. We recommend offering a 'Northern Lights Special' for late November.</p>
              <button className="self-start px-10 py-4 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-black/20 hover:bg-sand-light transition-all">Launch Special</button>
           </div>
        </div>
      </div>
    </LandlordLayout>
  );
};
