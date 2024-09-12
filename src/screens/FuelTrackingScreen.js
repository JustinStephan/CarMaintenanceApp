// screens/FuelTrackingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { globalStyles } from '../styles/GlobalStyles.js';

const FuelTrackingScreen = ({ navigation, route }) => {
    const { car } = route.params;
    const [fuelEntries, setFuelEntries] = useState([]);
    const [amount, setAmount] = useState('');
    const [cost, setCost] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const fetchFuelEntries = async () => {
            const storedEntries = await AsyncStorage.getItem(`fuel_${car.id}`);
            if (storedEntries) {
                setFuelEntries(JSON.parse(storedEntries));
            }
        };
        fetchFuelEntries();
    }, [car.id]);

    const addFuelEntryHandler = async () => {
        const newEntry = { id: uuid.v4(), amount, cost, date };
        const storedEntries = await AsyncStorage.getItem(`fuel_${car.id}`);
        const entriesArray = storedEntries ? JSON.parse(storedEntries) : [];
        entriesArray.push(newEntry);
        await AsyncStorage.setItem(`fuel_${car.id}`, JSON.stringify(entriesArray));
        setFuelEntries(entriesArray);
    };

    const totalCost = fuelEntries.reduce((acc, entry) => acc + parseFloat(entry.cost), 0);

    return (
        <View style={globalStyles}>
            <Text>Total Fuel Cost: ${totalCost}</Text>
            <TextInput placeholder="Amount (liters)" onChangeText={setAmount} keyboardType="numeric" />
            <TextInput placeholder="Cost" onChangeText={setCost} keyboardType="numeric" />
            <TextInput placeholder="Date" onChangeText={setDate} />
            <Button title="Add Fuel Entry" onPress={addFuelEntryHandler} />
            <FlatList
                data={fuelEntries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.amount} liters - ${item.cost} on {item.date}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default FuelTrackingScreen;
