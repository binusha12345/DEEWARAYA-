import React from "react";
import { NavLink } from "react-router-dom";

const DashboardNav = () => {
  return (
    <header className="flex justify-between items-center px-10 py-4 
      bg-gradient-to-r from-blue-900 via-cyan-600 to-blue-950
      shadow-md border-1 border-white">

      {/* Logo */}
      <h2 className="text-white text-2xl font-bold tracking-wide">
        Maritime <span className="text-cyan-300">Precision</span>
      </h2>

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

export default DashboardNav;