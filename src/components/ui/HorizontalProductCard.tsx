import React from 'react';
import {
  View,
  Text,
  Image,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../../types';
import { colors, typography, spacing } from '../../constants';
import { formatPrice, truncateText } from '../../utils/formatters';
import RatingStars from './RatingStars';

interface HorizontalProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

const HorizontalProductCard: React.FC<HorizontalProductCardProps> = ({
  product,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}
      activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {truncateText(product.title, 35)}
        </Text>
        <RatingStars
          rate={product.rating.rate}
          count={product.rating.count}
          size={10}
          showCount={false}
        />
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 156,
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusLg,
    overflow: 'hidden',
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.base,
  },
  image: {
    width: '85%',
    height: '85%',
  },
  info: {
    padding: spacing.md,
    gap: 4,
  },
  title: {
    fontSize: typography.caption,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
    color: colors.textPrimary,
    lineHeight: typography.captionLineHeight + 2,
    minHeight: 32,
  },
  price: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.accentDark,
    marginTop: 2,
  },
});

export default HorizontalProductCard;