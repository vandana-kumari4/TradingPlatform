import React from "react";
import designSystemV2 from "../../styles/designSystemV2";

export const Badge = ({
  children,
  variant = "default",
  size = "md",
  icon: Icon,
  ...props
}) => {
  const { colors, spacing, typography, radius } = designSystemV2;

  const sizeStyles = {
    sm: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: "11px",
      fontWeight: 600,
    },
    md: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: "12px",
      fontWeight: 600,
    },
    lg: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: "13px",
      fontWeight: 600,
    },
  };

  const variantStyles = {
    default: {
      backgroundColor: colors.bgSecondary,
      color: colors.textPrimary,
      border: `1px solid ${colors.border}`,
    },
    primary: {
      backgroundColor: colors.primaryLight,
      color: colors.primary,
    },
    success: {
      backgroundColor: colors.successLight,
      color: colors.success,
    },
    error: {
      backgroundColor: colors.errorLight,
      color: colors.error,
    },
    warning: {
      backgroundColor: colors.warningLight,
      color: colors.warning,
    },
    info: {
      backgroundColor: colors.infoLight,
      color: colors.info,
    },
  };

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    borderRadius: radius.full,
    fontFamily: typography.fontFamily,
    fontWeight: 600,
    whiteSpace: "nowrap",
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <span style={baseStyle} {...props}>
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
};

export default Badge;