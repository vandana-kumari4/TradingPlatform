import React from 'react';
import designSystem from '../../styles/designSystem';

export const Button = ({
  variant = 'primary', // primary, secondary, ghost, destructive
  size = 'md', // sm, md, lg
  isLoading = false,
  disabled = false,
  children,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const { colors, typography, spacing, radius, transitions } = designSystem;

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    borderRadius: radius.md,
    transition: transitions.base,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const sizeStyles = {
    sm: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: '12px',
      height: '32px',
    },
    md: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '14px',
      height: '40px',
    },
    lg: {
      padding: `${spacing.lg} ${spacing.xl}`,
      fontSize: '16px',
      height: '48px',
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.textInverse,
      border: `1px solid ${colors.primary}`,
      ':hover': {
        backgroundColor: '#1d4ed8',
        boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`,
      },
      ':active': {
        backgroundColor: '#1e40af',
      },
      ':focus': {
        outline: 'none',
        boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.2)`,
      },
    },
    secondary: {
      backgroundColor: colors.bgSecondary,
      color: colors.textPrimary,
      border: `1px solid ${colors.border}`,
      ':hover': {
        backgroundColor: colors.bgTertiary,
      },
      ':active': {
        backgroundColor: colors.border,
      },
      ':focus': {
        boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.textPrimary,
      border: '1px solid transparent',
      ':hover': {
        backgroundColor: colors.bgSecondary,
      },
      ':active': {
        backgroundColor: colors.bgTertiary,
      },
      ':focus': {
        boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`,
      },
    },
    destructive: {
      backgroundColor: 'transparent',
      color: colors.error,
      border: `1px solid ${colors.error}`,
      ':hover': {
        backgroundColor: colors.statusError,
      },
      ':active': {
        backgroundColor: '#fecaca',
      },
      ':focus': {
        boxShadow: `0 0 0 3px rgba(239, 68, 68, 0.1)`,
      },
    },
  };

  const style = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, variantStyles[variant][':hover']);
  };

  const handleMouseLeave = (e) => {
    Object.assign(e.target.style, variantStyles[variant]);
  };

  const handleFocus = (e) => {
    Object.assign(e.target.style, variantStyles[variant][':focus']);
  };

  const handleBlur = (e) => {
    Object.assign(e.target.style, variantStyles[variant]);
  };

  return (
    <button
      style={style}
      disabled={disabled || isLoading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          Loading...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={16} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={16} />}
        </>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default Button;