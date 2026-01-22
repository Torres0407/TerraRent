
import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { AIChatBot } from './components/AIChatBot';
import { Layout } from './components/Layout';
import { AmenitiesPage } from './screens/AmenitiesPage';
import { HomePage } from './screens/HomePage';
import { ImageServicesPage } from './screens/ImageServicesPage';
import { MapPage } from './screens/MapPage';
import { PropertyDetails } from './screens/PropertyDetails';
import { SearchPage } from './screens/SearchPage';
import { StaticPages } from './screens/StaticPages';

// Auth Screens
import { AccountSelection } from './screens/Auth/AccountSelection';
import { ForgotPassword } from './screens/Auth/ForgotPassword';
import { Login } from './screens/Auth/Login';
import { ResetPassword } from './screens/Auth/ResetPassword';
import { SignupLandlord } from './screens/Auth/SignupLandlord';
import { SignupRenter } from './screens/Auth/SignupRenter';
import { VerifyEmail } from './screens/Auth/VerifyEmail';

// Renter Screens
import { Application } from './screens/Renter/Application';
import { Booking } from './screens/Renter/Booking';
import { Chat } from './screens/Renter/Chat';
import { Compare } from './screens/Renter/Compare';
import { Dashboard as RenterDashboard } from './screens/Renter/Dashboard';
import { Negotiation } from './screens/Renter/Negotiation';
import { RecentlyViewed } from './screens/Renter/RecentlyViewed';
import { SavedProperties } from './screens/Renter/SavedProperties';
import { ScheduleTour } from './screens/Renter/ScheduleTour';

// Landlord Screens
import { LandlordAddProperty } from './screens/Landlord/AddProperty';
import { LandlordAnalytics } from './screens/Landlord/Analytics';
import { LandlordApplications } from './screens/Landlord/Applications';
import { LandlordCalendar } from './screens/Landlord/Calendar';
import { LandlordDashboard } from './screens/Landlord/Dashboard';
import { LandlordEditProperty } from './screens/Landlord/EditProperty';
import { LandlordMedia } from './screens/Landlord/MediaManager';
import { LandlordPricing } from './screens/Landlord/Pricing';
import { LandlordProperties } from './screens/Landlord/Properties';
import { LandlordRequests } from './screens/Landlord/Requests';

// Admin Screens
import { AdminDashboard } from './screens/Admin/Dashboard';
import { AdminFeatured } from './screens/Admin/Featured';
import { AdminProperties } from './screens/Admin/Properties';
import { AdminReports } from './screens/Admin/Reports';
import { AdminUsers } from './screens/Admin/Users';
import { AdminVerification } from './screens/Admin/Verification';

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
          <Route path="/landlord/edit-property/:id?" element={<LandlordEditProperty />} />
          <Route path="/landlord/media/:id?" element={<LandlordMedia />} />
          <Route path="/landlord/calendar/:id?" element={<LandlordCalendar />} />
          <Route path="/landlord/pricing/:id?" element={<LandlordPricing />} />
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
