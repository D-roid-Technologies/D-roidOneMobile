import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { authService } from "../redux/configuration/auth.service";

const ForgotPassword = ({ navigation }: any) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [text, setText] = useState("Reset Password");

    const isSubmitting = text !== "Reset Password";

    const handleSubmit = async () => {
        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        setError(null);
        setText("Sending reset link...");

        try {
            await authService.handleForgotPassword(email);

            setTimeout(() => {
                navigation.goBack();
            }, 1500);
        } catch (err) {
            setText("Reset Password");
            setError("Failed to send reset email. Please try again.");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: "#000105" }}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                {/* Back to Login */}
                <View style={styles.topLinksContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.loginLink}>Back to Login</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.subtext}>
                    Enter your email and we’ll send you a password reset link.
                </Text>

                {/* Email Field */}
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={[styles.input, error && { borderColor: "#FF6F61" }]}
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholderTextColor="#777"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        editable={!isSubmitting}
                    />
                    {error && <Text style={styles.errorText}>{error}</Text>}
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={[styles.button, isSubmitting && { opacity: 0.6 }]}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color={styles.buttonText.color} />
                    ) : (
                        <Text style={styles.buttonText}>{text}</Text>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    topLinksContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 30,
    },
    loginLink: {
        color: "#C7D2FE",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    iconContainer: {
        // alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#ffffff",
        marginBottom: 10,
    },
    subtext: {
        fontSize: 16,
        color: '#BAB8B8',
        marginBottom: 30,
    },
    fieldContainer: {
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 12,
        borderRadius: 5,
        backgroundColor: "#C7D2FE",
        borderWidth: 1,
        borderColor: "#C7D2FE",
        color: "#000105",
    },
    errorText: {
        color: "#FF6F61",
        fontSize: 12,
        marginTop: 4,
    },
    bottomButtonContainer: {
        padding: 20,
        paddingBottom: 30,
        backgroundColor: "#000105",
    },
    button: {
        backgroundColor: "#C7D2FE",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#000105",
        fontSize: 16,
        fontWeight: "700",
    },
});

export default ForgotPassword;
