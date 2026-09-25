import React from 'react';
import designSystem from '../../styles/designSystem';

export const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  disabled = false,
  size = 'md',
  fullWidth = true,
  type = 'text',
  ...props
}) => {
  const { colors, spacing, radius, transitions } = designSystem;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: colors.textSecondary,
  };

  const inputWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  const sizeStyles = {
    sm: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: '12px',
      height: '32px',
      paddingLeft: Icon ? '32px' : spacing.md,
    },
    md: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '14px',
      height: '40px',
      paddingLeft: Icon ? '40px' : spacing.lg,
    },
    lg: {
      padding: `${spacing.lg} ${spacing.xl}`,
      fontSize: '16px',
      height: '48px',
      paddingLeft: Icon ? '48px' : spacing.xl,
    },
  };

  const inputStyle = {
    ...sizeStyles[size],
    width: '100%',
    border: `1px solid ${error ? colors.error : colors.border}`,
    borderRadius: radius.md,
    backgroundColor: colors.bgPrimary,
    color: colors.textPrimary,
    fontFamily: 'inherit',
    transition: transitions.base,
    ':focus': {
      outline: 'none',
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`,
    },
    ':disabled': {
      backgroundColor: colors.bgTertiary,
      cursor: 'not-allowed',
      opacity: 0.6,
    },
  };

  const iconStyle = {
    position: 'absolute',
    left: spacing.md,
    color: colors.textTertiary,
    pointerEvents: 'none',
  };

  const helperStyle = {
    fontSize: '12px',
    color: error ? colors.error : colors.textTertiary,
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputWrapperStyle}>
        {Icon && <Icon size={16} style={iconStyle} />}
        <input
          type={type}
          style={inputStyle}
          disabled={disabled}
          {...props}
        />
      </div>
      {(error || helperText) && <span style={helperStyle}>{error || helperText}</span>}
    </div>
  );
};

export default Input;