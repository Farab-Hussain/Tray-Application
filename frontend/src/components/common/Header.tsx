import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SPACING } from '../../theme/spacing';
// import  from 'lucide-react-native'
//  { ChevronRight } from 'lucide-react-native'
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View>
      <SafeAreaView>
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.iconLeft}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: SPACING.horizontal,
  },
  iconLeft: { 
    position: 'absolute', 
    left: SPACING.horizontal, 
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 4
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    paddingLeft: 40,
  },
});
