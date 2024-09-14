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
        color: '#6200ee',
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
    },
    buttonContainer: {
        marginVertical: 10,
    },
    averageText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
        color: '#6200ee',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#6200ee',
    },
    recordText: {
        fontSize: 16,
        color: '#333',
    },
    recordContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginVertical: 5,
    },
});

export default styles;
