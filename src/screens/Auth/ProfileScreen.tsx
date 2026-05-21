import React from 'react';
import {
  View,
  Text,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { logout } from '../../store/slices/authSlice';
import { colors, typography, spacing } from '../../constants';
import { showToast } from '../../utils/toast';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const cartItemCount = useAppSelector(state => state.cart.itemCount);
  const cartTotal = useAppSelector(state => state.cart.totalAmount);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          showToast.info('Logged Out', 'See you soon! 👋');
        },
      },
    ]);
  };

  const handleMenuPress = (item: string) => {
    switch (item) {
      case 'cart':
        navigation.navigate('MainTabs', { screen: 'CartTab' });
        break;
      default:
        showToast.info('Coming Soon', `${item} feature is under development`);
        break;
    }
  };

  const stats = [
    { label: 'Orders', value: '12', icon: 'shopping-bag' },
    { label: 'Wishlist', value: '8', icon: 'favorite' },
    { label: 'Cart', value: String(cartItemCount), icon: 'shopping-cart' },
  ];

  const accountItems = [
    {
      id: 'orders',
      icon: 'shopping-bag',
      title: 'My Orders',
      subtitle: 'Track and manage your orders',
      badge: null,
    },
    {
      id: 'cart',
      icon: 'shopping-cart',
      title: 'My Cart',
      subtitle: cartItemCount > 0 ? `${cartItemCount} items • ${cartTotal.toFixed(2)}` : 'Your cart is empty',
      badge: cartItemCount > 0 ? String(cartItemCount) : null,
    },
    {
      id: 'wishlist',
      icon: 'favorite-border',
      title: 'Wishlist',
      subtitle: 'Products you saved',
      badge: null,
    },
  ];

  const settingsItems = [
    {
      id: 'address',
      icon: 'location-on',
      title: 'Shipping Address',
      subtitle: 'Manage delivery addresses',
      badge: null,
    },
    {
      id: 'payment',
      icon: 'credit-card',
      title: 'Payment Methods',
      subtitle: 'Cards and payment options',
      badge: null,
    },
    {
      id: 'notifications',
      icon: 'notifications-none',
      title: 'Notifications',
      subtitle: 'Manage alerts and updates',
      badge: null,
    },
    {
      id: 'settings',
      icon: 'settings',
      title: 'Settings',
      subtitle: 'App preferences',
      badge: null,
    },
  ];

  const supportItems = [
    {
      id: 'help',
      icon: 'help-outline',
      title: 'Help Center',
      subtitle: 'FAQ and support',
      badge: null,
    },
    {
      id: 'about',
      icon: 'info-outline',
      title: 'About EcoShop',
      subtitle: 'Version 1.0.0',
      badge: null,
    },
  ];

  const renderMenuSection = (
    title: string,
    items: typeof accountItems,
  ) => (
    <View style={styles.menuSection}>
      <Text style={styles.menuSectionTitle}>{title}</Text>
      <View style={styles.menuCard}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              index === items.length - 1 && styles.menuItemLast,
            ]}
            onPress={() => handleMenuPress(item.id)}
            activeOpacity={0.6}>
            <View style={styles.menuIconContainer}>
              <MaterialIcons
                name={item.icon as any}
                size={20}
                color={colors.accent}
              />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            {item.badge && (
              <View style={styles.menuBadge}>
                <Text style={styles.menuBadgeText}>{item.badge}</Text>
              </View>
            )}
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.xxxl },
        ]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerDecor1} />
          <View style={styles.headerDecor2} />

          <View style={styles.headerContent}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {user?.username || 'Guest'}
              </Text>
              <Text style={styles.userEmail}>
                {user?.email || 'user@ecoshop.com'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                showToast.info('Coming Soon', 'Profile editing is under development')
              }
              activeOpacity={0.7}>
              <MaterialIcons
                name="edit"
                size={18}
                color={colors.textInverse}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((stat, index) => (
            <TouchableOpacity
              key={stat.label}
              style={[
                styles.statItem,
                index === stats.length - 1 && styles.statItemLast,
              ]}
              onPress={() => {
                if (stat.label === 'Cart') {
                  navigation.navigate('MainTabs', { screen: 'CartTab' });
                }
              }}
              activeOpacity={0.7}>
              <MaterialIcons
                name={stat.icon as any}
                size={20}
                color={colors.accent}
              />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Sections */}
        {renderMenuSection('My Account', accountItems)}
        {renderMenuSection('Settings', settingsItems)}
        {renderMenuSection('Support', supportItems)}

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}>
          <MaterialIcons name="logout" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Header
  header: {
    backgroundColor: colors.gradientStart,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    position: 'relative',
    overflow: 'hidden',
  },
  headerDecor1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.gradientAccent + '25',
  },
  headerDecor2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gradientEnd + '20',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.gradientEnd,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.textInverse + '40',
  },
  avatarText: {
    fontSize: typography.h3,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textInverse,
  },
  userInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  userName: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textInverse,
  },
  userEmail: {
    fontSize: typography.caption,
    color: colors.textInverse + 'AA',
    marginTop: 2,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.textInverse + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xl,
    marginTop: -spacing.xl,
    borderRadius: spacing.radiusLg,
    paddingVertical: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.divider,
    gap: 4,
  },
  statItemLast: {
    borderRightWidth: 0,
  },
  statValue: {
    fontSize: typography.h4,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: typography.caption,
    color: colors.textTertiary,
  },

  // Menu Section
  menuSection: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  menuSectionTitle: {
    fontSize: typography.caption,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusLg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: spacing.radiusMd,
    backgroundColor: colors.decorativeCircle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  menuTitle: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    marginTop: 1,
  },
  menuBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: spacing.radiusFull,
    marginRight: spacing.sm,
    minWidth: 22,
    alignItems: 'center',
  },
  menuBadgeText: {
    fontSize: typography.micro,
    fontWeight: typography.weightBold as TextStyle['fontWeight'],
    color: colors.textInverse,
  },

  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.xl,
    marginTop: spacing.xxl,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: spacing.radiusMd,
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    gap: spacing.sm,
  },
  logoutText: {
    fontSize: typography.bodySmall,
    fontWeight: typography.weightSemiBold as TextStyle['fontWeight'],
    color: colors.error,
  },
});

export default ProfileScreen;