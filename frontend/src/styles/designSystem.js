// Design System - Single Source of Truth
export const designSystem = {
  // COLORS
  colors: {
    // Semantic
    primary: '#2563EB',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Backgrounds
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F9FAFB',
    bgTertiary: '#F3F4F6',
    
    // Text
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    textInverse: '#FFFFFF',
    
    // Borders & Dividers
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    
    // Status
    statusSuccess: '#D1FAE5',
    statusError: '#FEE2E2',
    statusWarning: '#FEF3C7',
    statusInfo: '#DBEAFE',
  },

  // TYPOGRAPHY
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    
    // Scales
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '40px',
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '32px',
      letterSpacing: '-0.3px',
    },
    h3: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '28px',
    },
    
    bodyLarge: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    bodyBase: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    bodySmall: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
    },
    
    label: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '16px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    
    button: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
    },
  },

  // SPACING (8px base)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },

  // RADIUS
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // SHADOWS
  shadow: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // TRANSITIONS
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // BREAKPOINTS
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export default designSystem;