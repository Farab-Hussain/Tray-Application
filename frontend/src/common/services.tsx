import React, { useState } from 'react';
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
import { getAllServices, getConsultantServices } from '../services/api';
import { useRoute } from '@react-navigation/native';

const Services = () => {
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute();
  // @ts-ignore
  const { consultantId } = route.params || {};

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        let data = [];
        if (consultantId) {
          data = await getConsultantServices(consultantId);
        } else {
          data = await getAllServices(); // Fetch all services
        }
        setServicesData(data);
        console.log('Fetched services:', data);
      } catch (err) {
        console.error('Error fetching services:', err);
        if (err && typeof err === 'object' && 'response' in err && (err as any).response) {
          console.error('API error response:', (err as any).response);
          setError(
            'Failed to load services: ' +
            ((err as any).response?.data?.message || JSON.stringify((err as any).response?.data) || (err as any).message || 'Unknown error')
          );
        } else {
          setError('Failed to load services');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [consultantId]);

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
        {loading ? (
          <Text>Loading services...</Text>
        ) : error ? (
          <Text style={{ color: 'red' }}>{error}</Text>
        ) : (
          <FlatList
            data={servicesData}
            keyExtractor={(item, index) => item._id + index}
            numColumns={2}
            columnWrapperStyle={styles.cardRow}
            contentContainerStyle={styles.flatListContentContainer}
            renderItem={({ item }) => (
              <View>
                <ServicesCard
                  name={item.name}
                  desc={item.description}
                  image={typeof item.image === 'string' ? item.image : undefined}
                  consultantId={consultantId}
                  serviceId={item._id}
                />
              </View>
            )}
            ListEmptyComponent={<Text>No services found.</Text>}
          />
        )}
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
