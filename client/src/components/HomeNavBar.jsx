import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Ship, Moon, Sun, User, LayoutDashboard, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext"; 


const API_URL = "http://localhost:5000"; 

const HomeNavBar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const { user, isLoggedIn, logout } = useAuth(); 
  const navigate = useNavigate(); 

  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

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
    <>
      <style>{responsiveStyles}</style>

      <nav className="w-[98%] mx-auto mt-4 rounded-2xl 
      flex flex-col
      px-4 md:px-6 py-2.5
      bg-white/40 dark:bg-slate-900/80 backdrop-blur-xl
      border border-white/30 dark:border-slate-700/50
      sticky top-4 z-50
      shadow-lg
      transition-colors duration-300">

        {/* ===== MAIN NAV ROW ===== */}
        <div className="flex items-center justify-between">

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

            {!isLoggedIn() ? (
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

                {showDropdown && (
                  <div className="
                    absolute right-0 mt-3 w-64 
                    bg-white dark:bg-slate-800 
                    rounded-xl shadow-2xl 
                    border border-slate-200 dark:border-slate-700
                    overflow-hidden
                    animate-in fade-in slide-in-from-top-2 duration-200
                  ">
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

                    <div className="py-2">
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

                      <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>

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

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="hamburger-btn"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">

            {/* Mobile Nav Links */}
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`
              }
            >
              🏠 Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`
              }
            >
              ℹ️ About
            </NavLink>

            <NavLink
              to="/features"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`
              }
            >
              ⚡ Features
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "mobile-nav-link-active" : ""}`
              }
            >
              📞 Contact
            </NavLink>

            {/* Divider */}
            <div className="mobile-menu-divider"></div>

            {/* Bottom Row - Theme + Login */}
            <div className="mobile-bottom-row">

              {/* Theme Toggle */}
              <button onClick={toggleTheme} className="mobile-theme-btn">
                {mode === "dark" ? (
                  <>
                    <Sun className="w-4 h-4 text-yellow-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>

              {/* Login Button */}
              {!isLoggedIn() && (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-login-btn"
                >
                  Login →
                </Link>
              )}

            </div>

          </div>
        )}

      </nav>
    </>
  );
};


// ============================================================
// ✅ RESPONSIVE STYLES - Proper & Attractive
// ============================================================

const responsiveStyles = `

  /* ==============================
     HAMBURGER BUTTON
     ============================== */

  .hamburger-btn {
    display: none;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0.625rem;
    border: 1.5px solid rgba(148, 163, 184, 0.4);
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
    color: #1e3a5f;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  }

  .hamburger-btn:hover {
    background: rgba(255, 255, 255, 0.55);
    border-color: rgba(99, 179, 237, 0.6);
    color: #2563eb;
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.15);
  }


  /* ==============================
     MOBILE MENU PANEL
     ============================== */

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 0.875rem;
    padding: 0.875rem 0.5rem 0.625rem;
    border-top: 1px solid rgba(148, 163, 184, 0.25);
    animation: slideDown 0.22s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }


  /* ==============================
     MOBILE NAV LINKS
     ============================== */

  .mobile-nav-link {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.75rem 1rem;
    border-radius: 0.875rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: #1e293b;
    text-decoration: none;
    letter-spacing: 0.01em;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }

  .mobile-nav-link:hover {
    background: rgba(239, 246, 255, 0.85);
    color: #2563eb;
    border-color: rgba(147, 197, 253, 0.4);
    padding-left: 1.25rem;
    box-shadow: 0 1px 4px rgba(37, 99, 235, 0.08);
  }

  .mobile-nav-link-active {
    background: linear-gradient(135deg, rgba(239, 246, 255, 0.95), rgba(224, 242, 254, 0.9));
    color: #2563eb;
    font-weight: 600;
    border-color: rgba(147, 197, 253, 0.5);
    box-shadow: 0 1px 6px rgba(37, 99, 235, 0.1);
  }


  /* ==============================
     DIVIDER
     ============================== */

  .mobile-menu-divider {
    margin: 0.375rem 0.5rem;
    height: 1px;
    background: linear-gradient(
      to right, 
      transparent, 
      rgba(148, 163, 184, 0.35), 
      transparent
    );
    border: none;
  }


  /* ==============================
     BOTTOM ROW
     ============================== */

  .mobile-bottom-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.375rem 0.25rem 0.25rem;
    gap: 0.5rem;
  }


  /* ==============================
     THEME TOGGLE BUTTON
     ============================== */

  .mobile-theme-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.875rem;
    border-radius: 2rem;
    font-size: 0.8125rem;
    font-weight: 500;
    color: #475569;
    background: rgba(241, 245, 249, 0.8);
    border: 1px solid rgba(148, 163, 184, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.01em;
  }

  .mobile-theme-btn:hover {
    background: rgba(226, 232, 240, 0.9);
    color: #1e293b;
    border-color: rgba(99, 179, 237, 0.4);
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  }


  /* ==============================
     LOGIN BUTTON
     ============================== */

  .mobile-login-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1.125rem;
    border-radius: 2rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: white;
    text-decoration: none;
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    border: none;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
    transition: all 0.25s ease;
    letter-spacing: 0.01em;
  }

  .mobile-login-btn:hover {
    background: linear-gradient(135deg, #2563eb, #0891b2);
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
    transform: translateY(-1px);
  }


  /* ==============================
     SHOW ON MOBILE (max-width: 767px)
     ============================== */

  @media (max-width: 767px) {

    .hamburger-btn {
      display: flex !important;
    }

  }


  /* ==============================
     SMALL MOBILE (max-width: 480px)
     ============================== */

  @media (max-width: 480px) {

    .mobile-menu {
      padding: 0.75rem 0.25rem 0.5rem;
      gap: 0.2rem;
    }

    .mobile-nav-link {
      font-size: 0.875rem !important;
      padding: 0.625rem 0.875rem !important;
    }

    .mobile-nav-link:hover {
      padding-left: 1.125rem !important;
    }

    .mobile-theme-btn {
      font-size: 0.75rem !important;
      padding: 0.4rem 0.75rem !important;
    }

    .mobile-login-btn {
      font-size: 0.75rem !important;
      padding: 0.4rem 0.875rem !important;
    }

    .hamburger-btn {
      width: 2rem !important;
      height: 2rem !important;
    }
  }


  /* ==============================
     VERY SMALL (max-width: 360px)
     ============================== */

  @media (max-width: 360px) {

    .mobile-nav-link {
      font-size: 0.8125rem !important;
      padding: 0.5rem 0.75rem !important;
    }

    .mobile-bottom-row {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 0.5rem !important;
    }

    .mobile-theme-btn {
      justify-content: center !important;
      width: 100% !important;
    }

    .mobile-login-btn {
      justify-content: center !important;
      text-align: center !important;
    }
  }
`;

export default HomeNavBar;