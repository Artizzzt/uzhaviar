import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/AppLayout';

// Public Pages
import Landing from './pages/public/Landing';
import SignIn from './pages/public/SignIn';
import ForgotPassword from './pages/public/ForgotPassword';
import Register from './pages/public/Register';
import LayoutPreview from './pages/public/LayoutPreview'; // Visual layout preview
//admin pages
import AdminSignIn from "./pages/auth/AdminSignIn";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AllFarmers from "./pages/admin/AllFarmers";
import FarmerDetails from "./pages/admin/FarmerDetails";
import EditFarmer from "./pages/admin/EditFarmer";
import AdminFarmMap from "./pages/admin/AdminFarmMap";
import DiseaseDetection from "./pages/admin/DiseaseDetection";
import DiseaseDetails from "./pages/admin/DiseaseDetails";
import PesticideControl from "./pages/admin/PesticideControl";
import FarmerAnalysis from "./pages/admin/FarmerAnalysis";
import FarmerAnalytics from "./pages/admin/FarmerAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import AddFarmer from "./pages/admin/AddFarmer";
// App/Dashboard Pages
import Dashboard from './pages/app/Dashboard';
import FarmMap from './pages/app/FarmMap';
import SmartSpray from './pages/app/SmartSpray';
import CropHealth from './pages/app/CropHealth';
import Analysis from './pages/app/Analysis';
import Profile from './pages/app/Profile';
import Settings from './pages/app/Settings';
import ContactUs from './pages/app/ContactUs';
import Request from './pages/app/Request';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/preview" element={<LayoutPreview />} />
          
          <Route path="/admin-sign-in" element={<AdminSignIn />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/farmers" element={<AllFarmers />} />
          <Route path="/admin/farmers" element={<AllFarmers />} />

<Route
  path="/admin/farmers/:id"
  element={<FarmerDetails />}
/>
<Route
  path="/admin/farmers/edit/:id"
  element={<EditFarmer />}
/>
<Route path="/admin/farm-map" element={<AdminFarmMap />} />
<Route
  path="/admin/disease-detection"
  element={<DiseaseDetection />}
/>

<Route
  path="/admin/disease/:id"
  element={<DiseaseDetails />}
/>
<Route
  path="/admin/pesticides"
  element={<PesticideControl />}
/>  
<Route
  path="/admin/analysis/:id"
  element={<FarmerAnalysis />}
/>
<Route
  path="/admin/analysis"
  element={<FarmerAnalytics />}
/>
<Route
  path="/admin/settings"
  element={<AdminSettings />}
/>
<Route
  path="/admin/farmers/add"
  element={<AddFarmer />}
/>

          {/* Authenticated App Routes (Layout + Auth Check) */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/farm-map" element={<FarmMap />} />
            <Route path="/smart-spray" element={<SmartSpray />} />
            <Route path="/crop-health" element={<CropHealth />} />
            <Route path="/request" element={<Request />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
