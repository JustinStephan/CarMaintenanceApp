// src/styles/CarListScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        marginVertical: 8,
        borderRadius: 8,
        elevation: 3,
        padding: 10,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    carInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardText: {
        marginLeft: 15,
    },
    carText: {
        fontSize: 18,
        fontWeight: '600',
    },
    yearText: {
        fontSize: 14,
        color: '#666',
    },
    mileageText: {
        fontSize: 14,
        color: '#666',
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 30,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#6200ee',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
