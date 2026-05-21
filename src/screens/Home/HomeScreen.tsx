import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import {
  fetchProducts,
  fetchProductsByCategory,
} from '../../store/slices/productsSlice';
import { Product } from '../../types';
import {
  ProductCard,
  CategoryChip,
  ProductSkeleton,
  ErrorState,
  PromoBanner,
  ProductSectionRow,
  FilterModal,
} from '../../components/ui';
import { colors, typography, spacing } from '../../constants';
import { formatCategoryName } from '../../utils/formatters';

const CATEGORY_ICONS: Record<string, string> = {
  all: 'apps',
  electronics: 'devices',
  jewelery: 'diamond',
  "men's clothing": 'checkroom',
  "women's clothing": 'female',
};

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { products, isLoading, error } = useAppSelector(
    state => state.products,
  );
  const cartItemCount = useAppSelector(state => state.cart.itemCount);
  const user = useAppSelector(state => state.auth.user);

  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    loadCategories();
    dispatch(fetchProducts());
  }, [dispatch]);

  const loadCategories = async () => {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories',
      );
      const cats = await response.json();
      setCategories(['all', ...cats]);
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  };

  // ─── Derived Data ───────────────────────────────────

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (minRating > 0) {
      result = result.filter(p => p.rating.rate >= minRating);
    }

    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [products, activeCategory, sortBy, minRating]);

  const topRated = useMemo(() => {
    return [...products]
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 10);
  }, [products]);

  const bestValue = useMemo(() => {
    return [...products]
      .filter(p => p.rating.rate >= 3)
      .sort((a, b) => a.price - b.price)
      .slice(0, 10);
  }, [products]);

  const groupedByCategory = useMemo(() => {
    const groups: { title: string; data: Product[] }[] = [];
    categories.forEach(cat => {
      if (cat === 'all') return;
      const items = products.filter(p => p.category === cat);
      if (items.length > 0) {
        groups.push({ title: cat, data: items });
      }
    });
    return groups;
  }, [products, categories]);

  // ─── Handlers ───────────────────────────────────────

  const handleCategoryPress = useCallback(
    (category: string) => {
      setActiveCategory(category);
      setSortBy('default');
      setMinRating(0);
      if (category === 'all') {
        dispatch(fetchProducts());
      } else {
        dispatch(fetchProductsByCategory(category));
      }
    },
    [dispatch],
  );

  const handleProductPress = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetail', { productId: product.id });
    },
    [navigation],
  );

  const handleSeeAll = useCallback(
    (category: string) => {
      setActiveCategory(category);
      setSortBy('default');
      setMinRating(0);
      dispatch(fetchProductsByCategory(category));
    },
    [dispatch],
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    setActiveCategory('all');
    setSortBy('default');
    setMinRating(0);
    await dispatch(fetchProducts());
    setRefreshing(false);
  };

  const handleFilterReset = useCallback(() => {
    setSortBy('default');
    setMinRating(0);
  }, []);

  const handleFilterApply = useCallback(() => {
    setFilterVisible(false);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const isFilterActive = sortBy !== 'default' || minRating > 0;

  // ─── Render Sections ────────────────────────────────

  const renderHeader = () => (
    <View>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View>
            <Text style={styles.greetingLabel}>{getGreeting()} 👋</Text>
            <Text style={styles.greetingName}>
              {user?.username || 'Guest'}
            </Text>
          </View>
        </View>
        <View style={styles.topActions}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              isFilterActive && styles.iconButtonActive,
            ]}
            onPress={() => setFilterVisible(true)}
            activeOpacity={0.7}>
            <MaterialIcons
              name="tune"
              size={20}
              color={isFilterActive ? colors.textInverse : colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              navigation.navigate('MainTabs', { screen: 'CartTab' })
            }
            activeOpacity={0.7}>
            <MaterialIcons
              name="shopping-bag"
              size={20}
              color={colors.primary}
            />
            {cartItemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Chips */}
      <View style={styles.categorySection}>
        <FlatList
          data={categories}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <CategoryChip
              category={item}
              isActive={activeCategory === item}
              onPress={handleCategoryPress}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      {/* Active Filter Indicator */}
      {isFilterActive && (
        <View style={styles.filterIndicator}>
          <MaterialIcons name="filter-list" size={14} color={colors.accent} />
          <Text style={styles.filterText}>
            Filters active
            {minRating > 0 && ` • ${minRating}+ stars`}
            {sortBy !== 'default' && ` • ${SORT_LABELS[sortBy]}`}
          </Text>
          <TouchableOpacity onPress={handleFilterReset}>
            <MaterialIcons name="close" size={14} color={colors.accent} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  // ─── "All" View: Sectioned Horizontal Rows ──────────

  const renderAllView = () => (
    <View>
      {renderHeader()}

      {/* Promo Banner */}
      <PromoBanner
        onShopNow={() => {
          setActiveCategory('all');
          dispatch(fetchProducts());
        }}
      />

      {/* Top Rated */}
      <ProductSectionRow
        title="Top Rated"
        subtitle="Highest rated by customers"
        products={topRated}
        onProductPress={handleProductPress}
        onSeeAll={() => {
          setSortBy('rating');
          setActiveCategory('all');
        }}
      />

      {/* Best Value */}
      <ProductSectionRow
        title="Best Value"
        subtitle="Great quality, affordable price"
        products={bestValue}
        onProductPress={handleProductPress}
        onSeeAll={() => {
          setSortBy('price_low');
          setActiveCategory('all');
        }}
      />

      {/* Per-Category Sections */}
      {groupedByCategory.map(section => (
        <ProductSectionRow
          key={section.title}
          title={formatCategoryName(section.title)}
          subtitle={`${section.data.length} products`}
          products={section.data}
          onProductPress={handleProductPress}
          onSeeAll={() => handleSeeAll(section.title)}
        />
      ))}

      <View style={styles.bottomSpacer} />
    </View>
  );

  // ─── Category View: Grid ────────────────────────────

  const renderCategoryView = () => (
    <View>
      {renderHeader()}
      <View style={styles.gridHeader}>
        <Text style={styles.gridTitle}>
          {formatCategoryName(activeCategory)}
        </Text>
        <Text style={styles.gridCount}>
          {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}
        </Text>
      </View>
      {filteredProducts.length === 0 ? (
        <View style={styles.emptyFilter}>
          <MaterialIcons
            name="filter-list-off"
            size={40}
            color={colors.textTertiary}
          />
          <Text style={styles.emptyFilterTitle}>No products found</Text>
          <Text style={styles.emptyFilterSub}>
            Try adjusting your filters
          </Text>
          <TouchableOpacity onPress={handleFilterReset} style={styles.clearFilterBtn}>
            <Text style={styles.clearFilterText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.grid}>
          {filteredProducts.map(product => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard product={product} onPress={handleProductPress} />
            </View>
          ))}
        </View>
      )}
      <View style={styles.bottomSpacer} />
    </View>
  );

  // ─── Main Render ────────────────────────────────────

  if (isLoading && !refreshing) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {renderHeader()}
        <ProductSkeleton />
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {renderHeader()}
        <ErrorState
          message={error}
          onRetry={() => dispatch(fetchProducts())}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        contentContainerStyle={styles.scrollContent}>
        {activeCategory === 'all' ? renderAllView() : renderCategoryView()}
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
        minRating={minRating}
        onRatingChange={setMinRating}
        onReset={handleFilterReset}
        onApply={handleFilterApply}
      />
    </View>
  );
};

const SORT_LABELS: Record<string, string> = {
  price_low: 'Price ↑',
  price_high: 'Price ↓',
  rating: 'Top Rated',
  name: 'A-Z',
};

import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.base,
    marginBottom: spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.gradientStart,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: typography.body,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textInverse,
  },
  greetingLabel: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  greetingName: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  topActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: spacing.radiusMd,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  iconButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.accent,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  cartBadgeText: {
    fontSize: typography.micro,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textInverse,
  },

  // Categories
  categorySection: {
    marginBottom: spacing.md,
  },
  categoryList: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xs,
  },

  // Filter Indicator
  filterIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.decorativeCircle,
    borderRadius: spacing.radiusFull,
    gap: spacing.xs,
  },
  filterText: {
    flex: 1,
    fontSize: typography.caption,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
    color: colors.accent,
  },

  // Grid (category view)
  gridHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  gridTitle: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  gridCount: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  gridItem: {
    width: '47%',
  },

  // Empty Filter
  emptyFilter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxxl,
    gap: spacing.sm,
  },
  emptyFilterTitle: {
    fontSize: typography.body,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  emptyFilterSub: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  clearFilterBtn: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: spacing.radiusFull,
  },
  clearFilterText: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textInverse,
  },

  bottomSpacer: {
    height: spacing.xxxl,
  },
});

export default HomeScreen;