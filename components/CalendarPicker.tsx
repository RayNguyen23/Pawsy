import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface CalendarPickerProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ selectedDate, onSelectDate }) => {
  // Simulate a few weeks of a calendar
  const today = new Date();
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getDayName = (date: Date) => {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return days[date.getDay()];
  };

  const getMonthName = (date: Date) => {
    const months = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    return months[date.getMonth()];
  };

  const generateDays = () => {
    const days = [];
    const startDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // Generate days for the next 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDay);
      date.setDate(startDay.getDate() + i);
      const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      days.push({
        date: dateString,
        dayOfMonth: date.getDate(),
        dayOfWeek: getDayName(date),
        fullDate: date,
        isAvailable: i < 25, // Simulate some unavailable days
      });
    }
    return days;
  };

  const days = generateDays();

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.monthHeader}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.monthTitle}>{getMonthName(today)} {today.getFullYear()}</Text>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.daysGrid}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayItem,
              selectedDate === day.date && styles.selectedDayItem,
              !day.isAvailable && styles.disabledDayItem,
            ]}
            onPress={() => day.isAvailable && onSelectDate(day.date)}
            disabled={!day.isAvailable}
          >
            <Text style={[
              styles.dayOfWeek,
              selectedDate === day.date && styles.selectedText,
              !day.isAvailable && styles.disabledText,
            ]}>
              {day.dayOfWeek}
            </Text>
            <Text style={[
              styles.dayOfMonth,
              selectedDate === day.date && styles.selectedText,
              !day.isAvailable && styles.disabledText,
            ]}>
              {day.dayOfMonth}
            </Text>
            {!day.isAvailable && (
              <View style={styles.unavailableOverlay}>
                <Text style={styles.unavailableText}>X</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 10,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayItem: {
    width: (width - 40 - 20 - 40) / 7, // Screen width - padding - margin - gap
    aspectRatio: 1, // Make it square
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    position: 'relative',
  },
  selectedDayItem: {
    backgroundColor: '#DC143C',
    borderColor: '#DC143C',
  },
  disabledDayItem: {
    opacity: 0.6,
    backgroundColor: '#F0F0F0',
  },
  dayOfWeek: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dayOfMonth: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#999',
  },
  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
  },
  unavailableText: {
    color: '#DC143C',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default CalendarPicker;