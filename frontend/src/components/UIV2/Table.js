import React from "react";
import designSystemV2 from "../../styles/designSystemV2";

export const Table = ({ children, ...props }) => {
  const { colors, spacing } = designSystemV2;

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    ...props.style,
  };

  return <table style={tableStyle} {...props}>{children}</table>;
};

export const TableHead = ({ children, ...props }) => {
  const { colors, spacing, typography } = designSystemV2;

  const headStyle = {
    backgroundColor: colors.bgSecondary,
    borderBottom: `2px solid ${colors.border}`,
  };

  return <thead style={headStyle} {...props}>{children}</thead>;
};

export const TableBody = ({ children, ...props }) => {
  return <tbody {...props}>{children}</tbody>;
};

export const TableRow = ({ children, hover = true, ...props }) => {
  const { colors, transition } = designSystemV2;

  const rowStyle = {
    borderBottom: `1px solid ${colors.border}`,
    transition: transition.base,
    "&:hover": hover ? { backgroundColor: colors.bgSecondary } : {},
    ...props.style,
  };

  return <tr style={rowStyle} {...props}>{children}</tr>;
};

export const TableHeaderCell = ({ children, align = "left", ...props }) => {
  const { colors, spacing, typography } = designSystemV2;

  const cellStyle = {
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: align,
    ...typography.label,
    color: colors.textSecondary,
    fontWeight: 600,
    whiteSpace: "nowrap",
    ...props.style,
  };

  return <th style={cellStyle} {...props}>{children}</th>;
};

export const TableCell = ({ children, align = "left", variant = "default", ...props }) => {
  const { colors, spacing, typography } = designSystemV2;

  const variantStyles = {
    default: {
      color: colors.textPrimary,
    },
    secondary: {
      color: colors.textSecondary,
    },
    numeric: {
      color: colors.textPrimary,
      fontFamily: typography.mono.fontFamily,
      fontWeight: 500,
    },
  };

  const cellStyle = {
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: align,
    ...typography.body,
    ...variantStyles[variant],
    ...props.style,
  };

  return <td style={cellStyle} {...props}>{children}</td>;
};

export default Table;