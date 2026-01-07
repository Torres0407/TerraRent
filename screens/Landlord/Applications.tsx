
import React from 'react';
import { LandlordLayout } from './LandlordLayout';

export const LandlordApplications: React.FC = () => {
  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-primary dark:text-white tracking-tighter">Tenant Candidates</h1>
          <p className="text-xl text-text-muted font-medium">Review architectural residency applications for long-term stays.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: "Total Apps", val: "12", sub: "Last 3 months" },
             { label: "Under Review", val: "4", sub: "Action required" },
             { label: "Match Avg", val: "88%", sub: "Sanctuary compatibility" }
           ].map((c, i) => (
             <div key={i} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-primary/5 shadow-xl">
                <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-4">{c.label}</p>
                <h3 className="text-5xl font-black text-primary dark:text-white tracking-tighter">{c.val}</h3>
                <p className="text-xs font-bold text-text-muted mt-2">{c.sub}</p>
             </div>
           ))}
        </div>
        
        <div className="bg-white dark:bg-surface-dark rounded-[4rem] shadow-2xl border border-primary/5 overflow-hidden">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-sand-light/10 border-b border-primary/5">
                <tr>
                  <th className="py-8 px-10 text-[10px] uppercase font-black tracking-[0.3em] text-primary/40">Applicant Profile</th>
                  <th className="py-8 px-10 text-[10px] uppercase font-black tracking-[0.3em] text-primary/40 text-center">Sanctuary Match</th>
                  <th className="py-8 px-10 text-[10px] uppercase font-black tracking-[0.3em] text-primary/40">Financial Trust</th>
                  <th className="py-8 px-10 text-[10px] uppercase font-black tracking-[0.3em] text-primary/40 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {[
                  { name: "Sarah Jenkins", score: 85, credit: "720 - Robust", img: "https://picsum.photos/seed/sarah/100" },
                  { name: "David Miller", score: 92, credit: "780 - Exceptional", img: "https://picsum.photos/seed/david/100" },
                  { name: "Elena Rodriguez", score: 88, credit: "750 - Strong", img: "https://picsum.photos/seed/elena/100" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-sand-light/5 transition-colors group">
                    <td className="py-8 px-10 flex items-center gap-5">
                      <div className="size-14 rounded-[1.2rem] overflow-hidden shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                         <img src={row.img} alt={row.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="font-black text-primary dark:text-white text-lg tracking-tighter">{row.name}</span>
                        <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">Aspen Loft Applicant</p>
                      </div>
                    </td>
                    <td className="py-8 px-10">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-32 bg-sand-light/30 h-2 rounded-full overflow-hidden relative">
                           <div className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-1000 shadow-sm" style={{width: `${row.score}%`}}></div>
                        </div>
                        <span className="text-xs font-black text-primary">{row.score}% Compatibility</span>
                      </div>
                    </td>
                    <td className="py-8 px-10">
                       <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-green-600 text-lg">verified</span>
                          <span className="text-sm font-bold text-primary/70">{row.credit}</span>
                       </div>
                    </td>
                    <td className="py-8 px-10 text-right">
                      <button className="px-8 py-3 bg-white border border-primary/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm">Review File</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};
