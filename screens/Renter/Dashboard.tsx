import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { renterApi } from '../../api/endpoints/renter';
import { ApplicationStatus, Booking, RenterDashboardData } from '../../types';

const UpcomingBookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  const startDate = new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  return (
    <div className="bg-white rounded-2xl p-1 shadow-sm border border-primary/5 flex flex-col sm:flex-row group hover:shadow-md transition-all duration-300">
      <div className="sm:w-48 h-48 sm:h-auto rounded-xl bg-cover bg-center overflow-hidden relative" style={{ backgroundImage: `url('${booking.property.image}')` }}>
        <div className="absolute top-2 left-2 bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">Upcoming Stay</div>
      </div>
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Check-in: {startDate}</p>
          <h4 className="text-lg font-bold text-primary leading-tight">{booking.property.title}</h4>
          <div className="flex items-center gap-2 mt-3 text-text-muted">
            <span className="material-symbols-outlined text-accent">pin_drop</span>
            <span className="text-sm font-medium">{booking.property.location}</span>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <button className="flex-1 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm">Manage Booking</button>
          <Link to={`/property-details/${booking.property.id}`} className="bg-sand-light hover:bg-sand text-primary text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors text-center">View Property</Link>
        </div>
      </div>
    </div>
  );
};

const ApplicationStatusCard: React.FC<{ application: ApplicationStatus }> = ({ application }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-primary/5 flex flex-col justify-between hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Application Status</p>
          <h4 className="text-lg font-bold text-primary">{application.propertyTitle}</h4>
          <p className="text-sm text-text-muted mt-1">ID: {application.applicationId}</p>
        </div>
        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">{application.status}</span>
      </div>
      <div className="relative mt-2">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-sand-light -translate-y-1/2 rounded-full"></div>
        <div className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-primary -translate-y-1/2 rounded-full"></div>
        <div className="relative flex justify-between">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary border-4 border-white shadow-sm flex items-center justify-center text-white z-10"><span className="material-symbols-outlined text-sm font-bold">check</span></div>
            <span className="text-xs font-semibold text-primary">Submitted</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary border-4 border-white shadow-sm flex items-center justify-center text-white z-10"><span className="material-symbols-outlined text-sm font-bold animate-pulse">hourglass_top</span></div>
            <span className="text-xs font-semibold text-primary">Review</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sand-light border-4 border-white flex items-center justify-center text-text-muted z-10"><span className="material-symbols-outlined text-sm font-bold">history_edu</span></div>
            <span className="text-xs font-medium text-text-muted">Decision</span>
          </div>
        </div>
      </div>
      <Link to="/application" className="mt-6 w-full py-2.5 text-sm font-semibold text-primary bg-sand-light rounded-lg hover:bg-sand transition-colors block text-center">View Application Details</Link>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<RenterDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Using the new renterApi endpoint
        const data = await renterApi.getDashboard();
        setDashboardData(data);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        setError("Failed to load your dashboard. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 h-full flex items-center justify-center bg-sand-light/30">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-semibold text-text-muted">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 h-full flex items-center justify-center bg-sand-light/30">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-red-200">
          <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
          <p className="font-semibold text-red-600 mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light text-primary font-display overflow-hidden h-screen flex w-full">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-full bg-primary text-white flex-shrink-0 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-dark rounded-full opacity-50 blur-3xl pointer-events-none"></div>
        <div className="p-8 z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary-dark flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>forest</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">TerraRent</h1>
          </div>
          <nav className="flex flex-col gap-2">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-dark text-white shadow-sm border border-white/10 transition-all duration-200">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link to="/chat" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-primary-dark/50 hover:text-white transition-all duration-200">
              <span className="material-symbols-outlined">chat_bubble</span>
              <span className="font-medium">Messages</span>
              <span className="ml-auto bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
            </Link>
            <Link to="/saved" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-primary-dark/50 hover:text-white transition-all duration-200">
              <span className="material-symbols-outlined">favorite</span>
              <span className="font-medium">Saved Homes</span>
            </Link>
            <Link to="/application" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-primary-dark/50 hover:text-white transition-all duration-200">
              <span className="material-symbols-outlined">assignment</span>
              <span className="font-medium">Applications</span>
            </Link>
            <Link to="/recent" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-primary-dark/50 hover:text-white transition-all duration-200">
              <span className="material-symbols-outlined">history</span>
              <span className="font-medium">History</span>
            </Link>
            <div className="mt-8 pt-8 border-t border-white/10">
              <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white transition-all duration-200">
                <span className="material-symbols-outlined">logout</span>
                <span className="font-medium">Sign Out</span>
              </Link>
            </div>
          </nav>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto bg-sand-light/30 relative">
        <div className="sticky top-0 z-20 bg-background-light/90 backdrop-blur-md border-b border-primary/5 px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight">Good Morning, {dashboardData?.user.firstname}</h2>
            <p className="text-text-muted font-medium">Here's what's happening with your home search.</p>
          </div>
          <div className="w-full md:w-96">
            <Link to="/search" className="relative group block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-muted group-focus-within:text-accent transition-colors">search</span>
              </div>
              <input className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-white shadow-sm text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all text-sm font-medium" placeholder="City, neighborhood, or address..." type="text" readOnly />
            </Link>
          </div>
        </div>
        
        <div className="p-8 max-w-7xl mx-auto space-y-10 pb-20">
          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-primary">Next Steps</h3>
              <Link to="/schedule" className="text-sm font-semibold text-accent hover:text-primary flex items-center gap-1 transition-colors">
                View Calendar <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dashboardData?.upcomingBooking && <UpcomingBookingCard booking={dashboardData.upcomingBooking} />}
              {dashboardData?.applicationStatus && <ApplicationStatusCard application={dashboardData.applicationStatus} />}
              {!dashboardData?.upcomingBooking && !dashboardData?.applicationStatus && (
                <div className="lg:col-span-2 text-center p-10 bg-white rounded-2xl border border-primary/5">
                  <p className="font-medium text-text-muted">No upcoming activities. Time to find your next sanctuary!</p>
                </div>
              )}
            </div>
          </section>
          
          <section>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-primary">Saved Homes</h3>
                {dashboardData?.savedProperties && (
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                    {dashboardData.savedProperties.length}
                  </span>
                )}
              </div>
              <Link to="/saved" className="text-sm font-semibold text-accent hover:text-primary transition-colors">See all</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData?.savedProperties.map((prop) => (
                <Link key={prop.id} to={`/property-details/${prop.id}`} className="group bg-white rounded-2xl border border-primary/5 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer block">
                  <div className="aspect-[4/3] bg-cover bg-center relative" style={{ backgroundImage: `url('${prop.image}')` }}>
                    <div className="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md">${prop.price} / night</div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-primary truncate">{prop.title}</h4>
                    <p className="text-sm text-text-muted mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> {prop.location}</p>
                  </div>
                </Link>
              ))}
              {(!dashboardData?.savedProperties || dashboardData.savedProperties.length === 0) && (
                 <div className="md:col-span-2 lg:col-span-3 text-center p-10 bg-white rounded-2xl border border-primary/5">
                   <p className="font-medium text-text-muted">You haven't saved any homes yet.</p>
                 </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};