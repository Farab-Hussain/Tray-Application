import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

export default function ConsultantProfileSetup() {
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [certifications, setCertifications] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await api.post('/consultants/profile', {
        bio,
        skills: skills.split(','),
        certifications: certifications.split(',')
      });
      navigation.navigate('ConsultantServiceApplication');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Consultant Profile Setup</Text>
      <TextInput placeholder="Bio" value={bio} onChangeText={setBio} style={styles.input} />
      <TextInput placeholder="Skills (comma-separated)" value={skills} onChangeText={setSkills} style={styles.input} />
      <TextInput placeholder="Certifications (comma-separated)" value={certifications} onChangeText={setCertifications} style={styles.input} />
      <Button title="Next" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginVertical: 10, padding: 8, borderRadius: 5 }
}); 