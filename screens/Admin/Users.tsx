import React, { useEffect, useMemo, useRef, useState } from 'react';
import { adminApi } from '../../api/endpoints/admin';
import { User } from '../../types';
import { AdminLayout } from './AdminLayout';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await adminApi.getUsers(page, 10);
      setUsers(response.data.content);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActionMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdateStatus = async (userId: string, status: 'ACTIVE' | 'PENDING_VERIFICATION' | 'SUSPENDED' | 'VERIFIED') => {
    setIsUpdating(userId);
    try {
      await adminApi.updateUserStatus(Number(userId), status);
      await fetchUsers();
      alert('User status updated successfully!');
    } catch (err) {
      console.error(`Failed to update user ${userId} status:`, err);
      alert('Failed to update user status. Please try again.');
    } finally {
      setActionMenu(null);
      setIsUpdating(null);
    }
  };

  const filteredUsers = useMemo(() => {
    if (filter === 'All') return users;
    if (filter === 'Hosts') return users.filter(u => u.role === 'LANDLORD' || u.role === 'AGENT');
    if (filter === 'Renters') return users.filter(u => u.role === 'RENTER');
    if (filter === 'Suspended') return users.filter(u => u.status === 'SUSPENDED');
    return users;
  }, [users, filter]);

  const getStatusIndicator = (status?: 'ACTIVE' | 'PENDING_VERIFICATION' | 'SUSPENDED' | 'VERIFIED') => {
    switch(status) {
      case 'ACTIVE':
      case 'VERIFIED': 
        return 'text-green-600';
      case 'PENDING_VERIFICATION': 
        return 'text-amber-600';
      case 'SUSPENDED': 
        return 'text-red-600';
      default: 
        return 'text-gray-400';
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-primary tracking-tighter">Account Registry</h1>
            <p className="text-xl text-text-muted font-medium">Manage the collective of hosts, renters, and platform stewards.</p>
          </div>
          <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">
            Provision New User
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {label: "Global Members", val: users.length, icon: "group", change: "+5.2%", col: "bg-sand-light/30" },
            {label: "Verified Hosts", val: users.filter(u => u.role === 'LANDLORD' || u.role === 'AGENT').length, icon: "real_estate_agent", change: "+1.8%", col: "bg-sand-light/30" },
            {label: "In Queue", val: users.filter(u => u.status === 'PENDING_VERIFICATION').length, icon: "verified_user", change: "Alert", col: "bg-accent/10" },
            {label: "Suspended", val: users.filter(u => u.status === 'SUSPENDED').length, icon: "block", change: `+${users.filter(u => u.status === 'SUSPENDED').length}`, col: "bg-red-50" }
          ].map((s,i) => (
            <div key={i} className={`p-8 rounded-[2.5rem] border border-primary/5 shadow-xl ${s.col} space-y-4`}>
                <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-white text-primary shadow-sm"><span className="material-symbols-outlined">{s.icon}</span></div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${s.label.includes('Suspended') ? 'text-red-700' : 'text-green-700'}`}>{s.change}</span>
                </div>
                <div>
                    <p className="text-xs font-black text-primary/40 uppercase tracking-widest">{s.label}</p>
                    <h3 className="text-3xl font-black text-primary mt-1">{s.val}</h3>
                </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] border border-primary/5 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-sand-light/10">
             <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-accent">filter_alt</span>
                <p className="text-sm font-black text-primary uppercase tracking-widest">Active Filters</p>
             </div>
             <div className="flex gap-2">
                {['All', 'Hosts', 'Renters', 'Suspended'].map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white' : 'hover:bg-sand-light text-primary/60'}`}>{f}</button>
                ))}
             </div>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            {isLoading ? (
              <div className="text-center p-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-text-muted font-semibold">Loading user registry...</p>
              </div>
            ) : error ? (
              <div className="text-center p-10">
                <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
                <p className="text-red-500 font-semibold mb-4">{error}</p>
                <button 
                  onClick={fetchUsers} 
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] border-b border-primary/5">
                    <th className="py-8 px-10">Profile</th>
                    <th className="py-8 px-10">Designation</th>
                    <th className="py-8 px-10">Internal State</th>
                    <th className="py-8 px-10">History</th>
                    <th className="py-8 px-10 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-sand-light/5 transition-colors group">
                      <td className="py-8 px-10 border-b border-primary/5">
                        <div className="flex items-center gap-4">
                          <div className="size-14 rounded-2xl bg-cover bg-center border-2 border-white shadow-lg group-hover:scale-110 transition-transform" style={{backgroundImage: `url('${u.avatarUrl}')`}}></div>
                          <div>
                            <p className="font-black text-primary leading-none text-lg tracking-tighter">{u.firstname} {u.lastname}</p>
                            <p className="text-xs text-text-muted mt-1">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-8 px-10 border-b border-primary/5">
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-white">{u.role}</span>
                      </td>
                      <td className="py-8 px-10 border-b border-primary/5">
                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${getStatusIndicator(u.status)}`}>
                          <span className={`size-2 rounded-full bg-current shadow-lg ${u.status === 'PENDING_VERIFICATION' ? 'animate-pulse' : ''}`}></span>
                          {u.status}
                        </div>
                      </td>
                      <td className="py-8 px-10 border-b border-primary/5 text-text-muted text-xs font-bold">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td className="py-8 px-10 border-b border-primary/5 text-right relative">
                         <button onClick={() => setActionMenu(actionMenu === u.id ? null : u.id)} className="size-10 rounded-xl hover:bg-sand-light transition-all text-primary/30 hover:text-accent"><span className="material-symbols-outlined">more_horiz</span></button>
                         {actionMenu === u.id && (
                           <div ref={menuRef} className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-primary/5 p-2 z-20 animate-in fade-in zoom-in-95">
                              {u.status !== 'ACTIVE' && <button onClick={() => handleUpdateStatus(u.id, 'ACTIVE')} disabled={isUpdating === u.id} className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold text-primary hover:bg-sand-light/30 disabled:opacity-50">Activate User</button>}
                              {u.status !== 'SUSPENDED' && <button onClick={() => handleUpdateStatus(u.id, 'SUSPENDED')} disabled={isUpdating === u.id} className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-50">Suspend User</button>}
                              <div className="h-px bg-primary/5 my-1"></div>
                              <button disabled={isUpdating === u.id} className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-primary/60 hover:bg-sand-light/30 disabled:opacity-50">View History</button>
                           </div>
                         )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};