import React, { useCallback, useEffect } from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../hooks/useStore';
import { restoreSession } from '../store/slices/authSlice';
import { useStatusBar } from '../hooks/useStatusBar';
import { getLeafRouteName } from '../utils/route';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import SplashScreen from '../screens/Auth/SplashScreen';

export const navigationRef = createNavigationContainerRef();

const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const { applyTheme } = useStatusBar();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    applyTheme('Splash');
  }, [applyTheme]);

  const handleStateChange = useCallback(() => {
    try {
      const state = navigationRef.getRootState();
      if (!state) return;

      const routeName = getLeafRouteName(state);
      if (routeName) {
        applyTheme(routeName);
      }
    } catch {
      // Navigation not ready
    }
  }, [applyTheme]);

  const handleReady = useCallback(() => {
    handleStateChange();
  }, [handleStateChange]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={handleStateChange}
      onReady={handleReady}>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;