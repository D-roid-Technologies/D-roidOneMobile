import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AppDispatch } from "../../../redux/store";

import { authService } from "../../../redux/configuration/auth.service";
import type { RootState } from "../../../redux/store";

import type { UserType } from "../../../utils/Types";
import { addNotification, persistNotifications } from "../../../redux/slice/notifications";
import type { NotificationItem } from "../../../redux/slice/notifications";

// import AffiliatedApps from "./AffiliatedApps";
// import DocumentUploadUI from "./DocumentUploadUI";
// import PreferencesUI from "./PreferencesUI";
// import SecuritySettingsUI from "./SecuritySettingsUI";

import Dropdown from "./components/Dropdown";
import ProfilePhotoUploader from "./components/ProfilePhotoUploader";
import BasicInformationSection from "./components/BasicInformationSection";
import AddressSection from "./components/AddressSection";
import StaffInformationSection from "./components/StaffInformationSection";
import OrganisationInformationSection from "./components/OrganisationInformationSection";
import SecurityInformationSection from "./components/SecurityInformationSection";
import ReadOnlyInformationSection from "./components/ReadOnlyInformationSection";

export interface ValidationErrors {
  [key: string]: string;
}

type SubmitStatus = "success" | "error" | null;

const securityQuestionOptions = [
  { value: "mother_maiden", label: "What is your mother's maiden name?" },
  { value: "first_pet", label: "What was your first pet's name?" },
  { value: "birth_city", label: "What city were you born in?" },
];

const educationalLevelOptions = [
  { value: "High School", label: "High School" },
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Graduate", label: "Graduate" },
  { value: "Postgraduate", label: "Postgraduate" },
];

const disabilityTypeOptions = [
  { value: "None", label: "None" },
  { value: "Visual", label: "Visual" },
  { value: "Hearing", label: "Hearing" },
  { value: "Motor", label: "Motor" },
  { value: "Cognitive", label: "Cognitive" },
];

const employmentStatusOptions = [
  { value: "Active", label: "Active" },
  { value: "On Leave", label: "On Leave" },
  { value: "Probation", label: "Probation" },
  { value: "Suspended", label: "Suspended" },
  { value: "Terminated", label: "Terminated" },
];

const workLocationOptions = [
  { value: "Remote", label: "Remote" },
  { value: "Office", label: "Office" },
  { value: "Hybrid", label: "Hybrid" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

interface PersonalDetailsScreenProps {
  navigation?: any;
}

const PersonalDetailsScreen: React.FunctionComponent<PersonalDetailsScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userDetails: UserType = useSelector((state: RootState) => state.user);
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const userType = userDetails.userType;

  const [formData, setFormData] = useState<UserType | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const scrollRef = useRef<ScrollView | null>(null);

  // Memoize referral name generation
  const referralName = useMemo(() => {
    return `${userDetails.firstName}_${userDetails.lastName}_${userDetails.uniqueId}`;
  }, [userDetails.firstName, userDetails.lastName, userDetails.uniqueId]);

  useEffect(() => {
    setFormData({
      ...userDetails,
      referralName,
    });
    setPhotoPreview(userDetails.photoUrl || null);
  }, [userDetails, referralName]);

  // ---------- Validation helpers ----------

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateDate = (dateString: string): boolean => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    return date instanceof Date && !isNaN(date.getTime()) && date <= now;
  };

  const validateAge = (dateOfBirth: string): boolean => {
    if (!dateOfBirth) return false;
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 13;
    }
    return age >= 13;
  };

  const validateRequired = (value: any): boolean => {
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined && value !== "";
  };

  const validateNumericRange = (
    value: number,
    min: number,
    max: number
  ): boolean => {
    return value >= min && value <= max;
  };

  const validateField = (name: string, value: any): string => {
    if (!touchedFields.has(name) && !validateRequired(value)) {
      return "";
    }

    switch (name) {
      case "firstName":
      case "lastName":
        if (!validateRequired(value))
          return `${name
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())} is required`;
        if (value.length < 2)
          return `${name
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) =>
              str.toUpperCase()
            )} must be at least 2 characters`;
        if (!/^[a-zA-Z\s'-]+$/.test(value))
          return `${name
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) =>
              str.toUpperCase()
            )} can only contain letters, spaces, hyphens, and apostrophes`;
        break;

      case "middleName":
        if (value && !/^[a-zA-Z\s'-]+$/.test(value))
          return "Middle name can only contain letters, spaces, hyphens, and apostrophes";
        break;

      case "phone":
        if (!validateRequired(value)) return "Phone number is required";
        if (!validatePhone(value))
          return "Please enter a valid phone number (e.g., +234 800 123 4567)";
        break;

      case "email":
        if (!validateRequired(value)) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        break;

      case "dateOfBirth":
        if (userType !== "Organisation") {
          if (!validateRequired(value)) return "Date of birth is required";
          if (!validateDate(value)) return "Please enter a valid date";
          if (!validateAge(value)) return "You must be at least 13 years old";
        }
        break;

      case "gender":
        if (userType !== "Organisation" && !validateRequired(value))
          return "Gender is required";
        break;

      case "city":
      case "state":
      case "country":
        if (!validateRequired(value))
          return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        if (!/^[a-zA-Z\s'-]+$/.test(value))
          return `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } can only contain letters, spaces, hyphens, and apostrophes`;
        break;

      case "streetNumber":
        if (!validateRequired(value)) return "Street number is required";
        break;

      case "streetName":
        if (!validateRequired(value)) return "Street name is required";
        break;

      case "performanceScore":
      case "attendanceRate":
      case "trainingProgress":
        if (userType === "Staff" && value !== "" && value !== null) {
          const numValue = Number.parseFloat(value);
          if (isNaN(numValue) || !validateNumericRange(numValue, 0, 100)) {
            return `${name
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) =>
                str.toUpperCase()
              )} must be between 0 and 100`;
          }
        }
        break;

      case "activeTasks":
        if (userType === "Staff" && value !== "" && value !== null) {
          const numValue = Number.parseFloat(value);
          if (isNaN(numValue) || numValue < 0) {
            return "Active tasks must be a positive number";
          }
        }
        break;

      case "position":
      case "department":
      case "employeeId":
        if (userType === "Staff" && !validateRequired(value)) {
          return `${name
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) =>
              str.toUpperCase()
            )} is required for staff members`;
        }
        break;

      case "joinDate":
        if (userType === "Staff") {
          if (!validateRequired(value))
            return "Join date is required for staff members";
          if (!validateDate(value)) return "Please enter a valid join date";
        }
        break;

      case "employmentStatus":
      case "workLocation":
      case "accessLevel":
        if (userType === "Staff" && !validateRequired(value)) {
          return `${name
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) =>
              str.toUpperCase()
            )} is required for staff members`;
        }
        break;

      case "organisationalType":
        if (userType === "Organisation" && !validateRequired(value))
          return "Organisational type is required";
        break;

      case "isCompanyRegistered":
        if (userType === "Organisation" && !validateRequired(value))
          return "Company registration status is required";
        break;

      case "dateOfRegistration":
        if (
          userType === "Organisation" &&
          (formData as any)?.isCompanyRegistered === "Yes"
        ) {
          if (!validateRequired(value))
            return "Registration date is required for registered companies";
          if (!validateDate(value))
            return "Please enter a valid registration date";
        }
        break;

      case "securityQuestion":
        if (!validateRequired(value)) return "Security question is required";
        break;

      case "securityAnswer":
        if (!validateRequired(value)) return "Security answer is required";
        if (value.length < 3)
          return "Security answer must be at least 3 characters";
        break;

      default:
        break;
    }
    return "";
  };

  const validateForm = (): boolean => {
    if (!formData) return false;

    const newErrors: ValidationErrors = {};
    let hasErrors = false;

    const fieldsToValidate = [
      "firstName",
      "lastName",
      "phone",
      "streetNumber",
      "streetName",
      "city",
      "state",
      "country",
      "securityQuestion",
      "securityAnswer",
    ];

    if (userType !== "Organisation") {
      fieldsToValidate.push("middleName", "gender", "dateOfBirth");
    }

    if (userType === "Organisation") {
      fieldsToValidate.push("organisationalType", "isCompanyRegistered");
      if ((formData as any)?.isCompanyRegistered === "Yes") {
        fieldsToValidate.push("dateOfRegistration");
      }
    }

    if (userType === "Staff") {
      fieldsToValidate.push(
        "position",
        "department",
        "employeeId",
        "joinDate",
        "employmentStatus",
        "workLocation",
        "accessLevel"
      );
    }

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, (formData as any)[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    if (userType === "Staff") {
      [
        "performanceScore",
        "attendanceRate",
        "trainingProgress",
        "activeTasks",
      ].forEach((field) => {
        const value = (formData as any)[field];
        if (value !== "" && value !== null && value !== undefined) {
          const error = validateField(field, value);
          if (error) {
            newErrors[field] = error;
            hasErrors = true;
          }
        }
      });
    }

    setErrors(newErrors);

    if (hasErrors && scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }

    return !hasErrors;
  };

  const markFieldTouched = useCallback((fieldName: string) => {
    setTouchedFields((prev) => {
      const next = new Set(prev);
      next.add(fieldName);
      return next;
    });
  }, []);

  const handleFieldBlur = useCallback((fieldName: string) => {
    markFieldTouched(fieldName);

    if (formData) {
      const error = validateField(fieldName, (formData as any)[fieldName]);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    }
  }, [formData, markFieldTouched, touchedFields]);

  const handleInputChange = (
    fieldName: string,
    value: string,
    type: "text" | "number" = "text"
  ) => {
    if (!formData) return;

    let processedValue: any = value;

    if (type === "number") {
      processedValue = value === "" ? "" : Number.parseFloat(value) || 0;
    } else {
      processedValue = value;
    }

    const updated = { ...formData, [fieldName]: processedValue };
    setFormData(updated);

    if (touchedFields.has(fieldName)) {
      const error = validateField(fieldName, processedValue);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleSelectChange = (fieldName: string, value: string) => {
    if (!formData) return;
    const updated = { ...formData, [fieldName]: value };
    setFormData(updated);

    if (touchedFields.has(fieldName)) {
      const error = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handlePhotoChange = (uri: string) => {
    setPhotoPreview(uri);
    setFormData((prev) =>
      prev ? { ...prev, photoUrl: uri } : prev
    );
    setErrors((prev) => ({ ...prev, photo: "" }));
  };

  const handleSubmit = useCallback(async () => {
    if (!formData) return;

    const allFields = new Set<string>();
    Object.keys(formData).forEach((key) => allFields.add(key));
    setTouchedFields(allFields);
    setSubmitStatus(null);

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      await authService.updatePrimaryInformation(formData);

      setSubmitStatus("success");
      await AsyncStorage.setItem(
        "profileUpdated",
        JSON.stringify(formData)
      );

      const now = new Date();
      const notification: NotificationItem = {
        id: String(Date.now()),
        title: "Profile Updated Successfully",
        message: `Your personal details have been updated. Changes include: ${formData.firstName} ${formData.lastName}, ${formData.email}`,
        date: now.toISOString().split("T")[0],
        time: now.toISOString(),
        type: "success",
        isRead: false,
      };
      
      // Add notification and persist to AsyncStorage
      dispatch(addNotification(notification));
      dispatch(persistNotifications([notification, ...notifications]));
      
      setErrors({});
      setTouchedFields(new Set());
    } catch (error) {
      console.error("Failed to update profile:", error);
      setSubmitStatus("error");
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to update information. Please try again.";
      
      setErrors((prev) => ({
        ...prev,
        submit: errorMessage,
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, dispatch, notifications, validateForm]);

  const renderProfileTab = () => {
    if (!formData) return null;

    return (
      <View>
        <ProfilePhotoUploader
          photoUri={photoPreview}
          error={errors.photo}
          onPhotoChange={handlePhotoChange}
        />

        <BasicInformationSection
          formData={formData}
          userType={userType}
          errors={errors}
          onChange={handleInputChange}
          onBlur={handleFieldBlur}
          onSelect={handleSelectChange}
        />

        <AddressSection
          formData={formData}
          errors={errors}
          onChange={handleInputChange}
          onBlur={handleFieldBlur}
        />

        {userType !== "Organisation" && (
          <View style={styles.grid}>
            <View style={styles.field}>
              <Text style={styles.label}>Disability Type</Text>
              <Dropdown
                value={(formData as any)?.disabilityType || ""}
                placeholder="Select Disability Type"
                options={disabilityTypeOptions}
                error={errors.disabilityType}
                onChange={(value) =>
                  handleSelectChange("disabilityType", value)
                }
                onBlur={() => handleFieldBlur("disabilityType")}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Educational Level</Text>
              <Dropdown
                value={(formData as any)?.educationalLevel || ""}
                placeholder="Select Educational Level"
                options={educationalLevelOptions}
                error={errors.educationalLevel}
                onChange={(value) =>
                  handleSelectChange("educationalLevel", value)
                }
                onBlur={() => handleFieldBlur("educationalLevel")}
              />
            </View>
          </View>
        )}

        {userType === "Staff" && (
          <StaffInformationSection
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            onSelect={handleSelectChange}
            employmentStatusOptions={employmentStatusOptions}
            workLocationOptions={workLocationOptions}
          />
        )}

        {userType === "Organisation" && (
          <OrganisationInformationSection
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            onSelect={handleSelectChange}
          />
        )}

        <SecurityInformationSection
          formData={formData}
          errors={errors}
          onChange={handleInputChange}
          onBlur={handleFieldBlur}
          onSelect={handleSelectChange}
          securityQuestionOptions={securityQuestionOptions}
        />

        <View style={styles.field}>
          <Text style={styles.label}>Referral Name (Auto-generated)</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={referralName}
            editable={false}
          />
        </View>

        <ReadOnlyInformationSection formData={formData} />

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isSubmitting}
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Updating..." : "Update Information"}
          </Text>
        </TouchableOpacity>

        {!!errors.submit && (
          <View style={styles.errorBox}>
            <Text style={styles.errorIcon}>⚠</Text>
            <Text style={styles.errorBoxText}>{errors.submit}</Text>
          </View>
        )}
      </View>
    );
  };

  const handleGoBack = useCallback(() => {
    if (navigation) {
      navigation.navigate("BottomTabs");
    }
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#071D6A" }}>
      {/* Custom Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={handleGoBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Details</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#ffffff" }}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
        

        <Text style={styles.subHeaderText}>
          Kindly fill the form below to update your information. Fields
          marked with * are required.
        </Text>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <View style={styles.successBox}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successText}>
              Information updated successfully!
            </Text>
          </View>
        )}

        {submitStatus === "error" && Object.keys(errors).length > 0 && (
          <View style={styles.errorBox}>
            <Text style={styles.errorIcon}>⚠</Text>
            <Text style={styles.errorBoxText}>
              Please fix the errors below before submitting.
            </Text>
          </View>
        )}

        {/* Profile Content */}
        <View style={styles.card}>{renderProfileTab()}</View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PersonalDetailsScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#071D6A",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    flex: 1,
    textAlign: "center",
    marginRight: 40, // Offset for centering (back button width)
  },
  headerPlaceholder: {
    width: 40, // Same width as back button for centering
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: "#ffffff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    marginRight: 12,
  },
  subHeaderText: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 8,
  },
  successBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#d4edda",
    borderWidth: 1,
    borderColor: "#c3e6cb",
    borderRadius: 8,
    marginTop: 8,
  },
  successIcon: {
    fontSize: 18,
    marginRight: 8,
    color: "#155724",
  },
  successText: {
    color: "#155724",
    fontSize: 14,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8d7da",
    borderWidth: 1,
    borderColor: "#f5c6cb",
    borderRadius: 8,
    marginTop: 8,
  },
  errorIcon: {
    fontSize: 18,
    marginRight: 8,
    color: "#721c24",
  },
  errorBoxText: {
    color: "#721c24",
    fontSize: 14,
    flexShrink: 1,
  },
  card: {
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  readOnlyInput: {
    backgroundColor: "#f0f0f0",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  field: {
    width: "100%",
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#071D6A",
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
