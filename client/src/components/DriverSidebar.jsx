import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Ship,
  MapPin,
  Wrench,
  CloudRain,
  Wallet,
  Bell,
  QrCode,
  Settings,
} from "lucide-react";

const SidebarLink = ({ to, icon: Icon, text, iconColor }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative flex items-center gap-4 px-6 py-3 rounded-lg transition-all duration-300 ${
        isActive
          ? "bg-white text-blue-900 shadow-md"
          : "text-blue-100 hover:bg-blue-800 hover:text-white"
      }`}
    >
      {/* Active Indicator */}
      {isActive && (
        <span className="absolute left-0 top-0 h-full w-1 bg-cyan-400 rounded-r-md"></span>
      )}

      <Icon
        size={20}
        className={`transition-transform duration-300 ${
          isActive ? "text-blue-900" : iconColor
        }`}
      />

      <span className="text-[15px] font-medium tracking-wide">
        {text}
      </span>
    </Link>
  );
};

const OwnerSidebar = () => {
  return (
    <aside className="w-72 h-full flex flex-col 
      bg-gradient-to-b from-blue-800 to-cyan-700
      text-white shadow-xl">

      {/* Logo Section */}
      <div className="px-8 py-8 border-b border-blue-700">
        <Link to="/" >
          <h1 className="text-2xl font-bold tracking-wide text-white">
            DEEWARAYA
          </h1>
        </Link>
        <p className="text-blue-300 text-xs tracking-widest uppercase mt-1">
          Fleet Management
        </p>       
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        <SidebarLink 
          to="/boatdriverdashboard" 
          icon={LayoutDashboard} 
          text="Dashboard"
          iconColor="text-cyan-300"
        />

        {/* <SidebarLink 
          to="/boatdriverboats" 
          icon={Ship} 
          text="Boats"
          iconColor="text-emerald-300"
        />*/}

        <SidebarLink 
          to="/gps-tracking" 
          icon={MapPin} 
          text="GPS Tracking"
          iconColor="text-yellow-300"
        />


        <SidebarLink 
          to="/weather" 
          icon={CloudRain} 
          text="Weather"
          iconColor="text-sky-300"
        />


        <SidebarLink 
          to="/notification" 
          icon={Bell} 
          text="Notifications"
          iconColor="text-pink-300"
        />

        <SidebarLink 
          to="/qr-code" 
          icon={QrCode} 
          text="QR Code"
          iconColor="text-purple-300"
        />

        <SidebarLink 
          to="/settings" 
          icon={Settings} 
          text="Settings"
          iconColor="text-gray-300"
        />

      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-blue-700 text-center">
        <p className="text-blue-300 text-xs">
          © 2026 Deewaraya
        </p>
      </div>

    </aside>
  );
};

export default OwnerSidebar;