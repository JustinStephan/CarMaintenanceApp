import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        marginVertical: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    calendar: {
        marginVertical: 10,
        borderRadius: 5,
        overflow: 'hidden',
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