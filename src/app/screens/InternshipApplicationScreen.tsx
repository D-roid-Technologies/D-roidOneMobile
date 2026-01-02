import React, { useState } from "react";
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
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { submitInternshipApplication } from "../redux/slice/internshipSlice";
import { Picker } from "@react-native-picker/picker";
import BackButton from "../components/BackButton";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  educationLevel: string;
  institution: string;
  fieldOfStudy: string;
  graduationYear: string;
  desiredDepartment: string;
  startDate: string;
  duration: string;
  coverLetter: string;
  skills: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const InternshipApplicationScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    educationLevel: "",
    institution: "",
    fieldOfStudy: "",
    graduationYear: "",
    desiredDepartment: "",
    startDate: "",
    duration: "",
    coverLetter: "",
    skills: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const educationLevels = [
    "High School",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
  ];

  const departments = [
    "Engineering",
    "Marketing",
    "Human Resources",
    "Finance",
    "IT",
    "Design",
    "Sales",
    "Operations",
  ];

  const durations = ["1 month", "3 months", "6 months", "12 months"];

  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case "firstName":
      case "lastName":
        return value.trim().length < 2 ? "Must be at least 2 characters" : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Invalid email address" : "";
      case "phone":
        const phoneRegex = /^[0-9]{10,15}$/;
        return !phoneRegex.test(value.replace(/[-()\s]/g, ""))
          ? "Invalid phone number"
          : "";
      case "dateOfBirth":
      case "startDate":
        return value.trim().length === 0 ? "This field is required" : "";
      case "zipCode":
        return value.trim().length < 3 ? "Invalid zip code" : "";
      case "graduationYear":
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        return year < 1950 || year > currentYear + 10
          ? "Invalid graduation year"
          : "";
      case "coverLetter":
        return value.trim().length < 50
          ? "Cover letter must be at least 50 characters"
          : "";
      default:
        return value.trim().length === 0 ? "This field is required" : "";
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });

    if (touchedFields.has(field)) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouchedFields(new Set(touchedFields).add(field));
    const error = validateField(field, formData[field]);
    setErrors({ ...errors, [field]: error });
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fill all required fields correctly");
      return;
    }

    const applicationData = {
      id: `internship_${Date.now()}`,
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      applicationStatus: "pending" as const,
      submittedAt: new Date().toISOString(),
    };

    dispatch(submitInternshipApplication(applicationData));

    console.log("=================================");
    console.log("📋 INTERNSHIP APPLICATION DATA");
    console.log("=================================");
    console.log("Application ID:", applicationData.id);
    console.log("Name:", `${applicationData.firstName} ${applicationData.lastName}`);
    console.log("Email:", applicationData.email);
    console.log("Phone:", applicationData.phone);
    console.log("Date of Birth:", applicationData.dateOfBirth);
    console.log("Address:", `${applicationData.address}, ${applicationData.city}, ${applicationData.state} ${applicationData.zipCode}`);
    console.log("Education Level:", applicationData.educationLevel);
    console.log("Institution:", applicationData.institution);
    console.log("Field of Study:", applicationData.fieldOfStudy);
    console.log("Graduation Year:", applicationData.graduationYear);
    console.log("Desired Department:", applicationData.desiredDepartment);
    console.log("Preferred Start Date:", applicationData.startDate);
    console.log("Duration:", applicationData.duration);
    console.log("Skills:", applicationData.skills);
    console.log("Cover Letter:", applicationData.coverLetter);
    console.log("Status:", applicationData.applicationStatus);
    console.log("Submitted At:", applicationData.submittedAt);
    console.log("=================================");

    Alert.alert(
      "Success!",
      "Your internship application has been submitted successfully.",
      [
        {
          text: "OK",
          onPress: () => {
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              dateOfBirth: "",
              address: "",
              city: "",
              state: "",
              zipCode: "",
              educationLevel: "",
              institution: "",
              fieldOfStudy: "",
              graduationYear: "",
              desiredDepartment: "",
              startDate: "",
              duration: "",
              coverLetter: "",
              skills: "",
            });
            setTouchedFields(new Set());
            setErrors({});
            navigation?.goBack();
          },
        },
      ]
    );
  };

  const renderInput = (
    label: string,
    field: keyof FormData,
    placeholder: string,
    keyboardType: any = "default",
    multiline: boolean = false
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          errors[field] && touchedFields.has(field) && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        onBlur={() => handleBlur(field)}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
      {errors[field] && touchedFields.has(field) && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );

  const renderPicker = (
    label: string,
    field: keyof FormData,
    options: string[]
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData[field]}
          onValueChange={(value) => handleInputChange(field, value)}
          style={styles.picker}
        >
          <Picker.Item label={`Select ${label}`} value="" />
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
      {errors[field] && touchedFields.has(field) && (
        <Text style={styles.errorText}>{errors[field]}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <BackButton onPress={() => navigation?.goBack()} color="#ffffff" />
          <Text style={styles.headerTitle}>Internship Application</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            {renderInput("First Name", "firstName", "Enter your first name")}
            {renderInput("Last Name", "lastName", "Enter your last name")}
            {renderInput("Email", "email", "your.email@example.com", "email-address")}
            {renderInput("Phone", "phone", "+1 234 567 8900", "phone-pad")}
            {renderInput("Date of Birth", "dateOfBirth", "YYYY-MM-DD")}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            {renderInput("Street Address", "address", "123 Main St")}
            {renderInput("City", "city", "Enter your city")}
            {renderInput("State", "state", "Enter your state")}
            {renderInput("Zip Code", "zipCode", "12345")}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {renderPicker("Education Level", "educationLevel", educationLevels)}
            {renderInput("Institution", "institution", "University name")}
            {renderInput("Field of Study", "fieldOfStudy", "Computer Science")}
            {renderInput(
              "Graduation Year",
              "graduationYear",
              "2025",
              "number-pad"
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Internship Details</Text>
            {renderPicker(
              "Desired Department",
              "desiredDepartment",
              departments
            )}
            {renderInput("Preferred Start Date", "startDate", "YYYY-MM-DD")}
            {renderPicker("Duration", "duration", durations)}
            {renderInput(
              "Skills",
              "skills",
              "JavaScript, React, TypeScript (comma separated)"
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cover Letter</Text>
            {renderInput(
              "Tell us why you want to intern with us",
              "coverLetter",
              "Write your cover letter here (minimum 50 characters)...",
              "default",
              true
            )}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000105",
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#000c3a",
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a3a",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    backgroundColor: "#000c3a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#C7D2FE",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 8,
  },
  required: {
    color: "#FF6F61",
  },
  input: {
    borderWidth: 1,
    borderColor: "#3a3a5a",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#1a1a3a",
    color: "#ffffff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#FF6F61",
  },
  errorText: {
    color: "#FF6F61",
    fontSize: 12,
    marginTop: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#3a3a5a",
    borderRadius: 8,
    backgroundColor: "#1a1a3a",
  },
  picker: {
    height: 50,
    color: "#ffffff",
  },
  submitButton: {
    backgroundColor: "#C7D2FE",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  submitButtonText: {
    color: "#071D6A",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default InternshipApplicationScreen;
