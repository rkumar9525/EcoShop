import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextStyle,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { Button, Input } from '../../components/common';
import { AuthHeader } from '../../components/ui';
import { showToast } from '../../utils/toast';
import { colors, typography, spacing } from '../../constants';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleReset = useCallback(async () => {
    if (!email.trim() || !email.includes('@')) {
      showToast.error('Validation Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise<void>(resolve => {
      setTimeout(resolve, 1500);
    });

    setIsLoading(false);
    setIsSent(true);
    showToast.success('Email Sent! 📧', 'Check your inbox for reset instructions');
  }, [email]);

  if (isSent) {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.gradientStart}
        />
        <View style={[styles.container, { paddingTop: insets.top }]}>
          <AuthHeader
            title="Check Your Email"
            subtitle="We've sent password reset instructions to your email"
            icon="mark-email-read"
          />

          <View style={styles.successCard}>
            <View style={styles.successIconCircle}>
              <MaterialIcons name="email" size={48} color={colors.accent} />
            </View>
            <Text style={styles.successTitle}>Email Sent!</Text>
            <Text style={styles.successMessage}>
              We sent a password reset link to
            </Text>
            <Text style={styles.successEmail}>{email}</Text>
            <Text style={styles.successHint}>
              Didn't receive the email? Check your spam folder or try again.
            </Text>

            <View style={styles.successButtonContainer}>
              <Button
                title="Back to Sign In"
                onPress={() => navigation.navigate('Login')}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                setIsSent(false);
                setEmail('');
              }}
              style={styles.resendContainer}>
              <Text style={styles.resendText}>
                Didn't get the email?{' '}
                <Text style={styles.resendLink}>Resend</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.gradientStart}
      />
      <ScrollView
        style={[styles.scrollView, { paddingTop: insets.top }]}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <AuthHeader
          title="Reset Password"
          subtitle="Enter your email and we'll send you instructions to reset your password"
          icon="lock-reset"
        />

        {/* Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.instructionText}>
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </Text>

          <Input
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
            icon={
              <MaterialIcons
                name="mail-outline"
                size={20}
                color={colors.textTertiary}
              />
            }
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Send Reset Link"
              onPress={handleReset}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>

        {/* Back to Login */}
        <TouchableOpacity
          style={styles.backToLogin}
          onPress={() => navigation.navigate('Login')}>
          <MaterialIcons name="arrow-back" size={18} color={colors.accent} />
          <Text style={styles.backToLoginText}>Back to Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl + spacing.xl,
  },
  formCard: {
    padding: spacing.xl,
  },
  instructionText: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.bodySmallLineHeight + 4,
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    marginTop: spacing.sm,
  },
  backToLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginTop: spacing.xl,
  },
  backToLoginText: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.accent,
  },
  successCard: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xl,
    borderRadius: spacing.radiusLg,
    padding: spacing.xxl,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  successIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.decorativeCircle,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  successTitle: {
    fontSize: typography.h3,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  successMessage: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
  },
  successEmail: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.accent,
    marginBottom: spacing.md,
  },
  successHint: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    textAlign: 'center',
    lineHeight: typography.captionLineHeight + 4,
    marginBottom: spacing.xl,
  },
  successButtonContainer: {
    width: '100%',
  },
  resendContainer: {
    marginTop: spacing.lg,
  },
  resendText: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  resendLink: {
    color: colors.accent,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
  },
});

export default ForgotPasswordScreen;