import React from 'react';
import { View, Text, TextStyle, StyleSheet } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { colors, typography, spacing } from '../../constants';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  icon?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  icon = 'storefront',
}) => {
  return (
    <View style={styles.container}>
      {/* Decorative circles */}
      <View style={styles.circleTopRight} />
      <View style={styles.circleBottomLeft} />

      {/* Icon */}
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon as any} size={32} color={colors.textInverse} />
      </View>

      {/* Text */}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.gradientStart,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.base,
    paddingBottom: spacing.base,
    marginBottom: spacing.xl,
  },
  circleTopRight: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.gradientAccent + '30',
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gradientEnd + '25',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.gradientEnd,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: typography.h1,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textInverse,
    letterSpacing: -0.5,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textInverse + 'CC',
    lineHeight: typography.bodyLineHeight,
  },
});

export default AuthHeader;