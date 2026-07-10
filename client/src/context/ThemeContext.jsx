import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {

  // Safe localStorage read
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("themeMode") || "light";
    } catch (error) {
      return "light";
    }
  });

  // Apply dark class to html element
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (mode === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("themeMode", mode);
    } catch (error) {
      console.log("Theme error:", error);
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}