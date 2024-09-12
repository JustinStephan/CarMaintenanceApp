// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CarListScreen from './src/screens/CarListScreen';
import FuelTrackingScreen from './src/screens/FuelTrackingScreen';
import AddCarScreen from './src/screens/AddCarScreen';
import CarDetailScreen from './src/screens/CarDetailScreen';
import AddMaintenanceEvent from './src/screens/AddMaintenanceEvent';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CarStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Car List" component={CarListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Car Detail" component={CarDetailScreen} />
            <Stack.Screen name="Add Maintenance Event" component={AddMaintenanceEvent} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Cars" component={CarStack} options={{ headerShown: false }} />
                <Tab.Screen name="Fuel Tracking" component={FuelTrackingScreen} />
                <Tab.Screen name="Add Car" component={AddCarScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
