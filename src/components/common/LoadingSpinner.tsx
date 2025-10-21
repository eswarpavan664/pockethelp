import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants';

const { width } = Dimensions.get('window');

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  backgroundColor?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 'medium',
  color = COLORS.primary,
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Spin animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: (t) => t,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    return () => {
      spinAnimation.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getSpinnerSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      default:
        return 36;
    }
  };

  const getContainerSize = () => {
    switch (size) {
      case 'small':
        return 60;
      case 'large':
        return 120;
      default:
        return 80;
    }
  };

  return (
    <Animated.View
      style={[
        styles.overlay,
        { backgroundColor },
        { opacity: fadeValue },
      ]}
    >
      <View style={[styles.container, { width: getContainerSize() }]}>
        <Animated.View
          style={[
            styles.spinner,
            {
              width: getSpinnerSize(),
              height: getSpinnerSize(),
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <LinearGradient
            colors={[color, COLORS.primaryDark]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
        
        {message && (
          <Text style={[styles.message, { fontSize: size === 'small' ? 12 : size === 'large' ? 16 : 14 }]}>
            {message}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: SIZES.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  spinner: {
    borderRadius: 50,
    marginBottom: SPACING.md,
  },
  gradient: {
    flex: 1,
    borderRadius: 50,
  },
  message: {
    color: COLORS.text,
    textAlign: 'center',
    fontFamily: FONTS.medium,
  },
});

export default LoadingSpinner;
