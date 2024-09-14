// src/styles/RecordFuelScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    input: {
        height: 50,
        borderColor: '#6200ee',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        backgroundColor: '#6200ee',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    carInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#6200ee',
    },
    carDetails: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: '#333',
    },
});

export default styles;
