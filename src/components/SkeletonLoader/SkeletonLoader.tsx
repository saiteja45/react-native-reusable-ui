import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

type SkeletonLoaderProps = {
  width?: number | string; // Width of the skeleton block
  height?: number | string; // Height of the skeleton block
  borderRadius?: number; // Border radius for rounded corners
  style?: object; // Additional styles
  animationStyle?: 'shimmer' | 'pulse' | 'wave'; // Animation style
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style = {},
  animationStyle = 'shimmer',
}) => {
  const animationValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animateSkeleton = () => {
      if (animationStyle === 'shimmer') {
        Animated.loop(
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 1200,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();
      } else if (animationStyle === 'pulse') {
        Animated.loop(
          Animated.sequence([
            Animated.timing(animationValue, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        ).start();
      } else if (animationStyle === 'wave') {
        Animated.loop(
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          })
        ).start();
      }
    };

    animateSkeleton();
  }, [animationValue, animationStyle]);

  const animatedBackgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#f0f0f0'],
  });

  // Shimmering effect for skeleton loader
  const shimmerTranslateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 2],
  });

  const shimmerEffect = {
    transform: [{ translateX: shimmerTranslateX }],
    backgroundColor: '#e0e0e0',
  };

  // Pulse effect for skeleton loader
  const pulseScale = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const pulseEffect = {
    transform: [{ scale: pulseScale }],
    backgroundColor: '#e0e0e0',
  };

  // Wave effect for skeleton loader
  const waveTranslateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 1],
  });

  const waveEffect = {
    transform: [{ translateX: waveTranslateX }],
    backgroundColor: '#e0e0e0',
  };

  const animationStyleMap = {
    shimmer: shimmerEffect,
    pulse: pulseEffect,
    wave: waveEffect,
  };

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
        },
        animationStyleMap[animationStyle],
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    marginVertical: 8,
    backgroundColor: '#e0e0e0', // Fallback color
  },
});

export default SkeletonLoader;
