import React, { useState } from 'react';
import { usePendingVerifications, useUpdateVerificationStatus } from '../../services/admin/hooks';
import { AdminLayout } from './AdminLayout';

export const AdminVerification: React.FC = () => {
  const { verifications, loading: isLoading, refetch } = usePendingVerifications();
  const { updateStatus } = useUpdateVerificationStatus();
  const [selectedVerification, setSelectedVerification] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdateStatus = async (action: 'APPROVE' | 'REJECT') => {
    if (!selectedVerification) return;
    setIsProcessing(true);
    try {
      await updateStatus(selectedVerification.id, action);
      setSelectedVerification(null);
      refetch();
    } catch (error) {
      console.error("Failed to update verification status:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const DossierModal = () => {
    if (!selectedVerification) return null;
    
    return (
      <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in" onClick={() => setSelectedVerification(null)}>
        <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
          <div className="p-10 space-y-8">
            <div className="flex items-center gap-6">
              <div className="size-20 rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white">
                <img src={selectedVerification.user.avatarUrl} className="w-full h-full object-cover" alt="User Avatar"/>
              </div>
              <div>
                <h2 className="text-3xl font-black text-primary tracking-tighter">{selectedVerification.user.firstname} {selectedVerification.user.lastname}</h2>
                <p className="text-sm font-bold text-text-muted">{selectedVerification.user.email}</p>
              </div>
            </div>
            <div className="bg-sand-light/20 p-6 rounded-2xl border border-primary/5 space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Submission Details</h3>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">Document Type:</span>
                <span className="font-medium text-primary/80">{selectedVerification.documentType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">Submitted:</span>
                <span className="font-medium text-primary/80">{new Date(selectedVerification.submittedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="p-8 bg-sand-light/30 flex gap-4">
            <button 
              onClick={() => handleUpdateStatus('REJECT')}
              disabled={isProcessing}
              className="flex-1 h-14 bg-red-50 text-red-700 font-black rounded-2xl hover:bg-red-100 transition-all disabled:opacity-50"
            >
              {isProcessing ? '...' : 'Reject'}
            </button>
            <button 
              onClick={() => handleUpdateStatus('APPROVE')}
              disabled={isProcessing}
              className="flex-1 h-14 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 transition-all shadow-lg disabled:opacity-50"
            >
              {isProcessing ? '...' : 'Approve'}
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
        <div className="space-y-3">
          <h1 className="text-5xl font-black text-primary tracking-tighter leading-none">Security Citadel</h1>
          <p className="text-xl text-text-muted font-medium">Verify the human identity behind every architectural engagement.</p>
        </div>

        <div className="bg-white rounded-[3.5rem] border border-primary/5 shadow-2xl overflow-hidden">
          <div className="p-10 border-b border-primary/5 bg-sand-light/10 flex justify-between items-center">
             <h3 className="text-xl font-black text-primary uppercase tracking-widest">Verification Pipeline ({isLoading ? '...' : verifications.length} Pending)</h3>
             <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Batch Approve Safe</button>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            {isLoading ? (
              <div className="p-10 text-center text-text-muted">Loading verification pipeline...</div>
            ) : verifications.length === 0 ? (
              <div className="p-10 text-center text-text-muted">The verification queue is clear.</div>
            ) : (
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
                  {verifications.map((v) => (
                    <tr key={v.id} className="hover:bg-sand-light/5 transition-colors group">
                      <td className="py-8 px-10 border-b border-primary/5">
                        <div className="flex items-center gap-5">
                          <div className="size-16 rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white group-hover:scale-105 transition-transform">
                            <img src={v.user.avatarUrl} className="w-full h-full object-cover" alt={`${v.user.firstname} ${v.user.lastname}`} />
                          </div>
                          <span className="font-black text-primary text-xl tracking-tighter">{v.user.firstname} {v.user.lastname}</span>
                        </div>
                      </td>
                      <td className="py-8 px-10 border-b border-primary/5">
                         <span className="px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/5">{v.user.role}</span>
                      </td>
                      <td className="py-8 px-10 border-b border-primary/5">
                         <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-accent">description</span>
                            <span className="font-bold text-primary/70">{v.documentType}</span>
                         </div>
                      </td>
                      <td className="py-8 px-10 border-b border-primary/5">
                         <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-accent bg-accent/5">
                           Manual Review
                         </span>
                      </td>
                      <td className="py-8 px-10 border-b border-primary/5 text-right">
                        <button onClick={() => setSelectedVerification(v)} className="px-8 py-3 bg-white border border-primary/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm">Audit Dossier</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-8 right-8 text-xs font-black text-primary/20 uppercase tracking-[0.4em]">TerraRent Integrity Protocol v4.2</div>
      </div>
    </AdminLayout>
  );
};