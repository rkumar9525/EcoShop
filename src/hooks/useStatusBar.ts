import { useCallback } from 'react';
import { Platform, StatusBar } from 'react-native';
import { getStatusBarTheme } from '../config/statusBarConfig';

/**
 * Returns a function that applies the correct status bar theme
 * for a given route name. Uses the imperative StatusBar API
 * for maximum Android compatibility.
 */
export const useStatusBar = () => {
  const applyTheme = useCallback((routeName: string) => {
    const theme = getStatusBarTheme(routeName);

    StatusBar.setBarStyle(theme.barStyle);

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(theme.backgroundColor);
    }
  }, []);

  return { applyTheme };
};