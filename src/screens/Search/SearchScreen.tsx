import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TextStyle,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { useAppSelector } from '../../hooks/useStore';
import { useDebounce } from '../../hooks/useDebounce';
import { Product } from '../../types';
import { ProductCard, ErrorState } from '../../components/ui';
import { colors, typography, spacing } from '../../constants';

const SearchScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { products, isLoading } = useAppSelector(state => state.products);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const q = debouncedQuery.toLowerCase().trim();
    return products.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [debouncedQuery, products]);

  const handleProductPress = useCallback(
    (product: Product) => {
      Keyboard.dismiss();
      navigation.getParent()?.navigate('ProductDetail', { productId: product.id });
    },
    [navigation],
  );

  const renderEmptyState = () => {
    if (!debouncedQuery.trim()) {
      return (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <MaterialIcons name="search" size={48} color={colors.textTertiary} />
          </View>
          <Text style={styles.emptyTitle}>Search Products</Text>
          <Text style={styles.emptySubtitle}>
            Type something to find products by name, description, or category
          </Text>
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.emptySubtitle}>Searching...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <MaterialIcons name="search-off" size={48} color={colors.textTertiary} />
        </View>
        <Text style={styles.emptyTitle}>No results found</Text>
        <Text style={styles.emptySubtitle}>
          Try searching with different keywords
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <MaterialIcons
            name="search"
            size={22}
            color={colors.textTertiary}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={colors.textTertiary}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => setQuery('')}
              style={styles.clearSearch}>
              <MaterialIcons
                name="close"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results Count */}
      {debouncedQuery.trim() && filteredProducts.length > 0 && (
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
          </Text>
        </View>
      )}

      {/* Results */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={renderEmptyState()}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
      />
    </View>
  );
};

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchSection: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.base,
    paddingBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusLg,
    paddingHorizontal: spacing.base,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  clearSearch: {
    padding: spacing.xs,
  },
  resultsRow: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.sm,
  },
  resultsText: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
  },
  row: {
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: spacing.xxxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxxl,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.bodyLineHeight,
    marginTop: spacing.sm,
  },
});

export default SearchScreen;