import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load both user and admin from localStorage separately
  useEffect(() => {
    // Regular user (owner/driver)
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    // Admin (SEPARATE storage keys)
    const storedAdminUser = localStorage.getItem("adminUser");
    const storedAdminToken = localStorage.getItem("adminToken");
    if (storedAdminUser && storedAdminToken) {
      setAdminUser(JSON.parse(storedAdminUser));
      setAdminToken(storedAdminToken);
    }
    
    setLoading(false);
  }, []);

  // ============ USER LOGIN (Owner/Driver) ============
  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  // ============ USER LOGOUT ============
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // ============ ADMIN LOGIN (SEPARATE!) ============
  const adminLogin = (data) => {
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminUser", JSON.stringify(data.user));
    setAdminToken(data.token);
    setAdminUser(data.user);
  };

  // ============ ADMIN LOGOUT ============
  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setAdminToken(null);
    setAdminUser(null);
  };

  const isLoggedIn = () => !!token && !!user;
  const isAdminLoggedIn = () => !!adminToken && !!adminUser;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        login, 
        logout, 
        isLoggedIn,
        adminUser,
        adminToken,
        adminLogin,
        adminLogout,
        isAdminLoggedIn,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);