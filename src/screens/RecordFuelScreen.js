// screens/RecordFuelScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/RecordFuelScreenStyles';
import DateInput from "../components/DateInput"; // Create a separate stylesheet for RecordFuelScreen

const RecordFuelScreen = ({ route, navigation }) => {
    const { car, event } = route.params;
    const [mileage, setMileage] = useState(event ? event.mileage.toString() : car.mileage ? car.mileage.toString() : '');
    const [fuelAmount, setFuelAmount] = useState('');
    const [costPerGallon, setCostPerGallon] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString()); // Default to today's date

    const recordFuelHandler = async () => {
        const mileageValue = parseInt(mileage);
        const fuelAmountValue = parseFloat(fuelAmount);
        const costPerGallonValue = parseFloat(costPerGallon);

        // Fetch current mileage and validate the input
        const storedCars = await AsyncStorage.getItem('cars');
        const carsArray = storedCars ? JSON.parse(storedCars) : [];
        const currentCar = carsArray.find(c => c.id === car.id);

        if (!mileageValue || mileageValue < currentCar.mileage) {
            Alert.alert("Invalid Mileage", "The mileage must be greater than or equal to the current mileage.");
            return;
        }

        const newFuelRecord = {
            mileage: mileageValue,
            fuelAmount: fuelAmountValue,
            costPerGallon: costPerGallonValue || null,
            date: selectedDate
        };

        // Store the fuel record
        const storedFuelRecords = await AsyncStorage.getItem(`fuel_${car.id}`);
        const fuelRecordsArray = storedFuelRecords ? JSON.parse(storedFuelRecords) : [];
        fuelRecordsArray.push(newFuelRecord);
        await AsyncStorage.setItem(`fuel_${car.id}`, JSON.stringify(fuelRecordsArray));

        // Update car mileage
        currentCar.mileage = mileageValue;
        const updatedCarsArray = carsArray.map(c => c.id === car.id ? currentCar : c);
        await AsyncStorage.setItem('cars', JSON.stringify(updatedCarsArray));

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.carDetails}>{car.make} {car.model} ({car.year})</Text>

            <TextInput
                style={styles.input}
                placeholder={mileage}
                keyboardType="numeric"
                value={mileage}
                onChangeText={setMileage}
            />
            <TextInput
                style={styles.input}
                placeholder="Fuel Amount (gallons)"
                keyboardType="numeric"
                value={fuelAmount}
                onChangeText={setFuelAmount}
            />
            <TextInput
                style={styles.input}
                placeholder="Cost Per Gallon (optional)"
                keyboardType="numeric"
                value={costPerGallon}
                onChangeText={setCostPerGallon}
            />
            <DateInput initialDate={selectedDate} onDateChange={setSelectedDate} />

            <Button title="Save Fuel Record" onPress={recordFuelHandler} />
        </View>
    );
};

export default RecordFuelScreen;
