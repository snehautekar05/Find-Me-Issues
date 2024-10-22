import { createContext, useState, useEffect } from "react";

// Create ThemeContext
export const ThemeContext = createContext();

// Theme modes
const light = { mode: 'light', color: 'black', bg: 'white' };
const dark = { mode: 'dark', color: 'white', bg: '#020300' };

// Function to get the system theme preference
const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? dark : light;
};

// ThemeProvider component
export function ThemeProvider(props) {
  // Initialize theme state
  const [theme, setTheme] = useState(() => {
    // Load the theme from local storage or fallback to system theme
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme ? JSON.parse(savedTheme) : getSystemTheme();
  });

  // Handle theme change
  function changeTheme() {
    const newTheme = theme.mode === 'light' ? dark : light;
    setTheme(newTheme);
    localStorage.setItem('themeMode', JSON.stringify(newTheme));
  }

  
  useEffect(() => {
    document.body.style.backgroundColor = theme.bg;
    document.body.style.color = theme.color;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
