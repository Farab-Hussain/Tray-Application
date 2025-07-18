import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
} from 'react-native';
import Header from '../components/common/Header';
import SearchBar from '../components/common/SearchBar';
import ServicesCard from '../components/common/ServicesCard';
import api from '../services/api';

const Services = () => {
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        setServicesData(res.data);
      } catch (e) {
        setServicesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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
          ListEmptyComponent={loading ? <Text>Loading...</Text> : <Text>No services found.</Text>}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Services;

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
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
