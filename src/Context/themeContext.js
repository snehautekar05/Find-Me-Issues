import { createContext, useState, useEffect } from "react";

// Create ThemeContext
export const ThemeContext = createContext();

// Theme modes
const light = { mode: "light", color: "black", bg: "white" };
const dark = { mode: "dark", color: "white", bg: "#020300" };

// Function to get the initial theme (from localStorage or system preference)
const getInitialTheme = () => {
  const savedTheme = JSON.parse(localStorage.getItem("theme"));
  if (savedTheme) return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? dark : light;
};

// ThemeProvider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Handle theme change
  const changeTheme = () => {
    const newTheme = theme.mode === "light" ? dark : light;
    setTheme(newTheme);
    localStorage.setItem('themeMode', JSON.stringify(newTheme)); // Save theme to local storage
  }

  // Effect to apply the theme to the document body (if needed)
  useEffect(() => {
    document.body.style.backgroundColor = theme.bg;
    document.body.style.color = theme.color;
  }, [theme]);

  // Memoize context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ theme, changeTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
