import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import ProductDetailScreen from '../screens/Product/ProductDetailScreen';
import { colors } from '../constants';

export type MainStackParamList = {
  MainTabs: undefined;
  ProductDetail: { productId: number };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarBackgroundColor: colors.background,
        statusBarStyle: 'dark',
      }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          statusBarBackgroundColor: colors.surface,
          statusBarStyle: 'dark',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;