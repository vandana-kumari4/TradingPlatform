import React from 'react';
import designSystem from '../../styles/designSystem';

export const StatusBadge = ({
  status = 'neutral', // up, down, neutral, loading
  value,
  showArrow = true,
  size = 'md',
  ...props
}) => {
  const { colors, spacing, radius } = designSystem;

  const statusConfig = {
    up: {
      backgroundColor: colors.statusSuccess,
      color: '#047857',
      arrow: '↑',
    },
    down: {
      backgroundColor: colors.statusError,
      color: colors.error,
      arrow: '↓',
    },
    neutral: {
      backgroundColor: colors.bgTertiary,
      color: colors.textPrimary,
      arrow: '→',
    },
    loading: {
      backgroundColor: colors.statusInfo,
      color: colors.info,
      arrow: '⟳',
    },
  };

  const config = statusConfig[status];

  const sizeStyles = {
    sm: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: '11px',
    },
    md: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: '12px',
    },
    lg: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '14px',
    },
  };

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: config.backgroundColor,
    color: config.color,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    ...sizeStyles[size],
  };

  return (
    <span style={style} {...props}>
      {showArrow && <span>{config.arrow}</span>}
      {value}
    </span>
  );
};

export default StatusBadge;