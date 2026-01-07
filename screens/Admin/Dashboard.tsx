
import React from 'react';
import { AdminLayout } from './AdminLayout';

export const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-primary tracking-tighter leading-none">System Health</h2>
          <p className="text-text-muted font-medium">Core platform metrics and real-time activity tracking.</p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "payments", label: "Total Revenue", value: "$124,500", trend: "+12%", trendCol: "text-green-600 bg-green-50" },
            { icon: "home_work", label: "Active Rentals", value: "843", trend: "+5%", trendCol: "text-green-600 bg-green-50" },
            { icon: "person_add", label: "New Users", value: "1,240", trend: "+8%", trendCol: "text-green-600 bg-green-50" },
            { icon: "pending_actions", label: "Queue Items", value: "15", trend: "High", trendCol: "text-accent bg-accent/5" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-primary/5 flex flex-col gap-6 group hover:shadow-2xl transition-all">
              <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <span className={`${stat.trendCol} text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-primary tracking-tighter">{stat.value}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white rounded-[3rem] border border-primary/5 p-10 shadow-2xl space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-xl font-black text-primary uppercase tracking-widest">Revenue Momentum</h3>
                <p className="text-text-muted font-medium mt-1">Platform earnings over last 6 months</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-primary tracking-tighter">$450,200</span>
                <span className="text-green-600 text-xs font-black bg-green-50 px-2 py-1 rounded-lg">+18%</span>
              </div>
            </div>
            <div className="h-64 w-full bg-sand-light/20 rounded-[2rem] flex items-center justify-center text-primary/20 font-black italic">
              [Master Performance Chart Visualization]
            </div>
          </div>
          
          <div className="bg-white rounded-[3rem] border border-primary/5 p-10 shadow-2xl flex flex-col space-y-8">
            <h3 className="text-xl font-black text-primary uppercase tracking-widest">Top Performance</h3>
            <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
              {[
                { name: "Sunnyvale Villa", loc: "California", val: "$8,240", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=400" },
                { name: "The Loft Downtown", loc: "New York", val: "$6,100", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400" },
                { name: "Nordic A-Frame", loc: "Iceland", val: "$5,820", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400" }
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="size-14 rounded-2xl bg-cover bg-center shrink-0 shadow-lg border border-white group-hover:scale-105 transition-transform" style={{backgroundImage: `url('${p.img}')`}}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-primary truncate group-hover:text-accent transition-colors">{p.name}</p>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{p.loc}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-primary">{p.val}</p>
                    <p className="text-green-600 text-[9px] font-black uppercase">Top Stay</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-sand-light/30 rounded-2xl font-black text-[10px] uppercase tracking-widest text-primary hover:bg-sand-light transition-all">View All Rankings</button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};
