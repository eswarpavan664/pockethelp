import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES, SPACING } from '../../constants';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  gradient?: boolean;
  backgroundColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightComponent,
  gradient = true,
  backgroundColor = COLORS.primary,
}) => {
  const HeaderContent = () => (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
              <Text style={styles.backButtonText}>‹</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        <View style={styles.rightSection}>
          {rightComponent}
        </View>
      </View>
    </View>
  );

  if (gradient) {
    return (
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.gradientContainer}
      >
        <HeaderContent />
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <HeaderContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  gradientContainer: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: SPACING.xs,
    fontFamily: FONTS.regular,
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
});

export default Header;
