// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CarListScreen from '../screens/CarListScreen';
import CarDetailScreen from '../screens/CarDetailScreen';
import AddMaintenanceEvent from '../screens/AddMaintenanceEvent';
import RecordFuelScreen from '../screens/RecordFuelScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Car List">
            <Stack.Screen
                name="Car List"
                component={CarListScreen}
                options={{ title: 'My Cars' }} // Customize screen title
            />
            <Stack.Screen
                name="Car Detail"
                component={CarDetailScreen}
                options={({ route }) => ({ title: route.params.car.make + ' ' + route.params.car.model })} // Dynamic title based on car
            />
            <Stack.Screen
                name="Add Maintenance Event"
                component={AddMaintenanceEvent}
                options={{ title: 'Add Maintenance Event' }}
            />
            <Stack.Screen
                name="Record Fuel Fill-Up"
                component={RecordFuelScreen}
                options={{ title: 'Record Fuel Fill-Up' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
