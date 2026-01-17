
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './screens/HomePage';
import { SearchPage } from './screens/SearchPage';
import { MapPage } from './screens/MapPage';
import { PropertyDetails } from './screens/PropertyDetails';
import { AmenitiesPage } from './screens/AmenitiesPage';
import { ImageServicesPage } from './screens/ImageServicesPage';
import { StaticPages } from './screens/StaticPages';
import { AIChatBot } from './components/AIChatBot';

// Auth Screens
import { AccountSelection } from './screens/Auth/AccountSelection';
import { SignupRenter } from './screens/Auth/SignupRenter';
import { SignupLandlord } from './screens/Auth/SignupLandlord';
import { Login } from './screens/Auth/Login';
import { VerifyEmail } from './screens/Auth/VerifyEmail';
import { ForgotPassword } from './screens/Auth/ForgotPassword';
import { ResetPassword } from './screens/Auth/ResetPassword';

// Renter Screens
import { Dashboard as RenterDashboard } from './screens/Renter/Dashboard';
import { SavedProperties } from './screens/Renter/SavedProperties';
import { RecentlyViewed } from './screens/Renter/RecentlyViewed';
import { Compare } from './screens/Renter/Compare';
import { Booking } from './screens/Renter/Booking';
import { Application } from './screens/Renter/Application';
import { ScheduleTour } from './screens/Renter/ScheduleTour';
import { Chat } from './screens/Renter/Chat';
import { Negotiation } from './screens/Renter/Negotiation';

// Landlord Screens
import { LandlordDashboard } from './screens/Landlord/Dashboard';
import { LandlordProperties } from './screens/Landlord/Properties';
import { LandlordAddProperty } from './screens/Landlord/AddProperty';
import { LandlordEditProperty } from './screens/Landlord/EditProperty';
import { LandlordMedia } from './screens/Landlord/MediaManager';
import { LandlordCalendar } from './screens/Landlord/Calendar';
import { LandlordPricing } from './screens/Landlord/Pricing';
import { LandlordRequests } from './screens/Landlord/Requests';
import { LandlordApplications } from './screens/Landlord/Applications';
import { LandlordAnalytics } from './screens/Landlord/Analytics';

// Admin Screens
import { AdminDashboard } from './screens/Admin/Dashboard';
import { AdminUsers } from './screens/Admin/Users';
import { AdminVerification } from './screens/Admin/Verification';
import { AdminProperties } from './screens/Admin/Properties';
import { AdminReports } from './screens/Admin/Reports';
import { AdminFeatured } from './screens/Admin/Featured';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main App Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
          <Route path="/amenities" element={<AmenitiesPage />} />
          <Route path="/image-services" element={<ImageServicesPage />} />
          <Route path="/about" element={<StaticPages.About />} />
          <Route path="/how-it-works" element={<StaticPages.HowItWorks />} />
          <Route path="/pricing" element={<StaticPages.Pricing />} />
          <Route path="/faq" element={<StaticPages.FAQ />} />
          <Route path="/contact" element={<StaticPages.Contact />} />

          {/* Authentication Routes */}
          <Route path="/select-account" element={<AccountSelection />} />
          <Route path="/signup-renter" element={<SignupRenter />} />
          <Route path="/signup-landlord" element={<SignupLandlord />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Renter Dashboard & Management Routes */}
          <Route path="/dashboard" element={<RenterDashboard />} />
          <Route path="/saved" element={<SavedProperties />} />
          <Route path="/recent" element={<RecentlyViewed />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/application" element={<Application />} />
          <Route path="/schedule" element={<ScheduleTour />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/negotiation" element={<Negotiation />} />

          {/* Landlord Portal Routes */}
          <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
          <Route path="/landlord/properties" element={<LandlordProperties />} />
          <Route path="/landlord/add-property" element={<LandlordAddProperty />} />
          <Route path="/landlord/edit-property/:id" element={<LandlordEditProperty />} />
          <Route path="/landlord/media/:id" element={<LandlordMedia />} />
          <Route path="/landlord/calendar/:id" element={<LandlordCalendar />} />
          <Route path="/landlord/pricing/:id" element={<LandlordPricing />} />
          <Route path="/landlord/requests" element={<LandlordRequests />} />
          <Route path="/landlord/applications" element={<LandlordApplications />} />
          <Route path="/landlord/analytics" element={<LandlordAnalytics />} />

          {/* Admin Console Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/renters" element={<AdminUsers />} /> {/* Reuse Users for now or dedicated Renter view */}
          <Route path="/admin/landlords" element={<AdminUsers />} /> {/* Reuse Users for now or dedicated Landlord view */}
          <Route path="/admin/verification" element={<AdminVerification />} />
          <Route path="/admin/suspended" element={<AdminUsers />} /> {/* Reuse Users for now */}
          <Route path="/admin/properties" element={<AdminProperties />} />
          <Route path="/admin/pending-approvals" element={<AdminProperties />} /> {/* Reuse for now */}
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/featured" element={<AdminFeatured />} />
          <Route path="/admin/settings" element={<AdminDashboard />} /> {/* Placeholder */}
        </Routes>
        <AIChatBot />
      </Layout>
    </Router>
  );
};

export default App;
