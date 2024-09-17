// src/styles/CarDetailScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    carInfo: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    filterButton: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 20,
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
    },
    filterButtonActive: {
        backgroundColor: '#6200ee',
        borderColor: '#6200ee',
    },
    filterButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginVertical: 10,
    },
    eventList: {
        paddingBottom: 20,
    },
    eventCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    averageText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
        color: '#6200ee',
    },
    eventType: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6200ee',
        marginBottom: 5,
    },
    eventDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    actionButton: {
        backgroundColor: '#6200ee',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    recordContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginVertical: 5,
    }
});

export default styles;
