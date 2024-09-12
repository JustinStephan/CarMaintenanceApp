// screens/CarListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import styles from '../styles/CarListScreenStyles.js'; // Import styles

const CarListScreen = ({ navigation }) => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            const storedCars = await AsyncStorage.getItem('cars');
            if (storedCars) {
                setCars(JSON.parse(storedCars));
            }
        };
        fetchCars();
    }, []);

    const addCarHandler = () => {
        navigation.navigate('Add Car');
    };

    const viewCarHandler = (car) => {
        navigation.navigate('Car Detail', { car });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Cars</Text>
            <Button title="Add Car" onPress={addCarHandler} color="#6200ee" />
            <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => viewCarHandler(item)}>
                        <Card style={styles.card}>
                            <Card.Content>
                                <View style={styles.cardContent}>
                                    <MaterialIcons name="directions-car" size={24} color="#6200ee" />
                                    <View style={styles.cardText}>
                                        <Text style={styles.carText}>{`${item.make} ${item.model}`}</Text>
                                        <Text style={styles.yearText}>{`Year: ${item.year}`}</Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default CarListScreen;
