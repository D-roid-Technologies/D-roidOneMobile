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
import NotificationScreen from "../screens/NotificationScreen";
import EventDescriptionScreen from "../screens/EventDescriptionScreen";
import ServicesScreen from "../screens/ServiceScreen";
import ProgressionScreen from "../screens/ProgressionScreen";
import CreateEventScreen from "../screens/schedles/CreateEventScreen";
import EventDetailScreen from "../screens/schedles/EventDetailScreen";
import ForgotPassword from "../screens/ForgotPassword";
import TermsAndConditions from "../screens/TermsAndConditions";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import AllEventsScreen from "../screens/AllEventsScreen";

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
                    <Stack.Screen name="Notifications" component={NotificationScreen} />
                    <Stack.Screen name="EventDescription" component={EventDescriptionScreen} />
                    <Stack.Screen name="Services" component={ServicesScreen} />
                    <Stack.Screen name="Progression" component={ProgressionScreen} />
                    <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
                    <Stack.Screen name="EventDetail" component={EventDetailScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="TAC" component={TermsAndConditions} />
                    <Stack.Screen name="PAP" component={PrivacyPolicyScreen} />
                    <Stack.Screen name="AllEventsScreen" component={AllEventsScreen} />
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