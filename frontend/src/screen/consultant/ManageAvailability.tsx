import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../services/api';
import { getUserId } from '../../services/authService';
import { Pencil } from 'lucide-react-native';

const ManageAvailability = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [availableDateTimes, setAvailableDateTimes] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Fetch slots for the consultant
  const fetchSlots = async () => {
    try {
      const consultantId = await getUserId();
      const res = await api.get(`/api/slots/${consultantId}`);
      console.log('Fetched slots:', res.data);
      setAvailableDateTimes(res.data.map((slot: any) => slot.time));
    } catch (err) {
      setAvailableDateTimes([]);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  // Edit an existing slot (local only)
  const handleEditDateTime = (idx: number) => {
    setEditIndex(idx);
    setSelectedDateTime(new Date(availableDateTimes[idx]));
    setShowPicker(true);
    console.log('Editing slot at index', idx);
  };

  // Handle picker change for both add and edit
  const handleDateTimePickerChange = async (event: any, date: Date | undefined) => {
    console.log('Picker changed:', event, date);
    setShowPicker(false);
    if (date) {
      const dateTimeStr = date.toISOString();
      if (editIndex !== null) {
        // Local edit only; backend update not implemented
        setAvailableDateTimes(prev => {
          const updated = [...prev];
          updated[editIndex] = dateTimeStr;
          return updated;
        });
        setEditIndex(null);
        setSelectedDateTime(null);
        // TODO: Implement backend update if needed
      } else {
        try {
          const consultantId = await getUserId();
          await api.post('/api/slots', {
            consultantId,
            time: dateTimeStr,
          });
          setSelectedDateTime(null);
          await fetchSlots();
        } catch (err) {
          console.log('Error creating slot:', err);
        }
      }
    } else {
      setEditIndex(null);
      setSelectedDateTime(null);
    }
  };

  // Delete a slot locally (backend delete not implemented)
  const handleDeleteDateTime = (dateTimeStr: string) => {
    setAvailableDateTimes(availableDateTimes.filter(t => t !== dateTimeStr));
    // TODO: Call backend to delete slot if endpoint is available
  };

  return (
    <View style={styles.container}>
      <Header title={'Manage Availability'} />
      <View style={styles.consultantSection}>
        <Text style={styles.consultantSectionHeading}>
          Provide Your Available Time
        </Text>
        <Button
          title="Pick Date & Time"
          onPress={() => {
            setShowPicker(true);
            setEditIndex(null);
            setSelectedDateTime(new Date());
            console.log('Picker should open');
          }}
          customStyle={styles.pickTimeBtn}
          textStyle={styles.pickTimeBtnText}
        />
        {showPicker && (
          <DateTimePicker
            value={selectedDateTime || new Date()}
            mode="datetime"
            display="default"
            onChange={handleDateTimePickerChange}
          />
        )}
        <Text style={styles.availableTimesHeading}>
          Your Available Times:
        </Text>
        <View style={styles.availableTimesRow}>
          {availableDateTimes.map((dateTimeStr, idx) => (
            <View key={idx} style={styles.availableTimeCard}>
              <Text style={styles.availableTimeText}>
                {new Date(dateTimeStr).toLocaleString()}
              </Text>
              <TouchableOpacity
                onPress={() => handleEditDateTime(idx)}
                style={styles.editIcon}
              >
                <Pencil size={16} color="#187D22" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteDateTime(dateTimeStr)}
                style={styles.deleteIcon}
              >
                <Text style={styles.deleteIconText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ManageAvailability;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  consultantSection: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  consultantSectionHeading: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  pickTimeBtn: {
    backgroundColor: '#FFCB4B',
    marginTop: 8,
  },
  pickTimeBtnText: {
    color: '#000',
    fontWeight: '600',
  },
  availableTimesHeading: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  availableTimesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  availableTimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  availableTimeText: {
    color: '#222',
    fontWeight: '500',
    fontSize: 15,
  },
  editIcon: {
    marginLeft: 8,
    padding: 2,
  },
  deleteIcon: {
    marginLeft: 8,
    padding: 2,
  },
  deleteIconText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 