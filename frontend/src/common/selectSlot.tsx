import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../services/api'; // adjust path as needed
import { getUserId } from '../services/authService';
import { Pencil } from 'lucide-react-native'; // or use any icon library

type RootStackParamList = {
  myCart: undefined;
  // add other routes if needed
};

const demoTimeSlots = [
  '10:00 AM',
  '11:00 AM',
  '12:30 PM',
  '2:00 PM',
  '3:30 PM',
  '5:00 PM',
];

const SelectSlot = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConsultant, setIsConsultant] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<Date[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then(userStr => {
      console.log('AsyncStorage user:', userStr); // <-- This log is critical
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          console.log('Parsed user:', user); // <-- Add this log
          if (user && user.role === 'consultant') {
            setIsConsultant(true);
          }
        } catch (e) {
          console.log('Error parsing user:', e);
        }
      }
    });
  }, []);

  const onDateSelect = (day: any) => {
    setSelectedDate(day.dateString);
    setLoading(true);
    setTimeout(() => {
      setTimeSlots(demoTimeSlots);
      setLoading(false);
    }, 300); // Simulate loading
  };

  const handleEditTime = (idx: number) => {
    setEditIndex(idx);
    setSelectedTime(new Date(availableTimes[idx]));
    setShowPicker(true);
  };

  const handleTimePickerChange = async (_: any, time: Date | undefined) => {
    setShowPicker(false);
    if (time) {
      if (editIndex !== null) {
        // Edit mode: update the slot
        const updated = [...availableTimes];
        updated[editIndex] = time;
        setAvailableTimes(updated);
        setEditIndex(null);
      } else {
        // Add mode: immediately add the time
        try {
          const consultantId = await getUserId();
          await api.post('/api/slots', {
            consultantId,
            time,
          });
          setAvailableTimes([...availableTimes, time]);
        } catch (err) {
          // handle error
        }
      }
    } else {
      setEditIndex(null);
    }
  };

  const handleDeleteTime = (time: Date) => {
    setAvailableTimes(availableTimes.filter(t => t !== time));
    // Optionally, call backend to delete slot if you have such an endpoint
  };

  const buttonLabel = selectedDate && selectedSlot ? 'Book Now' : 'Book Now';
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Header title={'Select Slot'} />
      {/* Calendar */}
      <View style={styles.calendarWrapper}>
        <Calendar
          onDayPress={onDateSelect}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#ADEBB3' },
          }}
          theme={{
            arrowColor: '#B5BEC6',
            selectedDayTextColor: '#B5BEC6',
            todayTextColor: '#B5BEC6',
            textSectionTitleColor: '#B5BEC6',
            monthTextColor: '#222',
            indicatorColor: '#B5BEC6',
          }}
        />
      </View>

      {/* Hide time slots section for consultants */}
      {!isConsultant && (
        <View style={styles.section}>
          <Text style={styles.heading}>Available Time Slots</Text>
          <FlatList
            data={timeSlots}
            keyExtractor={item => item}
            numColumns={3}
            contentContainerStyle={styles.contentContainer}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.slot,
                  item === selectedSlot && styles.selectedSlot,
                ]}
                onPress={() => setSelectedSlot(item)}
              >
                <Text
                  style={[
                    styles.slotText,
                    item === selectedSlot && styles.selectedSlotText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              loading ? (
                <Text>Loading...</Text>
              ) : (
                <Text>No slots available.</Text>
              )
            }
          />
        </View>
      )}

      {/* Book Now/Save Button */}
      <Button
        title={buttonLabel}
        onPress={() => navigation.navigate('myCart')}
        disabled={!selectedDate || !selectedSlot}
        customStyle={styles.bookBtn}
        textStyle={styles.bookBtnText}
      />
      {/* Consultant-only section for providing available time */}
      {isConsultant && (
        <View style={styles.consultantSection}>
          <Text style={styles.consultantSectionHeading}>
            Consultant: Provide Your Available Time
          </Text>
          <Button
            title="Pick Time"
            onPress={() => {
              setShowPicker(true);
              setEditIndex(null);
            }}
            customStyle={styles.pickTimeBtn}
            textStyle={styles.pickTimeBtnText}
          />
          {showPicker && (
            <DateTimePicker
              value={selectedTime || new Date()}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={handleTimePickerChange}
            />
          )}
          {/* Add button removed: when a time is picked, add it immediately */}
          <Text style={styles.availableTimesHeading}>
            Your Available Times:
          </Text>
          <View style={styles.availableTimesRow}>
            {availableTimes.map((time, idx) => (
              <View key={idx} style={styles.availableTimeCard}>
                <Text style={styles.availableTimeText}>
                  {new Date(time).toLocaleTimeString()}
                </Text>
                <TouchableOpacity
                  onPress={() => handleEditTime(idx)}
                  style={styles.editIcon}
                >
                  <Pencil size={16} color="#187D22" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteTime(time)}
                  style={styles.deleteIcon}
                >
                  <Text style={styles.deleteIconText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default SelectSlot;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  calendarWrapper: {
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 12,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // Android shadow
    elevation: 4,
    backgroundColor: '#fff',
  },
  section: {
    marginTop: 24,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    fontStyle: 'normal',
    lineHeight: 32,
  },
  slot: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 8,
    width: (width - 64) / 3, // 3 per row
    alignItems: 'center',
  },
  slotText: {
    color: '#333',
    fontSize: 14,
  },
  selectedSlot: {
    backgroundColor: '#ADEBB3',
  },
  selectedSlotText: {
    fontWeight: '700',
    color: '#000',
  },
  bookBtn: {
    marginTop: 32,
    backgroundColor: '#FFCB4B',
  },
  bookBtnText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  helloText: {
    color: 'red',
    fontWeight: 'bold',
  },
  contentContainer: {
    gap: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
    columnGap: 12,
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
  selectedTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  selectedTimeText: {
    marginRight: 12,
  },
  addBtn: {
    backgroundColor: '#FFCB4B',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addBtnText: {
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
