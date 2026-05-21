import type { StatusBarStyle } from 'react-native';
import { colors } from '../constants';

export interface StatusBarTheme {
  barStyle: StatusBarStyle;
  backgroundColor: string;
}

const lightTheme: StatusBarTheme = {
  barStyle: 'light-content',
  backgroundColor: colors.gradientStart,
};

const darkTheme: StatusBarTheme = {
  barStyle: 'dark-content',
  backgroundColor: colors.background,
};

/**
 * Route-to-statusBar mapping.
 * Exact matches take priority. Fallback is used when no match is found.
 * To add a new route, just add it to the map below.
 */
const ROUTE_THEME_MAP: Record<string, StatusBarTheme> = {
  Login: lightTheme,
  Register: lightTheme,
  ForgotPassword: lightTheme,
  Splash: lightTheme,
  ProfileTab: lightTheme
};

const DEFAULT_THEME: StatusBarTheme = darkTheme;

export const getStatusBarTheme = (routeName: string): StatusBarTheme => {
  return ROUTE_THEME_MAP[routeName] ?? DEFAULT_THEME;
};