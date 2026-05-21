import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import store from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { NetworkBanner, ErrorBoundary } from './src/components/common';
import customToastConfig from './src/components/common/CustomToast';
import { colors } from './src/constants';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <NetworkBanner />
          <RootNavigator />
          <Toast config={customToastConfig} />
        </ErrorBoundary>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;