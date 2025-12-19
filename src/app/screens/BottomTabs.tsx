// src/screens/UserDashboard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../../app/screens/HomeScreen";
import SchedulesScreen from "../screens/schedles/SchedulesScreen";
import ToolboxsScreen from "../screens/toolbox/ToolboxScreen";
import CalculatorsScreen from "../screens/calculate/CalculateScreen";

const Tab = createBottomTabNavigator();

const CalculateScreen = () => (
    <View style={styles.center}>
        <Text style={styles.title}>🧮 Calculate</Text>
        <Text style={styles.subtitle}>Access tools for estimates and computations</Text>
    </View>
);


export default function UserDashboard() {
    return (
        <Tab.Navigator
            screenOptions={({ route }: any) => ({
                headerShown: false,
                tabBarActiveTintColor: "#C7D2FE",
                tabBarInactiveTintColor: "#999",
                tabBarStyle: {
                    backgroundColor: "#000105",
                    borderTopWidth: 0,
                    borderColor: "#eee",
                    paddingBottom: 5,
                    height: 60,
                },
                tabBarIcon: ({ color, size }: any) => {
                    let iconName: any;

                    switch (route.name) {
                        case "Home":
                            iconName = "home";
                            break;
                        case "Schedules":
                            iconName = "calendar";
                            break;
                        case "Calculate":
                            iconName = "calculator";
                            break;
                        case "Toolbox":
                            return <FontAwesome5 name="toolbox" size={size} color={color} />;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Schedules" component={SchedulesScreen} />
            <Tab.Screen name="Calculate" component={CalculatorsScreen} />
            <Tab.Screen name="Toolbox" component={ToolboxsScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#071D6A",
        textAlign: "center",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
    },
});