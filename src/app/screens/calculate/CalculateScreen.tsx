import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalculateListScreen from "./CalculateListScreen";
import BasicCalculatorScreen from "./BasicCalculatorScreen";
import BMICalculatorScreen from "./BMICalculatorScreen";

const Stack = createNativeStackNavigator();

const CalculateScreen: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#000105" },
            }}
            initialRouteName="CalculateList"
        >
            <Stack.Screen name="CalculateList" component={CalculateListScreen} />
            <Stack.Screen name="BasicCalculator" component={BasicCalculatorScreen} />
            <Stack.Screen name="BMICalculator" component={BMICalculatorScreen} />
        </Stack.Navigator>
    );
};

export default CalculateScreen;
