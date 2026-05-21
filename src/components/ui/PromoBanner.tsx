import React from 'react';
import { View, Text, TextStyle, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { colors, typography, spacing } from '../../constants';

const { width } = Dimensions.get('window');

interface PromoBannerProps {
  onShopNow?: () => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ onShopNow }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🔥 NEW</Text>
        </View>
        <Text style={styles.title}>Summer Sale</Text>
        <Text style={styles.subtitle}>Up to 50% off on selected items</Text>
        <TouchableOpacity style={styles.button} onPress={onShopNow} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Shop Now</Text>
          <MaterialIcons name="arrow-forward" size={16} color={colors.gradientStart} />
        </TouchableOpacity>
      </View>
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    backgroundColor: colors.gradientStart,
    borderRadius: spacing.radiusLg,
    overflow: 'hidden',
    position: 'relative',
    height: 160,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: spacing.xl,
    paddingRight: spacing.xxxl,
    zIndex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gradientAccent + '40',
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
    borderRadius: spacing.radiusFull,
    marginBottom: spacing.sm,
  },
  badgeText: {
    fontSize: typography.micro,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textInverse,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textInverse,
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: typography.bodySmall,
    color: colors.textInverse + 'CC',
    marginBottom: spacing.md,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.textInverse,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: spacing.radiusFull,
    gap: spacing.xs,
  },
  buttonText: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.gradientStart,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -30,
    right: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.gradientAccent + '25',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -40,
    right: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.gradientEnd + '20',
  },
});

export default PromoBanner;