import React from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  TextStyle,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, typography, spacing } from '../../constants';

const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  HomeTab: { active: 'home', inactive: 'home' },
  SearchTab: { active: 'search', inactive: 'search' },
  CartTab: { active: 'shopping-cart', inactive: 'shopping-cart' },
  ProfileTab: { active: 'person', inactive: 'person-outline' },
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Platform.OS === 'android' ? 4 : insets.bottom },
      ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title || route.name;

        const icons = TAB_ICONS[route.name] || TAB_ICONS.HomeTab;
        const iconName = isFocused ? icons.active : icons.inactive;
        const iconColor = isFocused ? colors.accent : colors.textTertiary;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={route.key} style={styles.tabItemWrapper}>
            <Pressable
              onPress={onPress}
              style={styles.tabItem}
              android_ripple={{
                color: colors.accent + '18',
                borderless: true,
                radius: 28,
              }}
              pressRetentionOffset={{ top: 4, bottom: 4, left: 4, right: 4 }}>
              <MaterialIcons
                name={iconName as any}
                size={isFocused ? 26 : 24}
                color={iconColor}
              />
              <Text
                style={[
                  styles.label,
                  { color: iconColor },
                  isFocused && styles.labelActive,
                ]}>
                {label}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 0,
  },
  tabItemWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: spacing.xs,
  },
  label: {
    fontSize: typography.micro + 1,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
    color: colors.textTertiary,
  },
  labelActive: {
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.accent,
  },
});

export default CustomTabBar;