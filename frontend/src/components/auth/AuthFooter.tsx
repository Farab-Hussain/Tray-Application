import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SPACING = Math.max(16, width * 0.04);

interface AuthFooterProps {
  promptText: string;
  buttonLabel: string;
  onPress: () => void;
}

const AuthFooter: React.FC<AuthFooterProps> = ({
  promptText,
  buttonLabel,
  onPress,
}) => (
  <View style={styles.container}>
    <Text style={styles.promptText}>{promptText}</Text>
    <TouchableOpacity onPress={onPress} accessibilityRole="button">
      <Text style={styles.buttonText}>{buttonLabel}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: height * 0.04,
    marginBottom: SPACING,
  },
  promptText: {
    fontSize: 14,
    color: 'gray',
    fontFamily: 'Poppins',
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
    fontFamily: 'Inter',
    marginLeft: 4,
  },
});

export default AuthFooter;
