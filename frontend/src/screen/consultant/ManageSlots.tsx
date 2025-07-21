import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import { getConsultantApprovedServices } from '../../services/api';

const ManageSlots = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const approved = await getConsultantApprovedServices();
        setServices(approved);
      } catch (err) {
        setServices([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.slotCard}>
      <Text style={styles.service}>{item.name || item}</Text>
      {/* Add more details if needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Manage Slots" />
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : services.length === 0 ? (
        <Text style={styles.empty}>No approved services found.</Text>
      ) : (
        <FlatList
          data={services}
          keyExtractor={(item, index) => item._id + index}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 48,
  },
  slotCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  service: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  loading: {
    textAlign: 'center',
    marginTop: 40,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default ManageSlots; 