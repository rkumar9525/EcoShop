import React from 'react';
import { View, Text, TextStyle, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { colors, typography, spacing } from '../../constants';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  onSeeAll,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {onSeeAll && (
        <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>See All</Text>
          <MaterialIcons name="chevron-right" size={18} color={colors.accent} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginTop: 1,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.accent,
  },
});

export default SectionHeader;