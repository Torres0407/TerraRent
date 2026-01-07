
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Booking: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light font-display min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/5 bg-white/90 px-10 py-5 shadow-sm backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3 text-primary">
          <span className="material-symbols-outlined text-3xl">forest</span>
          <h2 className="text-xl font-black uppercase tracking-tighter">TerraRent</h2>
        </Link>
        <Link to="/search" className="text-sm font-bold text-accent">Exit Booking</Link>
      </header>
      
      <main className="flex-1 py-12 px-6 lg:px-20 flex justify-center">
        <div className="flex flex-col lg:flex-row gap-12 max-w-[1280px] w-full">
          {/* Summary Sidebar */}
          <aside className="w-full lg:w-[400px] flex flex-col gap-8 lg:sticky lg:top-32 h-fit">
            <div className="bg-white rounded-[2rem] shadow-2xl border border-primary/5 overflow-hidden">
              <div 
                className="aspect-[16/10] bg-gray-200 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000')" }}
              ></div>
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-primary leading-tight">Joshua Tree Modern</h3>
                  <p className="text-text-muted font-medium mt-1">California, USA</p>
                </div>
                
                <div className="pt-6 border-t border-primary/5 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-primary">Rent (5 nights)</span>
                    <span className="font-medium">$2,250</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-primary">Service Fee</span>
                    <span className="font-medium">$120</span>
                  </div>
                  <div className="pt-4 border-t border-primary/5 flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-widest text-accent">Total Due</span>
                    <span className="text-4xl font-black text-primary">$2,370</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-sand-light rounded-2xl flex items-center gap-4">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <p className="text-xs font-bold text-primary/70">Secure payment and verified property guarantee included with every booking.</p>
            </div>
          </aside>
          
          {/* Checkout Form */}
          <div className="flex-1 flex flex-col gap-10">
            <h1 className="text-4xl font-black text-primary tracking-tighter">Confirm your journey</h1>
            
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-primary/5 p-10 space-y-10">
              <section className="space-y-6">
                <h2 className="text-xl font-black text-primary uppercase tracking-widest">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-primary/50 uppercase">Full Name</label>
                    <input className="w-full rounded-xl border-primary/10 bg-sand-light/10 h-14 px-5 focus:ring-accent focus:border-accent" placeholder="Alex Morgan" type="text"/>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-primary/50 uppercase">Email</label>
                    <input className="w-full rounded-xl border-primary/10 bg-sand-light/10 h-14 px-5 focus:ring-accent focus:border-accent" placeholder="alex@example.com" type="email"/>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-xl font-black text-primary uppercase tracking-widest">Payment Method</h2>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-4 p-5 rounded-2xl border-2 border-primary bg-sand-light/5 cursor-pointer">
                    <div className="size-5 rounded-full border-4 border-primary bg-white"></div>
                    <span className="material-symbols-outlined text-accent">credit_card</span>
                    <span className="font-bold">Credit or Debit Card</span>
                    <div className="ml-auto flex gap-2">
                      <div className="h-6 w-10 bg-gray-100 rounded-md"></div>
                      <div className="h-6 w-10 bg-gray-100 rounded-md"></div>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 p-5 rounded-2xl border border-primary/10 hover:bg-sand-light/20 cursor-pointer transition-all">
                    <div className="size-5 rounded-full border-2 border-primary/20"></div>
                    <span className="material-symbols-outlined text-accent">payments</span>
                    <span className="font-bold">PayPal</span>
                  </label>
                </div>
              </section>
              
              <div className="pt-8 border-t border-primary/5">
                <button 
                  onClick={() => navigate('/schedule')}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-black text-xl h-16 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                  Confirm & Reserve <span className="material-symbols-outlined">check_circle</span>
                </button>
                <p className="text-center text-xs text-text-muted mt-6 font-medium">By selecting the button above, you agree to our <span className="underline">Guest Terms</span> and <span className="underline">Refund Policy</span>.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
