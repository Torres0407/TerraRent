
import React from 'react';
import { AdminLayout } from './AdminLayout';

export const AdminReports: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <header className="space-y-4">
            <h2 className="text-5xl font-black text-primary tracking-tighter leading-none">Violation Sentinel</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
                {[
                    {label: "Active Reports", val: "142", trend: "Attention", col: "text-accent" },
                    {label: "Pending Review", val: "28", trend: "Newest", col: "text-red-600" },
                    {label: "Resolved Total", val: "86", trend: "Completed", col: "text-primary" }
                ].map((s,i)=>(
                    <div key={i} className="bg-white rounded-[2rem] p-6 shadow-xl border border-primary/5 flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">{s.label}</span>
                        <span className={`text-3xl font-black mt-2 tracking-tighter ${s.col}`}>{s.val}</span>
                    </div>
                ))}
            </div>
        </header>
        
        <div className="bg-white rounded-[3.5rem] shadow-2xl border border-primary/5 overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-sand-light/10 border-b border-primary/5 text-[10px] uppercase tracking-[0.3em] text-primary/40 font-black">
                            <th className="py-8 px-10">Target Entity</th>
                            <th className="py-8 px-10">Violation Artifact</th>
                            <th className="py-8 px-10">Threat Logic</th>
                            <th className="py-8 px-10 text-right">Investigation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5 text-sm">
                        {[
                            {name: "Sunny Loft in Downtown", reason: "Inaccurate Visuals", status: "Inquiry", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200" },
                            {name: "Rustic Cabin Retreat", reason: "Host Interaction", status: "Suspension Watch", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=200" }
                        ].map((r,i) => (
                            <tr key={i} className="hover:bg-sand-light/5 transition-colors group">
                                <td className="py-8 px-10">
                                    <div className="flex items-center gap-6">
                                        <div className="size-20 rounded-[1.5rem] bg-gray-200 overflow-hidden shadow-lg border-4 border-white shrink-0 group-hover:scale-105 transition-transform"><img className="h-full w-full object-cover" src={r.img} alt=""/></div>
                                        <p className="font-black text-primary text-xl tracking-tighter">{r.name}</p>
                                    </div>
                                </td>
                                <td className="py-8 px-10">
                                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-800 border border-red-100 shadow-sm">{r.reason}</span>
                                </td>
                                <td className="py-8 px-10">
                                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-accent/10 text-accent border border-accent/20">{r.status}</span>
                                </td>
                                <td className="py-8 px-10 text-right">
                                   <button className="px-8 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all">Open Dossier</button>
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
