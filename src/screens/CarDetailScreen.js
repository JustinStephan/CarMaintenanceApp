// screens/CarDetailScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, Button, Alert, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import styles from '../styles/CarDetailScreenStyles';

const CarDetailScreen = ({ route, navigation }) => {
    const { car: initialCarData } = route.params;
    const [car, setCar] = useState(initialCarData);
    const [fuelRecords, setFuelRecords] = useState(car.fuelRecords ? car.fuelRecords : []);
    const [maintenanceRecords, setMaintenanceRecords] = useState(car.maintenanceRecords ? car.maintenanceRecords : []);
    const [averageMPG, setAverageMPG] = useState(null);
    const [averageFuelCost, setAverageFuelCost] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'maintenance', 'fuel'

    // Fetch and update the car data (e.g., mileage) when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            const fetchUpdatedCarData = async () => {
                const storedCars = await AsyncStorage.getItem('cars');
                const carsArray = storedCars ? JSON.parse(storedCars) : [];
                const updatedCar = carsArray.find(c => c.id === car.id);
                if (updatedCar) {
                    setCar(updatedCar); // Update the car data in state
                }
            };

            fetchUpdatedCarData();
        }, [car.id])
    );

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

    //TODO i dont think this works anymore
    const handleDelete = async (id) => {
        const updatedEvents = maintenanceRecords.filter(event => event.id !== id);
        setMaintenanceRecords(updatedEvents);
        await AsyncStorage.setItem(`maintenance_${car.id}`, JSON.stringify(updatedEvents));
    };

    const totalLifetimeCost = maintenanceRecords.reduce((acc, event) => acc + (parseFloat(event.cost) || 0), 0);

    const currentYear = new Date().getFullYear();
    const totalCurrentYearCost = maintenanceRecords.reduce((acc, event) => {
        const eventDate = new Date(event.date);
        if (eventDate.getFullYear() === currentYear) {
            return acc + (parseFloat(event.cost) || 0);
        }
        return acc;
    }, 0);

    const validCosts = maintenanceRecords.map(event => parseFloat(event.cost)).filter(cost => cost > 0);
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

    const combinedRecords = [
        ...maintenanceRecords.map(record => ({ ...record, type: 'maintenance' })),
        ...fuelRecords.map(record => ({ ...record, type: 'fuel' })),
    ];

    const filteredRecords = filter === 'all'
        ? combinedRecords
        : combinedRecords.filter(record => record.type === filter);

    const renderEvent = ({ item }) => (
        <View style={styles.eventCard}>
            <Text>{item.fuelRecords}</Text>
            <Text style={styles.eventType}>{item.type === 'maintenance' ? 'Maintenance Performed' : 'Fuel Added'}</Text>
            <Text style={styles.eventDate}>Date: {item.date}</Text>
            <Text>{item.type === 'maintenance' ? `Description: ${item.type}` : `Fuel: ${item.fuelAmount} gallons`}</Text>
            {item.mileage && <Text>Mileage: {item.mileage}</Text>}
            {item.costPerGallon && <Text>Cost Per Gallon: ${item.costPerGallon}</Text>}
            <View style={styles.buttonContainer}>
                <Button title="Edit" style={styles.buttonText} onPress={() => editEventHandler(item)} />
                <Button title="Delete" style={styles.buttonText} onPress={() => deleteEventHandler(item.id)} color="red" />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Car Details</Text>
            <Text>Make: {car.make}</Text>
            <Text>Model: {car.model}</Text>
            <Text>Year: {car.year}</Text>
            <Text>Mileage: {car.mileage}</Text>

            <Text>Total Lifetime Maintenance Cost: ${totalLifetimeCost > 0 ? totalLifetimeCost.toFixed(2) : '$0.00'}</Text>
            <Text>Total Current Year Maintenance Cost: ${totalCurrentYearCost > 0 ? totalCurrentYearCost.toFixed(2) : '$0.00'}</Text>
            <Text>Average Monthly Cost: ${averageMonthlyCost}</Text>
            <Text>Average MPG: {averageMPG || 'N/A'}</Text>
            <Text>Average Fuel Cost: ${averageFuelCost}</Text>

            <Button title="Add Maintenance Event" style={styles.button} onPress={() => navigation.navigate('Add Maintenance Event', { car })} />
            <Button title="Record Fuel Fill-Up" style={styles.button} onPress={() => navigation.navigate('Record Fuel Fill-Up', { car })} />

            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
                <TouchableOpacity style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]} onPress={() => setFilter('all')}>
                    <Text style={styles.filterButtonText}>All Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, filter === 'maintenance' && styles.filterButtonActive]} onPress={() => setFilter('maintenance')}>
                    <Text style={styles.filterButtonText}>Maintenance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, filter === 'fuel' && styles.filterButtonActive]} onPress={() => setFilter('fuel')}>
                    <Text style={styles.filterButtonText}>Fuel</Text>
                </TouchableOpacity>
            </View>

            {/* Event List */}
            <FlatList
                data={filteredRecords}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderEvent}
                contentContainerStyle={styles.eventList}
            />

            {/*<FlatList*/}
            {/*    data={maintenanceRecords}*/}
            {/*    keyExtractor={(item) => item.id}*/}
            {/*    renderItem={({ item, index }) => (*/}
            {/*        <View style={[styles.record, { backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff' }]}>*/}
            {/*            <Text style={styles.recordText}>{item.type}</Text>*/}
            {/*            <Text style={styles.recordText}>Date: {item.date}</Text>*/}
            {/*            <Text style={styles.recordText}>Cost: ${item.cost ? item.cost.toFixed(2) : '$0.00'}</Text>*/}
            {/*            <Text style={styles.recordText}>Mileage: {item.mileage}</Text>*/}
            {/*            <Text style={styles.recordText}>Notes: {item.note}</Text>*/}
            {/*            <View style={styles.buttonContainer}>*/}
            {/*                <Button title="Edit" style={buttonStyles.buttonText} onPress={() => editEventHandler(item)} />*/}
            {/*                <Button title="Delete" style={buttonStyles.buttonText} onPress={() => deleteEventHandler(item.id)} color="red" />*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    )}*/}
            {/*/>*/}
        </View>
    );
};

export default CarDetailScreen;
