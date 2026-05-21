import React from 'react';
import { View, Text, TextStyle, StyleSheet } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { Button } from '../common';
import { colors, typography, spacing } from '../../constants';

interface EmptyCartProps {
  onBrowse: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onBrowse }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <MaterialIcons name="shopping-cart" size={52} color={colors.textTertiary} />
      </View>
      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.subtitle}>
        Looks like you haven't added anything to your cart yet
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Browse Products" onPress={onBrowse} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxxl,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.h3,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.bodyLineHeight,
    marginBottom: spacing.xxl,
  },
  buttonContainer: {
    width: '70%',
  },
});

export default EmptyCart;