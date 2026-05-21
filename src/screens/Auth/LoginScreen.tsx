import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { login, clearError } from '../../store/slices/authSlice';
import { Button, Input } from '../../components/common';
import { AuthHeader, SocialButton, DividerWithText } from '../../components/ui';
import { showToast } from '../../utils/toast';
import { colors, typography, spacing } from '../../constants';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = useCallback(async () => {
    if (!username.trim()) {
      showToast.error('Validation Error', 'Please enter your username');
      return;
    }
    if (!password.trim()) {
      showToast.error('Validation Error', 'Please enter your password');
      return;
    }
    dispatch(clearError());
    const result = await dispatch(login({ username, password }));
    if (login.rejected.match(result)) {
      showToast.error('Login Failed', (result.payload as string) || 'Invalid credentials');
    } else {
      showToast.success('Welcome back! 👋', 'You are now signed in');
    }
  }, [username, password, dispatch]);

  const handleSocialLogin = useCallback((provider: string) => {
    showToast.info('Demo Mode', `${provider} login is not available in demo`);
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
          title="Welcome Back"
          subtitle="Sign in to your account to continue shopping"
        />

        {/* Form Card */}
        <View style={styles.formCard}>
          <Input
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!isLoading}
            icon={
              <Text style={styles.inputIcon}>
                <MaterialIcons name="person-outline" size={20} color={colors.textTertiary} />
              </Text>
            }
          />
          <Input
            label="Password"
            placeholder="Enter your password"
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

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotContainer}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </View>

        {/* Social Login */}
        <View style={styles.socialSection}>
          <DividerWithText text="or continue with" />
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

        {/* Sign Up Link */}
        <View style={styles.signupSection}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* Demo Credentials */}
        <View style={styles.demoBox}>
          <View style={styles.demoHeader}>
            <MaterialIcons name="info-outline" size={16} color={colors.accent} />
            <Text style={styles.demoTitle}>Demo Credentials</Text>
          </View>
          <View style={styles.demoRow}>
            <Text style={styles.demoLabel}>Username</Text>
            <Text style={styles.demoValue}>mor_2314</Text>
          </View>
          <View style={styles.demoRow}>
            <Text style={styles.demoLabel}>Password</Text>
            <Text style={styles.demoValue}>83r5^_</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Need this import for the icon usage
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
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },
  inputIcon: {
    // placeholder style
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
    marginTop: -spacing.xs,
  },
  forgotText: {
    fontSize: typography.caption,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.accent,
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
  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  signupText: {
    fontSize: typography.bodySmall,
    color: colors.textSecondary,
  },
  signupLink: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.accent,
  },
  demoBox: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    padding: spacing.base,
    backgroundColor: colors.decorativeCircle,
    borderRadius: spacing.radiusMd,
    borderWidth: 1,
    borderColor: colors.accentLight + '30',
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  demoTitle: {
    fontSize: typography.caption,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.accent,
  },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  demoLabel: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },
  demoValue: {
    fontSize: typography.caption,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});

export default LoginScreen;