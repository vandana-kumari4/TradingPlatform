import React from 'react';
import designSystem from '../../styles/designSystem';

export const Select = ({
  label,
  options = [],
  error,
  helperText,
  icon: Icon,
  disabled = false,
  size = 'md',
  fullWidth = true,
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

  const selectWrapperStyle = {
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

  const selectStyle = {
    ...sizeStyles[size],
    width: '100%',
    border: `1px solid ${error ? colors.error : colors.border}`,
    borderRadius: radius.md,
    backgroundColor: colors.bgPrimary,
    color: colors.textPrimary,
    fontFamily: 'inherit',
    transition: transitions.base,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: spacing.xl,
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
      <div style={selectWrapperStyle}>
        {Icon && <Icon size={16} style={iconStyle} />}
        <select
          style={selectStyle}
          disabled={disabled}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {(error || helperText) && <span style={helperStyle}>{error || helperText}</span>}
    </div>
  );
};

export default Select;