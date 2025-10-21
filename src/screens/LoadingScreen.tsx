import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES } from '../constants';

const { width, height } = Dimensions.get('window');

const LoadingScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start animations
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const scaleIn = Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: true,
    });

    const slideUp = Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    // Continuous rotation animation
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.sine),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.sine),
          useNativeDriver: true,
        }),
      ])
    );

    // Start all animations
    Animated.parallel([
      fadeIn,
      scaleIn,
      slideUp,
    ]).start();

    rotateAnimation.start();
    pulseAnimation.start();

    return () => {
      rotateAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primaryDark, COLORS.secondary]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      {/* Background animated circles */}
      <View style={styles.backgroundCircles}>
        <Animated.View
          style={[
            styles.circle,
            styles.circle1,
            {
              transform: [
                { rotate: rotateInterpolate },
                { scale: pulseAnim },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            styles.circle2,
            {
              transform: [
                { rotate: rotateInterpolate },
                { scale: pulseAnim },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            styles.circle3,
            {
              transform: [
                { rotate: rotateInterpolate },
                { scale: pulseAnim },
              ],
            },
          ]}
        />
      </View>

      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim },
            ],
          },
        ]}
      >
        {/* App Icon/Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                { rotate: rotateInterpolate },
                { scale: pulseAnim },
              ],
            },
          ]}
        >
          <View style={styles.logo}>
            <Text style={styles.logoText}>P</Text>
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.Text
          style={[
            styles.appName,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          PocketHelp
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          Your Personal Assistant
        </Animated.Text>

        {/* Loading dots */}
        <Animated.View
          style={[
            styles.loadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Animated.View style={[styles.dot, { transform: [{ scale: pulseAnim }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ scale: pulseAnim }] }]} />
          <Animated.View style={[styles.dot, { transform: [{ scale: pulseAnim }] }]} />
        </Animated.View>
      </Animated.View>

      {/* Bottom gradient overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.1)']}
        style={styles.bottomGradient}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircles: {
    position: 'absolute',
    width: width,
    height: height,
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle1: {
    width: 200,
    height: 200,
    top: height * 0.1,
    left: width * 0.1,
  },
  circle2: {
    width: 150,
    height: 150,
    top: height * 0.6,
    right: width * 0.1,
  },
  circle3: {
    width: 100,
    height: 100,
    bottom: height * 0.2,
    left: width * 0.3,
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: SIZES.xl,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: FONTS.bold,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: SIZES.sm,
    fontFamily: FONTS.bold,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: SIZES.xxl,
    fontFamily: FONTS.regular,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginHorizontal: 4,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
});

export default LoadingScreen;
