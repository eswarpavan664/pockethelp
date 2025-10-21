/**
 * PocketHelp - Personal Assistant App
 * Modern React Native app with Redux, Navigation, and beautiful UI
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
