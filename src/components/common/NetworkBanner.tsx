import React from 'react';
import { View, Text, TextStyle, StyleSheet } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { useNetwork } from '../../hooks/useNetwork';
import { colors, typography, spacing } from '../../constants';

const NetworkBanner: React.FC = () => {
  const { isConnected } = useNetwork();

  if (isConnected === null || isConnected) {
    return null;
  }

  return (
    <View style={styles.banner}>
      <MaterialIcons name="wifi-off" size={16} color={colors.textInverse} />
      <Text style={styles.text}>You're offline. Some features may not work.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  text: {
    fontSize: typography.caption,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
    color: colors.textInverse,
  },
});

export default NetworkBanner;