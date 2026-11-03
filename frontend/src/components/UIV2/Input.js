import React from "react";
import designSystemV2 from "../../styles/designSystemV2";

export const Input = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
  fullWidth = true,
  icon: Icon,
  helperText,
  ...props
}) => {
  const { colors, spacing, typography, radius, shadow, transition } =
    designSystemV2;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: spacing.sm,
    width: fullWidth ? "100%" : "auto",
  };

  const labelStyle = {
    ...typography.label,
    color: colors.textPrimary,
    display: "block",
  };

  const inputWrapperStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: `${spacing.md} ${spacing.lg}`,
    paddingLeft: Icon ? `${parseInt(spacing.lg) * 2 + 20}px` : spacing.lg,
    fontSize: "14px",
    fontFamily: typography.fontFamily,
    border: `1px solid ${error ? colors.error : colors.border}`,
    borderRadius: radius.md,
    backgroundColor: disabled ? colors.borderLight : colors.surface,
    color: colors.textPrimary,
    transition: transition.base,
    outline: "none",
    "&:focus": {
      borderColor: error ? colors.error : colors.primary,
      boxShadow: `0 0 0 3px ${error ? colors.errorLight : colors.primaryLight}`,
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  };

  const iconStyle = {
    position: "absolute",
    left: spacing.lg,
    color: colors.textTertiary,
    pointerEvents: "none",
  };

  const errorStyle = {
    ...typography.bodySmall,
    color: colors.error,
  };

  const helperStyle = {
    ...typography.bodySmall,
    color: colors.textTertiary,
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}

      <div style={inputWrapperStyle}>
        {Icon && <Icon size={16} style={iconStyle} />}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={inputStyle}
          {...props}
        />
      </div>

      {error && <div style={errorStyle}>{error}</div>}
      {helperText && !error && <div style={helperStyle}>{helperText}</div>}
    </div>
  );
};

export default Input;