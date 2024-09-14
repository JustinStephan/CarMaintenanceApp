// screens/CarDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // For refetching data when screen is focused
import styles from '../styles/CarDetailScreenStyles';
import buttonStyles from '../styles/ButtonStyles';

const CarDetailScreen = ({ route, navigation }) => {
    const { car } = route.params;
    const [fuelRecords, setFuelRecords] = useState([]);
    const [maintenanceEvents, setMaintenanceEvents] = useState([]);
    const [averageMPG, setAverageMPG] = useState(null);
    const [averageFuelCost, setAverageFuelCost] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const fetchRecords = async () => {
                const storedFuelRecords = await AsyncStorage.getItem(`fuel_${car.id}`);
                if (storedFuelRecords) {
                    setFuelRecords(JSON.parse(storedFuelRecords));
                }

                const storedEvents = await AsyncStorage.getItem(`maintenance_${car.id}`);
                if (storedEvents) {
                    setMaintenanceEvents(JSON.parse(storedEvents));
                }
            };

            fetchRecords();
        }, [car.id])
    );

    const addEventHandler = () => {
        navigation.navigate('Add Maintenance Event', { car });
    };


    const editEventHandler = (event) => {
        navigation.navigate('Add Maintenance Event', { car, event });
    };

    const deleteEventHandler = (id) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this maintenance record?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => handleDelete(id)
                }
            ]
        );
    };

    const handleDelete = async (id) => {
        const updatedEvents = maintenanceEvents.filter(event => event.id !== id);
        setMaintenanceEvents(updatedEvents);
        await AsyncStorage.setItem(`maintenance_${car.id}`, JSON.stringify(updatedEvents));
    };

    const totalLifetimeCost = maintenanceEvents.reduce((acc, event) => acc + (parseFloat(event.cost) || 0), 0);

    const currentYear = new Date().getFullYear();
    const totalCurrentYearCost = maintenanceEvents.reduce((acc, event) => {
        const eventDate = new Date(event.date);
        if (eventDate.getFullYear() === currentYear) {
            return acc + (parseFloat(event.cost) || 0);
        }
        return acc;
    }, 0);

    const validCosts = maintenanceEvents.map(event => parseFloat(event.cost)).filter(cost => cost > 0);
    const averageMonthlyCost = validCosts.length > 0
        ? (totalLifetimeCost / validCosts.length).toFixed(2)
        : '0.00';



    // Calculate average MPG and average fuel cost per gallon
    useEffect(() => {
        if (fuelRecords.length > 1) {
            let totalMiles = 0;
            let totalFuel = 0;
            let totalCost = 0;
            let totalCostEntries = 0;

            for (let i = 1; i < fuelRecords.length; i++) {
                const prevRecord = fuelRecords[i - 1];
                const currentRecord = fuelRecords[i];

                const milesDriven = currentRecord.mileage - prevRecord.mileage;
                totalMiles += milesDriven;
                totalFuel += currentRecord.fuelAmount;

                if (currentRecord.costPerGallon) {
                    totalCost += currentRecord.costPerGallon * currentRecord.fuelAmount;
                    totalCostEntries++;
                }
            }

            const avgMPG = totalMiles / totalFuel;
            const avgFuelCost = totalCostEntries > 0 ? totalCost / totalFuel : null;

            setAverageMPG(avgMPG.toFixed(2));
            setAverageFuelCost(avgFuelCost ? avgFuelCost.toFixed(2) : 'N/A');
        }
    }, [fuelRecords]);

    const addFuelRecordHandler = () => {
        navigation.navigate('Record Fuel Fill-Up', { car });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Car Details</Text>
            <Text>Make: {car.make}</Text>
            <Text>Model: {car.model}</Text>
            <Text>Year: {car.year}</Text>

            <Text>Total Lifetime Maintenance Cost: ${totalLifetimeCost > 0 ? totalLifetimeCost.toFixed(2) : '$0.00'}</Text>
            <Text>Total Current Year Maintenance Cost: ${totalCurrentYearCost > 0 ? totalCurrentYearCost.toFixed(2) : '$0.00'}</Text>
            <Text style={styles.averageCost}>Average Monthly Cost: ${averageMonthlyCost}</Text>
            <Text>Average MPG: {averageMPG || 'N/A'}</Text>
            <Text>Average Fuel Cost: ${averageFuelCost}</Text>

            <Button title="Add Maintenance Event" style={styles.button} onPress={() => navigation.navigate('Add Maintenance Event', { car })} />
            <Button title="Record Fuel Fill-Up" style={styles.button} onPress={addFuelRecordHandler} />

            <FlatList
                data={maintenanceEvents}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={[styles.record, { backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff' }]}>
                        <Text style={styles.recordText}>{item.type}</Text>
                        <Text style={styles.recordText}>Date: {item.date}</Text>
                        <Text style={styles.recordText}>Cost: ${item.cost ? item.cost.toFixed(2) : '$0.00'}</Text>
                        <Text style={styles.recordText}>Mileage: {item.mileage}</Text>
                        <Text style={styles.recordText}>Notes: {item.note}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Edit" style={buttonStyles.buttonText} onPress={() => editEventHandler(item)} />
                            <Button title="Delete" style={buttonStyles.buttonText} onPress={() => deleteEventHandler(item.id)} color="red" />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default CarDetailScreen;
