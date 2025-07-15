import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
} from 'react-native';
import Header from '../components/common/Header';
import SearchBar from '../components/common/SearchBar';
import ServicesCard from '../components/common/ServicesCard';

const servicesData = [
  {
    id: 1,
    name: 'Service 1',
    desc: 'Learn how to craft a professional resume that gets noticed by recruiters. 1',
    image: require('../assets/images/services.png'),
  },
  {
    id: 2,
    name: 'Service 2',
    desc: 'Learn how to craft a professional resume that gets noticed by recruiters. 2',
    image: require('../assets/images/services.png'),
  },
  {
    id: 3,
    name: 'Service 3',
    desc: 'Learn how to craft a professional resume that gets noticed by recruiters. 3',
    image: require('../assets/images/services.png'),
  },
  {
    id: 4,
    name: 'Service 4',
    desc: 'Learn how to craft a professional resume that gets noticed by recruiters. 4',
    image: require('../assets/images/services.png'),
  },
  {
    id: 5,
    name: 'Service 5',
    desc: 'Learn how to craft a professional resume that gets noticed by recruiters. 5',
    image: require('../assets/images/services.png'),
  },
  {
    id: 6,
    name: 'Service 6',
    desc: 'Learn how to craft a professional resume that gets noticed by recruiters. 6',
    image: require('../assets/images/services.png'),
  },
  {
    id: 7,
    name: 'Service 7',
    desc: 'Learn how to craft a professional resume that gets noticed by recruiters. 7',
    image: require('../assets/images/services.png'),
  },
  {
    id: 8,
    name: 'Service 8',
    desc: 'Learn how to craft a professional resume that gets noticed by recruiters. 8',
    image: require('../assets/images/services.png'),
  },
  {
    id: 9,
    name: 'Service 9',
    desc: 'Learn how to craft a professional resume that gets noticed by recruiters. 9',
    image: require('../assets/images/services.png'),
  },
  {
    id: 10,
    name: 'Service 10',
    desc: 'Learn how to craft a professional resume that gets noticed by recruiters. 10',
    image: require('../assets/images/services.png'),
  },
];
const services = () => {
  return (
    <KeyboardAvoidingView
      style={styles.full}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title="Consultancy Services " />
      <SafeAreaView style={styles.main}>
        <View style={styles.searchBarWrapper}>
          <SearchBar style={styles.searchBar} />
        </View>
        <FlatList
          data={servicesData.slice(0, 6)}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
          contentContainerStyle={styles.flatListContentContainer}
          renderItem={({ item }) => (
            <ServicesCard
              name={item.name}
              desc={item.desc}
              image={item.image}
            />
          )}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default services;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  cardRow: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  searchBarWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchBar: {
    width: '95%',
  },
  flatListContentContainer: {
    paddingHorizontal: 8,
  },
});
