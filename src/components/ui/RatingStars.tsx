import React from 'react';
import { View, Text, TextStyle, StyleSheet } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { colors, typography, spacing } from '../../constants';
import { formatRating } from '../../utils/formatters';

interface RatingStarsProps {
  rate: number;
  count: number;
  size?: number;
  showCount?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rate,
  count,
  size = 14,
  showCount = true,
}) => {
  const fullStars = Math.floor(rate);
  const hasHalf = rate - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <MaterialIcons
            key={`full-${i}`}
            name="star"
            size={size}
            color={colors.warning}
          />
        ))}
        {hasHalf && (
          <MaterialIcons name="star-half" size={size} color={colors.warning} />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <MaterialIcons
            key={`empty-${i}`}
            name="star-border"
            size={size}
            color={colors.textTertiary}
          />
        ))}
      </View>
      <Text style={styles.rating}>{formatRating(rate)}</Text>
      {showCount && <Text style={styles.count}>({count})</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: typography.caption,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
  },
  count: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
});

export default RatingStars;