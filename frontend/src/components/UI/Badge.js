import React from 'react';
import designSystem from '../../styles/designSystem';

export const Badge = ({
  variant = 'default', // default, success, error, warning, info
  size = 'md',
  children,
  icon: Icon,
  ...props
}) => {
  const { colors, spacing, radius } = designSystem;

  const variantStyles = {
    default: {
      backgroundColor: colors.bgTertiary,
      color: colors.textPrimary,
    },
    success: {
      backgroundColor: colors.statusSuccess,
      color: '#047857',
    },
    error: {
      backgroundColor: colors.statusError,
      color: colors.error,
    },
    warning: {
      backgroundColor: colors.statusWarning,
      color: '#92400e',
    },
    info: {
      backgroundColor: colors.statusInfo,
      color: colors.info,
    },
  };

  const sizeStyles = {
    sm: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: '11px',
      fontWeight: 500,
    },
    md: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: '12px',
      fontWeight: 600,
    },
    lg: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '13px',
      fontWeight: 600,
    },
  };

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: radius.full,
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <span style={style} {...props}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
};

export default Badge;