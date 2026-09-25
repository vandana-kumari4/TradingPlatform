import React from 'react';
import designSystem from '../../styles/designSystem';
import Button from './Button';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionIcon: ActionIcon,
  onAction,
  children,
}) => {
  const { colors, spacing } = designSystem;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${spacing['3xl']} ${spacing.xl}`,
    textAlign: 'center',
    minHeight: '300px',
  };

  const iconStyle = {
    width: '64px',
    height: '64px',
    marginBottom: spacing.xl,
    color: colors.textTertiary,
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 600,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  };

  const descriptionStyle = {
    fontSize: '14px',
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    maxWidth: '400px',
  };

  return (
    <div style={containerStyle}>
      {Icon && <Icon style={iconStyle} />}
      {title && <h3 style={titleStyle}>{title}</h3>}
      {description && <p style={descriptionStyle}>{description}</p>}
      {actionLabel && (
        <Button
          variant="primary"
          onClick={onAction}
          icon={ActionIcon}
        >
          {actionLabel}
        </Button>
      )}
      {children}
    </div>
  );
};

export default EmptyState;