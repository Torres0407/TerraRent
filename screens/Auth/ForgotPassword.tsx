
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-sand dark:bg-background-dark min-h-screen flex flex-col font-display">
      <header className="w-full z-50">
        <div className="px-6 md:px-10 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
          <Link to="/" className="flex items-center gap-3 text-primary dark:text-white">
            <div className="size-8 bg-primary text-white rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">forest</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight uppercase tracking-tighter">TerraRent</h2>
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-white dark:bg-[#252822] rounded-[2rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
          <div className="hidden lg:block lg:w-1/2 relative bg-primary">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{backgroundImage: 'url("https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000")'}}
            ></div>
            <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent flex flex-col justify-end p-10">
              <blockquote className="text-white mb-6">
                <p className="text-2xl font-bold leading-relaxed tracking-tight mb-4">"Finding peace in nature has never been easier. TerraRent helped us reset."</p>
                <cite className="not-italic text-sm font-medium opacity-80 block">— The Anderson Family</cite>
              </blockquote>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
            <div className="absolute top-6 left-6 lg:top-10 lg:left-12">
              <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-primary dark:text-neutral-300 hover:text-accent transition-colors group">
                <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span> Back to Login
              </Link>
            </div>
            
            <div className="max-w-[400px] mx-auto w-full mt-12 lg:mt-0">
              <div className="mb-8 text-center lg:text-left">
                <div className="size-14 rounded-full bg-sand-light flex items-center justify-center text-accent mb-6 mx-auto lg:mx-0 shadow-sm">
                  <span className="material-symbols-outlined text-[32px]">lock_reset</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-primary dark:text-white mb-3 tracking-tighter">Reset password</h1>
                <p className="text-text-muted dark:text-neutral-400 leading-relaxed font-medium">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
              </div>
              
              <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); navigate('/reset-password'); }}>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary dark:text-neutral-300 block ml-1 uppercase tracking-widest">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400"><span className="material-symbols-outlined">mail</span></div>
                    <input className="w-full h-14 pl-11 pr-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-primary dark:text-white focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all" placeholder="you@example.com" required type="email"/>
                  </div>
                </div>
                <button className="w-full h-14 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4" type="submit">
                  <span>Send Reset Instructions</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </form>
              
              <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800 text-center">
                <p className="text-sm text-text-muted font-bold dark:text-neutral-400">Don't have an account? <Link to="/select-account" className="text-accent font-black hover:underline decoration-2 underline-offset-4">Sign up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
