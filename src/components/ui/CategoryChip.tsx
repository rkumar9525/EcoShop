import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../constants';
import { formatCategoryName } from '../../utils/formatters';

interface CategoryChipProps {
  category: string;
  isActive: boolean;
  onPress: (category: string) => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.activeChip]}
      onPress={() => onPress(category)}
      activeOpacity={0.7}>
      <Text style={[styles.text, isActive && styles.activeText]}>
        {formatCategoryName(category)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: spacing.radiusFull,
    backgroundColor: colors.surfaceSecondary,
    marginRight: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  activeChip: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  text: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
    color: colors.textSecondary,
  },
  activeText: {
    color: colors.textInverse,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
  },
});

import { TextStyle } from 'react-native';

export default CategoryChip;