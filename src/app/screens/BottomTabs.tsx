// src/screens/UserDashboard.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../../app/screens/HomeScreen";
import ServicesScreen from "./membersActions/Services/ServicesScreen";
import CareersScreen from "./membersActions/Careers/CareersScreen";
import ExploreMoreAppsScreen from "./ExploreMoreAppsScreen";

const Tab = createBottomTabNavigator();

const UserDashboard: React.FunctionComponent = () => {
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
                        case "Services":
                            iconName = "construct";
                            break;
                        case "Careers":
                            iconName = "briefcase";
                            break;
                        case "More":
                            iconName = "ellipsis-horizontal";
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Services" component={ServicesScreen} />
            <Tab.Screen name="Careers" component={CareersScreen} />
            <Tab.Screen name="More" component={ExploreMoreAppsScreen} />
        </Tab.Navigator>
    );
}

export default UserDashboard