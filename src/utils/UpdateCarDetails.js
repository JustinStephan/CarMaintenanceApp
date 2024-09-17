import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Updates the car in the stored cars array in AsyncStorage and saves the updated list.
 * @param {Object} updatedCar - The car object with the updated information.
 * @returns {Promise<void>} - A promise that resolves when the car is updated and saved.
 */
export const updateCarInStorage = async (updatedCar) => {
    try {
        // Retrieve the existing list of cars from AsyncStorage
        const storedCars = await AsyncStorage.getItem('cars');
        const carsArray = storedCars ? JSON.parse(storedCars) : [];

        // Update the car in the array based on its id and save back to AsyncStorage
        const updatedCarsArray = carsArray.map(c => (c.id === updatedCar.id ? updatedCar : c));

        // Save the updated cars array back to AsyncStorage
        await AsyncStorage.setItem('cars', JSON.stringify(updatedCarsArray));

        console.log('Car updated successfully in storage.');
    } catch (error) {
        console.error('Error updating car in storage:', error);
    }
};
