import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../constants';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>EcoShop 🛍️</Text>
      <Text style={styles.tagline}>Loading your experience...</Text>
      <ActivityIndicator
        size="large"
        color={colors.accent}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  brand: {
    fontSize: typography.h1,
    fontWeight: typography.weightBold,
    color: colors.primary,
  },
  tagline: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  loader: {
    marginTop: spacing.xl,
  },
});

export default SplashScreen;