import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./Pages/Public/Register";
import BoatOwnerDashboard from "./Pages/Public/owner/BoatOwnerDashboard";
import BoatDriverDashboard from "./Pages/Public/driver/BoatDriverDashboard";
import HomePage from "./Pages/Public/HomePage";
import AboutPage from "./Pages/Public/AboutPage";
import Login from "./Pages/Public/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import BoatOwnerBoats from "./Pages/Public/owner/BoatOwnerBoats";
import AddNewBoat from "./Pages/Public/owner/AddNewBoat";
import WeatherDashboard from "./Pages/Public/WeatherDashboard";
import SaveLocation from "./Pages/Public/SaveLocation";
import './App.css'
import Maintenance from "./Pages/Public/owner/Maintenance";
import MaintenanceEngine from "./Pages/Public/owner/MaintenanceEngine";
import MaintenanceSpareParts from "./Pages/Public/owner/MaintenanceSpareParts";
import MaintenanceBodyParts from "./Pages/Public/owner/MaintenanceBodyParts";
import Weather from "./pages/public/Weather";
//  New imports
import ForgotPassword from "./Pages/Public/ForgotPassword";
import ResetPassword from "./Pages/Public/ResetPassword";
import Profile from "./Pages/Public/Profile";

// Admin
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import AdminBoats from './Pages/AdminBoats';
import AdminUsers from './Pages/AdminUsers';
import AdminEmergencies from './Pages/AdminEmergencies';
//import AdminBanner from './components/AdminBanner';
  


function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boatownerdashboard" element={<BoatOwnerDashboard />} />
        <Route path="/boatdriverdashboard" element={<BoatDriverDashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/boatownerboats" element={<BoatOwnerBoats />} />
        <Route path="/addnewboat" element={<AddNewBoat />} />
        <Route path="/weather" element={<WeatherDashboard />} />
        <Route path="/gps-save" element={<SaveLocation />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/maintenance/engine" element={<MaintenanceEngine />} />
        <Route path="/maintenance/spare-parts" element={<MaintenanceSpareParts />} />
        <Route path="/maintenance/body-parts" element={<MaintenanceBodyParts />} />
        <Route path="/weather/:boatId" element={<Weather />} />
                {/* New routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dw-admin/login" element={<AdminLogin />} />
        <Route path="/dw-admin/users" element={<AdminUsers />} />
        
          
        <Route
          path="/BoatOwnerDashboard"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <BoatOwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/BoatDriverDashboard"
          element={
            <ProtectedRoute allowedRoles={["driver"]}>
              <BoatDriverDashboard />
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

          {/* Admin Routes */}
          <Route path="/dw-admin" element={<AdminLogin />} />
          <Route 
            path="/dw-admin/dashboard" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dw-admin/boats" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminBoats />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dw-admin/users" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminUsers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dw-admin/emergencies" 
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminEmergencies />
              </ProtectedRoute>
            } 
          />

      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App;