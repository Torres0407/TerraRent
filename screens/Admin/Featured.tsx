
import React from 'react';
import { AdminLayout } from './AdminLayout';

export const AdminFeatured: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <header className="flex-shrink-0 flex items-center justify-between border-b border-primary/5 pb-10">
            <div className="space-y-1">
              <h2 className="text-5xl font-black text-primary tracking-tighter">Curation Suite</h2>
              <p className="text-xl text-text-muted font-medium">Refining the highest standard of architectural stays for the homepage.</p>
            </div>
            <button className="px-8 py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-primary-hover shadow-2xl shadow-primary/20 flex items-center gap-2 transition-all active:scale-95">
                <span className="material-symbols-outlined text-lg">save</span>
                Commit Collection
            </button>
        </header>

        <div className="bg-white border border-primary/5 rounded-[4rem] shadow-2xl overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full">
                    <thead>
                        <tr className="bg-sand-light/10 border-b border-primary/5">
                            <th className="py-10 px-12 text-left text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Curation Rank</th>
                            <th className="py-10 px-12 text-left text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Stay Identity</th>
                            <th className="py-10 px-12 text-left text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Demographic Appeal</th>
                            <th className="py-10 px-12 text-left text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Placement State</th>
                            <th className="py-10 px-12 text-right text-[10px] font-black text-primary/40 uppercase tracking-[0.3em]">Curation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5">
                        {[
                            {rank: 1, name: "Villa Solstice", loc: "Tuscany, Italy", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=400" },
                            {rank: 2, name: "Desert Bloom", loc: "Joshua Tree, CA", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400" },
                            {rank: 3, name: "The Old Mill", loc: "Cotswolds, UK", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400" },
                        ].map((p,i) => (
                            <tr key={i} className="group hover:bg-sand-light/5 transition-all duration-300">
                                <td className="py-10 px-12"><span className="text-4xl font-black text-primary/20 group-hover:text-accent transition-colors leading-none">{p.rank}</span></td>
                                <td className="py-10 px-12">
                                    <div className="flex items-center gap-6">
                                        <div className="h-24 w-32 flex-shrink-0 overflow-hidden rounded-[2rem] border-4 border-white shadow-xl group-hover:scale-105 transition-transform"><img className="h-full w-full object-cover" src={p.img}/></div>
                                        <div className="min-w-0">
                                          <p className="text-xl font-black text-primary tracking-tighter truncate">{p.name}</p>
                                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mt-1">{p.loc}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-10 px-12 text-sm text-primary/60 font-bold">Nature Lovers • Luxury Escapes</td>
                                <td className="py-10 px-12">
                                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-700 border border-green-100">Active High-Priority</span>
                                </td>
                                <td className="py-10 px-12 text-right">
                                  <button className="size-12 rounded-2xl bg-sand-light/10 text-primary/30 hover:bg-primary hover:text-white transition-all shadow-sm"><span className="material-symbols-outlined">drag_indicator</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};
