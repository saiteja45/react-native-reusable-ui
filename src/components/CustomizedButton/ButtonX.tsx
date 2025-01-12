import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  type GestureResponderEvent,
} from 'react-native';

type ButtonXProps = {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: object;
  textStyle?: object;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'solid' | 'outline' | 'text';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  color?: string;
};

const ButtonX: React.FC<ButtonXProps> = ({
  title = 'Button',
  onPress,
  style = {},
  textStyle = {},
  disabled = false,
  loading = false,
  size = 'medium',
  variant = 'solid',
  icon = null,
  iconPosition = 'left',
  color = '#007BFF',
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 6, paddingHorizontal: 12, fontSize: 14 };
      case 'large':
        return { paddingVertical: 14, paddingHorizontal: 24, fontSize: 18 };
      default:
        return { paddingVertical: 10, paddingHorizontal: 16, fontSize: 16 };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: color,
          color,
        };
      case 'text':
        return { backgroundColor: 'transparent', color };
      default:
        return { backgroundColor: color, color: '#FFF' };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? '#ccc' : variantStyles.backgroundColor },
        variant === 'outline' && {
          borderWidth: variantStyles.borderWidth,
          borderColor: variantStyles.borderColor,
        },
        sizeStyles,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variantStyles.color || '#FFF'} />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <View style={[styles.icon, { marginRight: 8 }]}>{icon}</View>
          )}
          <Text
            style={[
              styles.text,
              { color: variantStyles.color, fontSize: sizeStyles.fontSize },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <View style={[styles.icon, { marginLeft: 8 }]}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ButtonX;
