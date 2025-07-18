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
import api from '../services/api';

type RootStackParamList = {
  myCart: undefined;
  // add other routes if needed
};

const SelectSlot = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onDateSelect = async (day: any) => {
    setSelectedDate(day.dateString);
    setLoading(true);
    try {
      const res = await api.get(`/slot/available?date=${day.dateString}`);
      setTimeSlots(res.data);
    } catch (e) {
      setTimeSlots([]);
    } finally {
      setLoading(false);
    }
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

      {/* Time Slots */}
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
          ListEmptyComponent={loading ? <Text>Loading...</Text> : <Text>No slots available.</Text>}
        />
      </View>

      {/* Book Now/Save Button */}
      <Button
        title={buttonLabel}
        onPress={() => navigation.navigate('myCart')}
        disabled={!selectedDate || !selectedSlot}
        customStyle={styles.bookBtn}
        textStyle={styles.bookBtnText}
      />
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
});
