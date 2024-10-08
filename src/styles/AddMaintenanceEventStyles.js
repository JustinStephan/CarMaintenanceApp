// src/styles/AddMaintenanceEventStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#6200ee',
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
    picker: {
        height: 50,
        borderColor: '#6200ee',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        color: '#333',
    },
    calendar: {
        marginVertical: 10,
        borderRadius: 8,
    },
    noteInput: {
        height: 100,
        borderColor: '#6200ee',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
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
});

export default styles;
