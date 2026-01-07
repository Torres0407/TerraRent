
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="font-display bg-sand-light dark:bg-background-dark text-primary antialiased min-h-screen">
      <div className="min-h-screen w-full flex flex-col md:flex-row">
        {/* Side Panel */}
        <div className="hidden md:flex md:w-1/2 lg:w-5/12 relative overflow-hidden bg-primary">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay" 
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000')"}}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 to-primary/90"></div>
          <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-accent">forest</span>
              <h1 className="text-2xl font-bold tracking-tight uppercase">TerraRent</h1>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Find your sanctuary in nature.</h2>
              <p className="text-lg text-white/80 max-w-md font-light">Join thousands of verified renters discovering premium, earthy properties that feel like home.</p>
            </div>
            <div className="flex gap-2">
              <div className="h-1.5 w-8 bg-white rounded-full"></div>
              <div className="h-1.5 w-2 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Verification Form */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 bg-white/80 dark:bg-background-dark/95 backdrop-blur-sm relative">
          <div className="w-full max-w-[480px] space-y-8">
            <Link to="/login" className="group flex items-center gap-2 text-sm font-bold text-accent hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span> Back to login
            </Link>
            
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white tracking-tight">Verify it's you</h2>
              <p className="text-base text-text-muted dark:text-gray-400">We sent a 6-digit verification code to <br/><span className="font-bold text-primary dark:text-white underline decoration-accent decoration-2 underline-offset-4">alexandra@example.com</span></p>
            </div>
            
            <div className="py-2">
              <fieldset className="flex justify-between gap-2 sm:gap-4">
                {[...Array(6)].map((_, i) => (
                  <input 
                    key={i} 
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-sand-light/30 dark:bg-[#2a3622] text-primary dark:text-white border border-sand/50 rounded-xl focus:outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all" 
                    maxLength={1} 
                    placeholder="-" 
                    type="text"
                  />
                ))}
              </fieldset>
            </div>
            
            <button 
              onClick={() => navigate('/login')} 
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white h-16 rounded-xl font-bold text-lg transition-all shadow-xl active:scale-[0.99]"
            >
              Verify Account <span className="material-symbols-outlined text-xl">check_circle</span>
            </button>
            
            <div className="text-center space-y-4 pt-2">
              <p className="text-sm font-bold text-text-muted dark:text-gray-400">
                Didn't receive the code? 
                <button className="text-accent hover:text-primary font-black ml-1 transition-colors">Resend in 00:30</button>
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-6 text-xs text-text-muted text-center w-full">© 2024 TerraRent Inc. Secure Verification.</div>
        </div>
      </div>
    </div>
  );
};
