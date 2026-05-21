import React from 'react';
import { View, Text, TextStyle, StyleSheet } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { ToastConfig } from 'react-native-toast-message';
import { colors, typography, spacing } from '../../constants';

const toastConfig: ToastConfig = {
  success: props => (
    <View style={[styles.container, styles.successContainer]}>
      <View style={[styles.iconCircle, styles.successIcon]}>
        <MaterialIcons name="check-circle" size={20} color={colors.success} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.text1}</Text>
        {props.text2 && <Text style={styles.message}>{props.text2}</Text>}
      </View>
    </View>
  ),

  error: props => (
    <View style={[styles.container, styles.errorContainer]}>
      <View style={[styles.iconCircle, styles.errorIcon]}>
        <MaterialIcons name="error" size={20} color={colors.error} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.text1}</Text>
        {props.text2 && <Text style={styles.message}>{props.text2}</Text>}
      </View>
    </View>
  ),

  info: props => (
    <View style={[styles.container, styles.infoContainer]}>
      <View style={[styles.iconCircle, styles.infoIcon]}>
        <MaterialIcons name="info" size={20} color={colors.info} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.text1}</Text>
        {props.text2 && <Text style={styles.message}>{props.text2}</Text>}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.xl,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderRadius: spacing.radiusLg,
    borderWidth: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
    gap: spacing.md,
  },
  successContainer: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  infoContainer: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    backgroundColor: '#DCFCE7',
  },
  errorIcon: {
    backgroundColor: '#FEE2E2',
  },
  infoIcon: {
    backgroundColor: '#DBEAFE',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
  },
  message: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
});

export default toastConfig;