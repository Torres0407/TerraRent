
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const AccountSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'renter' | 'landlord'>('renter');

  const handleContinue = () => {
    if (selectedType === 'renter') {
      navigate('/signup-renter');
    } else {
      navigate('/signup-landlord');
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display transition-colors duration-200">
      <header className="flex items-center justify-between whitespace-nowrap px-6 py-6 md:px-10 lg:px-40 w-full z-10">
        <div className="flex items-center gap-2 text-primary dark:text-neutral-200 cursor-pointer" onClick={() => navigate('/')}>
          <div className="size-8 flex items-center justify-center rounded-lg bg-primary/10 dark:bg-white/10 text-primary dark:text-white">
            <span className="material-symbols-outlined text-2xl">eco</span>
          </div>
          <h2 className="text-primary dark:text-neutral-100 text-xl font-extrabold leading-tight tracking-[-0.015em]">TerraRent</h2>
        </div>
        <Link to="/login" className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent hover:bg-primary/10 dark:hover:bg-white/10 text-primary dark:text-neutral-200 text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
          <span className="truncate">Log In</span>
        </Link>
      </header>
      
      <div className="flex h-full grow flex-col justify-center items-center py-10 px-4 md:px-10">
        <div className="flex flex-col max-w-[800px] w-full flex-1 gap-8 md:gap-12">
          <div className="flex flex-col gap-3 text-center animate-fade-in-up">
            <p className="text-primary dark:text-neutral-100 text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">How will you use TerraRent?</p>
            <p className="text-primary/70 dark:text-neutral-400 text-lg font-medium leading-normal">Select your account type to get started.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Renter Card */}
            <div 
              onClick={() => setSelectedType('renter')}
              className={`group relative flex flex-col gap-6 rounded-2xl p-8 bg-surface-light dark:bg-surface-dark shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 ${selectedType === 'renter' ? 'ring-4 ring-primary ring-offset-4 ring-offset-sand-light dark:ring-offset-background-dark' : 'border-2 border-transparent hover:border-primary/30'}`}
            >
              <div className={`absolute top-6 right-6 ${selectedType === 'renter' ? 'text-primary' : 'text-primary/30 dark:text-neutral-600'}`}>
                <span className="material-symbols-outlined text-3xl font-bold">{selectedType === 'renter' ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
              </div>
              <div className={`size-16 rounded-full flex items-center justify-center mb-2 ${selectedType === 'renter' ? 'bg-accent/10 text-accent' : 'bg-primary/5 dark:bg-white/5 text-primary dark:text-neutral-300'}`}>
                <span className="material-symbols-outlined text-4xl">cottage</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-primary dark:text-neutral-100 text-2xl font-bold leading-tight">Find a Home</h3>
                <p className="text-primary/70 dark:text-neutral-400 text-base leading-relaxed">Browse verified listings, schedule tours, and apply for your dream sanctuary online.</p>
              </div>
              <div className="mt-auto pt-4 border-t border-primary/10 dark:border-white/10">
                <div className="flex items-center gap-2 text-primary/80 dark:text-neutral-300 text-sm font-semibold">
                  <span className="material-symbols-outlined text-lg">check</span>
                  <span>No hidden application fees</span>
                </div>
              </div>
            </div>
            
            {/* Landlord Card */}
            <div 
              onClick={() => setSelectedType('landlord')}
              className={`group relative flex flex-col gap-6 rounded-2xl p-8 bg-surface-light dark:bg-surface-dark shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 ${selectedType === 'landlord' ? 'ring-4 ring-primary ring-offset-4 ring-offset-sand-light dark:ring-offset-background-dark' : 'border-2 border-transparent hover:border-primary/30'}`}
            >
              <div className={`absolute top-6 right-6 ${selectedType === 'landlord' ? 'text-primary' : 'text-primary/30 dark:text-neutral-600'}`}>
                <span className="material-symbols-outlined text-3xl font-bold">{selectedType === 'landlord' ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
              </div>
              <div className={`size-16 rounded-full flex items-center justify-center mb-2 ${selectedType === 'landlord' ? 'bg-accent/10 text-accent' : 'bg-primary/5 dark:bg-white/5 text-primary dark:text-neutral-300'}`}>
                <span className="material-symbols-outlined text-4xl">domain_add</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-primary dark:text-neutral-100 text-2xl font-bold leading-tight">List a Property</h3>
                <p className="text-primary/70 dark:text-neutral-400 text-base leading-relaxed">Connect with reliable tenants, manage applications, and grow your portfolio.</p>
              </div>
              <div className="mt-auto pt-4 border-t border-primary/10 dark:border-white/10">
                <div className="flex items-center gap-2 text-primary/80 dark:text-neutral-300 text-sm font-semibold">
                  <span className="material-symbols-outlined text-lg">check</span>
                  <span>Guaranteed rent options</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-6 mt-4">
            <button onClick={handleContinue} className="flex w-full md:w-auto md:min-w-[320px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-primary hover:bg-primary-hover text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-lg transition-all duration-200 active:scale-95">
              <span className="truncate">Continue</span>
              <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
            </button>
            <p className="text-primary/70 dark:text-neutral-400 text-sm font-medium leading-normal text-center">
              Already have an account? <Link to="/login" className="text-primary dark:text-white font-bold underline decoration-accent decoration-2 underline-offset-4 hover:opacity-80">Log in</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
    </div>
  );
};
