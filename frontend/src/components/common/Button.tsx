import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  customStyle?: ViewStyle;
  textStyle?: TextStyle;
}
const { height } = Dimensions.get('window');

const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  customStyle,
  textStyle,
}: ButtonProps) => {
  const buttonStyle = [styles.btn, customStyle, disabled && styles.disabled];

  const textStyleCombined = [
    styles.btnText,
    textStyle,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text style={textStyleCombined}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    height: 56,
    justifyContent: 'center',
    marginVertical: 10,
    marginTop: height * 0.03,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
