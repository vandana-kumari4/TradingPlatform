import React from "react";
import designSystemV2 from "../../styles/designSystemV2";

export const Button = ({
  variant = "primary",
  size = "md",
  icon: Icon,
  children,
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  ...props
}) => {
  const { colors, spacing, typography, radius, transition } = designSystemV2;

  const baseStyle = {
    fontFamily: typography.fontFamily,
    fontWeight: 500,
    border: "none",
    borderRadius: radius.md,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: transition.base,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    width: fullWidth ? "100%" : "auto",
    ...typography.body,
  };

  const sizeStyles = {
    sm: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: "12px",
    },
    md: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: "14px",
    },
    lg: {
      padding: `${spacing.lg} ${spacing.xl}`,
      fontSize: "16px",
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: disabled ? colors.border : colors.primary,
      color: "white",
      "&:hover": disabled ? {} : { backgroundColor: colors.primaryDark },
    },
    secondary: {
      backgroundColor: colors.bgSecondary,
      color: colors.textPrimary,
      border: `1px solid ${colors.border}`,
      "&:hover": disabled ? {} : { backgroundColor: colors.borderLight },
    },
    ghost: {
      backgroundColor: "transparent",
      color: colors.textSecondary,
      "&:hover": disabled ? {} : { backgroundColor: colors.borderLight },
    },
    danger: {
      backgroundColor: disabled ? colors.border : colors.error,
      color: "white",
      "&:hover": disabled ? {} : { backgroundColor: "#DC2626" },
    },
  };

  const style = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button style={style} disabled={disabled} onClick={onClick} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

export default Button;