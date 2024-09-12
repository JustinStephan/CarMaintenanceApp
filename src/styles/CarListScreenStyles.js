// styles/CarListScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        marginVertical: 8,
        borderRadius: 8,
        elevation: 3, // Shadow effect for Android
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardText: {
        marginLeft: 10,
    },
    carText: {
        fontSize: 18,
        fontWeight: '600',
    },
    yearText: {
        fontSize: 14,
        color: '#666',
    },
});

export default styles;
