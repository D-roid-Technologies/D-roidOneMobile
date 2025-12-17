import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToolboxListScreen from "./ToolboxListScreen";
import CropToolScreen from "./CropToolScreen";
import WordCounterScreen from "./WordCounterScreen";

const Stack = createNativeStackNavigator();

const ToolboxScreen: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#000105" },
            }}
            initialRouteName="ToolboxList"
        >
            <Stack.Screen name="ToolboxList" component={ToolboxListScreen} />
            <Stack.Screen name="CropTool" component={CropToolScreen} />
            <Stack.Screen name="WordCounter" component={WordCounterScreen} />
        </Stack.Navigator>
    );
};

export default ToolboxScreen;
