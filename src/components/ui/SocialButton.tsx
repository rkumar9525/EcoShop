import React from 'react';
import { TouchableOpacity, Text, TextStyle, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { colors, typography, spacing } from '../../constants';

interface SocialButtonProps {
  icon: string;
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  title,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}>
      <MaterialIcons name={icon as any} size={22} color={colors.textPrimary} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusMd,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  text: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
  },
});

export default SocialButton;