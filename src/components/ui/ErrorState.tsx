import React from 'react';
import { View, Text, TextStyle, StyleSheet } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { Button } from '../common';
import { colors, typography, spacing } from '../../constants';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Something went wrong',
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <MaterialIcons name="error-outline" size={48} color={colors.error} />
      </View>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <View style={styles.buttonContainer}>
          <Button title="Try Again" onPress={onRetry} variant="outline" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxxl,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.h3,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.bodyLineHeight,
    marginBottom: spacing.xl,
  },
  buttonContainer: {
    width: '60%',
  },
});

export default ErrorState;