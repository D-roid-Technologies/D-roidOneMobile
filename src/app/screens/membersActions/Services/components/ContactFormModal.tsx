import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ContactFormModalProps {
  visible: boolean;
  onClose: () => void;
  serviceTitle: string;
  serviceType?: string;
  fees?: string;
  onSubmit: (formData: ContactFormData) => void;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  serviceTitle: string;
  serviceType?: string;
  fees?: string;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  visible,
  onClose,
  serviceTitle,
  serviceType,
  fees,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    serviceTitle,
    serviceType: serviceType || "", // ✅ Default to empty string
    fees: fees || "", // ✅ Default to empty string
    // serviceType,
    // fees,
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // onSubmit(formData);
      onSubmit({
        ...formData,
        serviceTitle, // Use prop directly
        serviceType: serviceType || "",
        fees: fees || "",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        serviceTitle,
        serviceType: serviceType || "",
        fees: fees || "",
        // serviceType,
        // fees,
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      serviceTitle,
      serviceType: serviceType || "", // ✅ Default to empty string
      fees: fees || "",
      // serviceType,
      // fees,
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerContent}>
              <Text style={styles.modalTitle}>Contact Us</Text>
              <Text style={styles.modalSubtitle}>
                Interested in {serviceTitle}?
              </Text>
              {/* fees */}
              <View style={styles.modalFees}>
                {/* <Text style={styles.modalFees}>
                  Service Fee : {fees} ₦500,000 - ₦5,000,000
                </Text> */}
                <Text style={styles.serviceInfoLabel}>
                  Service Fee (Varies by Project):
                </Text>
                <Text style={styles.serviceInfoValue}>
                  ₦499.90 - ₦4,998,000
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#071D6A" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Enter your full name"
                placeholderTextColor="#94A3B8"
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="your.email@example.com"
                placeholderTextColor="#94A3B8"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                placeholder="+234 XXX XXX XXXX"
                placeholderTextColor="#94A3B8"
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
                keyboardType="phone-pad"
              />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            {/* Message Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message *</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  errors.message && styles.inputError,
                ]}
                placeholder="Tell us more about your interest and requirements..."
                placeholderTextColor="#94A3B8"
                value={formData.message}
                onChangeText={(text) =>
                  setFormData({ ...formData, message: text })
                }
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              {errors.message && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}
            </View>

            {/* Service Info */}
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceInfoLabel}>Service:</Text>
              <Text style={styles.serviceInfoValue}>{serviceTitle}</Text>
              {serviceType && (
                <>
                  <Text style={styles.serviceInfoLabel}>Category:</Text>
                  <Text style={styles.serviceInfoValue}>{serviceType}</Text>
                </>
              )}
            </View>

            {/* Submit Button */}
            <View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Text style={styles.submitButtonText}>Send Inquiry</Text>
                <Ionicons name="send" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
            {/* <View style={styles.submitButtonContainer}> */}

            {/* <View>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitButtonText}>Make Payment</Text>
                 
                </TouchableOpacity>
              </View> */}
            {/* </View> */}

            {/* Info Text */}
            <Text style={styles.infoText}>
              We'll get back to you within 24 hours
            </Text>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ContactFormModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "90%",
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerContent: {
    flex: 1,
    paddingRight: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#071D6A",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "400",
  },
  modalFees: {
    fontSize: 14,
    color: "#071D6A",
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 8,
  },
  closeButton: {
    padding: 4,
  },
  scrollContent: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0F172A",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  textArea: {
    height: 120,
    paddingTop: 14,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
  serviceInfo: {
    backgroundColor: "#EEF2FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  serviceInfoLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 2,
  },
  serviceInfoValue: {
    fontSize: 14,
    color: "#071D6A",
    fontWeight: "700",
    marginBottom: 8,
  },
  submitButtonContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  submitButtonWrapper: {
    flex: 1,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#203499",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#203499",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  infoText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 12,
    fontWeight: "400",
  },
});
