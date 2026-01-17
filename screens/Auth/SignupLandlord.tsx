import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../services/auth/hooks';

export const SignupLandlord: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'ROLE_LANDLORD' | 'ROLE_LANDLORD'>('ROLE_LANDLORD');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Use the new hook
  const { register, loading: isLoading, error } = useRegister();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await register({
        firstName,
        lastName: '', // Form only has one name field
        email,
        password,
        phoneNumber: '', // Optional
        role: role
      });
      
      navigate('/verify', { state: { email } });
    } catch (err) {
      // Error is already handled by the hook
      console.error('Registration failed');
    }
  };

  return (
    <div className="bg-[#f6f8f6] dark:bg-background-dark font-display text-primary dark:text-white antialiased">
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7f3eb] dark:border-[#1e3a29] bg-white dark:bg-[#102216] px-6 lg:px-10 py-4">
        <Link to="/" className="flex items-center gap-4 text-primary dark:text-white">
          <div className="size-8 text-accent">
            <span className="material-symbols-outlined text-3xl">forest</span>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight uppercase">TerraRent</h2>
        </Link>
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <Link to="/how-it-works" className="text-primary dark:text-gray-200 text-sm font-bold hover:text-accent transition-colors">How it works</Link>
            <Link to="/pricing" className="text-primary dark:text-gray-200 text-sm font-bold hover:text-accent transition-colors">Pricing</Link>
          </div>
          <Link to="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 border border-[#cfe7d7] dark:border-[#2a4435] text-primary dark:text-white text-sm font-bold hover:bg-[#e7f3eb] dark:hover:bg-[#1a3525] transition-colors">
            Log In
          </Link>
        </div>
      </header>
      
      <main className="flex min-h-[calc(100vh-65px)] w-full flex-col lg:flex-row">
        <div className="lg:w-1/2 bg-[#f0f7f2] dark:bg-[#0c1a11] relative overflow-hidden flex flex-col justify-between p-8 lg:p-12 lg:sticky lg:top-[65px] lg:h-[calc(100vh-65px)]">
          <div className="absolute inset-0 z-0">
            <img alt="Modern property" className="w-full h-full object-cover opacity-20 dark:opacity-20 mix-blend-multiply dark:mix-blend-overlay" src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000"/>
          </div>
          <div className="relative z-10 max-w-lg mx-auto lg:mx-0">
            <div className="mb-10">
              <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-4">Partner Program</span>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-primary dark:text-white mb-6">Unlock the potential of your property.</h1>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-[#1e3a29] shadow-sm text-accent shrink-0"><span className="material-symbols-outlined">verified_user</span></div>
                <div><h3 className="text-lg font-bold text-primary dark:text-white">Verified Tenants</h3></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-[#1e3a29] shadow-sm text-accent shrink-0"><span className="material-symbols-outlined">payments</span></div>
                <div><h3 className="text-lg font-bold text-primary dark:text-white">Guaranteed Rent</h3></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-16 bg-white dark:bg-[#102216]">
          <div className="w-full max-w-lg">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2"><span className="flex items-center justify-center size-8 rounded-full bg-primary text-white font-bold text-sm">1</span><span className="text-sm font-bold text-primary dark:text-white">Account</span></div>
              <div className="h-0.5 flex-1 mx-4 bg-[#cfe7d7] dark:bg-[#2a4435]"></div>
              <div className="flex items-center gap-2 opacity-50"><span className="flex items-center justify-center size-8 rounded-full border border-[#cfe7d7] dark:border-[#2a4435] text-primary dark:text-gray-400 font-medium text-sm">2</span></div>
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-bold text-primary dark:text-white mb-2">Create Partner Account</h2>
            <p className="text-text-muted mb-8">Join the exclusive network of TerraRent property owners.</p>
            
            <form className="flex flex-col gap-5 mt-6" onSubmit={handleSubmit}>
              {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm font-semibold">{error}</div>}
              
              <div className="grid grid-cols-2 gap-4">
                <label className="relative cursor-pointer group">
                  <input 
                    className="peer sr-only" 
                    name="role" 
                    type="radio" 
                    value="ROLE_LANDLORD" 
                    checked={role === 'ROLE_LANDLORD'} 
                    onChange={() => setRole('ROLE_LANDLORD')} 
                  />
                  <div className="p-4 rounded-xl border border-[#cfe7d7] dark:border-[#2a4435] bg-white dark:bg-[#162e21] peer-checked:border-accent peer-checked:bg-accent/5 dark:peer-checked:bg-[#1a3525] transition-all hover:shadow-sm flex flex-col items-center gap-2 text-center h-full">
                    <span className="material-symbols-outlined text-3xl text-accent">key</span>
                    <span className="font-bold text-primary dark:text-white text-sm">Private Landlord</span>
                  </div>
                </label>
                <label className="relative cursor-pointer group">
                  <input 
                    className="peer sr-only" 
                    name="role" 
                    type="radio" 
                    value="ROLE_LANDLORD" 
                    checked={role === 'ROLE_LANDLORD'} 
                    onChange={() => setRole('ROLE_LANDLORD')} 
                  />
                  <div className="p-4 rounded-xl border border-[#cfe7d7] dark:border-[#2a4435] bg-white dark:bg-[#162e21] peer-checked:border-accent peer-checked:bg-accent/5 dark:peer-checked:bg-[#1a3525] transition-all hover:shadow-sm flex flex-col items-center gap-2 text-center h-full">
                    <span className="material-symbols-outlined text-3xl text-accent">real_estate_agent</span>
                    <span className="font-bold text-primary dark:text-white text-sm">Property Agent</span>
                  </div>
                </label>
              </div>
              
              <div className="space-y-4">
                <input 
                  className="w-full rounded-lg border border-[#cfe7d7] dark:border-[#2a4435] bg-white dark:bg-[#162e21] px-4 py-3.5 text-primary dark:text-white outline-none focus:ring-2 focus:ring-accent/30 transition-all" 
                  placeholder="First Name" 
                  type="text" 
                  value={firstName} 
                  onChange={e => setFirstName(e.target.value)} 
                  required
                />
                <input 
                  className="w-full rounded-lg border border-[#cfe7d7] dark:border-[#2a4435] bg-white dark:bg-[#162e21] px-4 py-3.5 text-primary dark:text-white outline-none focus:ring-2 focus:ring-accent/30 transition-all" 
                  placeholder="Business Email" 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required
                />
                <input 
                  className="w-full rounded-lg border border-[#cfe7d7] dark:border-[#2a4435] bg-white dark:bg-[#162e21] px-4 py-3.5 text-primary dark:text-white outline-none focus:ring-2 focus:ring-accent/30 transition-all" 
                  placeholder="Password" 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required
                />
              </div>
              
              <button 
                disabled={isLoading} 
                className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-base py-4 rounded-lg shadow-lg transition-all transform active:scale-[0.98] mt-2 disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};