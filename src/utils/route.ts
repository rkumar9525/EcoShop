import type { NavigationState } from '@react-navigation/native';

/**
 * Walks the nested navigation state tree to find
 * the deepest (leaf) route name.
 */
export const getLeafRouteName = (state: any): string => {
  if (!state || !state.routes || state.routes.length === 0) {
    return '';
  }

  const index = state.index ?? state.routes.length - 1;
  const currentRoute = state.routes[index];

  if (currentRoute?.state) {
    return getLeafRouteName(currentRoute.state);
  }

  return currentRoute?.name ?? '';
};