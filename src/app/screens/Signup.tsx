import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface FormData {
    userType: string;
    staffId?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToPolicy: boolean;
}

interface FormErrors {
    userType?: string;
    staffId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreeToPolicy?: string;
}

const Signup: React.FC = ({ navigation }: any) => {
    const [formData, setFormData] = useState<FormData>({
        userType: "",
        staffId: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToPolicy: false,
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [text, setText] = useState<string>("Sign Up");

    const regex = {
        name: /^[A-Za-z\s]+$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
    };

    const handleChange = (name: keyof FormData, value: any) => {
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const errors: FormErrors = {};
        let isValid = true;

        if (!formData.userType) {
            errors.userType = "Please select a user type.";
            isValid = false;
        }

        if (formData.userType === "Staff" && !formData.staffId?.trim()) {
            errors.staffId = "Staff ID is required for staff users.";
            isValid = false;
        }

        if (!formData.firstName || !regex.name.test(formData.firstName)) {
            errors.firstName = "First name should only contain letters.";
            isValid = false;
        }

        if (!formData.lastName || !regex.name.test(formData.lastName)) {
            errors.lastName = "Last name should only contain letters.";
            isValid = false;
        }

        if (!formData.email || !regex.email.test(formData.email)) {
            errors.email = "Please enter a valid email.";
            isValid = false;
        }

        if (!formData.password || !regex.password.test(formData.password)) {
            errors.password =
                "Password must be at least 6 characters and include uppercase, lowercase, and number.";
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }

        if (!formData.agreeToPolicy) {
            errors.agreeToPolicy = "You must agree to the privacy policy.";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = () => {
        // if (!validate()) return;

        setText("Creating your D'roid Account...");

        // Simulate API call
        setTimeout(() => {
            Alert.alert("Success", "Account created successfully!");
            setText("Sign Up");
            navigation.navigate("BottomTabs"); // redirect to home/dashboard
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingVertical: 40, paddingBottom: 120 }}
            >
                <Text style={styles.header}>Join the D'roid Community</Text>
                <Text style={styles.subtext}>
                    Connect with other developers. Learn, collaborate, and build amazing
                    things!
                </Text>

                {/* User Type */}
                <View style={styles.fieldContainer}>
                    <Picker
                        selectedValue={formData.userType}
                        onValueChange={(value) => handleChange("userType", value)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select User Type" value="" />
                        <Picker.Item label="Staff" value="Staff" />
                        <Picker.Item label="Member" value="Member" />
                    </Picker>
                    {formErrors.userType && (
                        <Text style={styles.errorText}>{formErrors.userType}</Text>
                    )}
                </View>

                {/* Staff ID */}
                {formData.userType === "Staff" && (
                    <View style={styles.fieldContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Staff ID"
                            value={formData.staffId}
                            onChangeText={(value) => handleChange("staffId", value)}
                        />
                        {formErrors.staffId && (
                            <Text style={styles.errorText}>{formErrors.staffId}</Text>
                        )}
                    </View>
                )}

                {/* First Name */}
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={formData.firstName}
                        onChangeText={(value) => handleChange("firstName", value)}
                    />
                    {formErrors.firstName && (
                        <Text style={styles.errorText}>{formErrors.firstName}</Text>
                    )}
                </View>

                {/* Last Name */}
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChangeText={(value) => handleChange("lastName", value)}
                    />
                    {formErrors.lastName && (
                        <Text style={styles.errorText}>{formErrors.lastName}</Text>
                    )}
                </View>

                {/* Email */}
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={formData.email}
                        onChangeText={(value) => handleChange("email", value)}
                    />
                    {formErrors.email && (
                        <Text style={styles.errorText}>{formErrors.email}</Text>
                    )}
                </View>

                {/* Password */}
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(value) => handleChange("password", value)}
                    />
                    {formErrors.password && (
                        <Text style={styles.errorText}>{formErrors.password}</Text>
                    )}
                </View>

                {/* Confirm Password */}
                <View style={styles.fieldContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={formData.confirmPassword}
                        onChangeText={(value) => handleChange("confirmPassword", value)}
                    />
                    {formErrors.confirmPassword && (
                        <Text style={styles.errorText}>{formErrors.confirmPassword}</Text>
                    )}
                </View>

                {/* Agree to Policy */}
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        onPress={() =>
                            handleChange("agreeToPolicy", !formData.agreeToPolicy)
                        }
                        style={styles.checkbox}
                    >
                        {formData.agreeToPolicy && <View style={styles.checked} />}
                    </TouchableOpacity>
                    <Text style={styles.checkboxText}>
                        I agree to the{" "}
                        <Text style={styles.link}>Terms & Conditions</Text> and{" "}
                        <Text style={styles.link}>Privacy Policy</Text>
                    </Text>
                </View>
                {formErrors.agreeToPolicy && (
                    <Text style={styles.errorText}>{formErrors.agreeToPolicy}</Text>
                )}
            </ScrollView>

            {/* Submit Button fixed at bottom */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>{text}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#000105", // White background
    },
    header: {
        fontSize: 28,
        fontWeight: "700",
        color: "#ffffff", // Primary color
        marginBottom: 8,
        textAlign: "center",
    },
    subtext: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginBottom: 20,
    },
    fieldContainer: {
        marginBottom: 15,
    },
    input: {
        width: "100%",
        padding: 12,
        borderRadius: 5,
        backgroundColor: "#C7D2FE",
        borderWidth: 1,
        borderColor: "#C7D2FE",
        color: "#000000"
    },
    picker: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    errorText: {
        color: "#FF6F61",
        fontSize: 12,
        marginTop: 4,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 4,
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    checked: {
        width: 14,
        height: 14,
        backgroundColor: "#182b90", // Primary color
        borderRadius: 2,
    },
    checkboxText: {
        flex: 1,
        fontSize: 14,
        color: "#555",
    },
    link: {
        color: "#479BE8",
        textDecorationLine: "underline",
    },
    bottomButtonContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
    },
    button: {
        backgroundColor: "#C7D2FE", // Primary color button
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