import React from 'react';
import {
  View,
  Text,
  Image,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { CartItem } from '../../types';
import { colors, typography, spacing } from '../../constants';
import { formatPrice, truncateText } from '../../utils/formatters';

interface CartItemCardProps {
  item: CartItem;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const { product, quantity } = item;

  return (
    <View style={styles.card}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>

      {/* Details */}
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {truncateText(product.title, 50)}
        </Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>

        {/* Quantity Controls */}
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => onDecrease(product.id)}>
            <MaterialIcons
              name={quantity === 1 ? 'delete-outline' : 'remove'}
              size={18}
              color={quantity === 1 ? colors.error : colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => onIncrease(product.id)}>
            <MaterialIcons name="add" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Item Total */}
      <View style={styles.totalContainer}>
        <TouchableOpacity onPress={() => onRemove(product.id)} style={styles.removeButton}>
          <MaterialIcons name="close" size={18} color={colors.textTertiary} />
        </TouchableOpacity>
        <Text style={styles.itemTotal}>
          {formatPrice(product.price * quantity)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusLg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: spacing.radiusMd,
    padding: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
    color: colors.textPrimary,
    lineHeight: typography.bodySmallLineHeight,
  },
  price: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.accentDark,
    marginTop: 2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: spacing.radiusSm,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  qtyText: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    minWidth: 24,
    textAlign: 'center',
  },
  totalContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingLeft: spacing.sm,
  },
  removeButton: {
    padding: spacing.xs,
  },
  itemTotal: {
    fontSize: typography.body,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.primary,
  },
});

export default CartItemCard;