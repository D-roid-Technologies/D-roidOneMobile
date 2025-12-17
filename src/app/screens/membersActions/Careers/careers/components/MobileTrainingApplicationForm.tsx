import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import emailjs from "emailjs-com";
import Toast from "react-native-toast-message";
import { Upload, ChevronDown, Check, X } from "lucide-react-native";
// import { enhancedNotifications } from "../../../../notificationService/notifications.service";

interface ApplicationFormProps {
  programTitle: string;
  onSuccess?: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: string;
  uniqueId: string;
  education: string;
  employmentStatus: string;
  preferredDate: string;
  linkedin: string;
  portfolio: string;
  resume: DocumentPicker.DocumentPickerAsset | null;
  experience: string;
  motivation: string;
  referralSource: string;
  agreeToTerms: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const employmentStatusOptions = [
  { value: "Student", label: "Student" },
  { value: "Employed", label: "Employed" },
  { value: "Unemployed", label: "Unemployed" },
  { value: "Self-employed", label: "Self-employed" },
];

export const MobileTrainingApplicationForm: React.FC<ApplicationFormProps> = ({
  programTitle,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    uniqueId: "",
    education: "",
    employmentStatus: "",
    preferredDate: "",
    linkedin: "",
    portfolio: "",
    resume: null,
    experience: "",
    motivation: "",
    referralSource: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [showPreferredDatePicker, setShowPreferredDatePicker] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  const SERVICE_ID = "service_o1jbklr";
  const TEMPLATE_ID = "template_p8h58ur";
  const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

  const generateReferenceNumber = (): string => {
    const prefix = "DT";
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  // Validation functions (ported from web)
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ""));
  };

  const validateDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    const now = new Date();
    return date instanceof Date && !isNaN(date.getTime()) && date <= now;
  };

  const validateAge = (dateOfBirth: string): boolean => {
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

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "fullName":
        if (!validateRequired(value)) return "Full name is required";
        if (value.length < 3) return "Full name must be at least 3 characters";
        if (!/^[a-zA-Z\s'-]+$/.test(value))
          return "Full name can only contain letters, spaces, hyphens, and apostrophes";
        break;

      case "email":
        if (!validateRequired(value)) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        break;

      case "phone":
        if (!validateRequired(value)) return "Phone number is required";
        if (!validatePhone(value))
          return "Please enter a valid phone number with country code";
        break;

      case "gender":
        if (!validateRequired(value)) return "Gender is required";
        break;

      case "dob":
        if (!validateRequired(value)) return "Date of birth is required";
        if (!validateDate(value)) return "Please enter a valid date";
        if (!validateAge(value)) return "You must be at least 13 years old";
        break;

      case "address":
        if (!validateRequired(value)) return "Address is required";
        if (value.length < 10) return "Please provide a complete address";
        break;

      case "uniqueId":
        if (!validateRequired(value)) return "Unique ID is required";
        break;

      case "education":
        if (!validateRequired(value))
          return "Educational background is required";
        break;

      case "employmentStatus":
        if (!validateRequired(value)) return "Employment status is required";
        break;

      case "preferredDate":
        if (!validateRequired(value)) return "Preferred start date is required";
        const prefDate = new Date(value);
        if (prefDate < new Date())
          return "Preferred date must be in the future";
        break;

      case "linkedin":
        if (value && !/^https?:\/\/.+/.test(value))
          return "Please enter a valid URL starting with http:// or https://";
        break;

      case "portfolio":
        if (value && !/^https?:\/\/.+/.test(value))
          return "Please enter a valid URL starting with http:// or https://";
        break;

      case "resume":
        if (!value) return "Resume is required";
        // File validation is handled at selection time or generically here
        // if (value.size > 5 * 1024 * 1024) return "Resume must be less than 5MB"; 
        // Note: Expo Document Picker result structure varies slightly, checking MIME type outside
        break;

      case "motivation":
        if (!validateRequired(value)) return "Motivation is required";
        if (value.length < 50)
          return "Please provide at least 50 characters explaining your motivation";
        break;

      case "agreeToTerms":
        if (!value) return "You must agree to the terms and privacy policy";
        break;

      default:
        break;
    }
    return "";
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        if (file.size && file.size > 5 * 1024 * 1024) {
          setErrors((prev) => ({ ...prev, resume: "Resume must be less than 5MB" }));
          return;
        }
        
        setFormData((prev) => ({ ...prev, resume: file }));
        setErrors((prev) => ({ ...prev, resume: "" }));
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const onDateChange = (event: any, selectedDate?: Date, field?: 'dob' | 'preferredDate') => {
    if (field === 'dob') setShowDobPicker(false);
    if (field === 'preferredDate') setShowPreferredDatePicker(false);

    if (selectedDate && field) {
      const dateString = selectedDate.toISOString().split('T')[0];
      handleChange(field, dateString);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    const fieldsToValidate = [
      "fullName", "email", "phone", "gender", "dob", "address",
      "uniqueId", "education", "employmentStatus", "preferredDate",
      "resume", "motivation", "agreeToTerms"
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, (formData as any)[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (formData.linkedin) {
       const error = validateField("linkedin", formData.linkedin);
       if (error) newErrors.linkedin = error;
    }
    if (formData.portfolio) {
      const error = validateField("portfolio", formData.portfolio);
      if (error) newErrors.portfolio = error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fix the errors in the form.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const generatedRef = generateReferenceNumber();
      setReferenceNumber(generatedRef);

      const completeFormData = {
        ...formData,
        title: programTitle,
        referenceNumber: generatedRef,
      };

      // Notification - Service not found in workspace, using Toast only
      /*
      await enhancedNotifications.addSilent({
        title: "Career Application Submitted",
        message: `Your application for "${programTitle}" has been submitted successfully. Reference: ${generatedRef}`,
        type: "success",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        isRead: false,
      });
      */

      // EmailJS
      // Note: React Native environment might need specific config for EmailJS or a backend proxy.
      // Standard EmailJS generic call:
      const templateParams = {
        name: completeFormData.fullName,
        title: `Thank You for Applying for the position of ${completeFormData.title}! We're excited to receive your application and appreciate your interest in joining the team at D'roid Technologies Ltd.`,
        email: completeFormData.email,
        // Resume attachment is tricky in pure client-side EmailJS without a backend to process the file stream.
        // We will omit the file content in this basic port or assuming template handles basic textual data.
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      Toast.show({
        type: 'success',
        text1: 'Application Submitted!',
        text2: 'We have received your application.',
      });

      setSubmitted(true);
      if (onSuccess) onSuccess();

    } catch (error) {
      console.error("Submission error:", error);
      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: 'Please try again later.',
      });
      
      /*
      await enhancedNotifications.addSilent({
        title: "Career Application Failed",
        message: `Failed to submit your application for "${programTitle}". Please try again.`,
        type: "error",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        isRead: false,
      });
      */

    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && referenceNumber) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIconContainer}>
           <Check size={40} color="#ffffff" />
        </View>
        <Text style={styles.successTitle}>Thank You for Applying!</Text>
        <Text style={styles.successMessage}>
          Your application for <Text style={{fontWeight: 'bold'}}>{programTitle}</Text> has been received.
        </Text>
        <View style={styles.referenceBox}>
          <Text style={styles.referenceLabel}>Your Reference ID:</Text>
          <Text style={styles.referenceNumber}>{referenceNumber}</Text>
        </View>
        <Text style={styles.successNote}>
          A confirmation email has been sent to {formData.email}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerTitle}>Application for: {programTitle}</Text>
      <Text style={styles.headerSubtitle}>Please fill out all required fields marked with *</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <FormField label="Full Name *" error={errors.fullName}>
          <TextInput
            style={[styles.input, errors.fullName ? styles.inputError : null]}
            value={formData.fullName}
            onChangeText={(text) => handleChange("fullName", text)}
            placeholder="Enter your full name"
          />
        </FormField>

        <FormField label="Unique ID *" error={errors.uniqueId}>
          <TextInput
            style={[styles.input, errors.uniqueId ? styles.inputError : null]}
            value={formData.uniqueId}
            onChangeText={(text) => handleChange("uniqueId", text)}
            placeholder="Your Unique ID"
          />
        </FormField>

        <FormField label="Email Address *" error={errors.email}>
          <TextInput
            style={[styles.input, errors.email ? styles.inputError : null]}
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Your email address"
          />
        </FormField>

        <FormField label="Phone Number *" error={errors.phone}>
          <TextInput
            style={[styles.input, errors.phone ? styles.inputError : null]}
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="phone-pad"
            placeholder="+1234567890"
          />
        </FormField>

        <FormField label="Gender *" error={errors.gender}>
          <View style={[styles.pickerContainer, errors.gender ? styles.inputError : null]}>
            <Picker
              selectedValue={formData.gender}
              onValueChange={(itemValue) => handleChange("gender", itemValue)}
            >
              <Picker.Item label="Select Gender" value="" color="#9ca3af" />
              {genderOptions.map((opt) => (
                <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
              ))}
            </Picker>
          </View>
        </FormField>

        <FormField label="Date of Birth *" error={errors.dob}>
          <TouchableOpacity onPress={() => setShowDobPicker(true)} style={[styles.input, errors.dob ? styles.inputError : null]}>
             <Text style={formData.dob ? styles.inputText : styles.placeholderText}>
               {formData.dob || "Select Date"}
             </Text>
          </TouchableOpacity>
          {showDobPicker && (
            <DateTimePicker
              value={formData.dob ? new Date(formData.dob) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(e, date) => onDateChange(e, date, 'dob')}
              maximumDate={new Date()}
            />
          )}
        </FormField>

        <FormField label="Address *" error={errors.address}>
          <TextInput
            style={[styles.input, errors.address ? styles.inputError : null]}
            value={formData.address}
            onChangeText={(text) => handleChange("address", text)}
            placeholder="Enter your complete address"
          />
        </FormField>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Educational & Employment</Text>
        
        <FormField label="Educational Background *" error={errors.education}>
          <TextInput
            style={[styles.input, errors.education ? styles.inputError : null]}
            value={formData.education}
            onChangeText={(text) => handleChange("education", text)}
            placeholder="e.g., BSc Computer Science"
          />
        </FormField>

         <FormField label="Employment Status *" error={errors.employmentStatus}>
          <View style={[styles.pickerContainer, errors.employmentStatus ? styles.inputError : null]}>
            <Picker
              selectedValue={formData.employmentStatus}
              onValueChange={(itemValue) => handleChange("employmentStatus", itemValue)}
            >
              <Picker.Item label="Select Status" value="" color="#9ca3af" />
              {employmentStatusOptions.map((opt) => (
                <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
              ))}
            </Picker>
          </View>
        </FormField>

        <FormField label="Preferred Start Date *" error={errors.preferredDate}>
          <TouchableOpacity onPress={() => setShowPreferredDatePicker(true)} style={[styles.input, errors.preferredDate ? styles.inputError : null]}>
             <Text style={formData.preferredDate ? styles.inputText : styles.placeholderText}>
               {formData.preferredDate || "Select Date"}
             </Text>
          </TouchableOpacity>
          {showPreferredDatePicker && (
            <DateTimePicker
              value={formData.preferredDate ? new Date(formData.preferredDate) : new Date()}
              mode="date"
              minimumDate={new Date()}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(e, date) => onDateChange(e, date, 'preferredDate')}
            />
          )}
        </FormField>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Links</Text>
        <FormField label="LinkedIn Profile (Optional)" error={errors.linkedin}>
          <TextInput
             style={[styles.input, errors.linkedin ? styles.inputError : null]}
             value={formData.linkedin}
             onChangeText={(text) => handleChange("linkedin", text)}
             placeholder="https://linkedin.com/in/..."
             autoCapitalize="none"
          />
        </FormField>
        <FormField label="Portfolio Link (Optional)" error={errors.portfolio}>
          <TextInput
             style={[styles.input, errors.portfolio ? styles.inputError : null]}
             value={formData.portfolio}
             onChangeText={(text) => handleChange("portfolio", text)}
             placeholder="https://github.com/..."
             autoCapitalize="none"
          />
        </FormField>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resume Upload</Text>
        <Text style={styles.label}>Upload Resume (PDF, max 5MB) *</Text>
        <TouchableOpacity onPress={handleDocumentPick} style={[styles.uploadButton, errors.resume ? styles.inputError : null]}>
          <Upload size={24} color="#4b5563" />
          <Text style={styles.uploadText}>{formData.resume ? formData.resume.name : "Choose PDF file"}</Text>
        </TouchableOpacity>
        {errors.resume && <Text style={styles.errorText}>{errors.resume}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Information</Text>
         <FormField label="Any prior experience?" error={errors.experience}>
          <TextInput
             style={[styles.input, styles.textArea, errors.experience ? styles.inputError : null]}
             value={formData.experience}
             onChangeText={(text) => handleChange("experience", text)}
             placeholder="Describe relevant experience..."
             multiline
             numberOfLines={4}
          />
        </FormField>

        <FormField label="Why are you interested? *" error={errors.motivation}>
          <TextInput
             style={[styles.input, styles.textArea, errors.motivation ? styles.inputError : null]}
             value={formData.motivation}
             onChangeText={(text) => handleChange("motivation", text)}
             placeholder="Tell us why (min 50 chars)..."
             multiline
             numberOfLines={5}
          />
        </FormField>

        {/* Agree to terms - simple switch or checkbox equivalent */}
        <TouchableOpacity 
          style={styles.checkboxContainer} 
          onPress={() => handleChange("agreeToTerms", !formData.agreeToTerms)}
        >
          <View style={[styles.checkbox, formData.agreeToTerms && styles.checkboxChecked]}>
            {formData.agreeToTerms && <Check size={14} color="white" />}
          </View>
          <Text style={[styles.checkboxLabel, errors.agreeToTerms ? {color: '#dc2626'} : null]}>
            I agree to the terms and privacy policy
          </Text>
        </TouchableOpacity>
         {errors.agreeToTerms && <Text style={styles.errorText}>{errors.agreeToTerms}</Text>}
      </View>

      <TouchableOpacity 
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Application</Text>
        )}
      </TouchableOpacity>
      
      {/* Spacer for bottom */}
      <View style={{height: 40}} /> 
    </ScrollView>
  );
};

const FormField: React.FC<{label: string, error?: string, children: React.ReactNode}> = ({label, error, children}) => (
  <View style={styles.formGroup}>
    <Text style={styles.label}>{label}</Text>
    {children}
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#111827",
  },
  inputError: {
    borderColor: "#dc2626",
    backgroundColor: "#fef2f2",
  },
  inputText: {
    color: "#111827",
  },
  placeholderText: {
    color: "#9ca3af",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 4,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  uploadText: {
    marginTop: 8,
    color: "#6b7280",
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 4,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#374151",
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  referenceBox: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  referenceLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  referenceNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 1,
  },
  successNote: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
