import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen: React.FC = ({ navigation }: any) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
    const [text, setText] = useState("Login");

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let errors: any = {};
        let isValid = true;

        if (!formData.email.trim()) {
            errors.email = "Email is required.";
            isValid = false;
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required.";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        setText("Verifying your credentials...");

        // Simulate authentication delay
        setTimeout(() => {
            if (formData.email === "test@example.com" && formData.password === "123456") {
                Alert.alert("Success", "Welcome back!");
                navigation.navigate("Dashboard");
            } else {
                Alert.alert("Error", "Invalid credentials.");
            }
            setText("Login");
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: "#F9F9F9" }}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Signup")}
                >
                    <Ionicons name="arrow-back" size={20} color="#071D6A" />
                    <Text style={styles.backText}>Back to Sign Up</Text>
                </TouchableOpacity>

                {/* Icon */}
                <View style={styles.iconContainer}>
                    <Ionicons name="person-circle-outline" size={80} color="#071D6A" />
                </View>

                {/* Title */}
                <Text style={styles.title}>Member Login</Text>
                <Text style={styles.subtext}>Welcome back! Please login to your account.</Text>

                {/* Email Input */}
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={formData.email}
                        onChangeText={(value) => handleChange("email", value)}
                    />
                    {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}
                </View>

                {/* Password Input */}
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(value) => handleChange("password", value)}
                    />
                    {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{text}</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => navigation.navigate("ForgotPassword")}
                >
                    <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
        backgroundColor: "#F9F9F9",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    backText: {
        color: "#071D6A",
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
        color: "#071D6A",
        textAlign: "center",
        marginBottom: 8,
    },
    subtext: {
        fontSize: 16,
        color: "#555",
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
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#CCCCCC",
    },
    errorText: {
        color: "#FF6F61",
        fontSize: 12,
        marginTop: 4,
    },
    button: {
        backgroundColor: "#203499", // Primary color
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    forgotPassword: {
        marginTop: 20,
        alignItems: "center",
    },
    link: {
        color: "#479BE8",
        fontSize: 15,
        textDecorationLine: "underline",
    },
});