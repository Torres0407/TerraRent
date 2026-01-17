
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const LandlordSidebar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const links = [
    { path: '/landlord/dashboard', icon: 'grid_view', label: 'Dashboard' },
    { path: '/landlord/properties', icon: 'real_estate_agent', label: 'Properties' },
    { path: '/landlord/add-property', icon: 'add_home', label: 'Add Property' },
    { path: '/landlord/calendar', icon: 'calendar_month', label: 'Availability' },
    { path: '/landlord/media', icon: 'imagesmode', label: 'Media Manager' },
    { path: '/landlord/pricing', icon: 'price_change', label: 'Pricing' },
    { path: '/landlord/requests', icon: 'book_online', label: 'Requests' },
    { path: '/landlord/applications', icon: 'description', label: 'Applications' },
    { path: '/landlord/analytics', icon: 'analytics', label: 'Analytics' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-surface-dark border-r border-primary/5 hidden lg:flex flex-col flex-shrink-0 h-screen sticky top-0 z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
          <span className="material-symbols-outlined">forest</span>
        </div>
        <div>
          <h1 className="text-primary dark:text-white text-xl font-black leading-tight tracking-tighter uppercase">TerraRent</h1>
          <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">Partner Hub</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto no-scrollbar">
        {links.map((link) => (
          <Link 
            key={link.path}
            to={link.path} 
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
              isActive(link.path) 
                ? 'bg-primary text-white shadow-xl shadow-primary/20 font-bold' 
                : 'text-primary/60 dark:text-gray-400 hover:bg-sand-light/30 hover:text-primary font-medium'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive(link.path) ? 'filled' : ''}`}>
              {link.icon}
            </span>
            <span className="text-sm">{link.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="p-4 border-t border-primary/5">
        <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-sand-light/20 cursor-pointer transition-all">
          <div className="size-10 rounded-full bg-sand-light border-2 border-primary/10 overflow-hidden shrink-0">
             <img src="https://picsum.photos/seed/eleanor/100" alt="Avatar" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-primary dark:text-white truncate">Eleanor Pena</p>
            <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Super Host</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export const LandlordLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-primary dark:text-gray-100 font-display">
      <LandlordSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-20 flex items-center justify-between px-6 bg-white dark:bg-surface-dark border-b border-primary/5 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-primary hover:text-accent transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">forest</span>
              <span className="font-black text-primary dark:text-white uppercase tracking-tighter">TerraRent</span>
            </div>
          </div>
          <div className="size-10 rounded-full bg-sand-light overflow-hidden">
             <img src="https://picsum.photos/seed/eleanor/100" alt="Profile" />
          </div>
        </header>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] bg-primary/40 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
             <div className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-surface-dark shadow-2xl p-6 flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-black text-primary uppercase tracking-tighter">Partner Hub</h2>
                  <button onClick={() => setIsMobileMenuOpen(false)}><span className="material-symbols-outlined">close</span></button>
                </div>
                <nav className="flex flex-col gap-2 flex-1">
                   {[
                     { path: '/landlord/dashboard', icon: 'grid_view', label: 'Dashboard' },
                     { path: '/landlord/properties', icon: 'real_estate_agent', label: 'Properties' },
                     { path: '/landlord/add-property', icon: 'add_home', label: 'Add' },
                     { path: '/landlord/requests', icon: 'book_online', label: 'Requests' },
                   ].map(l => (
                     <Link 
                       key={l.path} 
                       to={l.path} 
                       onClick={() => setIsMobileMenuOpen(false)}
                       className={`flex items-center gap-4 py-4 px-4 rounded-xl font-bold ${location.pathname === l.path ? 'bg-primary text-white' : 'text-primary/70'}`}
                     >
                       <span className="material-symbols-outlined">{l.icon}</span>
                       {l.label}
                     </Link>
                   ))}
                </nav>
             </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {children}
        </main>
      </div>
    </div>
  );
};
