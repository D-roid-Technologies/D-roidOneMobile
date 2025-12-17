import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestListScreen from './takeTest/TestListScreen';
import TestDetailScreen from './takeTest/TestDetailScreen';
import QuizScreen from './takeTest/QuizScreen';

const Stack = createNativeStackNavigator();

const TakeTestsScreen: React.FC = () => {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false,
                contentStyle: { backgroundColor: '#f3f4f6' }
            }}
            initialRouteName="TestListScreen"
        >
            <Stack.Screen name="TestListScreen" component={TestListScreen} />
            <Stack.Screen name="TestDetailScreen" component={TestDetailScreen} />
            <Stack.Screen name="QuizScreen" component={QuizScreen} />
        </Stack.Navigator>
    );
};

export default TakeTestsScreen;
