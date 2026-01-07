
import React from 'react';
import { AdminLayout } from './AdminLayout';

export const AdminUsers: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-primary tracking-tighter">Account Registry</h1>
            <p className="text-xl text-text-muted font-medium">Manage the collective of hosts, renters, and platform stewards.</p>
          </div>
          <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">
            Provision New User
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {label: "Global Members", val: "12,405", icon: "group", change: "+5.2%", col: "bg-sand-light/30" },
            {label: "Verified Hosts", val: "3,200", icon: "real_estate_agent", change: "+1.8%", col: "bg-sand-light/30" },
            {label: "In Queue", val: "15", icon: "verified_user", change: "Alert", col: "bg-accent/10" },
            {label: "New Cycle", val: "142", icon: "person_add", change: "+12%", col: "bg-sand-light/30" }
          ].map((s,i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] border border-primary/5 shadow-xl ${s.col} space-y-4`}>
                <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-white text-primary shadow-sm"><span className="material-symbols-outlined">{s.icon}</span></div>
                    <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">{s.change}</span>
                </div>
                <div>
                    <p className="text-xs font-black text-primary/40 uppercase tracking-widest">{s.label}</p>
                    <h3 className="text-3xl font-black text-primary mt-1">{s.val}</h3>
                </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] border border-primary/5 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-sand-light/10">
             <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-accent">filter_alt</span>
                <p className="text-sm font-black text-primary uppercase tracking-widest">Active Filters</p>
             </div>
             <div className="flex gap-2">
                {['All', 'Hosts', 'Renters', 'Suspended'].map(f => (
                  <button key={f} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${f === 'All' ? 'bg-primary text-white' : 'hover:bg-sand-light text-primary/60'}`}>{f}</button>
                ))}
             </div>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] border-b border-primary/5">
                  <th className="py-8 px-10">Profile</th>
                  <th className="py-8 px-10">Designation</th>
                  <th className="py-8 px-10">Internal State</th>
                  <th className="py-8 px-10">History</th>
                  <th className="py-8 px-10 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {[
                  {name: "Sarah Jenkins", email: "sarah.j@email.com", role: "Host", status: "Active", date: "Oct 12, 2023", img: "https://picsum.photos/seed/sarah/100" },
                  {name: "David Chen", email: "david.c@email.com", role: "Renter", status: "Active", date: "Nov 01, 2023", img: "https://picsum.photos/seed/david/100" },
                  {name: "Elena Rodriguez", email: "elena.r@email.com", role: "Host", status: "Pending", date: "Nov 15, 2023", img: "https://picsum.photos/seed/elena/100" }
                ].map((u, i) => (
                  <tr key={i} className="hover:bg-sand-light/5 transition-colors group">
                    <td className="py-8 px-10 border-b border-primary/5">
                      <div className="flex items-center gap-4">
                        <div className="size-14 rounded-2xl bg-cover bg-center border-2 border-white shadow-lg group-hover:scale-110 transition-transform" style={{backgroundImage: `url('${u.img}')`}}></div>
                        <div>
                          <p className="font-black text-primary leading-none text-lg tracking-tighter">{u.name}</p>
                          <p className="text-xs text-text-muted mt-1">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-8 px-10 border-b border-primary/5">
                       <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-white">{u.role}</span>
                    </td>
                    <td className="py-8 px-10 border-b border-primary/5">
                      <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${u.status === 'Active' ? 'text-green-600' : 'text-accent'}`}>
                        <span className="size-2 rounded-full bg-current shadow-lg animate-pulse"></span>
                        {u.status}
                      </div>
                    </td>
                    <td className="py-8 px-10 border-b border-primary/5 text-text-muted text-xs font-bold">{u.date}</td>
                    <td className="py-8 px-10 border-b border-primary/5 text-right">
                       <button className="size-10 rounded-xl hover:bg-sand-light transition-all text-primary/30 hover:text-accent"><span className="material-symbols-outlined">more_horiz</span></button>
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
