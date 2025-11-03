import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

// Import your screens
import WelcomeScreen from "../screens/WelcomeScreen";
import AboutScreen from "../screens/AboutScreen";
import SettingsScreen from "../screens/SettingsScreen";
import OnboardingScreen from "../screens/OnboardingScreen"
import Signup from "../screens/Signup";
import LoginScreen from "../screens/LoginScreen";
import BottomTabs from "../screens/BottomTabs";

const Stack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.container}>
                <Stack.Navigator
                    initialRouteName="Onboarding"
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen
                        name="Onboarding"
                        component={OnboardingScreen}
                    />
                    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                    <Stack.Screen name="About" component={AboutScreen} />
                    <Stack.Screen name="Settings" component={SettingsScreen} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="BottomTabs" component={BottomTabs} />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default RootNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});