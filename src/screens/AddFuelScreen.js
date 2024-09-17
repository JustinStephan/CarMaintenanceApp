// screens/AddFuelScreen.js
import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/RecordFuelScreenStyles';
import DateInput from "../components/DateInput";
import uuid from "react-native-uuid";
import { validateMileage } from '../utils/MileageValidation.js';
import {updateCarInStorage} from "../utils/UpdateCarDetails";

//TODO Add edit record functionality
const AddFuelScreen = ({ route, navigation }) => {
    const { car: initialCar, event: record } = route.params;
    const [car, setCar] = useState(initialCar);
    const [mileage, setMileage] = useState(event ? event.mileage.toString() : car.mileage ? car.mileage.toString() : '');
    const [fuelAmount, setFuelAmount] = useState('');
    const [costPerGallon, setCostPerGallon] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString()); // Default to today's date

    useEffect(() => {
        //TODO is this not needed?
        // Fetch the car from AsyncStorage if needed (already passed in this example)
        const fetchCar = async () => {
            const storedCars = await AsyncStorage.getItem('cars');
            if (storedCars) {
                const carsArray = JSON.parse(storedCars);
                const updatedCar = carsArray.find(c => c.id === car.id);
                if (updatedCar) {
                    setCar(updatedCar); // Set car from storage
                }
            }
        };

        fetchCar();
    }, [car.id]);

    // Function to add a new fuel record to the car object
    const addFuelRecord = async () => {
        const newMileage = parseInt(mileage);
        const fuelAmount = parseFloat(fuelAmount);
        const costPerGallon = parseFloat(costPerGallon);


        if (!validateMileage(newMileage, car.mileage)) {
            return;
        }

        const newFuelRecord = {
            id: record ? record.id : uuid.v4(), // Use existing id if editing
            mileage: newMileage,
            fuelAmount: fuelAmount,
            costPerGallon: costPerGallon || null,
            date: new Date().toISOString().split('T')[0],
        };

        // Update car's fuelRecords array
        const updatedCar = {
            ...car,
            fuelRecords: [...(car.fuelRecords || []), newFuelRecord], // Add new record to fuelRecords
        };

        updatedCar.mileage = newMileage;

        await updateCarInStorage(updatedCar); // Update state with the new car object

        // Reset form inputs
        setMileage('');
        setFuelAmount('');
        setCostPerGallon('');

        navigation.goBack();
    };

    const recordFuelHandler = async () => {
        const mileageValue = parseInt(mileage);
        const fuelAmountValue = parseFloat(fuelAmount);
        const costPerGallonValue = parseFloat(costPerGallon);


        if (validateMileage(mileageValue, car.mileage)) {
            return;
        }

        const newFuelRecord = {
            mileage: mileageValue,
            fuelAmount: fuelAmountValue,
            costPerGallon: costPerGallonValue || null,
            date: selectedDate
        };
        //
        // // Store the fuel record
        // const fuelRecordsArray = storedFuelRecords ? JSON.parse(storedFuelRecords) : [];
        // fuelRecordsArray.push(newFuelRecord);
        // await AsyncStorage.setItem(`fuel_${car.id}`, JSON.stringify(fuelRecordsArray));
        //
        // // Update car mileage
        // car.mileage = mileageValue;
        // const updatedCarsArray = car.map(c => c.id === car.id ? currentCar : c);
        // await AsyncStorage.setItem('cars', JSON.stringify(updatedCarsArray));

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

            <Button title="Save Fuel Record" onPress={addFuelRecord} />
        </View>
    );
};

export default AddFuelScreen;
