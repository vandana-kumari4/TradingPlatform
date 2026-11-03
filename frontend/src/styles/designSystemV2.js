// Professional Fintech Design System
const designSystemV2 = {
  // Colors
  colors: {
    // Neutrals
    bg: "#F7F8FA",
    bgSecondary: "#F9FAFB",
    surface: "#FFFFFF",
    border: "#E4E7EC",
    borderLight: "#F2F4F7",
    
    // Text
    textPrimary: "#111827",      // Dark gray
    textSecondary: "#667085",    // Medium gray
    textTertiary: "#98A2B3",     // Light gray
    
    // Brand
    primary: "#2563EB",          // Blue
    primaryLight: "#EFF6FF",
    primaryDark: "#1E40AF",
    
    // Semantic
    success: "#10B981",
    successLight: "#ECFDF5",
    error: "#EF4444",
    errorLight: "#FEF2F2",
    warning: "#F59E0B",
    warningLight: "#FFFBEB",
    info: "#0EA5E9",
    infoLight: "#F0F9FF",
  },

  // Typography
  typography: {
    // Font families
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    
    // Headings
    h1: {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: "1.2",
      letterSpacing: "-0.5px",
    },
    h2: {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "1.3",
      letterSpacing: "-0.25px",
    },
    h3: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: "1.4",
    },
    h4: {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "1.5",
    },
    
    // Body
    body: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "1.5",
    },
    bodyLarge: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "1.6",
    },
    bodySmall: {
      fontSize: "13px",
      fontWeight: 400,
      lineHeight: "1.5",
    },
    
    // Labels & caps
    label: {
      fontSize: "12px",
      fontWeight: 600,
      lineHeight: "1.4",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    
    // Mono (for numbers)
    mono: {
      fontFamily: "'Menlo', 'Monaco', monospace",
      fontSize: "13px",
      fontWeight: 500,
    },
  },

  // Spacing (8px base)
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    "3xl": "48px",
  },

  // Border radius
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  // Shadows
  shadow: {
    none: "none",
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },

  // Transitions
  transition: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Breakpoints
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
  },
};

export default designSystemV2;