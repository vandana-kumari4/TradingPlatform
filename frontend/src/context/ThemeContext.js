import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = isDarkMode
    ? {
        primary: "#0066cc",
        success: "#2ecc71",
        danger: "#e74c3c",
        warning: "#f39c12",
        background: "#0d0d0d",
        surface: "#1a1a1a",
        surfaceLight: "#2a2a2a",
        text: "#e0e0e0",
        textSecondary: "#999999",
        border: "#333333",
        hover: "#242424",
      }
    : {
        primary: "#0066cc",
        success: "#27ae60",
        danger: "#c0392b",
        warning: "#e67e22",
        background: "#ffffff",
        surface: "#f5f5f5",
        surfaceLight: "#ffffff",
        text: "#2c3e50",
        textSecondary: "#7f8c8d",
        border: "#ecf0f1",
        hover: "#e8e8e8",
      };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};