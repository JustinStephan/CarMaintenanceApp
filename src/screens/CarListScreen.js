// screens/CarListScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; // For car icon and delete icon
import styles from '../styles/CarListScreenStyles'; // Import styles

const CarListScreen = ({ navigation }) => {
    const [cars, setCars] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchCars = async () => {
                const storedCars = await AsyncStorage.getItem('cars');
                if (storedCars) {
                    setCars(JSON.parse(storedCars));
                }
            };
            fetchCars();
        }, [])
    );

    const addCarHandler = () => {
        navigation.navigate('Add Car');
    };

    const deleteCarHandler = (id) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this car?",
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
        const updatedCars = cars.filter(car => car.id !== id);
        setCars(updatedCars);
        await AsyncStorage.setItem('cars', JSON.stringify(updatedCars));

        // Remove the associated maintenance records for the car
        await AsyncStorage.removeItem(`maintenance_${id}`);
    };

    const viewCarHandler = (car) => {
        navigation.navigate('Car Detail', { car });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Cars</Text>
            <TouchableOpacity style={styles.addButton} onPress={addCarHandler}>
                <Text style={styles.addButtonText}>Add Car</Text>
            </TouchableOpacity>
            <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <View style={styles.cardContent}>
                                <TouchableOpacity onPress={() => viewCarHandler(item)}>
                                    <View style={styles.carInfo}>
                                        <MaterialIcons name="directions-car" size={40} color="#6200ee" />
                                        <View style={styles.cardText}>
                                            <Text style={styles.carText}>{`${item.make} ${item.model}`}</Text>
                                            <Text style={styles.yearText}>{`Year: ${item.year}`}</Text>
                                            <Text style={styles.mileageText}>{`Mileage: ${item.mileage || 'N/A'}`}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => deleteCarHandler(item.id)}
                                >
                                    <MaterialIcons name="delete" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    );
};

export default CarListScreen;
