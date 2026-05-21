import React from 'react';
import {
  View,
  Text,
  Modal,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { colors, typography, spacing } from '../../constants';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  minRating: number;
  onRatingChange: (value: number) => void;
  onReset: () => void;
  onApply: () => void;
}

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' },
  { label: 'Rating: High to Low', value: 'rating' },
  { label: 'Name: A to Z', value: 'name' },
];

const RATING_OPTIONS = [
  { label: 'All Ratings', value: 0 },
  { label: '4+ Stars', value: 4 },
  { label: '3+ Stars', value: 3 },
  { label: '2+ Stars', value: 2 },
];

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  sortBy,
  onSortChange,
  minRating,
  onRatingChange,
  onReset,
  onApply,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filter & Sort</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Sort By */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.optionsContainer}>
                {SORT_OPTIONS.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionChip,
                      sortBy === option.value && styles.optionChipActive,
                    ]}
                    onPress={() => onSortChange(option.value)}
                    activeOpacity={0.7}>
                    <Text
                      style={[
                        styles.optionText,
                        sortBy === option.value && styles.optionTextActive,
                      ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Rating Filter */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Minimum Rating</Text>
              <View style={styles.optionsContainer}>
                {RATING_OPTIONS.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionChip,
                      minRating === option.value && styles.optionChipActive,
                    ]}
                    onPress={() => onRatingChange(option.value)}
                    activeOpacity={0.7}>
                    <MaterialIcons
                      name="star"
                      size={14}
                      color={
                        minRating === option.value
                          ? colors.textInverse
                          : colors.warning
                      }
                    />
                    <Text
                      style={[
                        styles.optionText,
                        minRating === option.value && styles.optionTextActive,
                      ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={onReset}
              activeOpacity={0.7}>
              <MaterialIcons
                name="refresh"
                size={18}
                color={colors.textSecondary}
              />
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={onApply}
              activeOpacity={0.7}>
              <Text style={styles.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: spacing.radiusXl,
    borderTopRightRadius: spacing.radiusXl,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerTitle: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  section: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.radiusFull,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  optionChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  optionText: {
    fontSize: typography.caption,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
    color: colors.textSecondary,
  },
  optionTextActive: {
    color: colors.textInverse,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: spacing.radiusMd,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  resetText: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textSecondary,
  },
  applyButton: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: spacing.radiusMd,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  applyText: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textInverse,
  },
});

export default FilterModal;