import React from 'react';
import designSystem from '../../styles/designSystem';

export const Table = ({ children, ...props }) => {
  const { colors, spacing } = designSystem;

  const style = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  };

  return (
    <table style={style} {...props}>
      {children}
    </table>
  );
};

export const TableHead = ({ children, ...props }) => {
  const { colors } = designSystem;

  const style = {
    backgroundColor: colors.bgSecondary,
    borderBottom: `2px solid ${colors.border}`,
  };

  return (
    <thead style={style} {...props}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, ...props }) => {
  return (
    <tbody {...props}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ isHoverable = true, children, ...props }) => {
  const { colors, transitions } = designSystem;

  const style = {
    borderBottom: `1px solid ${colors.border}`,
    transition: transitions.base,
    ':hover': isHoverable ? {
      backgroundColor: colors.bgSecondary,
    } : {},
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <tr
      style={{
        ...style,
        backgroundColor: isHovered && isHoverable ? colors.bgSecondary : 'transparent',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableHead_Cell = ({ align = 'left', children, ...props }) => {
  const { colors, spacing } = designSystem;

  const style = {
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: align,
    fontWeight: 600,
    color: colors.textSecondary,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  return (
    <th style={style} {...props}>
      {children}
    </th>
  );
};

export const TableCell = ({ align = 'left', isNumeric = false, children, ...props }) => {
  const { colors, spacing } = designSystem;

  const style = {
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: align || (isNumeric ? 'right' : 'left'),
    color: colors.textPrimary,
    fontWeight: isNumeric ? 600 : 400,
  };

  return (
    <td style={style} {...props}>
      {children}
    </td>
  );
};

export default Table;