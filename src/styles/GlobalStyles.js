// src/styles/globalStyles.js
import { StyleSheet } from 'react-native';

const colors = {
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#f0f0f0',
    text: '#000',
    header: '#ffffff',
};

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
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
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    noteInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
    },
});

export { globalStyles, colors };
