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
  Platform,
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { authService } from "../redux/configuration/auth.service";
import { RootState, store } from "../redux/store";
import { addLocation } from "../redux/slice/location";
import { Ionicons } from "@expo/vector-icons";

// Placeholder for Redux RootState/LocationState (Simulated)
interface UserLocation {
  latitude: number;
  longitude: number;
  countryName: string;
}

const Toast = {
  show: (config: {
    type: "success" | "error";
    text1: string;
    text2: string;
  }) => {
    Alert.alert(config.text1, config.text2);
  },
};

const Geolocation = {
  getCurrentPosition: (
    success: (res: any) => void,
    error: (err: any) => void,
    options: any
  ) => {
    setTimeout(() => {
      success({
        coords: { latitude: 34.0522, longitude: -118.2437 }, // Example L.A. coordinates
      });
    }, 100);
  },
};

const AntDesign = {
  name: (iconName: string, size: number, color: string) => {
    return (
      <Text style={{ fontSize: size, color: color, marginRight: 5 }}>
        {iconName === "arrowleft" ? "←" : "✓"}
      </Text>
    );
  },
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
  DashBoard: "DashboardScreen",
  StaffLogin: "StaffLoginScreen",
  MemberLogin: "MemberLoginScreen",
  TermsAndCondition: "TermsScreen",
  PrivacyPolicy: "PrivacyScreen",
  ForgotPassword: "ForgotPasswordScreen",
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
    return null;
  }

  return `${prefix}${randomPart}-${suffix}`;
};

const USER_TYPES = [
  //   { label: "Select User Type", value: "" },
  { label: "Staff", value: "Staff" },
  //   { label: "Organisation", value: "Organisation" },
  { label: "Member", value: "Member" },
];

const SignUp: React.FunctionComponent = ({ navigation }: any) => {
  const [text, setText] = useState<string>("Sign Up");
  const userLocation: any = useSelector((state: RootState) => state.location);

  const [loadingLocation, setLoadingLocation] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);

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
              console.error(
                "User denied location access. Max retries reached."
              );
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
          type: "error",
          text1: "ID Generation Failed",
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
      await authService
        .handleUserRegistration(updatedFormData, userLocation)
        .then(async () => {
          await startCountdown(5, (value) => {
            setText(`User Created. Redirecting in ${value}s...`);
          });
          navigation.navigate("BottomTabs");
        });
    } catch (error: any) {
      setText("Sign Up");
    }
  };

  const handleUserTypeSelect = (value: string) => {
    handleChange("userType", value);
    setShowUserTypeModal(false);
  };

  const renderUserTypePicker = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>User Type</Text>
      <TouchableOpacity
        style={[styles.input, styles.dropdownButton]}
        onPress={() => setShowUserTypeModal(true)}
      >
        <Text
          style={[
            styles.dropdownButtonText,
            !formData.userType && styles.placeholderText,
          ]}
        >
          {formData.userType || "Select User Type"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#000" />
      </TouchableOpacity>
      {formErrors.userType && (
        <Text style={styles.errorText}>{formErrors.userType}</Text>
      )}

      {/* Dropdown Modal */}
      <Modal
        visible={showUserTypeModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowUserTypeModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowUserTypeModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select User Type</Text>
              <TouchableOpacity onPress={() => setShowUserTypeModal(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.optionsList}>
              {USER_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.optionItem,
                    formData.userType === type.value &&
                      styles.optionItemSelected,
                    type.value === "" && styles.optionItemDisabled,
                  ]}
                  onPress={() => type.value && handleUserTypeSelect(type.value)}
                  disabled={!type.value}
                >
                  <Text
                    style={[
                      styles.optionText,
                      formData.userType === type.value &&
                        styles.optionTextSelected,
                      type.value === "" && styles.optionTextDisabled,
                    ]}
                  >
                    {type.label}
                  </Text>
                  {formData.userType === type.value && (
                    <Ionicons name="checkmark" size={20} color="#479BE8" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );

  const renderTextInput = (
    name: keyof any,
    placeholder: string,
    isPasswordField: boolean = false,
    keyboardType: "default" | "email-address" | "numeric" = "default"
  ) => {
    const isConfirmPassword = name === "confirmPassword";
    const isVisible = isConfirmPassword ? showConfirmPassword : showPassword;
    const toggleVisibility = isConfirmPassword
      ? () => setShowConfirmPassword(!showConfirmPassword)
      : () => setShowPassword(!showPassword);

    return (
      <View style={styles.inputContainer}>
        <View style={styles.passwordWrapper}>
          <TextInput
            style={[
              styles.input,
              { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            placeholder={placeholder}
            value={String(formData[name] || "")}
            onChangeText={(v) => handleChange(name, v)}
            secureTextEntry={isPasswordField ? !isVisible : false}
            keyboardType={keyboardType}
            placeholderTextColor="#777"
          />
          {isPasswordField && (
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleVisibility}>
              <Ionicons
                name={isVisible ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          )}
        </View>
        {formErrors[name as keyof FormErrors] && (
          <Text style={styles.errorText}>
            {formErrors[name as keyof FormErrors]}
          </Text>
        )}
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      // extraScrollHeight={120}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={styles.contentBlock}>
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
          {formData.userType === "Staff" &&
            renderTextInput("uniqueId", "Unique ID")}
          {renderTextInput("firstName", "First Name")}
          {renderTextInput("lastName", "Last Name")}
          {renderTextInput("email", "Email", false, "email-address")}
          {renderTextInput("password", "Password", true)}
          {renderTextInput("confirmPassword", "Confirm Password", true)}

          <View style={styles.policyRow}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() =>
                  handleChange("agreeToPolicy", !formData.agreeToPolicy)
                }
                style={[
                  styles.checkbox,
                  formData.agreeToPolicy && styles.checkboxChecked,
                ]}
              >
                {formData.agreeToPolicy && AntDesign.name("check", 14, "#FFF")}
              </TouchableOpacity>

              <Text style={styles.policyText}>
                <Text>By clicking you accept our </Text>
                <Text
                  style={styles.policyLink}
                  onPress={() => navigation.navigate("TAC")}
                >
                  Terms and Condition
                </Text>
                <Text> and </Text>
                <Text
                  style={styles.policyLink}
                  onPress={() => navigation.navigate("PAP")}
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>

            {formErrors.agreeToPolicy && (
              <Text style={styles.errorTextFullWidth}>
                {formErrors.agreeToPolicy}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>{text}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000105",
    padding: 10,
    paddingBottom: 120,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#479BE8",
    marginLeft: 8,
    fontSize: 16,
  },
  heroIconText: {
    fontSize: 48,
    color: "#071D6A",
  },
  contentBlock: {
    marginTop: 20,
  },
  topLinksContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    marginBottom: 30,
  },
  loginLink: {
    color: "#C7D2FE",
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "300",
  },
  h2: {
    fontSize: 30,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 8,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C7D2FE",
    borderRadius: 5,
    overflow: "hidden",
  },
  eyeIcon: {
    paddingHorizontal: 12,
    height: 48,
    justifyContent: "center",
    backgroundColor: "#C7D2FE",
  },
  subtext: {
    fontSize: 16,
    color: "#BAB8B8",
    marginBottom: 20,
    fontWeight: "300",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 5,
    fontWeight: "300",
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#C7D2FE",
    color: "#000",
    height: 48,
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#000",
  },
  placeholderText: {
    color: "#777",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    maxHeight: "50%",
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  optionsList: {
    maxHeight: 300,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  optionItemSelected: {
    backgroundColor: "#F0F4FF",
  },
  optionItemDisabled: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  optionTextSelected: {
    color: "#479BE8",
    fontWeight: "500",
  },
  optionTextDisabled: {
    color: "#999",
  },
  errorText: {
    color: "#FF6F61",
    fontSize: 12,
    marginTop: 4,
  },
  errorTextFullWidth: {
    color: "#FF6F61",
    fontSize: 12,
    width: "100%",
    marginTop: 8,
  },
  policyRow: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flexShrink: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#479BE8",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#479BE8",
  },
  policyText: {
    fontSize: 14,
    color: "#BAB8B8",
    flexShrink: 1,
    lineHeight: 20,
  },
  policyLink: {
    color: "#479BE8",
    textDecorationLine: "underline",
  },
  policyLinkA: {
    color: "#ffffff",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#ffffff",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#C7D2FE",
    padding: 12,
    borderRadius: 5,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  submitButtonText: {
    color: "#000105",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: "#479BE8",
  },
});

export default SignUp;
