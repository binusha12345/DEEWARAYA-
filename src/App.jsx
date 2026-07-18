import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Public Pages
import HomePage from "./Pages/Public/HomePage";
import AboutPage from "./Pages/Public/AboutPage";
import Login from "./Pages/Public/Login";
import Register from "./Pages/Public/Register";
import ForgotPassword from "./Pages/Public/ForgotPassword";
import ResetPassword from "./Pages/Public/ResetPassword";

// Owner Pages
import BoatOwnerDashboard from "./Pages/Public/owner/BoatOwnerDashboard";
import BoatOwnerBoats from "./Pages/Public/owner/BoatOwnerBoats";
import AddNewBoat from "./Pages/Public/owner/AddNewBoat";
import Maintenance from "./Pages/Public/owner/Maintenance";
import MaintenanceEngine from "./Pages/Public/owner/MaintenanceEngine";
import MaintenanceSpareParts from "./Pages/Public/owner/MaintenanceSpareParts";
import MaintenanceBodyParts from "./Pages/Public/owner/MaintenanceBodyParts";
import Finance from "./Pages/Public/owner/Finance";
import DailyCalculation from "./Pages/Public/owner/DailyCalculation";
import MonthlyReports from "./Pages/Public/owner/MonthlyReports";

// Driver Pages
import BoatDriverDashboard from "./Pages/Public/driver/BoatDriverDashboard";

// Shared
import WeatherDashboard from "./Pages/Public/WeatherDashboard";
import Weather from "./Pages/Public/Weather";
import SaveLocation from "./Pages/Public/SaveLocation";
import Profile from "./Pages/Public/Profile";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Admin Pages
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import AdminBoats from './Pages/AdminBoats';
import AdminUsers from './Pages/AdminUsers';
import AdminEmergencies from './Pages/AdminEmergencies';
import AdminWeather from './Pages/AdminWeather';

import './App.css'

import AutoTranslate from "./components/AutoTranslate"; // ✅ ADD THIS

function App() {
  return (
    <>
        {/* ✅ WRAP EVERYTHING WITH AutoTranslate */}
      <AutoTranslate>
      <Routes>
        
        {/* ============ PUBLIC ROUTES ============ */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ============ OWNER PROTECTED ROUTES ============ */}
        <Route
          path="/boatownerdashboard"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <BoatOwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/boatownerboats"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <BoatOwnerBoats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addnewboat"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <AddNewBoat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <Maintenance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance/engine"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <MaintenanceEngine />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance/spare-parts"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <MaintenanceSpareParts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maintenance/body-parts"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <MaintenanceBodyParts />
            </ProtectedRoute>
          }
        />
        <Route path="/owner/finance" element={<Finance />} />
        <Route path="/owner/finance/daily" element={<DailyCalculation />} />
        <Route path="/owner/finance/monthly" element={<MonthlyReports />} />

        {/* ============ DRIVER PROTECTED ROUTES ============ */}
        <Route
          path="/boatdriverdashboard"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <BoatDriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gps-save"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <SaveLocation />
            </ProtectedRoute>
          }
        />

        {/* ============ SHARED PROTECTED (Owner + Driver) ============ */}
        <Route
          path="/weather"
          element={
            <ProtectedRoute allowedRoles={["owner", "driver"]}>
              <WeatherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weather/:boatId"
          element={
            <ProtectedRoute allowedRoles={["owner", "driver"]}>
              <Weather />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["owner", "driver"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ============ ADMIN ROUTES ============ */}
        <Route path="/dw-admin" element={<AdminLogin />} />
        <Route path="/dw-admin/login" element={<AdminLogin />} />
        
        <Route path="/dw-admin/weather" element={<AdminWeather />} />

        <Route
          path="/dw-admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dw-admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dw-admin/boats"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminBoats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dw-admin/emergencies"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminEmergencies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dw-admin/weather"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminWeather />
            </ProtectedRoute>
          }
        />

      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      </AutoTranslate>
    </>
  );
}

export default App;