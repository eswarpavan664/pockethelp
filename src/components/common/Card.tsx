import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { COLORS, SIZES, SPACING, BORDER_RADIUS } from '../../constants';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: number;
  margin?: number;
  shadow?: boolean;
  borderRadius?: number;
  backgroundColor?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  padding = SPACING.lg,
  margin = 0,
  shadow = true,
  borderRadius = BORDER_RADIUS.lg,
  backgroundColor = 'white',
}) => {
  const cardStyle = [
    styles.card,
    {
      padding,
      margin,
      borderRadius,
      backgroundColor,
    },
    shadow && styles.shadow,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Card;
