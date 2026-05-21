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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { register, clearError } from '../../store/slices/authSlice';
import { Button, Input } from '../../components/common';
import { AuthHeader, DividerWithText, SocialButton } from '../../components/ui';
import { showToast } from '../../utils/toast';
import { colors, typography, spacing } from '../../constants';

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleRegister = useCallback(async () => {
    if (!fullName.trim()) {
      showToast.error('Validation Error', 'Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      showToast.error('Validation Error', 'Please enter a valid email');
      return;
    }
    if (!username.trim()) {
      showToast.error('Validation Error', 'Please enter a username');
      return;
    }
    if (password.length < 6) {
      showToast.error('Validation Error', 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      showToast.error('Validation Error', 'Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      showToast.error('Terms Required', 'Please agree to the Terms & Conditions');
      return;
    }

    dispatch(clearError());
    const result = await dispatch(
      register({ email: email.trim(), username: username.trim(), password }),
    );

    if (register.rejected.match(result)) {
      showToast.error('Registration Failed', (result.payload as string) || 'Something went wrong');
    } else {
      showToast.success('Account Created! 🎉', 'You can now sign in with your credentials');
      navigation.navigate('Login');
    }
  }, [fullName, email, username, password, confirmPassword, agreedToTerms, dispatch, navigation]);

  const handleSocialLogin = useCallback((provider: string) => {
    showToast.info('Demo Mode', `${provider} signup is not available in demo`);
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={[styles.scrollView, { paddingTop: insets.top }]}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}>
        {/* Header */}
        <AuthHeader
          title="Create Account"
          subtitle="Join EcoShop and start shopping today"
          icon="person-add"
        />

        {/* Form Card */}
        <View style={styles.formCard}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            editable={!isLoading}
            icon={
              <MaterialIcons name="person-outline" size={20} color={colors.textTertiary} />
            }
          />
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!isLoading}
            icon={
              <MaterialIcons name="mail-outline" size={20} color={colors.textTertiary} />
            }
          />
          <Input
            label="Username"
            placeholder="Choose a username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!isLoading}
            icon={
              <MaterialIcons name="alternate-email" size={20} color={colors.textTertiary} />
            }
          />
          <Input
            label="Password"
            placeholder="Create a password (min 6 chars)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!isLoading}
            icon={
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <MaterialIcons
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={20}
                  color={colors.textTertiary}
                />
              </TouchableOpacity>
            }
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            editable={!isLoading}
            icon={
              <MaterialIcons name="lock-outline" size={20} color={colors.textTertiary} />
            }
          />

          {/* Terms */}
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            activeOpacity={0.7}>
            <View style={[styles.checkbox, agreedToTerms && styles.checkboxActive]}>
              {agreedToTerms && (
                <MaterialIcons name="check" size={14} color={colors.textInverse} />
              )}
            </View>
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
            <Button
              title="Create Account"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>

        {/* Social */}
        <View style={styles.socialSection}>
          <DividerWithText text="or sign up with" />
          <View style={styles.socialRow}>
            <SocialButton
              icon="email"
              title="Google"
              onPress={() => handleSocialLogin('Google')}
            />
            <View style={styles.socialGap} />
            <SocialButton
              icon="apple"
              title="Apple"
              onPress={() => handleSocialLogin('Apple')}
            />
          </View>
        </View>

        {/* Login Link */}
        <View style={styles.loginSection}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: colors.background,
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: spacing.radiusSm,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  checkboxActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  termsText: {
    flex: 1,
    fontSize: typography.caption,
    color: colors.textSecondary,
    lineHeight: typography.captionLineHeight + 2,
  },
  termsLink: {
    color: colors.accent,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
  },
  errorText: {
    fontSize: typography.caption,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  buttonContainer: {
    marginTop: spacing.sm,
  },
  socialSection: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.md,
  },
  socialRow: {
    flexDirection: 'row',
  },
  socialGap: {
    width: spacing.md,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  loginText: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
  },
  loginLink: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.accent,
  },
});

export default RegisterScreen;