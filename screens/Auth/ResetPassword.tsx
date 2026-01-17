
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col text-primary dark:text-white">
      <header className="flex items-center justify-between whitespace-nowrap px-8 py-6 lg:px-20 z-10 relative">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-10 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg">
            <span className="material-symbols-outlined text-2xl">forest</span>
          </div>
          <h2 className="text-primary dark:text-white text-2xl font-bold tracking-tight uppercase tracking-tighter">TerraRent</h2>
        </Link>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 lg:p-0 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-white/20 rounded-full blur-3xl pointer-events-none mix-blend-overlay"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply"></div>
        
        <div className="w-full max-w-[1440px] flex flex-col lg:flex-row h-full lg:h-[750px] rounded-[3rem] overflow-hidden shadow-2xl bg-white dark:bg-[#2c3327] mx-auto relative z-10 border border-white/40 dark:border-white/10">
          <div className="hidden lg:flex w-1/2 relative bg-primary">
            <div className="absolute inset-0 z-0">
              <img alt="Modern home" className="w-full h-full object-cover opacity-90 mix-blend-multiply" src="https://images.unsplash.com/photo-1449156001533-cb39c7324c60?auto=format&fit=crop&q=80&w=1000"/>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent z-10"></div>
            <div className="relative z-20 flex flex-col justify-end p-16 h-full text-white">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md w-fit text-sm font-medium mb-6 border border-white/20">
                <span className="material-symbols-outlined text-sm">security</span> Secure Environment
              </span>
              <h1 className="text-5xl font-black leading-tight mb-4 tracking-tighter">Welcome back to your <br/>sanctuary.</h1>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:p-20 bg-[#fbf7f3] dark:bg-[#2c3327] relative">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8">
                <div className="size-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <span className="material-symbols-outlined text-3xl">lock_reset</span>
                </div>
                <h2 className="text-4xl font-black text-primary dark:text-white mb-2 tracking-tighter">New Password</h2>
                <p className="text-text-muted font-medium">Please enter your new secure password below.</p>
              </div>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/login'); }}>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-primary dark:text-gray-200 uppercase tracking-widest">New Password</label>
                  <div className="relative group">
                    <input className="w-full px-5 py-4 bg-white dark:bg-black/20 border border-[#cfd7e7] dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all dark:text-white" placeholder="Enter your new password" type="password" required/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-primary dark:text-gray-200 uppercase tracking-widest">Confirm Password</label>
                  <div className="relative group">
                    <input className="w-full px-5 py-4 bg-white dark:bg-black/20 border border-[#cfd7e7] dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all dark:text-white" placeholder="Re-enter your new password" type="password" required/>
                  </div>
                </div>
                <div className="pt-4 flex flex-col gap-4">
                  <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white h-16 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98]">
                    Reset Password <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                  <Link to="/login" className="w-full flex items-center justify-center text-primary dark:text-white font-bold text-sm hover:text-accent transition-colors gap-1 mt-4">
                    <span className="material-symbols-outlined text-lg">arrow_back</span> Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 text-text-muted/60 dark:text-white/40 text-xs font-medium">© 2024 TerraRent Inc. All rights reserved.</div>
      </main>
    </div>
  );
};
