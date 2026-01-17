
import React from 'react';
import { Link } from 'react-router-dom';

export const Negotiation: React.FC = () => {
  return (
    <div className="bg-background-light text-primary font-display min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-white border-b border-primary/5 px-10 py-5 shadow-sm">
        <Link to="/" className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl">forest</span>
          <span className="text-xl font-black uppercase tracking-tighter">TerraRent</span>
        </Link>
      </nav>
      
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-3xl shadow-xl border border-primary/5 overflow-hidden">
            <div 
              className="h-56 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000')" }}
            ></div>
            <div className="p-8">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Negotiating Stay</span>
              <h3 className="text-2xl font-black text-primary mt-2 leading-tight">The Aspen Loft</h3>
              <p className="font-black text-3xl text-primary mt-6">$240 <span className="text-xs uppercase text-text-muted font-bold tracking-widest">/ night</span></p>
            </div>
          </div>
          
          <div className="p-8 bg-sand-light rounded-3xl space-y-4">
             <h4 className="font-black text-primary uppercase text-xs tracking-widest">Host Profile</h4>
             <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-white border border-primary/10"></div>
                <div>
                  <p className="font-black">Emily Walters</p>
                  <p className="text-xs text-text-muted font-bold">Responds in 2 hours</p>
                </div>
             </div>
          </div>
        </div>
        
        {/* Negotiation History */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-primary tracking-tighter">Negotiation History</h1>
            <p className="text-lg text-text-muted font-medium">Review and counter offers for your long-term stay.</p>
          </div>
          
          <div className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100 flex gap-6 items-start shadow-sm">
            <div className="bg-primary/10 p-4 rounded-2xl text-primary flex-shrink-0">
              <span className="material-symbols-outlined">campaign</span>
            </div>
            <div>
              <h4 className="text-xl font-black text-primary leading-tight">Action Required</h4>
              <p className="text-text-muted font-medium mt-1">Host Emily has countered your previous offer with <span className="font-black text-primary underline decoration-primary/20 decoration-2 underline-offset-4">$215 / night</span>.</p>
            </div>
          </div>
          
          <div className="space-y-10 pl-6 border-l-2 border-primary/5 ml-6 relative">
            {/* New Offer Card */}
            <div className="relative">
              <div className="absolute -left-[33px] top-6 size-4 rounded-full bg-primary border-4 border-white shadow-md"></div>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-l-8 border-l-primary w-full space-y-8 transform hover:scale-[1.01] transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-green-700 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">Active Offer</span>
                  <span className="text-xs font-bold text-text-muted">Today, 10:45 AM</span>
                </div>
                
                <div className="grid grid-cols-2 gap-10">
                   <div>
                     <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-2">Host Counter Offer</p>
                     <p className="text-5xl font-black text-primary">$215</p>
                   </div>
                   <div className="flex flex-col justify-center">
                     <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-2">Your Last Offer</p>
                     <p className="text-2xl font-bold text-text-muted line-through">$200</p>
                   </div>
                </div>
                
                <div className="pt-8 border-t border-primary/5 flex flex-col sm:flex-row gap-4">
                  <Link to="/booking" className="flex-1 bg-primary text-white font-black py-5 rounded-2xl flex justify-center items-center gap-2 shadow-xl shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all">
                    Accept $215 / night
                  </Link>
                  <button className="flex-1 border-2 border-primary text-primary font-black py-5 rounded-2xl hover:bg-sand-light/30 transition-all">
                    Counter Offer
                  </button>
                </div>
              </div>
            </div>
            
            {/* Previous History */}
            <div className="relative opacity-50">
              <div className="absolute -left-[33px] top-6 size-4 rounded-full bg-sand border-4 border-white shadow-md"></div>
              <div className="bg-white p-8 rounded-3xl border border-primary/5 w-full">
                 <div className="flex justify-between items-center mb-4">
                    <p className="text-xs font-black text-primary/40 uppercase tracking-widest">You Proposed</p>
                    <span className="text-xs font-bold text-text-muted">Yesterday</span>
                 </div>
                 <p className="text-3xl font-black text-primary">$200</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
