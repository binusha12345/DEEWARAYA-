// client/src/components/OwnerSidebar.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

// ============================================================
// SIDEBAR LINK COMPONENT
// ============================================================
const SidebarLink = ({ to, icon: Icon, text, iconColor }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      data-tooltip={text}
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

      <span className="text-[15px] font-medium tracking-wide sidebar-link-text">
        {text}
      </span>
    </Link>
  );
};

// ============================================================
// MAIN SIDEBAR COMPONENT
// ============================================================
const OwnerSidebar = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* ✅ Inject styles ONCE at component level */}
      <style>{sidebarResponsiveStyles}</style>

      <aside
        className="w-72 h-full flex flex-col 
          bg-gradient-to-b from-blue-800 to-cyan-700
          text-white shadow-xl "
      >
        {/* Logo Section */}
        <div className="px-8 py-8 border-b border-blue-700">
          <Link to="/">
            <h1 className="text-2xl font-bold tracking-wide text-white">
              DEEWARAYA
            </h1>
            <p className="text-blue-300 text-xs tracking-widest uppercase mt-1">
              Fleet Management
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <SidebarLink
            to="/boatownerdashboard"
            icon={LayoutDashboard}
            text="Dashboard"
            iconColor="text-cyan-300"
          />

          <SidebarLink
            to="/boatownerboats"
            icon={Ship}
            text="My Boats"
            iconColor="text-emerald-300"
          />

          <SidebarLink
            to="/gps-tracking"
            icon={MapPin}
            text="GPS Tracking"
            iconColor="text-yellow-300"
          />

          <SidebarLink
            to="/maintenance"
            icon={Wrench}
            text="Maintenance"
            iconColor="text-orange-300"
          />

          <SidebarLink
            to="/weather"
            icon={CloudRain}
            text="Weather"
            iconColor="text-sky-300"
          />

          <SidebarLink
            to="/owner/finance"
            icon={Wallet}
            text="Finance"
            iconColor="text-green-300"
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
          <p className="text-blue-300 text-xs">© 2026 Deewaraya</p>
        </div>
      </aside>
    </>
  );
};

// ============================================================
// ✅ RESPONSIVE STYLES
// ============================================================
const sidebarResponsiveStyles = `

  aside {
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  /* ==============================
     LAPTOP (max-width: 1280px)
     ============================== */
  @media (max-width: 1280px) {
    aside {
      width: 16rem !important;
    }

    aside h1 {
      font-size: 1.375rem !important;
    }

    aside .px-8 {
      padding-left: 1.5rem !important;
      padding-right: 1.5rem !important;
    }

    aside a span.sidebar-link-text {
      font-size: 0.875rem !important;
    }
  }

  /* ==============================
     SMALL LAPTOP (max-width: 1024px)
     ============================== */
  @media (max-width: 1024px) {
    aside {
      width: 14rem !important;
    }

    aside h1 {
      font-size: 1.25rem !important;
    }

    aside p.text-blue-300 {
      font-size: 0.65rem !important;
    }

    aside .px-8 {
      padding-left: 1.25rem !important;
      padding-right: 1.25rem !important;
      padding-top: 1.25rem !important;
      padding-bottom: 1.25rem !important;
    }

    aside .px-4 {
      padding-left: 0.75rem !important;
      padding-right: 0.75rem !important;
    }

    aside a {
      padding-left: 1rem !important;
      padding-right: 1rem !important;
      padding-top: 0.625rem !important;
      padding-bottom: 0.625rem !important;
      gap: 0.75rem !important;
    }

    aside a span.sidebar-link-text {
      font-size: 0.8125rem !important;
    }

    aside svg {
      width: 1rem !important;
      height: 1rem !important;
    }

    aside .px-6.py-4 {
      padding-left: 1rem !important;
      padding-right: 1rem !important;
    }
  }

  /* ==============================
     TABLET (max-width: 768px)
     ============================== */
  @media (max-width: 768px) {
    aside {
      width: 4.5rem !important;
      min-width: 4.5rem !important;
    }

    aside h1 {
      display: none !important;
    }

    aside p.text-blue-300 {
      display: none !important;
    }

    aside .px-8 {
      padding: 1rem 0 !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    aside .px-8 a::before {
      content: "D" !important;
      font-size: 1.25rem !important;
      font-weight: 900 !important;
      color: white !important;
      display: block !important;
    }

    aside .px-4 {
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
    }

    aside nav a {
      padding: 0.75rem !important;
      justify-content: center !important;
      gap: 0 !important;
      border-radius: 0.75rem !important;
    }

    aside nav a span.sidebar-link-text {
      display: none !important;
    }

    aside svg {
      width: 1.25rem !important;
      height: 1.25rem !important;
      flex-shrink: 0 !important;
    }

    aside a span.absolute {
      display: none !important;
    }

    aside .px-6.py-4 {
      padding: 0.75rem 0.25rem !important;
      text-align: center !important;
    }

    aside .px-6.py-4 p {
      display: none !important;
    }

    /* Tooltip on hover */
    aside nav a {
      position: relative !important;
    }

    aside nav a:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      left: calc(100% + 0.75rem);
      top: 50%;
      transform: translateY(-50%);
      background: #0f172a;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;
      white-space: nowrap;
      z-index: 999;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    aside nav a:hover::before {
      content: '';
      position: absolute;
      left: calc(100% + 0.375rem);
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-right-color: #0f172a;
      z-index: 999;
    }
  }

  /* ==============================
     MOBILE (max-width: 640px)
     ============================== */
  @media (max-width: 640px) {
    aside {
      width: 4rem !important;
      min-width: 4rem !important;
    }

    aside .px-8 {
      padding: 0.875rem 0 !important;
    }

    aside nav a {
      padding: 0.625rem !important;
      border-radius: 0.625rem !important;
    }

    aside svg {
      width: 1.125rem !important;
      height: 1.125rem !important;
    }

    aside .space-y-2 > * + * {
      margin-top: 0.25rem !important;
    }
  }

  /* ==============================
     SMALL MOBILE (max-width: 480px)
     ============================== */
  @media (max-width: 480px) {
    aside {
      width: 3.5rem !important;
      min-width: 3.5rem !important;
    }

    aside .px-8 {
      padding: 0.75rem 0 !important;
    }

    aside nav a {
      padding: 0.5rem !important;
      border-radius: 0.5rem !important;
    }

    aside svg {
      width: 1rem !important;
      height: 1rem !important;
    }

    aside .px-4 {
      padding-left: 0.375rem !important;
      padding-right: 0.375rem !important;
    }

    aside .space-y-2 > * + * {
      margin-top: 0.125rem !important;
    }
  }

  /* ==============================
     VERY SMALL (max-width: 360px)
     ============================== */
  @media (max-width: 360px) {
    aside {
      width: 3rem !important;
      min-width: 3rem !important;
    }

    aside nav a {
      padding: 0.375rem !important;
      border-radius: 0.375rem !important;
    }

    aside svg {
      width: 0.875rem !important;
      height: 0.875rem !important;
    }

    aside .px-4 {
      padding-left: 0.25rem !important;
      padding-right: 0.25rem !important;
    }
  }

  /* ==============================
     ANIMATIONS
     ============================== */
  @keyframes sidebarFadeIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0);     }
  }

  aside {
    animation: sidebarFadeIn 0.3s ease forwards;
  }
`;

export default OwnerSidebar;