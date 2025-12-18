import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  Platform 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Toast from 'react-native-toast-message';
import emailjs from "emailjs-com";
import { enhancedNotifications } from "../../../notificationService/notifications.service";

interface ContactFormProps {
  serviceId: string;
  templateId: string;
  publicKey: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const subjectOptions = [
  { id: "general", name: "General Inquiry" },
  { id: "drone", name: "Drone Services" },
  { id: "software", name: "Software Development" },
  { id: "training", name: "Tech Training" },
];

const ContactForm: React.FC<ContactFormProps> = ({
  serviceId,
  templateId,
  publicKey,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
  };

  const generateReferenceNumber = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
    const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    const random = Math.floor(1000 + Math.random() * 9000);
    return `REF-${date}-${time}-${random}`;
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!validateRequired(value)) return "Full name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        break;
      case "email":
        if (!validateRequired(value)) return "Email is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        break;
      case "subject":
        if (!validateRequired(value)) return "Subject is required";
        break;
      case "message":
        if (!validateRequired(value)) return "Message is required";
        if (value.length < 10) return "Message must be at least 10 characters";
        break;
      default:
        break;
    }
    return "";
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    const fieldsToValidate = ["name", "email", "subject", "message"];

    fieldsToValidate.forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData]
      );
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    const error = validateField(name, value);
    if (error && value !== "") {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleContactSubmit = async () => {
    const referenceNumber = generateReferenceNumber();

    if (!validateForm()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fix the errors before submitting.',
      });
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      name: formData.name,
      title: `We have received your enquiry with title: ${formData.subject}. 
      See details below:
      Phone Number: ${formData.phone},
      Reference Number: ${referenceNumber}
      Message: ${formData.message}.
      Our team will review and get back to you in three working days`,
      email: formData.email,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      Toast.show({
        type: 'success',
        text1: 'Message Sent Successfully',
        text2: 'Your enquiry has been submitted.',
      });

      // Send success notification
      await enhancedNotifications.addSilent({
        title: "Message Sent Successfully",
        message: `Your message about "${formData.subject}" has been delivered. Reference: ${referenceNumber}`,
        type: "success",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        isRead: false,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
      setErrors({});

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Email send error:", error);

      Toast.show({
        type: 'error',
        text1: 'Submission Failed',
        text2: 'There was an error sending your message. Please try again.',
      });

      // Send error notification
      await enhancedNotifications.addSilent({
        title: "Failed to Send Message",
        message: `Failed to send your message about "${formData.subject}". Please try again.`,
        type: "error",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString(),
        isRead: false,
      });

      setErrors({ submit: "Failed to send message. Please try again." });

      if (onError) {
        onError(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        {/* Subject */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.subject}
              onValueChange={(itemValue) => handleChange("subject", itemValue)}
              style={styles.picker}
            >
               {subjectOptions.map((option) => (
                  <Picker.Item key={option.id} label={option.name} value={option.name} color="#333"/>
               ))}
            </Picker>
          </View>
          {errors.subject ? <Text style={styles.errorText}>{errors.subject}</Text> : null}
        </View>

        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        {/* Phone */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Enter your phone number"
            placeholderTextColor="#999"
            value={formData.phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="phone-pad"
          />
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
        </View>

        {/* Message */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.message && styles.inputError]}
            placeholder="Enter your message here..."
            placeholderTextColor="#999"
            value={formData.message}
            onChangeText={(text) => handleChange("message", text)}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
          {errors.message ? <Text style={styles.errorText}>{errors.message}</Text> : null}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleContactSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
             <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Send Message</Text>
          )}
        </TouchableOpacity>
        
        {errors.submit ? (
             <View style={styles.errorBox}>
                 <Text style={styles.errorBoxText}>{errors.submit}</Text>
             </View>
        ) : null}
      </View>
      <View style={{height: 40}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#071D6A",
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#555",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#282a94",
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#1565c0",
    paddingBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  inputError: {
    borderColor: "#dc3545",
    backgroundColor: "#fff5f5",
  },
  textArea: {
    minHeight: 120,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: "100%",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#071D6A",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: "#6c757d",
    opacity: 0.7,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorBox: {
      marginTop: 16,
      backgroundColor: "#f8d7da",
      borderColor: "#f5c6cb",
      borderWidth: 1,
      padding: 12,
      borderRadius: 8,
  },
  errorBoxText: {
      color: "#721c24",
  }
});

export default ContactForm;
