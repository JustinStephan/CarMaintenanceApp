// screens/AddCarScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const AddCarScreen = ({ navigation }) => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [mileage, setMileage] = useState('');

    const addCarHandler = async () => {
        const newCar = { id: uuid.v4(), make, model, year: parseInt(year), mileage: parseInt(mileage) };
        const existingCars = await AsyncStorage.getItem('cars');
        const carsArray = existingCars ? JSON.parse(existingCars) : [];
        carsArray.push(newCar);
        await AsyncStorage.setItem('cars', JSON.stringify(carsArray));
        navigation.goBack();
    };

    return (
        <View>
            <TextInput placeholder="Make" onChangeText={setMake} />
            <TextInput placeholder="Model" onChangeText={setModel} />
            <TextInput placeholder="Year" keyboardType="numeric" onChangeText={setYear} />
            <TextInput placeholder="Mileage" keyboardType="numeric" onChangeText={setMileage} />
            <Button title="Save Car" onPress={addCarHandler} />
        </View>
    );
};

export default AddCarScreen;
