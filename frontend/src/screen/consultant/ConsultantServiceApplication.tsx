import React, { useState, useEffect } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export default function ConsultantServiceApplication() {
  const [services, setServices] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/services').then(res => setServices(res.data));
  }, []);

  const toggleService = (serviceId: any) => {
    setSelected(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleApply = async () => {
    await api.post('/consultants/apply-services', { services: selected });
    (navigation as any).navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <Text>Select Services to Offer:</Text>
      {services.map((service: any) => (
        <TouchableOpacity key={service._id} onPress={() => toggleService(service._id)} style={styles.item}>
          <Text style={{ color: selected.includes(service._id) ? 'green' : 'black' }}>{service.name}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Submit Application" onPress={handleApply} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: { marginVertical: 5, padding: 5, borderBottomWidth: 1 }
}); 