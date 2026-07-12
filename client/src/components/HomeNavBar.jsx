import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Ship, Moon, Sun, User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext"; 


const API_URL = "http://localhost:5000"; 

const HomeNavBar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const { user, isLoggedIn, logout } = useAuth(); 
  const navigate = useNavigate(); 

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  // Navigate to profile
  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

  // Navigate to dashboard based on role
  const handleDashboardClick = () => {
    setShowDropdown(false);
    if (user?.role === "owner") {
      navigate("/BoatOwnerDashboard");
    } else if (user?.role === "driver") {
      navigate("/BoatDriverDashboard");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-1"
      : "text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors";

  return (
    <nav className="w-[98%] mx-auto mt-4 rounded-2xl 
    flex items-center justify-between px-4 md:px-6 py-2.5
    bg-white/40 dark:bg-slate-900/80 backdrop-blur-xl
    border border-white/30 dark:border-slate-700/50
    sticky top-4 z-50
    shadow-lg
    transition-colors duration-300">

      {/* Logo */}
      <Link
        to="/"
        className="
          flex items-center gap-5
          font-bold text-xl md:text-2xl
          text-blue-900 dark:text-blue-300
        "
      >
        <img
          src="/logo.png"
          alt="Deewaraya Logo"
          className="w-8 h-8 object-contain"
        />
        <span>Deewaraya</span>
      </Link>

      {/* Center Nav Links */}
      <div
        className="
          hidden md:flex items-center gap-6
          text-base md:text-lg font-medium
          text-slate-900 dark:text-slate-100
        "
      >
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/about" className={navLinkClass}>About</NavLink>
        <NavLink to="/features" className={navLinkClass}>Features</NavLink>
        <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="
              p-2 rounded-lg
              text-slate-500 dark:text-slate-400
              hover:text-slate-800 dark:hover:text-white
              hover:bg-slate-100 dark:hover:bg-slate-800
              transition-all duration-300
            "
          >
            {mode === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* CONDITIONAL RENDERING - Login/Register OR Profile */}
        {!isLoggedIn() ? (
          // NOT LOGGED IN - Show Login & Register
          <>
            <Link
              to="/login"
              className="
                text-sm md:text-base font-medium
                text-slate-900 dark:text-slate-100
                hover:text-blue-600 dark:hover:text-blue-400
                transition-colors
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                px-6 py-1.5 rounded-md
                text-sm md:text-base font-medium
                bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white
                transition-colors
              "
            >
              Register
            </Link>
          </>
        ) : (
          // LOGGED IN - Show Profile Dropdown
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="
                flex items-center gap-2 px-3 py-1.5 rounded-full
                bg-gradient-to-r from-blue-500 to-cyan-500
                hover:from-blue-600 hover:to-cyan-600
                text-white font-medium text-sm md:text-base
                transition-all duration-300
                shadow-md hover:shadow-lg
              "
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-2 border-white/40">
                {user?.profilePicture ? (
                  <img
                    src={`${API_URL}${user.profilePicture}`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <span className="hidden md:inline">{user?.name}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* DROPDOWN MENU */}
            {showDropdown && (
              <div className="
                absolute right-0 mt-3 w-64 
                bg-white dark:bg-slate-800 
                rounded-xl shadow-2xl 
                border border-slate-200 dark:border-slate-700
                overflow-hidden
                animate-in fade-in slide-in-from-top-2 duration-200
              ">
                {/* User Info Header */}
                <div className="
                  bg-gradient-to-r from-blue-500 to-cyan-500 
                  p-4 text-white
                ">
                  <div className="flex items-center gap-3">
                    <div className="
                      w-12 h-12 rounded-full 
                      bg-white/20 backdrop-blur-md
                      flex items-center justify-center
                      border-2 border-white/30
                      overflow-hidden
                    ">
                      {user?.profilePicture ? (
                        <img
                          src={`${API_URL}${user.profilePicture}`}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{user?.name}</p>
                      <p className="text-xs opacity-90 truncate">{user?.email}</p>
                    </div>
                  </div>
                  
                  {/* Role Badge */}
                  <div className="mt-3">
                    <span className="
                      inline-block px-3 py-1 
                      bg-white/20 backdrop-blur-md
                      rounded-full text-xs font-semibold
                      border border-white/30
                    ">
                      {user?.role === "owner" ? "🚤 Boat Owner" : "⚓ Boat Driver"}
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {/* Profile */}
                  <button
                    onClick={handleProfileClick}
                    className="
                      w-full flex items-center gap-3 px-4 py-3
                      text-slate-700 dark:text-slate-200
                      hover:bg-slate-100 dark:hover:bg-slate-700
                      transition-colors duration-200
                      text-sm font-medium
                    "
                  >
                    <div className="
                      w-8 h-8 rounded-lg 
                      bg-blue-100 dark:bg-blue-900/50
                      flex items-center justify-center
                    ">
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    My Profile
                  </button>

                  {/* Dashboard */}
                  <button
                    onClick={handleDashboardClick}
                    className="
                      w-full flex items-center gap-3 px-4 py-3
                      text-slate-700 dark:text-slate-200
                      hover:bg-slate-100 dark:hover:bg-slate-700
                      transition-colors duration-200
                      text-sm font-medium
                    "
                  >
                    <div className="
                      w-8 h-8 rounded-lg 
                      bg-cyan-100 dark:bg-cyan-900/50
                      flex items-center justify-center
                    ">
                      <LayoutDashboard className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    Dashboard
                  </button>

                  {/* Divider */}
                  <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="
                      w-full flex items-center gap-3 px-4 py-3
                      text-red-600 dark:text-red-400
                      hover:bg-red-50 dark:hover:bg-red-900/20
                      transition-colors duration-200
                      text-sm font-medium
                    "
                  >
                    <div className="
                      w-8 h-8 rounded-lg 
                      bg-red-100 dark:bg-red-900/50
                      flex items-center justify-center
                    ">
                      <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </div>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default HomeNavBar;