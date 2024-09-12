// screens/CarDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import the useFocusEffect hook
import styles from '../styles/CarDetailScreenStyles'; // Import styles

const CarDetailScreen = ({ route, navigation }) => {
    const { car } = route.params;
    const [maintenanceEvents, setMaintenanceEvents] = useState([]);

    // Use useFocusEffect to re-fetch maintenance events when screen is focused
    useFocusEffect(
        React.useCallback(() => {
            const fetchMaintenanceEvents = async () => {
                const storedEvents = await AsyncStorage.getItem(`maintenance_${car.id}`);
                if (storedEvents) {
                    setMaintenanceEvents(JSON.parse(storedEvents));
                }
            };
            fetchMaintenanceEvents();
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Car Details</Text>
            <Text>Make: {car.make}</Text>
            <Text>Model: {car.model}</Text>
            <Text>Year: {car.year}</Text>
            <Text>Total Lifetime Maintenance Cost: ${totalLifetimeCost > 0 ? totalLifetimeCost.toFixed(2) : '$0.00'}</Text>
            <Text>Total Current Year Maintenance Cost: ${totalCurrentYearCost > 0 ? totalCurrentYearCost.toFixed(2) : '$0.00'}</Text>
            <Text style={styles.averageCost}>Average Monthly Cost: ${averageMonthlyCost}</Text>
            <Button title="Add Maintenance Event" onPress={addEventHandler} />

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
                            <Button title="Edit" onPress={() => editEventHandler(item)} />
                            <Button title="Delete" onPress={() => deleteEventHandler(item.id)} color="red" />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default CarDetailScreen;
