
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignupRenter: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/verify');
  };

  return (
    <div className="bg-[#f8f7f6] dark:bg-background-dark text-text-main dark:text-gray-100 min-h-screen flex flex-col font-display antialiased">
      <header className="w-full border-b border-[#f3eee7] dark:border-white/10 px-6 py-4 lg:px-10 bg-white/50 dark:bg-background-dark/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="text-accent">
              <span className="material-symbols-outlined text-3xl">forest</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-primary dark:text-white uppercase tracking-tighter">TerraRent</h2>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm font-medium text-text-muted dark:text-gray-400">Already a member?</span>
            <Link to="/login" className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 border border-transparent hover:border-[#e7ddcf] bg-transparent hover:bg-white dark:hover:bg-white/5 transition-colors text-primary dark:text-white text-sm font-bold">
              Log In
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4 md:p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-10 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        </div>
        
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10">
          <div className="hidden lg:flex flex-col gap-6 relative h-full min-h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
            <img alt="Sunlit modern living room" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="mt-auto relative z-10 p-10 text-white">
              <div className="flex gap-2 mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md"><span className="material-symbols-outlined text-sm">verified_user</span></span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md"><span className="material-symbols-outlined text-sm">key</span></span>
              </div>
              <h3 className="text-3xl font-bold leading-tight mb-2">Find a place you'll love to call home.</h3>
              <p className="text-white/80 text-lg">Join thousands of renters finding their perfect sanctuary with TerraRent.</p>
            </div>
          </div>
          
          <div className="flex flex-col w-full max-w-md mx-auto lg:max-w-none lg:mx-0 bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 dark:border-white/5 p-6 md:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-primary dark:text-white tracking-tight mb-2">Create an account</h1>
              <p className="text-accent dark:text-gray-400 font-medium">Join TerraRent to browse exclusive, verified rental properties.</p>
            </div>
            
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-primary dark:text-gray-200">Full Name</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><span className="material-symbols-outlined text-accent dark:text-gray-500 text-[20px]">person</span></div>
                  <input className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e7ddcf] dark:border-white/20 bg-sand-light/10 dark:bg-white/5 text-primary dark:text-white focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-base" placeholder="e.g. Jane Doe" type="text" required/>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-primary dark:text-gray-200">Email Address</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><span className="material-symbols-outlined text-accent dark:text-gray-500 text-[20px]">mail</span></div>
                  <input className="w-full pl-11 pr-4 py-3 rounded-lg border border-[#e7ddcf] dark:border-white/20 bg-sand-light/10 dark:bg-white/5 text-primary dark:text-white focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-base" placeholder="jane@example.com" type="email" required/>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-primary dark:text-gray-200">Password</label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><span className="material-symbols-outlined text-accent dark:text-gray-500 text-[20px]">lock</span></div>
                  <input className="w-full pl-11 pr-12 py-3 rounded-lg border border-[#e7ddcf] dark:border-white/20 bg-sand-light/10 dark:bg-white/5 text-primary dark:text-white focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-base" placeholder="••••••••" type="password" required/>
                </div>
              </div>
              <button className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold py-3.5 transition-all shadow-md text-base group" type="submit">
                Create Account <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>
            
            <div className="relative flex py-8 items-center">
              <div className="flex-grow border-t border-[#e7ddcf] dark:border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-semibold text-text-muted dark:text-gray-500 uppercase tracking-wider">Or sign up with</span>
              <div className="flex-grow border-t border-[#e7ddcf] dark:border-white/10"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e7ddcf] dark:border-white/20 bg-white dark:bg-white/5 p-3 text-sm font-bold text-primary dark:text-white transition-all hover:bg-gray-50 dark:hover:bg-white/10">
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
                Google
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e7ddcf] dark:border-white/20 bg-white dark:bg-white/5 p-3 text-sm font-bold text-primary dark:text-white transition-all hover:bg-gray-50 dark:hover:bg-white/10">
                <span className="material-symbols-outlined text-xl">apple</span>
                Apple
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
