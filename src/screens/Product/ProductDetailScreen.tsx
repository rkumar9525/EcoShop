import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { useAppDispatch } from '../../hooks/useStore';
import { addToCart } from '../../store/slices/cartSlice';
import { productService } from '../../api/productService';
import { Product } from '../../types';
import { Button } from '../../components/common';
import { RatingStars } from '../../components/ui';
import { colors, typography, spacing } from '../../constants';
import { formatPrice, formatCategoryName } from '../../utils/formatters';
import { showToast } from '../../utils/toast';

interface ProductDetailScreenProps {
  route: { params: { productId: number } };
  navigation: any;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = useCallback(async () => {
    if (!product) return;
    try {
      await Share.share({
        title: product.title,
        message: `Check out ${product.title} for ${formatPrice(product.price)}!`,
      });
    } catch {
      // User cancelled
    }
  }, [product]);

  const handleAddToCart = useCallback(async () => {
    if (!product || isAddingToCart) return;
    setIsAddingToCart(true);

    // Brief delay so user sees the loading spinner
    await new Promise<void>(resolve => {
      setTimeout(resolve, 600);
    });

    dispatch(addToCart({ product, quantity }));
    showToast.success(
      'Added to Cart ✅',
      `${quantity} item${quantity > 1 ? 's' : ''} added`,
    );
    setIsAddingToCart(false);
  }, [product, quantity, dispatch, isAddingToCart]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.loadingContainer}>
        <MaterialIcons name="error-outline" size={48} color={colors.error} />
        <Text style={styles.errorText}>{error || 'Product not found'}</Text>
        <TouchableOpacity onPress={loadProduct} style={styles.retryButton}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 90 },
        ]}>
        {/* Image */}
        <View style={styles.imageSection}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Category */}
          <Text style={styles.category}>
            {formatCategoryName(product.category)}
          </Text>

          {/* Title */}
          <Text style={styles.title}>{product.title}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <RatingStars
              rate={product.rating.rate}
              count={product.rating.count}
              size={16}
            />
          </View>

          {/* Price */}
          <Text style={styles.price}>{formatPrice(product.price)}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Shipping & Returns */}
          <View style={styles.metaRow}>
            <MaterialIcons name="local-shipping" size={20} color={colors.success} />
            <View style={styles.metaText}>
              <Text style={styles.metaTitle}>Free Shipping</Text>
              <Text style={styles.metaSub}>Delivers in 3-5 business days</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <MaterialIcons name="assignment-return" size={20} color={colors.info} />
            <View style={styles.metaText}>
              <Text style={styles.metaTitle}>Easy Returns</Text>
              <Text style={styles.metaSub}>30-day return policy</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={isAddingToCart}
            activeOpacity={0.7}>
            <MaterialIcons
              name={quantity === 1 ? 'delete-outline' : 'remove'}
              size={18}
              color={quantity === 1 ? colors.error : colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
            disabled={isAddingToCart}
            activeOpacity={0.7}>
            <MaterialIcons name="add" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.addToCartButton}>
          <Button
            title={`Add  •  ${formatPrice(product.price * quantity)}`}
            onPress={handleAddToCart}
            loading={isAddingToCart}
            disabled={isAddingToCart}
          />
        </View>
      </View>

      {/* Back Button — Top Left */}
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 12 }]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}>
        <MaterialIcons name="arrow-back" size={22} color={colors.primary} />
      </TouchableOpacity>

      {/* Share Button — Top Right */}
      <TouchableOpacity
        style={[styles.shareButton, { top: insets.top + 12 }]}
        onPress={handleShare}
        activeOpacity={0.7}>
        <MaterialIcons name="share" size={22} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Loading & Error
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    gap: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  errorText: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: spacing.radiusFull,
  },
  retryText: {
    color: colors.textInverse,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
  },

  // Scroll
  scrollContent: {
    flexGrow: 1,
  },

  // Image
  imageSection: {
    width: '100%',
    height: 300,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  image: {
    width: '70%',
    height: '70%',
  },

  // Content
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },

  // Category
  category: {
    fontSize: typography.caption,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },

  // Title
  title: {
    fontSize: typography.h3,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    lineHeight: typography.h3LineHeight,
    marginBottom: spacing.sm,
  },

  // Rating
  ratingRow: {
    marginBottom: spacing.md,
  },

  // Price
  price: {
    fontSize: typography.h2,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.accentDark,
    marginBottom: spacing.lg,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginBottom: spacing.lg,
  },

  // Description
  sectionTitle: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: typography.bodyLineHeight + 6,
    marginBottom: spacing.lg,
  },

  // Meta (Shipping/Returns)
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  metaText: {
    flex: 1,
  },
  metaTitle: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
  },
  metaSub: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginTop: 1,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: spacing.radiusMd,
    overflow: 'hidden',
  },
  quantityButton: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
  },
  quantityText: {
    width: 30,
    textAlign: 'center',
    fontSize: typography.bodySmall,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
  },
  addToCartButton: {
    flex: 1,
  },

  // Back Button — Top Left
  backButton: {
    position: 'absolute',
    left: spacing.xl,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Share Button — Top Right
  shareButton: {
    position: 'absolute',
    right: spacing.xl,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default ProductDetailScreen;