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
// ✅ New imports
import ForgotPassword from "./Pages/Public/ForgotPassword";
import ResetPassword from "./Pages/Public/ResetPassword";
import Profile from "./Pages/Public/Profile";



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
                {/* ✅ New routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      
        
          
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

      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App;