
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ScheduleTour: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(24);
  const [selectedTime, setSelectedTime] = useState('14:00');

  return (
    <div className="bg-background-light font-display min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-primary/5 px-10 py-5 flex justify-between">
        <Link to="/" className="flex items-center gap-3 text-primary">
          <span className="material-symbols-outlined text-3xl">forest</span>
          <h2 className="text-xl font-black uppercase tracking-tighter">TerraRent</h2>
        </Link>
        <Link to="/dashboard" className="text-sm font-bold text-accent">Return to Dashboard</Link>
      </header>
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Col: Property Card */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-5 shadow-2xl border border-primary/5">
            <div 
              className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 bg-cover bg-center shadow-lg" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000')" }}
            ></div>
            <div className="px-3 pb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Touring Sanctuary</span>
              <h3 className="text-3xl font-black text-primary mt-2">The Nordic A-Frame</h3>
              <p className="text-text-muted mt-2 font-medium">Reykjavík, Iceland</p>
            </div>
          </div>
          
          <div className="p-8 bg-white rounded-3xl border border-primary/5 shadow-sm space-y-4">
            <h4 className="font-black text-primary uppercase tracking-widest text-sm">Tour Details</h4>
            <div className="flex items-center gap-4 text-text-muted">
              <span className="material-symbols-outlined text-accent">schedule</span>
              <span className="font-medium">30-minute private tour</span>
            </div>
            <div className="flex items-center gap-4 text-text-muted">
              <span className="material-symbols-outlined text-accent">person</span>
              <span className="font-medium">Hosted by Sarah (Property Owner)</span>
            </div>
          </div>
        </div>
        
        {/* Right Col: Scheduler */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <div className="space-y-3">
            <h1 className="text-5xl font-black text-primary tracking-tighter">Schedule a tour</h1>
            <p className="text-lg text-text-muted font-medium">Choose a time that works for your journey.</p>
          </div>
          
          <div className="flex flex-col gap-10 bg-white p-10 rounded-[3rem] shadow-2xl border border-primary/5">
            <div className="space-y-6">
               <h3 className="font-black text-primary uppercase tracking-widest text-sm">October 2024</h3>
               <div className="grid grid-cols-7 gap-3 text-center">
                 {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d} className="text-[10px] font-black text-primary/30">{d}</span>)}
                 {[...Array(20)].map((_, i) => <div key={i} className="aspect-square flex items-center justify-center text-sm font-medium text-primary/20">{i+1}</div>)}
                 {[21, 22, 23, 24, 25, 26, 27].map(d => (
                    <button 
                      key={d} 
                      onClick={() => setSelectedDate(d)}
                      className={`aspect-square rounded-full flex items-center justify-center text-sm font-black transition-all ${selectedDate === d ? 'bg-primary text-white shadow-lg' : 'hover:bg-sand-light text-primary'}`}
                    >
                      {d}
                    </button>
                 ))}
               </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-black text-primary uppercase tracking-widest text-sm">Available Slots</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(t => (
                   <button 
                     key={t}
                     onClick={() => setSelectedTime(t)}
                     className={`py-4 rounded-2xl font-black text-sm transition-all border ${selectedTime === t ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white border-primary/10 text-primary hover:border-accent'}`}
                   >
                     {t}
                   </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-primary hover:bg-primary-hover text-white text-lg font-black py-5 px-8 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95 mt-4"
            >
              <span>Confirm Tour</span> <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
