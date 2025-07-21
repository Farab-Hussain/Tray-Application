import React, { useState, useContext } from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserRoleContext } from '../../../App';
import { createService } from '../../services/api'; // import the new API function

export default function ConsultantServiceApplication() {
  // Remove all backend logic
  const [services] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const navigation = useNavigation();
  const { setUserRole } = useContext(UserRoleContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const toggleService = (serviceId: any) => {
    setSelected(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId],
    );
  };

  const handleCreateService = async () => {
    setMessage('');
    try {
      await createService({ name, description, image });
      setMessage('Service created successfully!');
      setName('');
      setDescription('');
      setImage('');
    } catch (err) {
      setMessage('Failed to create service.');
    }
  };

  const handleApply = async () => {
    // No backend call
    setUserRole('consultant'); // Set the role so RootNavigator shows consultant navigation
    (navigation as any).navigate('ConsultantTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
        Create a New Service
      </Text>
      <TextInput
        placeholder="Service Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      <Button title="Create Service" onPress={handleCreateService} />
      {message ? <Text style={{ marginVertical: 10 }}>{message}</Text> : null}
      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>
        Select Services to Offer:
      </Text>
      {services.map((service: any) => (
        <TouchableOpacity
          key={service._id}
          onPress={() => toggleService(service._id)}
          style={styles.item}
        >
          <Text
            style={{
              color: selected.includes(service._id) ? 'green' : 'black',
            }}
          >
            {service.name}
          </Text>
        </TouchableOpacity>
      ))}
      <Button title="Submit Application" onPress={handleApply} />
      {services.length === 0 && (
        <Text>No services found (backend disabled).</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: { marginVertical: 5, padding: 5, borderBottomWidth: 1 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
});
