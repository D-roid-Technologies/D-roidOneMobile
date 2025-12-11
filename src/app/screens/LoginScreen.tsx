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
import { authService } from "../redux/configuration/auth.service";

const MemberLogin: React.FunctionComponent = ({ navigation }: any) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState<{
        email?: string;
        password?: string;
    }>({});
    const [text, setText] = useState<string>("Login");
    const isStaff = false;
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

    const handleSubmitMember = async () => {
        if (!validate()) return;
        setText("Verifying your credentials...");

        try {
            await authService.handleUserLogin(
                formData.email,
                formData.password,
            );
            setText("Fetching your information...");
            navigation.navigate("BottomTabs");
        } catch {
            setText("Login");
        }
    };

    const isSubmitting = text !== "Login";

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: styles.container.backgroundColor }}
        >
            {/* Scrollable top content */}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.topLinksContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.loginLink}>Back to Signup</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.h2}>Let's Log you back in</Text>
                <Text style={styles.subtext}>Please login to your D'roid One account.</Text>

                {/* Email */}
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            formErrors.email && { borderColor: '#FF6F61' }
                        ]}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#777"
                        value={formData.email}
                        onChangeText={(value) => handleChange("email", value)}
                        editable={!isSubmitting}
                    />
                    {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}
                </View>

                {/* Password */}
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
                    {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={styles.forgotPassword} disabled={isSubmitting}>
                    <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Fixed bottom login button */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={[styles.button, isSubmitting && { opacity: 0.6 }]}
                    onPress={handleSubmitMember}
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
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
        backgroundColor: "#000105",
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
    topLinksContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
        marginBottom: 30,
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    h2: {
        fontSize: 30,
        fontWeight: '900',
        color: '#ffffff',
        marginBottom: 8,
    },
    loginLink: {
        color: '#C7D2FE',
        fontSize: 14,
        textDecorationLine: 'underline',
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
        color: '#BAB8B8',
        marginBottom: 20,
        fontWeight: "300"
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
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    bottomButtonContainer: {
        padding: 20,
        backgroundColor: "#000105",
    },
    buttonText: {
        color: "#000105",
        fontSize: 16,
        fontWeight: "700",
    },
    forgotPassword: {
        marginTop: 20,
    },
    link: {
        color: "#479BE8",
        fontSize: 15,
        textDecorationLine: "underline",
    },
});

export default MemberLogin;