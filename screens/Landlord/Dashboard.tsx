import React, { useEffect, useState } from 'react';
import { landlordApi } from '../../api/endpoints/landlord';
import { LandlordDashboardData } from '../../types';
import { LandlordLayout } from './LandlordLayout';

export const LandlordDashboard: React.FC = () => {
  const [data, setData] = useState<LandlordDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
       const dashboardData = await landlordApi.getDashboard();
console.log("LANDLORD DASHBOARD API RAW:", dashboardData);

        setData(dashboardData);
      } catch (err) {
        console.error("Failed to fetch landlord dashboard data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <LandlordLayout>
        <div className="p-8 md:p-12 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-muted font-semibold">Loading Dashboard...</p>
          </div>
        </div>
      </LandlordLayout>
    );
  }

  if (error || !data) {
    return (
      <LandlordLayout>
        <div className="p-8 md:p-12 flex items-center justify-center min-h-[60vh]">
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
      </LandlordLayout>
    );
  }

  const { user, stats, liveBookings, priorityActions } = data;

  const statCards = [
    { title: "Total Revenue", val: `$${stats.totalRevenue.toLocaleString()}`, change: "+12%", icon: "payments", bg: "#f0fdf4" },
    { title: "Occupancy", val: `${stats.occupancyRate}%`, change: "+4%", icon: "pie_chart", bg: "#eff6ff" },
    { title: "Active Assets", val: stats.activeProperties, change: "Stable", icon: "house", bg: "#fff7ed", isNeutral: true },
    { title: "New Requests", val: stats.newRequests, change: `+${stats.newRequests} New`, icon: "notifications_active", bg: "#fef2f2" }
  ];
  

  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-primary dark:text-white tracking-tighter">Portfolio Insight</h2>
            <p className="text-text-muted font-medium">Welcome back, {user.firstname}. Your architectural stays are performing well today.</p>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-primary/60 bg-white dark:bg-surface-dark px-4 py-2 rounded-xl shadow-sm border border-primary/5">
            <span className="material-symbols-outlined text-accent">calendar_today</span>
            <span>Last 30 Days</span>
            <span className="material-symbols-outlined">expand_more</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark p-8 rounded-[2rem] border border-primary/5 shadow-xl shadow-black/[0.02] hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className={`size-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`} style={{backgroundColor: stat.bg}}>
                  <span className={`material-symbols-outlined text-2xl`}>{stat.icon}</span>
                </div>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${stat.isNeutral ? 'bg-gray-100 text-gray-500' : 'bg-green-50 text-green-700'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs font-black text-primary/40 uppercase tracking-widest mb-1">{stat.title}</p>
              <p className="text-3xl font-black text-primary dark:text-white">{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-primary/5 shadow-xl">
              <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-widest mb-8">Performance Trends</h3>
              <div className="h-64 w-full bg-sand-light/20 rounded-3xl flex items-center justify-center text-primary/30 font-bold italic">
                [AI-Optimized Revenue Projection Chart]
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-primary/5 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-primary dark:text-white uppercase tracking-widest">Live Bookings</h3>
                <button className="text-xs font-black text-accent uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em] border-b border-primary/5">
                      <th className="pb-6">Sanctuary</th>
                      <th className="pb-6">Tenant</th>
                      <th className="pb-6">Timeline</th>
                      <th className="pb-6 text-right">State</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium">
                    {liveBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-sand-light/10 group transition-colors">
                        <td className="py-6 border-b border-primary/5">
                          <span className="block font-black text-primary dark:text-white">{booking.property.title}</span>
                          <span className="text-xs text-text-muted">{booking.property.type}</span>
                        </td>
                        <td className="py-6 border-b border-primary/5 text-primary/70">{booking.user.firstname} {booking.user.lastname}</td>
                        <td className="py-6 border-b border-primary/5 text-primary/70">{new Date(booking.startDate).toLocaleDateString('en-US', {month:'short', day:'numeric'})} - {new Date(booking.endDate).toLocaleDateString('en-US', {month:'short', day:'numeric'})}</td>
                        <td className="py-6 border-b border-primary/5 text-right">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === 'CONFIRMED' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-primary text-white p-10 rounded-[3rem] shadow-2xl shadow-primary/30 relative overflow-hidden">
               <div className="absolute -top-10 -right-10 size-40 bg-white/10 rounded-full blur-3xl"></div>
               <h3 className="text-xl font-black uppercase tracking-widest mb-8">Priority Actions</h3>
               <div className="space-y-6">
                  {priorityActions.map((action, i) => (
                    <div key={i} className="flex gap-4 items-start p-6 bg-white/10 rounded-[2rem] border border-white/10">
                       <span className="material-symbols-outlined text-accent">{action.type.includes('Maintenance') ? 'plumbing' : 'description'}</span>
                       <div>
                          <p className="font-black text-sm">{action.type}</p>
                          <p className="text-xs text-white/60 mt-1">{action.message}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="bg-sand-light/30 p-10 rounded-[3rem] border border-primary/5 space-y-6">
               <h3 className="text-sm font-black text-primary uppercase tracking-widest">Market Comparison</h3>
               <p className="text-xs font-medium text-text-muted">Your properties are priced <span className="text-primary font-black">8% higher</span> than local averages with higher occupancy.</p>
               <button className="w-full py-4 bg-white border border-primary/10 rounded-2xl text-xs font-black text-primary uppercase tracking-widest hover:bg-sand-light transition-all shadow-sm">AI Pricing Optimizer</button>
            </div>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};