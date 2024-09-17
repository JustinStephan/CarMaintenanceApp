// screens/AddFuelScreen.js
import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/RecordFuelScreenStyles';
import DateInput from "../components/DateInput"; // Create a separate stylesheet for AddFuelScreen

const AddFuelScreen = ({ route, navigation }) => {
    const { car: initialCar, event } = route.params;
    const [car, setCar] = useState(initialCar);
    const [mileage, setMileage] = useState(event ? event.mileage.toString() : car.mileage ? car.mileage.toString() : '');
    const [fuelAmount, setFuelAmount] = useState('');
    const [costPerGallon, setCostPerGallon] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString()); // Default to today's date

    useEffect(() => {
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


        if (!newMileage || newMileage < car.mileage) {
            Alert.alert("Invalid Mileage", "The mileage must be greater than or equal to the current mileage.");
            return;
        }

        const newFuelRecord = {
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

        setCar(updatedCar); // Update state with the new car object

        // Retrieve the existing list of cars from AsyncStorage
        const storedCars = await AsyncStorage.getItem('cars');
        const carsArray = storedCars ? JSON.parse(storedCars) : [];

        // Update the car in the array and save back to AsyncStorage
        const updatedCarsArray = carsArray.map(c => (c.id === car.id ? updatedCar : c));
        await AsyncStorage.setItem('cars', JSON.stringify(updatedCarsArray));

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

        // Store the fuel recor
        const fuelRecordsArray = storedFuelRecords ? JSON.parse(storedFuelRecords) : [];
        fuelRecordsArray.push(newFuelRecord);
        await AsyncStorage.setItem(`fuel_${car.id}`, JSON.stringify(fuelRecordsArray));

        // Update car mileage
        car.mileage = mileageValue;
        const updatedCarsArray = car.map(c => c.id === car.id ? currentCar : c);
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

            <Button title="Save Fuel Record" onPress={addFuelRecord} />
        </View>
    );
};

export default AddFuelScreen;
