
import React from 'react';
import { AdminLayout } from './AdminLayout';

export const AdminVerification: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="space-y-3">
          <h1 className="text-5xl font-black text-primary tracking-tighter leading-none">Security Citadel</h1>
          <p className="text-xl text-text-muted font-medium">Verify the human identity behind every architectural engagement.</p>
        </div>

        <div className="bg-white rounded-[3.5rem] border border-primary/5 shadow-2xl overflow-hidden">
          <div className="p-10 border-b border-primary/5 bg-sand-light/10 flex justify-between items-center">
             <h3 className="text-xl font-black text-primary uppercase tracking-widest">Verification Pipeline (12 Pending)</h3>
             <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Batch Approve Safe</button>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] border-b border-primary/5">
                  <th className="py-8 px-10">Subject Identity</th>
                  <th className="py-8 px-10">Role Path</th>
                  <th className="py-8 px-10">Artifact Type</th>
                  <th className="py-8 px-10">Threat Index</th>
                  <th className="py-8 px-10 text-right">Investigation</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {[
                  { name: "Sarah Jenkins", role: "Host", doc: "Passport (EU)", risk: "Zero Threat", riskCol: "text-green-600 bg-green-50", img: "https://picsum.photos/seed/sarah/100" },
                  { name: "Michael Chen", role: "Renter", doc: "Driver License (US)", risk: "Manual Review", riskCol: "text-accent bg-accent/5", img: "https://picsum.photos/seed/michael/100" },
                ].map((u, i) => (
                  <tr key={i} className="hover:bg-sand-light/5 transition-colors group">
                    <td className="py-8 px-10 border-b border-primary/5">
                      <div className="flex items-center gap-5">
                        <div className="size-16 rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white group-hover:scale-105 transition-transform">
                          <img src={u.img} className="w-full h-full object-cover" alt={u.name} />
                        </div>
                        <span className="font-black text-primary text-xl tracking-tighter">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-8 px-10 border-b border-primary/5">
                       <span className="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/5">{u.role}</span>
                    </td>
                    <td className="py-8 px-10 border-b border-primary/5">
                       <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-accent">description</span>
                          <span className="font-bold text-primary/70">{u.doc}</span>
                       </div>
                    </td>
                    <td className="py-8 px-10 border-b border-primary/5">
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${u.riskCol}`}>
                         {u.risk}
                       </span>
                    </td>
                    <td className="py-8 px-10 border-b border-primary/5 text-right">
                      <button className="px-8 py-3 bg-white border border-primary/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm">Audit Dossier</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="absolute bottom-8 right-8 text-xs font-black text-primary/20 uppercase tracking-[0.4em]">TerraRent Integrity Protocol v4.2</div>
      </div>
    </AdminLayout>
  );
};
