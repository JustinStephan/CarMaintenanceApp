// src/styles/ButtonStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#6200ee', // Button color
        padding: 15,
        borderRadius: 30, // Rounded corners
        alignItems: 'center',
        marginVertical: 10,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        // Shadow for Android
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
