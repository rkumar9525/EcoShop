import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Product } from '../../types';
import SectionHeader from './SectionHeader';
import HorizontalProductCard from './HorizontalProductCard';
import { spacing } from '../../constants';

interface ProductSectionRowProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onProductPress: (product: Product) => void;
  onSeeAll?: () => void;
}

const ProductSectionRow: React.FC<ProductSectionRowProps> = ({
  title,
  subtitle,
  products,
  onProductPress,
  onSeeAll,
}) => {
  if (products.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Header ABOVE the scroll */}
      <SectionHeader
        title={title}
        subtitle={subtitle}
        onSeeAll={onSeeAll}
      />

      {/* Horizontal product scroll BELOW the header */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <HorizontalProductCard product={item} onPress={onProductPress} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xs,
  },
});

export default ProductSectionRow;