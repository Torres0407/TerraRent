import React, { useEffect, useState } from 'react';
import { landlordApi } from '../../api/endpoints/landlord';
import { BookingRequest } from '../../types';
import { LandlordLayout } from './LandlordLayout';

export const LandlordRequests: React.FC = () => {
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await landlordApi.getBookingRequests();
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch booking requests:", err);
        setError("Failed to load booking requests.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <LandlordLayout>
      <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-primary dark:text-white tracking-tighter">Booking Petitions</h1>
          <p className="text-xl text-text-muted font-medium">Curate the guests who will experience your sanctuaries.</p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-muted font-semibold">Loading new requests...</p>
          </div>
        ) : error ? (
          <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-red-200">
            <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
            <p className="text-red-500 font-semibold mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Retry
            </button>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center text-text-muted font-semibold py-20 bg-white rounded-3xl border border-primary/5 shadow-xl">
            You have no pending booking requests.
          </div>
        ) : (
          <div className="space-y-8">
            {requests.map((req) => (
              <div key={req.id} className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] border border-primary/5 shadow-2xl flex flex-col lg:flex-row gap-12 group transition-all hover:shadow-black/[0.05]">
                <div className="flex flex-col items-center text-center lg:w-48 shrink-0 space-y-4">
                  <div className="size-24 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group-hover:scale-105 transition-transform">
                    <img src={req.user.avatarUrl} alt={`${req.user.firstname} ${req.user.lastname}`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-primary dark:text-white leading-tight">{req.user.firstname} {req.user.lastname}</h4>
                    {req.user.isVerified && <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent mt-1 block">Verified Tenant</span>}
                  </div>
                </div>
                
                <div className="flex-1 space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-primary dark:text-white tracking-tighter">{req.property.title}</h3>
                      <p className="text-xs font-black text-primary/40 uppercase tracking-widest mt-1">{req.startDate} - {req.endDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-primary/40 uppercase tracking-widest">Total Payout</p>
                      <p className="text-3xl font-black text-primary dark:text-white tracking-tighter">${req.totalPayout.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="bg-sand-light/10 p-8 rounded-[2rem] border border-primary/5 relative">
                    <span className="material-symbols-outlined absolute -top-3 -left-3 text-accent bg-white rounded-full p-1 shadow-sm">format_quote</span>
                    <p className="text-sm font-medium text-primary/70 leading-relaxed italic">"{req.message}"</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="flex-1 bg-primary text-white font-black py-5 rounded-2xl flex justify-center items-center gap-2 shadow-xl shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all">
                      Accept Reservation <span className="material-symbols-outlined text-lg">check_circle</span>
                    </button>
                    <button className="flex-1 border-2 border-primary/10 text-primary/60 font-black py-5 rounded-2xl hover:bg-sand-light transition-all">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LandlordLayout>
  );
};