// components/DateInput.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styles from '../styles/DateInputStyles'; // Create styles for the DateInput

const DateInput = ({ initialDate, onDateChange }) => {
    const [date, setDate] = useState(initialDate || new Date().toISOString().split('T')[0]);
    const [isCalendarVisible, setCalendarVisible] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    };

    const handleDateChange = (day) => {
        setDate(day.dateString);
        setCalendarVisible(false);
        onDateChange(day.dateString); // Pass the selected date back to the parent component
    };

    return (
        <View>
            {/* Date Button: Show current/selected date, open calendar on press */}
            <TouchableOpacity onPress={() => setCalendarVisible(!isCalendarVisible)}>
                <Text style={styles.dateButton}>{formatDate(date)}</Text>
            </TouchableOpacity>

            {/* Calendar Component: Visible when the user clicks the date */}
            {isCalendarVisible && (
                <Calendar
                    onDayPress={handleDateChange}
                    markedDates={{
                        [date]: { selected: true, marked: true, selectedColor: '#6200ee' },
                    }}
                    theme={{
                        selectedDayBackgroundColor: '#6200ee',
                        todayTextColor: '#6200ee',
                    }}
                    style={styles.calendar}
                />
            )}
        </View>
    );
};

export default DateInput;
