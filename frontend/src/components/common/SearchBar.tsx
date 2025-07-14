import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  onSearch?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, style }) => {
  const [query, setQuery] = useState('');

  const handleChange = (text: string) => {
    setQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Search color="#fff" size={24} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#858585"
        value={query}
        onChangeText={handleChange}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 48,
    backgroundColor: '#F6F7F9',
    borderRadius: 22,
    paddingHorizontal: 16,
    // marginRight:40, // Removed to allow centering
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#858585',
    fontSize: 16,
    height: '100%',
  },
});

export default SearchBar;
