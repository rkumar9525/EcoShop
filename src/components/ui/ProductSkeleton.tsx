import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { colors, spacing } from '../../constants';

const ShimmerPlaceholder = createShimmerPlaceholder();

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.xl * 2 - spacing.md) / 2;

const ProductSkeleton: React.FC = () => {
  return (
    <View style={styles.grid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} style={styles.card}>
          <ShimmerPlaceholder
            style={styles.imageSkeleton}
            shimmerColors={[
              colors.surfaceSecondary,
              colors.border,
              colors.surfaceSecondary,
            ]}
          />
          <View style={styles.infoSkeleton}>
            <ShimmerPlaceholder
              style={styles.line1}
              shimmerColors={[
                colors.surfaceSecondary,
                colors.border,
                colors.surfaceSecondary,
              ]}
            />
            <ShimmerPlaceholder
              style={styles.line2}
              shimmerColors={[
                colors.surfaceSecondary,
                colors.border,
                colors.surfaceSecondary,
              ]}
            />
            <ShimmerPlaceholder
              style={styles.line3}
              shimmerColors={[
                colors.surfaceSecondary,
                colors.border,
                colors.surfaceSecondary,
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusLg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageSkeleton: {
    width: '100%',
    height: 150,
  },
  infoSkeleton: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  line1: {
    width: '90%',
    height: 14,
    borderRadius: spacing.radiusSm,
  },
  line2: {
    width: '60%',
    height: 12,
    borderRadius: spacing.radiusSm,
  },
  line3: {
    width: '40%',
    height: 16,
    borderRadius: spacing.radiusSm,
  },
});

export default ProductSkeleton;