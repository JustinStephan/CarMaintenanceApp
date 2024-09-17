import { Alert } from 'react-native';

/**
 * Function to validate mileage and show an alert if the mileage is invalid.
 * @param {number} enteredMileage - Mileage entered by the user.
 * @param {number} currentMileage - The current stored mileage for the car.
 */
export const validateMileage = (enteredMileage, currentMileage) => {
    // Ensure the entered mileage is a valid number
    if (isNaN(enteredMileage)) {
        Alert.alert('Invalid Input', 'Please enter a valid number for the mileage.');
        return false;
    }

    // Check if entered mileage is less than the stored mileage
    if (enteredMileage < currentMileage) {
        Alert.alert(
            'Invalid Mileage',
            `The entered mileage (${enteredMileage}) is less than the current mileage (${currentMileage}).`,
            [{ text: 'OK' }]
        );
        return false; // Return false to indicate validation failure
    }

    // Mileage is valid
    return true; // Return true to indicate successful validation
};
