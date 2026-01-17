import React, { useEffect, useState } from 'react';
import { landlordApi } from '../../api/endpoints/landlord';
import { LandlordApplication } from '../../types';
import { LandlordLayout } from './LandlordLayout';

export const LandlordApplications: React.FC = () => {
  const [applications, setApplications] = useState<LandlordApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await landlordApi.getApplications();
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setError("Failed to load applications.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

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
             { label: "Under Review", val: applications.length, sub: "Action required" },
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
            {isLoading ? (
              <div className="p-10 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-text-muted font-semibold">Loading applications...</p>
              </div>
            ) : error ? (
              <div className="p-10 text-center">
                <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
                <p className="text-red-500 font-semibold mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : applications.length === 0 ? (
              <div className="p-10 text-center text-text-muted font-semibold">
                No applications to review at this time.
              </div>
            ) : (
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
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-sand-light/5 transition-colors group">
                      <td className="py-8 px-10 flex items-center gap-5">
                        <div className="size-14 rounded-[1.2rem] overflow-hidden shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                           <img src={app.user.avatarUrl} alt={`${app.user.firstname} ${app.user.lastname}`} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="font-black text-primary dark:text-white text-lg tracking-tighter">{app.user.firstname} {app.user.lastname}</span>
                          <p className="text-[9px] font-black uppercase tracking-widest text-text-muted">{app.property.title} Applicant</p>
                        </div>
                      </td>
                      <td className="py-8 px-10">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-32 bg-sand-light/30 h-2 rounded-full overflow-hidden relative">
                             <div className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-1000 shadow-sm" style={{width: `${app.compatibilityScore}%`}}></div>
                          </div>
                          <span className="text-xs font-black text-primary">{app.compatibilityScore}% Compatibility</span>
                        </div>
                      </td>
                      <td className="py-8 px-10">
                         <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-600 text-lg">verified</span>
                            <span className="text-sm font-bold text-primary/70">{app.financialTrust}</span>
                         </div>
                      </td>
                      <td className="py-8 px-10 text-right">
                        <button className="px-8 py-3 bg-white border border-primary/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm">Review File</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};