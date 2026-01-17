import React, { useState } from 'react';
import { useAdminReports } from '../../services/admin/hooks';
import { AdminLayout } from './AdminLayout';

export const AdminReports: React.FC = () => {
  const { reports, loading: isLoading } = useAdminReports();
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdateStatus = async (status: 'REVIEWED' | 'ACTION_TAKEN') => {
    if (!selectedReport) return;
    // TODO: Backend endpoint for updating a report's status does not exist.
    console.warn("Update report status functionality is disabled.");
    // setIsProcessing(true);
    // try {
    //   await adminService.updateReportStatus(selectedReport.id, status);
    //   refetch();
    //   setSelectedReport(null);
    // } catch (error) {
    //   console.error("Failed to update report status:", error);
    // } finally {
    //   setIsProcessing(false);
    // }
  };

  const DossierModal = () => {
    if (!selectedReport) return null;
    
    return (
      <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in" onClick={() => setSelectedReport(null)}>
        <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
          <div className="p-10 space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-primary tracking-tighter">Audit Dossier</h2>
              <p className="text-sm font-bold text-text-muted">Report ID: {selectedReport.id}</p>
            </div>
             <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <img src={selectedReport.imageUrl} className="w-full h-full object-cover" alt="Report evidence"/>
             </div>
            <div className="bg-sand-light/20 p-6 rounded-2xl border border-primary/5 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Violation Details</h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">Target:</span>
                <span className="font-medium text-primary/80">{selectedReport.entityName} ({selectedReport.entityType})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">Reason:</span>
                <span className="font-bold text-red-600">{selectedReport.reason}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">Submitted:</span>
                <span className="font-medium text-primary/80">{new Date(selectedReport.reportedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="p-8 bg-sand-light/30 flex gap-4">
            <button onClick={() => handleUpdateStatus('REVIEWED')} disabled={true} className="flex-1 h-14 bg-white border border-primary/10 text-primary/70 font-black rounded-2xl hover:bg-sand-light transition-all disabled:opacity-50">
              {isProcessing ? '...' : 'Dismiss'}
            </button>
            <button onClick={() => handleUpdateStatus('ACTION_TAKEN')} disabled={true} className="flex-1 h-14 bg-primary text-white font-black rounded-2xl hover:bg-primary-hover transition-all shadow-lg disabled:opacity-50">
              {isProcessing ? '...' : 'Take Action'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <DossierModal />
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <header className="space-y-4">
            <h2 className="text-5xl font-black text-primary tracking-tighter leading-none">Violation Sentinel</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
                {[
                    {label: "Active Reports", val: reports.length, trend: "Attention", col: "text-accent" },
                    {label: "Pending Review", val: reports.filter(r => r.status === 'PENDING').length, trend: "Newest", col: "text-red-600" },
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
              {isLoading ? (
                <div className="p-10 text-center text-text-muted">Loading violation reports...</div>
              ) : (
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
                        {reports.map((r) => (
                            <tr key={r.id} className="hover:bg-sand-light/5 transition-colors group">
                                <td className="py-8 px-10">
                                    <div className="flex items-center gap-6">
                                        <div className="size-20 rounded-[1.5rem] bg-gray-200 overflow-hidden shadow-lg border-4 border-white shrink-0 group-hover:scale-105 transition-transform"><img className="h-full w-full object-cover" src={r.imageUrl} alt=""/></div>
                                        <p className="font-black text-primary text-xl tracking-tighter">{r.entityName}</p>
                                    </div>
                                </td>
                                <td className="py-8 px-10">
                                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-800 border border-red-100 shadow-sm">{r.reason}</span>
                                </td>
                                <td className="py-8 px-10">
                                  <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${r.status === 'PENDING' ? 'bg-accent/10 text-accent border-accent/20 animate-pulse' : 'bg-primary/5 text-primary/50 border-primary/10'}`}>{r.status}</span>
                                </td>
                                <td className="py-8 px-10 text-right">
                                   <button onClick={() => setSelectedReport(r)} className="px-8 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all">Audit Dossier</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              )}
            </div>
        </div>
      </div>
    </AdminLayout>
  );
};