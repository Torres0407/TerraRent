import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth/hooks';


const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, hasRole } = useAuth();


  const isActive = (path: string) => 
    location.pathname === path ? "text-accent font-bold" : "text-primary hover:text-accent font-semibold";

  // Hide main navigation on auth pages and internal management tools
  const isAuthPage = ['/login', '/signup-renter', '/signup-landlord', '/select-account', '/verify', '/forgot-password', '/reset-password'].includes(location.pathname);
  const isDashboardPage = ['/dashboard', '/chat', '/negotiation', '/application', '/schedule', '/recent', '/saved', '/compare', '/booking'].includes(location.pathname);
  const isLandlordPage = location.pathname.startsWith('/landlord');
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAuthPage || isDashboardPage || isLandlordPage || isAdminPage) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/5 bg-background-light/95 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white group-hover:bg-primary-hover transition-colors">
            <span className="material-symbols-outlined" style={{fontSize: "20px"}}>forest</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-primary">TerraRent</h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/search" className={`text-sm transition-colors ${isActive('/search')}`}>Search</Link>
          <Link to="/map" className={`text-sm transition-colors ${isActive('/map')}`}>Map</Link>
          <Link to="/how-it-works" className={`text-sm transition-colors ${isActive('/how-it-works')}`}>How it Works</Link>
          <Link to="/pricing" className={`text-sm transition-colors ${isActive('/pricing')}`}>Pricing</Link>
          <Link to="/about" className={`text-sm transition-colors ${isActive('/about')}`}>About</Link>
          <Link to="/faq" className={`text-sm transition-colors ${isActive('/faq')}`}>FAQ</Link>
          <Link to="/contact" className={`text-sm transition-colors ${isActive('/contact')}`}>Contact</Link>
    <div className="h-6 w-px bg-gray-200 mx-2"></div>

{!isAuthenticated ? (
  <>
    <button
      onClick={() => navigate('/login')}
      className="text-sm font-semibold text-primary hover:text-accent transition-colors"
    >
      Sign In
    </button>
    <button
      onClick={() => navigate('/select-account')}
      className="flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-hover"
    >
      Sign Up
    </button>
  </>
) : (
  <div className="relative group">
    <button className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-bold">
        {user?.firstName?.[0] ?? 'U'}
      </div>
      <span className="text-sm font-semibold text-primary">
        {user?.firstName}
      </span>
    </button>

    {/* Dropdown */}
    <div className="absolute right-0 mt-3 hidden w-48 rounded-xl bg-white shadow-lg group-hover:block overflow-hidden">
      {hasRole('LANDLORD') && (
        <Link to="/landlord/dashboard" className="block px-4 py-3 hover:bg-gray-50">
          Landlord Dashboard
        </Link>
      )}

      <Link to="/dashboard" className="block px-4 py-3 hover:bg-gray-50">
        My Account
      </Link>

      <button
        onClick={logout}
        className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
      >
        Logout
      </button>
    </div>
  </div>
)}

        </nav>

        <button className="md:hidden flex items-center text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background-light border-b border-primary/10 shadow-xl py-4 px-4 flex flex-col gap-4">
          {['/search', '/map', '/how-it-works', '/pricing', '/about', '/faq', '/contact'].map((path) => (
            <Link key={path} to={path} className="text-base font-semibold text-primary capitalize" onClick={() => setIsMenuOpen(false)}>
              {path.replace('/', '').replace(/-/g, ' ')}
            </Link>
          ))}
         {!isAuthenticated ? (
  <>
    <Link to="/login" className="font-bold text-accent">Sign In</Link>
    <Link to="/select-account" className="font-bold text-primary">Sign Up</Link>
  </>
) : (
  <>
    <Link to="/dashboard" className="font-bold text-primary">My Account</Link>
    {hasRole('LANDLORD') && (
      <Link to="/landlord/dashboard" className="font-bold text-primary">
        Landlord Dashboard
      </Link>
    )}
    <button
      onClick={logout}
      className="text-left font-bold text-red-600"
    >
      Logout
    </button>
  </>
)}
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup-renter', '/signup-landlord', '/select-account', '/verify', '/forgot-password', '/reset-password'].includes(location.pathname);
  const isDashboardPage = ['/dashboard', '/chat', '/negotiation', '/application', '/schedule', '/recent', '/saved', '/compare', '/booking'].includes(location.pathname);
  const isLandlordPage = location.pathname.startsWith('/landlord');
  const isAdminPage = location.pathname.startsWith('/admin');
  
  if (isAuthPage || isDashboardPage || isLandlordPage || isAdminPage) return null;

  return (
    <footer className="bg-primary pt-16 pb-8 text-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-white">
                <span className="material-symbols-outlined" style={{fontSize: "20px"}}>forest</span>
              </div>
              <h2 className="text-xl font-bold">TerraRent</h2>
            </div>
            <p className="text-sm text-white/70">Connecting people with nature and premium comfort since 2023.</p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">Company</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/amenities" className="hover:text-white">Amenities</Link></li>
              <li><Link to="/image-services" className="hover:text-white">Image Services</Link></li>
              <li><a className="hover:text-white" href="#">Careers</a></li>
              <li><a className="hover:text-white" href="#">Press</a></li>
              <li><a className="hover:text-white" href="#">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">Support</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link to="/faq" className="hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><a className="hover:text-white" href="#">Cancellation Options</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">Stay Inspired</h3>
            <p className="mb-4 text-sm text-white/70">Subscribe for the latest travel inspiration and exclusive offers.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input className="w-full rounded-lg border-none bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-accent" placeholder="Email address" type="email"/>
              <button className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-white hover:text-primary transition-colors" type="submit">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-white/50">© 2024 TerraRent, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-white/50 hover:text-white" href="#">FB</a>
            <a className="text-white/50 hover:text-white" href="#">IG</a>
            <a className="text-white/50 hover:text-white" href="#">TW</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navigation />
    {children}
    <Footer />
  </div>
);
