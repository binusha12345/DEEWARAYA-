import { IconButton, Tooltip } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "rotate(20deg)", 
          },
        }}
      >
        {/* Show icon based on current mode */}
        {mode === "dark" ? (
          <LightMode sx={{ color: "#FFD700" }} /> 
        ) : (
          <DarkMode sx={{ color: "#555" }} />    
        )}
      </IconButton>
    </Tooltip>
  );
}