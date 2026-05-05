import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterVolunteer from './pages/RegisterVolunteer';
import RegisterShelter from './pages/RegisterShelter';
import LoginVolunteer from './pages/LoginVolunteer';
import LoginShelter from './pages/LoginShelter';
import LoginAdmin from './pages/LoginAdmin';
import VolunteerDashboard from './pages/VolunteerDashboard';
import ReportUpload from './pages/ReportUpload';
import VolunteerProfile from './pages/VolunteerProfile';
import ShelterProfile from './pages/ShelterProfile';
import ShelterRequests from './pages/ShelterRequests';
import CreateEditRequest from './pages/CreateEditRequest';
import ReportVerification from './pages/ReportVerification';
import AdminVerification from './pages/AdminVerification';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #FFFDF9 0%, #FBE1CD 100%)'
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-volunteer" element={<RegisterVolunteer />} />
        <Route path="/register-shelter" element={<RegisterShelter />} />
        <Route path="/login-volunteer" element={<LoginVolunteer />} />
        <Route path="/login-shelter" element={<LoginShelter />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/requests" element={<ProtectedRoute allowedRoles={['volunteer']}><VolunteerDashboard /></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute allowedRoles={['volunteer', 'shelter']}><ReportUpload /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={['volunteer']}><VolunteerProfile /></ProtectedRoute>} />
        <Route path="/shelter-profile" element={<ProtectedRoute allowedRoles={['shelter']}><ShelterProfile /></ProtectedRoute>} />
        <Route path="/shelter-requests" element={<ProtectedRoute allowedRoles={['shelter']}><ShelterRequests /></ProtectedRoute>} />
        <Route path="/create-request" element={<ProtectedRoute allowedRoles={['shelter']}><CreateEditRequest /></ProtectedRoute>} />
        <Route path="/verify-report" element={<ProtectedRoute allowedRoles={['shelter']}><ReportVerification /></ProtectedRoute>} />
        <Route path="/admin-verification" element={<ProtectedRoute allowedRoles={['admin']}><AdminVerification /></ProtectedRoute>} />
      </Routes>

      {/* Footer */}
      <footer className="pb-8 text-center text-[#5C4A3D] font-medium text-sm mt-auto relative z-10">
        © 2026 ЛПК
      </footer>
    </div>
  );
}

export default App;
