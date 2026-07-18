import React from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const DashboardNav = () => {
  return (
    <header className="flex justify-between items-center px-10 py-4 
      bg-gradient-to-r from-blue-900 via-cyan-600 to-blue-950
      shadow-md border-1 border-white">

        <style>{navResponsiveStyles}</style> 

      {/* Logo */}
      <h2 className="text-white text-2xl font-bold tracking-wide">
        Maritime <span className="text-cyan-300">Precision</span>
      </h2>

      
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        {/* other items */}
      </div>

      <div className="flex items-center gap-10">

        {/* Navigation */}
        <nav className="hidden md:flex gap-8 text-[18px] font-medium">
          
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative transition-all duration-300 ${
                isActive
                  ? "text-white"
                  : "text-blue-200 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <span className="relative">
                Home
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
                )}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `relative transition-all duration-300 ${
                isActive
                  ? "text-white"
                  : "text-blue-200 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <span className="relative">
                About
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
                )}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative transition-all duration-300 ${
                isActive
                  ? "text-white"
                  : "text-blue-200 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <span className="relative">
                Contact
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
                )}
              </span>
            )}
          </NavLink>

        </nav>

        {/* Profile */}
        <div className="relative group w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-md cursor-pointer">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-blue-900">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              alt="User Profile"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>

      </div>
    </header>
  );
};

const navResponsiveStyles = `

  /* ==============================
     BASE - Navbar foundation
     ============================== */

  header {
    position: relative;
    z-index: 50;
    width: 100%;
    flex-shrink: 0;
  }

  header h2 {
    white-space: nowrap;
    flex-shrink: 0;
  }

  header nav a {
    white-space: nowrap;
  }

  /* Avatar base */
  header .w-11.h-11 {
    flex-shrink: 0;
  }


  /* ==============================
     LARGE DESKTOP (1280px+)
     - Everything stays original
     ============================== */


  /* ==============================
     LAPTOP (max-width: 1280px)
     ============================== */
  @media (max-width: 1280px) {

    header {
      padding-left: 2rem !important;
      padding-right: 2rem !important;
    }

    header h2 {
      font-size: 1.375rem !important;
    }

    header nav {
      gap: 1.5rem !important;
      font-size: 1rem !important;
    }

    /* Right side wrapper gap */
    header > div.flex.items-center {
      gap: 1.75rem !important;
    }
  }


  /* ==============================
     SMALL LAPTOP (max-width: 1024px)
     ============================== */
  @media (max-width: 1024px) {

    header {
      padding-left: 1.5rem !important;
      padding-right: 1.5rem !important;
      padding-top: 0.75rem !important;
      padding-bottom: 0.75rem !important;
    }

    header h2 {
      font-size: 1.25rem !important;
    }

    header nav {
      gap: 1.25rem !important;
      font-size: 0.9375rem !important;
    }

    /* Right side gap */
    header > div.flex.items-center {
      gap: 1.25rem !important;
    }

    /* Avatar */
    header .w-11.h-11 {
      width: 2.25rem !important;
      height: 2.25rem !important;
    }
  }


  /* ==============================
     TABLET (max-width: 768px)
     - Hide desktop nav
     - Compact header
     ============================== */
  @media (max-width: 768px) {

    header {
      padding-left: 1.25rem !important;
      padding-right: 1.25rem !important;
      padding-top: 0.75rem !important;
      padding-bottom: 0.75rem !important;
    }

    header h2 {
      font-size: 1.125rem !important;
    }

    /* Hide desktop nav links */
    header nav.hidden.md\\:flex {
      display: none !important;
    }

    /* Right side gap */
    header > div.flex.items-center {
      gap: 0.75rem !important;
    }

    /* Avatar */
    header .w-11.h-11 {
      width: 2rem !important;
      height: 2rem !important;
    }
  }


  /* ==============================
     MOBILE (max-width: 640px)
     ============================== */
  @media (max-width: 640px) {

    header {
      padding-left: 1rem !important;
      padding-right: 1rem !important;
      padding-top: 0.625rem !important;
      padding-bottom: 0.625rem !important;
    }

    header h2 {
      font-size: 1rem !important;
    }

    /* Right side gap */
    header > div.flex.items-center {
      gap: 0.5rem !important;
    }

    /* Avatar */
    header .w-11.h-11 {
      width: 1.875rem !important;
      height: 1.875rem !important;
    }
  }


  /* ==============================
     SMALL MOBILE (max-width: 480px)
     ============================== */
  @media (max-width: 480px) {

    header {
      padding-left: 0.875rem !important;
      padding-right: 0.875rem !important;
    }

    header h2 {
      font-size: 0.9375rem !important;
    }

    /* Avatar */
    header .w-11.h-11 {
      width: 1.75rem !important;
      height: 1.75rem !important;
    }

    /* Right side gap */
    header > div.flex.items-center {
      gap: 0.5rem !important;
    }
  }


  /* ==============================
     VERY SMALL (max-width: 360px)
     ============================== */
  @media (max-width: 360px) {

    header {
      padding-left: 0.625rem !important;
      padding-right: 0.625rem !important;
    }

    header h2 {
      font-size: 0.875rem !important;
    }

    /* Right side gap */
    header > div.flex.items-center {
      gap: 0.375rem !important;
    }

    /* Avatar */
    header .w-11.h-11 {
      width: 1.625rem !important;
      height: 1.625rem !important;
    }
  }


  /* ==============================
     ANIMATIONS
     ============================== */
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1);    }
  }

  .animate-slideDown { animation: slideDown 0.22s ease forwards; }
  .animate-fadeIn    { animation: fadeIn    0.25s ease forwards; }
  .animate-slideUp   { animation: slideUp   0.28s ease forwards; }
  .animate-scaleIn   { animation: scaleIn   0.22s ease forwards; }

  /* Scrollbar hide */
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;
export default DashboardNav;