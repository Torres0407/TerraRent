import React, { useEffect, useState } from 'react';
import { adminApi } from '../../api/endpoints/admin';
import { AdminDashboardData } from '../../types';
import { AdminLayout } from './AdminLayout';

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await adminApi.getDashboardMetrics();
        setData(response.data);
      } catch (err) {
        console.error("Failed to fetch admin dashboard data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-muted font-semibold">Loading system health...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !data) {
    return (
      <AdminLayout>
        <div className="p-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-red-200">
            <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
            <p className="text-red-500 font-semibold mb-4">{error || "Failed to load dashboard data."}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const { stats, topPerformingProperties } = data;

  const statCards = [
    { icon: "payments", label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, trend: "+12%", trendCol: "text-green-600 bg-green-50" },
    { icon: "home_work", label: "Active Rentals", value: stats.activeRentals.toLocaleString(), trend: "+5%", trendCol: "text-green-600 bg-green-50" },
    { icon: "person_add", label: "New Users", value: stats.newUsers.toLocaleString(), trend: "+8%", trendCol: "text-green-600 bg-green-50" },
    { icon: "pending_actions", label: "Queue Items", value: stats.queueItems.toLocaleString(), trend: "High", trendCol: "text-accent bg-accent/5" }
  ];

  return (
    <AdminLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-primary tracking-tighter leading-none">System Health</h2>
          <p className="text-text-muted font-medium">Core platform metrics and real-time activity tracking.</p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
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
              {topPerformingProperties.map((p, i) => (
                <div key={p.id} className="flex items-center gap-4 group cursor-pointer">
                  <div className="size-14 rounded-2xl bg-cover bg-center shrink-0 shadow-lg border border-white group-hover:scale-105 transition-transform" style={{backgroundImage: `url('${p.image}')`}}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-primary truncate group-hover:text-accent transition-colors">{p.title}</p>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{p.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-primary">${p.price.toLocaleString()}</p>
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