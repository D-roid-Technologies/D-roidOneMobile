import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform, // Using RN Alert for simple messages instead of Toast
} from "react-native";
import { useSelector } from "react-redux";
import { authService } from "../redux/configuration/auth.service";
import { RootState, store } from "../redux/store";
import { addLocation } from "../redux/slice/location";

// Placeholder for Redux RootState/LocationState (Simulated)
interface UserLocation {
    latitude: number;
    longitude: number;
    countryName: string;
}

const Toast = {
    show: (config: { type: 'success' | 'error', text1: string, text2: string }) => {
        Alert.alert(config.text1, config.text2);
    }
}

const Geolocation = {
    getCurrentPosition: (success: (res: any) => void, error: (err: any) => void, options: any) => {
        setTimeout(() => {
            success({
                coords: { latitude: 34.0522, longitude: -118.2437 }, // Example L.A. coordinates
            });
        }, 100);
    },
};

const AntDesign = {
    name: (iconName: string, size: number, color: string) => {
        return <Text style={{ fontSize: size, color: color, marginRight: 5 }}>{iconName === 'arrowleft' ? '←' : '✓'}</Text>;
    }
};

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

const RoutePaths = {
    DashBoard: 'DashboardScreen',
    StaffLogin: 'StaffLoginScreen',
    MemberLogin: 'MemberLoginScreen',
    TermsAndCondition: 'TermsScreen',
    PrivacyPolicy: 'PrivacyScreen',
    ForgotPassword: 'ForgotPasswordScreen',
};

const regex = {
    name: /^[A-Za-z\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/,
};

const generateUniqueId = (userType: string): string | null => {
    const prefix = "DT-";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";

    for (let i = 0; i < 5; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    let suffix = "";
    const lowerType = userType.toLowerCase();

    if (lowerType === "organisation") {
        suffix = "O";
    } else if (lowerType === "member") {
        suffix = "M";
    } else {
        return null; // Return null for invalid type
    }

    return `${prefix}${randomPart}-${suffix}`;
};


const SignUp: React.FunctionComponent = ({ navigation }: any) => {
    const [text, setText] = useState<string>("Sign Up");
    const userLocation: any = useSelector(
        (state: RootState) => state.location
    );

    const [loadingLocation, setLoadingLocation] = useState(true);

    const [formData, setFormData] = useState<any>({
        firstName: "",
        lastName: "",
        middleName: "",
        initials: "",
        userType: "",
        uniqueId: "",
        email: "",
        phone: "",
        agreeToPolicy: false,
        isLoggedIn: false,
        gender: "",
        dateOfBirth: "",
        disability: false,
        disabilityType: "",
        photoUrl: "",
        educationalLevel: "",
        referralName: "",
        secondaryEmail: "",
        securityQuestion: "",
        securityAnswer: "",
        verifiedEmail: false,
        verifyPhoneNumber: false,
        agreedToTerms: false,
        twoFactorSettings: false,
        password: "",
        confirmPassword: "",
        role: undefined,
        streetNumber: "",
        streetName: "",
        city: "",
        state: "",
        country: "",
        skills: [],
        certifications: [],
        accessLevel: "",
        permissions: [],
        notificationPreferences: { email: true },
        organisationalType: "",
        isCompanyRegistered: "",
        dateOfRegistration: "",
    } as any);

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    useEffect(() => {
        let attempts = 0;
        const maxAttempts = 5;
        const retryDelay = 5000;
        setLoadingLocation(true);

        const fetchLocation = () => {
            Geolocation.getCurrentPosition(
                async (res) => {
                    const { latitude, longitude } = res.coords;
                    const geoApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

                    try {
                        const response = await fetch(geoApi);
                        const data = await response.json();

                        store.dispatch(addLocation(data));
                        setLoadingLocation(false);
                    } catch (e) {
                        console.error("Geocoding API failed:", e);
                        setLoadingLocation(false);
                    }
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        attempts++;
                        if (attempts < maxAttempts) {
                            console.warn("Permission denied. Retrying in 5 seconds...");
                            setTimeout(fetchLocation, retryDelay);
                        } else {
                            console.error("User denied location access. Max retries reached.");
                            setLoadingLocation(false);
                        }
                    } else {
                        console.error("Geolocation error:", error.message);
                        setLoadingLocation(false);
                    }
                },
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
            );
        };

        fetchLocation();
    }, []);

    const handleChange = (key: keyof any, value: string | boolean) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };


    const validate = () => {
        let errors: FormErrors = {};
        let isValid = true;

        if (!formData.userType) {
            errors.userType = "Please select a user type.";
            isValid = false;
        }

        if (formData.userType === "Staff" && !formData.uniqueId.trim()) {
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
                "Password must be at least 6 characters long and include a number.";
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

    const startCountdown = (
        seconds: number,
        onTick: (value: number) => void
    ): Promise<void> => {
        return new Promise((resolve) => {
            let count = seconds;
            const timer = () => {
                onTick(count);
                if (count <= 0) {
                    resolve();
                    return;
                }
                count--;
                setTimeout(timer, 1000);
            };
            setTimeout(timer, 1000);
        });
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        let generatedId = formData.uniqueId;

        if (formData.userType.trim().toLowerCase() !== "staff") {
            const result = generateUniqueId(formData.userType.trim());
            if (result === null) {
                Toast.show({
                    type: 'error',
                    text1: 'ID Generation Failed',
                    text2: "Invalid user type — could not generate ID. 🚫",
                });
                return;
            }
            generatedId = result;
        }

        const updatedFormData = {
            ...formData,
            uniqueId: generatedId,
            organisationalType: "",
            isCompanyRegistered: "",
            dateOfRegistration: "",
        };

        setText("Creating your D'roid Account...");

        try {
            await authService.handleUserRegistration(updatedFormData, userLocation);

            await startCountdown(5, (value) => {
                setText(`User Created. Redirecting in ${value}s...`);
            });
            navigation.navigate("BottomTabs");

        } catch (error: any) {
            setText("Sign Up");
            // Error Toast (RN style)
            // Toast.show({
            //     type: 'error',
            //     text1: 'Registration Failed',
            //     text2: error.message || "User registration failed.",
            // });
        }
    };

    const renderUserTypePicker = () => (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>User Type</Text>
            <View style={[styles.input, { paddingHorizontal: 0, paddingVertical: 0, height: 48 }]}>
                {/* Placeholder for Picker component */}
                <TextInput
                    placeholder="User Type (e.g., Member or Staff)"
                    value={formData.userType}
                    onChangeText={(v) => handleChange('userType', v)}
                    style={{ flex: 1, paddingHorizontal: 12, color: formData.userType ? '#000' : '#BAB8B8' }}
                />

            </View>
            {formErrors.userType && (
                <Text style={styles.errorText}>{formErrors.userType}</Text>
            )}
        </View>
    );

    const renderTextInput = (name: keyof any, placeholder: string, secure: boolean = false, keyboardType: 'default' | 'email-address' | 'numeric' = 'default') => (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={String(formData[name] || '')}
                onChangeText={(v) => handleChange(name, v)}
                secureTextEntry={secure}
                keyboardType={keyboardType}
            />
            {formErrors[name as keyof FormErrors] && (
                <Text style={styles.errorText}>{formErrors[name as keyof FormErrors]}</Text>
            )}
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: styles.container.backgroundColor }}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >                <View style={styles.contentBlock}>
                    <View style={styles.topLinksContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.h2}>Join the D'roid Community</Text>
                    <Text style={styles.subtext}>
                        Connect with other developers or like minded individuals...
                    </Text>

                    {loadingLocation && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#479BE8" />
                            <Text style={styles.loadingText}>Fetching Location...</Text>
                        </View>
                    )}

                    {renderUserTypePicker()}
                    {formData.userType === "Staff" && renderTextInput('uniqueId', 'Unique ID')}
                    {renderTextInput('firstName', 'First Name')}
                    {renderTextInput('lastName', 'Last Name')}
                    {renderTextInput('email', 'Email', false, 'email-address')}
                    {renderTextInput('password', 'Password', true)}
                    {renderTextInput('confirmPassword', 'Confirm Password', true)}

                    {/* Privacy section */}
                    <View style={styles.policyRow}>
                        <View style={styles.checkboxContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    handleChange('agreeToPolicy', !formData.agreeToPolicy)
                                }
                                style={[
                                    styles.checkbox,
                                    formData.agreeToPolicy && styles.checkboxChecked,
                                ]}
                            >
                                {formData.agreeToPolicy && AntDesign.name('check', 14, '#FFF')}
                            </TouchableOpacity>

                            <View style={styles.policyText}>
                                <Text style={styles.policyText}>
                                    By clicking you accept our
                                    <Text
                                        style={styles.policyLink}
                                        onPress={() => navigation.navigate("TAC")}
                                    >
                                        {" "}Terms and Condition
                                    </Text>
                                    {" "}and{" "}
                                    <Text
                                        style={styles.policyLink}
                                        onPress={() => navigation.navigate("PAP")}
                                    >
                                        Privacy Policy
                                    </Text>
                                </Text>
                            </View>
                        </View>

                        {formErrors.agreeToPolicy && (
                            <Text style={styles.errorTextFullWidth}>
                                {formErrors.agreeToPolicy}
                            </Text>
                        )}
                    </View>

                </View>
                {/* FIXED BOTTOM BUTTON */}
                <View style={styles.fixedButtonContainer}>
                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>{text}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );

};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#000105',
        padding: 20,
    },
    fixedButtonContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: "#000105",
        borderTopWidth: 1,
        borderTopColor: "#222",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: '#479BE8',
        marginLeft: 8,
        fontSize: 16,
    },
    heroIconText: {
        fontSize: 48,
        color: '#071D6A',
    },
    contentBlock: {
        marginTop: 20,
    },
    topLinksContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
        marginBottom: 30,
    },
    loginLink: {
        color: '#C7D2FE',
        fontSize: 16,
        textDecorationLine: 'underline',
        fontWeight: "300"
    },
    h2: {
        fontSize: 30,
        fontWeight: '900',
        color: '#ffffff',
        marginBottom: 8,
    },
    subtext: {
        fontSize: 16,
        color: '#BAB8B8',
        marginBottom: 20,
        fontWeight: "300"
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 5,
        fontWeight: "300"
    },
    input: {
        width: '100%',
        padding: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#C7D2FE',
        color: '#000',
        height: 48,
    },
    errorText: {
        color: '#FF6F61',
        fontSize: 12,
        marginTop: 4,
    },
    errorTextFullWidth: {
        color: '#FF6F61',
        fontSize: 12,
        width: '100%',
        marginTop: 8,
    },
    policyRow: {
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        flexShrink: 1,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#479BE8',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#479BE8',
    },
    policyText: {
        fontSize: 14,
        color: '#BAB8B8',
        flexShrink: 1,
        lineHeight: 20,
    },
    policyLink: {
        color: '#479BE8',
        textDecorationLine: 'underline',
    },
    policyLinkA: {
        color: '#ffffff',
    },
    forgotPassword: {
        fontSize: 14,
        color: '#ffffff',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: '#C7D2FE',
        padding: 12,
        borderRadius: 5,
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
    },
    submitButtonText: {
        color: '#000105',
        fontSize: 16,
        fontWeight: '600',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 10,
    },
    loadingText: {
        marginLeft: 10,
        color: '#479BE8',
    }
});

export default SignUp;