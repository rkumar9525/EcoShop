import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
}) => {
  const isDisabled = disabled && !loading;

  const containerStyles = [
    styles.container,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'outline' && styles.outline,
    loading && variant === 'primary' && styles.primaryLoading,
    loading && variant === 'secondary' && styles.secondaryLoading,
    loading && variant === 'outline' && styles.outlineLoading,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
    isDisabled && styles.disabledText,
  ];

  const spinnerColor =
    variant === 'outline' ? colors.accent : colors.textInverse;

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color={spinnerColor} size="small" />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: spacing.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.accent,
  },

  // Loading states — keep variant color, just add opacity
  primaryLoading: {
    backgroundColor: colors.accent,
    opacity: 0.8,
  },
  secondaryLoading: {
    backgroundColor: colors.primary,
    opacity: 0.8,
  },
  outlineLoading: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.accent,
    opacity: 0.8,
  },

  // Disabled — grayed out (only when NOT loading)
  disabled: {
    backgroundColor: colors.textTertiary,
    opacity: 0.5,
  },

  text: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
  },
  primaryText: {
    color: colors.textInverse,
  },
  secondaryText: {
    color: colors.textInverse,
  },
  outlineText: {
    color: colors.accent,
  },
  disabledText: {
    color: colors.textInverse,
  },
});

export default Button;