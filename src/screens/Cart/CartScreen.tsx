import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextStyle,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from '../../store/slices/cartSlice';
import { CartItemCard, EmptyCart } from '../../components/ui';
import { Button } from '../../components/common';
import { colors, typography, spacing } from '../../constants';
import { formatPrice } from '../../utils/formatters';
import { showToast } from '../../utils/toast';

interface CartScreenProps {
  navigation: any;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { items, totalAmount, itemCount } = useAppSelector(state => state.cart);

  const handleIncrease = (productId: number) => {
    const item = items.find(i => i.product.id === productId);
    if (item) {
      dispatch(updateQuantity({ productId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrease = (productId: number) => {
    const item = items.find(i => i.product.id === productId);
    if (item) {
      dispatch(updateQuantity({ productId, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
    showToast.info('Item Removed', 'Item removed from cart');
  };

  const handleCheckout = () => {
    showToast.success('Order Placed!', `Total: ${formatPrice(totalAmount)}`);
    dispatch(clearCart());
  };

  const handleClearCart = () => {
    Alert.alert('Clear Cart', 'Remove all items from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear All',
        style: 'destructive',
        onPress: () => {
          dispatch(clearCart());
          showToast.info('Cart Cleared', 'All items removed');
        },
      },
    ]);
  };

  if (items.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
        <EmptyCart onBrowse={() => navigation.navigate('MainTabs', { screen: 'HomeTab' })} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <Text style={styles.headerSubtitle}>{itemCount} items</Text>
        <View style={styles.clearButtonContainer}>
          <Button
            title="Clear All"
            onPress={handleClearCart}
            variant="outline"
            style={styles.clearButton}
          />
        </View>
      </View>

      {/* Cart Items */}
      <FlatList
        data={items}
        keyExtractor={item => item.product.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CartItemCard
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
        )}
      />

      {/* Bottom Summary */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        {/* Summary Row */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatPrice(totalAmount)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={[styles.summaryValue, { color: colors.success }]}>Free</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(totalAmount)}</Text>
        </View>

        {/* Checkout Button */}
        <View style={styles.checkoutButton}>
          <Button title="Proceed to Checkout" onPress={handleCheckout} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.base,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: typography.h3,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  clearButtonContainer: {
    marginLeft: 'auto',
  },
  clearButton: {
    height: 36,
    paddingHorizontal: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 300,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    fontSize: typography.body,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.accentDark,
  },
  checkoutButton: {
    marginTop: spacing.md,
  },
});

export default CartScreen;