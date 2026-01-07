
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Application: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light text-primary font-display min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/5 bg-white/90 backdrop-blur-md px-10 py-5">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
            <span className="material-symbols-outlined">forest</span>
          </div>
          <h2 className="text-xl font-black uppercase tracking-tighter">TerraRent</h2>
        </Link>
        <Link to="/dashboard" className="rounded-xl bg-white border border-primary/10 px-6 py-2 text-sm font-black text-primary hover:bg-sand-light transition-all">Save & Exit</Link>
      </header>
      
      <div className="flex flex-col md:flex-row flex-1">
        <main className="flex-1 px-6 py-12 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-black text-accent uppercase tracking-[0.3em]">Step 1 of 4</span>
              <h1 className="text-5xl font-black text-primary tracking-tighter">Tell us about yourself</h1>
              <p className="text-lg text-text-muted font-medium">We keep your data private and use it only for this application.</p>
            </div>
            
            <form className="flex flex-col gap-10" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
              <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-primary/5 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-black text-primary/40 uppercase tracking-widest">First Name</span>
                    <input className="h-14 rounded-xl border-primary/10 bg-sand-light/10 px-5 focus:ring-accent focus:border-accent" type="text" placeholder="John" required/>
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-xs font-black text-primary/40 uppercase tracking-widest">Last Name</span>
                    <input className="h-14 rounded-xl border-primary/10 bg-sand-light/10 px-5 focus:ring-accent focus:border-accent" type="text" placeholder="Appleseed" required/>
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-black text-primary/40 uppercase tracking-widest">Phone Number</span>
                  <input className="h-14 rounded-xl border-primary/10 bg-sand-light/10 px-5 focus:ring-accent focus:border-accent" type="tel" placeholder="+1 (555) 000-0000" required/>
                </label>
                <div className="flex flex-col gap-4">
                   <span className="text-xs font-black text-primary/40 uppercase tracking-widest">Current Address</span>
                   <input className="h-14 rounded-xl border-primary/10 bg-sand-light/10 px-5 focus:ring-accent focus:border-accent" type="text" placeholder="Street Address"/>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-10 border-t border-primary/5">
                <Link to="/dashboard" className="text-primary font-black uppercase text-sm tracking-widest hover:text-accent transition-colors">Cancel</Link>
                <button type="submit" className="bg-primary text-white rounded-2xl px-12 py-4 font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all">Next Step</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
