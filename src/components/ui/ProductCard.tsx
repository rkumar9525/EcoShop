import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Product } from '../../types';
import { colors, typography, spacing } from '../../constants';
import { formatPrice, truncateText, formatCategoryName } from '../../utils/formatters';
import RatingStars from './RatingStars';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.xl * 2 - spacing.md) / 2;

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(product)}
      activeOpacity={0.7}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {formatCategoryName(product.category)}
          </Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {truncateText(product.title, 45)}
        </Text>
        <RatingStars
          rate={product.rating.rate}
          count={product.rating.count}
          size={12}
          showCount={false}
        />
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusLg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    // Premium shadow
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.base,
    position: 'relative',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  categoryBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: spacing.radiusSm,
  },
  categoryText: {
    fontSize: typography.micro,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textInverse,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  info: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
    color: colors.textPrimary,
    lineHeight: typography.bodySmallLineHeight,
    minHeight: 40,
  },
  price: {
    fontSize: typography.body,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.accentDark,
    marginTop: 2,
  },
});

import { TextStyle } from 'react-native';

export default ProductCard;