// screens/AddMaintenanceEvent.js
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/AddMaintenanceEventStyles.js'

const initialEventTypes = [
    "Oil Change",
    "Tire Rotation",
    "Brake Inspection",
    "Fluid Check",
    "Battery Replacement",
    "Air Filter Replacement",
    "Wiper Blade Replacement",
    "Spark Plug Replacement",
    "Engine Tune-Up",
    "Transmission Service",
];

const AddMaintenanceEvent = ({ route, navigation }) => {
    const { car, event } = route.params; // Get car and event data

    const [type, setType] = useState(event ? event.type : initialEventTypes[0]); // Prepopulate type
    const [date, setDate] = useState(event ? event.date : ''); // Prepopulate date
    const [cost, setCost] = useState(event ? event.cost.toString() : ''); // Prepopulate cost
    const [mileage, setMileage] = useState(event ? event.mileage.toString() : car.mileage ? car.mileage.toString() : ''); // Prepopulate mileage
    const [customType, setCustomType] = useState(''); // For custom maintenance type
    const [note, setNote] = useState(event ? event.note : ''); // Prepopulate note
    const [isCalendarVisible, setCalendarVisible] = useState(false);

    // Dynamically set the header title based on whether we are editing or adding a new event
    useLayoutEffect(() => {
        navigation.setOptions({
            title: event ? 'Edit Maintenance Event' : 'Add Maintenance Event',
        });
    }, [navigation, event]);

    const addMaintenanceEventHandler = async () => {
        const newEvent = {
            id: event ? event.id : uuid.v4(), // Use existing id if editing
            type: type === "Other" ? customType : type,
            date,
            cost: parseFloat(cost),
            mileage: parseInt(mileage),
            note: note
        };

        const storedEvents = await AsyncStorage.getItem(`maintenance_${car.id}`);
        const eventsArray = storedEvents ? JSON.parse(storedEvents) : [];

        // Update or add the event
        if (event) {
            const index = eventsArray.findIndex(e => e.id === event.id);
            if (index > -1) {
                eventsArray[index] = newEvent; // Update existing event
            }
        } else {
            eventsArray.push(newEvent); // Add new event
        }

        await AsyncStorage.setItem(`maintenance_${car.id}`, JSON.stringify(eventsArray));

        // Update the car's mileage
        const updatedCar = { ...car, mileage: parseInt(mileage) };
        const storedCars = await AsyncStorage.getItem('cars');
        const carsArray = storedCars ? JSON.parse(storedCars) : [];
        const updatedCarsArray = carsArray.map(c => c.id === car.id ? updatedCar : c);
        await AsyncStorage.setItem('cars', JSON.stringify(updatedCarsArray));

        navigation.goBack();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Mileage</Text>
            <TextInput
                style={styles.input}
                placeholder="Mileage"
                keyboardType="numeric"
                onChangeText={setMileage}
                value={mileage}
            />

            <Text style={styles.label}>Maintenance Type</Text>
            <Picker selectedValue={type} onValueChange={(itemValue) => {
                setType(itemValue);
                if (itemValue !== "Other") {
                    setCustomType(''); // Clear custom input when not selecting 'Other'
                }
            }} style={styles.picker}>
                {initialEventTypes.map((eventType) => (
                    <Picker.Item key={eventType} label={eventType} value={eventType} />
                ))}
            </Picker>

            {type === "Other" && (
                <>
                    <Text style={styles.label}>Custom Maintenance Type</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCustomType}
                        value={customType}
                    />
                </>
            )}

            <Text style={styles.label}>Select Date</Text>
            <Button
                title={date ? formatDate(date) : 'mm-dd-yyyy'}
                onPress={() => setCalendarVisible(!isCalendarVisible)}
                color="#6200ee"
            />

            {isCalendarVisible && (
                <Calendar
                    onDayPress={(day) => {
                        setDate(day.dateString);
                        setCalendarVisible(false); // Close calendar on date selection
                    }}
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

            <Text style={styles.label}>Cost</Text>
            <TextInput
                style={styles.input}
                placeholder="Cost"
                keyboardType="numeric"
                onChangeText={setCost}
                value={cost}
            />

            <Text style={styles.label}>Additional Notes</Text>
            <TextInput
                style={styles.noteInput}
                onChangeText={setNote}
                value={note}
                multiline={true}
                numberOfLines={4}
            />

            <Button title={event ? "Update Event" : "Add Event"} onPress={addMaintenanceEventHandler} color="#6200ee" />
        </ScrollView>
    );
};

export default AddMaintenanceEvent;
