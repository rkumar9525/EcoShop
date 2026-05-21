export const formatPrice = (price: number): string => {
  return `₹${price.toFixed(2)}`;
};

export const formatRating = (rate: number): string => {
  return rate.toFixed(1);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const formatCategoryName = (category: string): string => {
  return category
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};