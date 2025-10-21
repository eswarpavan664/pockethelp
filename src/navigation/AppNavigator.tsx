import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { checkAuthStatus } from '../store/slices/authSlice';
import { initializeApp } from '../store/slices/appSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import LoadingScreen from '../screens/LoadingScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading: authLoading } = useAppSelector(state => state.auth);
  const { isLoading: appLoading, isFirstLaunch } = useAppSelector(state => state.app);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Check if it's first launch
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (!hasLaunched) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          dispatch(initializeApp());
        } else {
          dispatch(initializeApp());
        }

        // Check authentication status
        dispatch(checkAuthStatus());
      } catch (error) {
        console.error('Initialization error:', error);
        dispatch(initializeApp());
      }
    };

    initialize();
  }, [dispatch]);

  // Show loading screen while app is initializing
  if (appLoading || authLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        {isFirstLaunch ? (
          // First time user - show onboarding
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !isAuthenticated ? (
          // Not authenticated - show auth screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Authenticated - show main app
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
