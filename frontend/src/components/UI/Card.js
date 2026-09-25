import React from 'react';
import designSystem from '../../styles/designSystem';

export const Card = ({
  children,
  hover = false,
  noPadding = false,
  className = '',
  ...props
}) => {
  const { colors, spacing, radius, shadow, transitions } = designSystem;

  const style = {
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    boxShadow: shadow.xs,
    padding: noPadding ? 0 : spacing.xl,
    transition: transitions.base,
    cursor: hover ? 'pointer' : 'default',
    ':hover': hover ? {
      boxShadow: shadow.md,
      borderColor: colors.primary,
    } : {},
  };

  return (
    <div style={style} className={className} {...props}>
      {children}
    </div>
  );
};

export default Card;