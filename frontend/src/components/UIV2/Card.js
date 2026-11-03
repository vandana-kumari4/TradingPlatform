import React from "react";
import designSystemV2 from "../../styles/designSystemV2";

export const Card = ({
  children,
  header,
  footer,
  hoverable = false,
  variant = "default",
  padding = true,
  ...props
}) => {
  const { colors, spacing, radius, shadow, transition } = designSystemV2;

  const baseStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    overflow: "hidden",
    transition: transition.base,
    ...props.style,
  };

  const variantStyles = {
    default: {
      boxShadow: shadow.xs,
    },
    elevated: {
      boxShadow: shadow.md,
    },
    bordered: {
      boxShadow: shadow.none,
    },
  };

  const hoverStyle = hoverable ? {
    "&:hover": {
      boxShadow: shadow.md,
      borderColor: colors.primary,
    },
  } : {};

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const headerStyle = {
    padding: padding ? spacing.lg : 0,
    borderBottom: `1px solid ${colors.border}`,
    ...typography.h4,
    color: colors.textPrimary,
  };

  const contentStyle = {
    padding: padding ? spacing.lg : 0,
    flex: 1,
  };

  const footerStyle = {
    padding: padding ? spacing.lg : 0,
    borderTop: `1px solid ${colors.border}`,
  };

  const { typography } = designSystemV2;

  return (
    <div style={{ ...baseStyle, ...variantStyles[variant] }} {...props}>
      <div style={containerStyle}>
        {header && <div style={headerStyle}>{header}</div>}
        <div style={contentStyle}>{children}</div>
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </div>
  );
};

export default Card;