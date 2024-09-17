// navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CarListScreen from '../screens/CarListScreen';
import CarDetailScreen from '../screens/CarDetailScreen';
import AddMaintenanceScreen from '../screens/AddMaintenanceScreen';
import AddFuelScreen from '../screens/AddFuelScreen';

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
                component={AddMaintenanceScreen}
                options={{ title: 'Add Maintenance Event' }}
            />
            <Stack.Screen
                name="Record Fuel Fill-Up"
                component={AddFuelScreen}
                options={{ title: 'Record Fuel Fill-Up' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
