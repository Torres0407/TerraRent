
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarLink = ({ to, icon, label, exact }: { to: string, icon: string, label: string, exact?: boolean }) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);
  
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive 
          ? 'bg-white/10 text-white font-bold shadow-lg' 
          : 'text-white/60 hover:bg-white/5 hover:text-white'
      }`}
    >
      <span className={`material-symbols-outlined ${isActive ? 'text-accent' : 'group-hover:text-accent'} transition-colors`}>{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
};

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light font-display">
      {/* Admin Sidebar */}
      <aside className="w-64 h-full flex flex-col bg-primary text-white shrink-0 transition-all duration-300 hidden md:flex border-r border-primary/10">
        <div className="p-8 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-accent flex items-center justify-center text-white shadow-xl">
            <span className="material-symbols-outlined text-[24px]">forest</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase">TerraRent</h1>
            <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">Admin Console</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 flex flex-col gap-1 overflow-y-auto no-scrollbar">
          <SidebarLink to="/admin/dashboard" icon="dashboard" label="Dashboard" exact />
          <SidebarLink to="/admin/properties" icon="real_estate_agent" label="Properties" />
          <SidebarLink to="/admin/pending-approvals" icon="content_paste" label="Pending Approvals" />
          <SidebarLink to="/admin/featured" icon="star" label="Featured" />
          <SidebarLink to="/admin/users" icon="group" label="Users" />
          <SidebarLink to="/admin/renters" icon="person_search" label="Renters" />
          <SidebarLink to="/admin/landlords" icon="apartment" label="Landlords" />
          <SidebarLink to="/admin/verification" icon="verified_user" label="Verifications" />
          <SidebarLink to="/admin/suspended" icon="block" label="Suspended" />
          <SidebarLink to="/admin/reports" icon="flag" label="Reports" />
          <div className="h-px bg-white/10 my-4 mx-3"></div>
          <SidebarLink to="/admin/settings" icon="settings" label="Settings" />
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white transition-all group">
            <span className="material-symbols-outlined text-red-300 group-hover:text-red-400">logout</span>
            <span className="text-sm font-bold">Exit Console</span>
          </Link>
        </div>
      </aside>
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Admin Header */}
        <header className="h-20 bg-white border-b border-primary/5 px-8 flex items-center justify-between shrink-0">
           <div className="md:hidden flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">menu</span>
              <span className="font-black text-primary uppercase">TerraRent</span>
           </div>
           <div className="hidden md:block relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/30">search</span>
              <input className="pl-12 pr-6 py-2.5 bg-sand-light/10 border-primary/5 rounded-full text-sm focus:ring-accent w-80 font-medium" placeholder="Global Search..." />
           </div>
           <div className="flex items-center gap-6">
              <button className="relative size-10 rounded-full bg-sand-light/20 flex items-center justify-center text-primary/60 hover:text-accent transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2.5 size-2 rounded-full bg-red-500 border-2 border-white"></span>
              </button>
              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                   <p className="text-sm font-black text-primary leading-none">System Admin</p>
                   <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">Level 5 Access</p>
                 </div>
                 <div className="size-10 rounded-full bg-sand-light overflow-hidden border-2 border-primary/10">
                    <img src="https://picsum.photos/seed/admin/100" alt="Admin" />
                 </div>
              </div>
           </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-background-light no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};
