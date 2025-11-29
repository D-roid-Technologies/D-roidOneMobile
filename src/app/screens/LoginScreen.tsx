import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator, // Kept for showing loading state on the button
    KeyboardAvoidingView, // New for keyboard management
    Platform, // New for platform-specific behavior
    ScrollView, // New for scrollable content
} from "react-native";
// Switched to Ionicons as requested in the structure
import { Ionicons } from "@expo/vector-icons";
// Use React Navigation's hook
import { useNavigation } from "@react-navigation/native";

// Assuming these paths are correct in your RN project structure
import { authService } from "../redux/configuration/auth.service";

const MemberLogin = ({ navigation }: any) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState<{
        email?: string;
        password?: string;
    }>({});
    // Use 'Login' as the initial text, and handle loading with a boolean or the text state
    const [text, setText] = useState<string>("Login");
    const isStaff = false;

    // 2. Updated handleChange for RN TextInput pattern, now accepts string for name
    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let errors: any = {};
        let isValid = true;

        if (!formData.email.trim()) {
            errors.email = "Member ID is required.";
            isValid = false;
        }

        if (!formData.password) {
            errors.password = "Password is required.";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    // 3. Updated handleSubmit for RN onPress handler
    const handleSubmitMember = async () => {
        if (!validate()) return;
        setText("Verifying your credentials...");

        try {
            await authService.handleUserLogin(
                formData.email,
                formData.password,
                isStaff
            );
            setText("Fetching your information...");

            // 4. Use navigation.replace() for React Navigation
            // Ensure RoutePaths.DashBoard is defined and correct
            navigation.navigate("BottomTabs");
        } catch {
            setText("Login");
        }
    };

    const isSubmitting = text !== "Login";

    return (
        <KeyboardAvoidingView
            // Use padding behavior for iOS when keyboard shows up
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: styles.container.backgroundColor }}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    // Mapped 'Signup' to your existing RoutePaths constant
                    onPress={() => navigation.navigate("-1")}
                    disabled={isSubmitting}
                >
                    <Ionicons name="arrow-back" size={20} color="#ffffff" />
                    <Text style={styles.backText}>Back to Sign Up</Text>
                </TouchableOpacity>

                {/* Icon (Updated to use Ionicons and themed color) */}
                <View style={styles.iconContainer}>
                    <Ionicons name="person-circle-outline" size={80} color="#C7D2FE" />
                </View>

                {/* Title & Subtext */}
                <Text style={styles.title}>Member Login</Text>
                <Text style={styles.subtext}>Welcome back! Please login to your account.</Text>

                {/* Email Input */}
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            formErrors.email && { borderColor: '#FF6F61' } // Error border color from new styles
                        ]}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#777" // Placeholder contrast on dark background
                        value={formData.email}
                        onChangeText={(value) => handleChange("email", value)}
                        editable={!isSubmitting}
                    />
                    {formErrors.email && (
                        <Text style={styles.errorText}>{formErrors.email}</Text>
                    )}
                </View>

                {/* Password Input */}
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            formErrors.password && { borderColor: '#FF6F61' }
                        ]}
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#777"
                        value={formData.password}
                        onChangeText={(value) => handleChange("password", value)}
                        editable={!isSubmitting}
                    />
                    {formErrors.password && (
                        <Text style={styles.errorText}>{formErrors.password}</Text>
                    )}
                </View>

                {/* Login Button */}
                <TouchableOpacity
                    style={[styles.button, isSubmitting && { opacity: 0.6 }]}
                    onPress={handleSubmitMember}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        // Activity indicator color matches the button text color in the new theme
                        <ActivityIndicator color={styles.buttonText.color} />
                    ) : (
                        <Text style={styles.buttonText}>{text}</Text>
                    )}
                </TouchableOpacity>

                {/* Forgot Password Link */}
                <TouchableOpacity
                    style={styles.forgotPassword}
                    // onPress={() => navigation.navigate(RoutePaths.ForgotPassword as never)}
                    disabled={isSubmitting}
                >
                    <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// Styles adopted from your new structure for the dark theme
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
        backgroundColor: "#000105", // Very dark background
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    backText: {
        color: "#ffffff",
        fontSize: 16,
        marginLeft: 6,
        fontWeight: "500",
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 8,
    },
    subtext: {
        fontSize: 16,
        color: "#555555",
        textAlign: "center",
        marginBottom: 30,
    },
    fieldContainer: {
        marginBottom: 15,
    },
    input: {
        width: "100%",
        padding: 12,
        borderRadius: 5,
        backgroundColor: "#C7D2FE", // Light blue input background
        borderWidth: 1,
        borderColor: "#C7D2FE",
        color: "#000105", // Dark text in light input
    },
    errorText: {
        color: "#FF6F61",
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        backgroundColor: "#C7D2FE", // Primary color button
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#000105", // Dark text on light button
        fontSize: 16,
        fontWeight: "700",
    },
    forgotPassword: {
        marginTop: 20,
        alignItems: "center",
    },
    link: {
        color: "#479BE8", // Link blue
        fontSize: 15,
        textDecorationLine: "underline",
    },
});

export default MemberLogin;