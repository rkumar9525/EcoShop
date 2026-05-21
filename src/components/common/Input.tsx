import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  icon,
  ...textInputProps
}) => {
  const inputStyles: TextStyle[] = [
    styles.input,
    icon ? styles.inputWithIcon : ({} as TextStyle),
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrapper, error ? styles.inputError : undefined]}>
        {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
        <TextInput
          style={inputStyles}
          placeholderTextColor={colors.textTertiary}
          autoCapitalize="none"
          {...textInputProps}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.radiusMd,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.base,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  inputWithIcon: {
    marginLeft: spacing.sm,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});

export default Input;