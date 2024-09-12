// src/styles/CarDetailScreenStyles.js
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
    record: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    averageCost: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    totalCost: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    recordText: {
        fontSize: 16,
    },
});

export default styles;
