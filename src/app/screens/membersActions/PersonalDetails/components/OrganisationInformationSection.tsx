import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import type { UserType } from "../../../utils/Types";
import type { ValidationErrors } from "../PersonalDetailsScreen";
import Dropdown from "./Dropdown";

interface OrganisationInformationSectionProps {
  formData: UserType;
  errors: ValidationErrors;
  onChange: (field: string, value: string, type?: "text" | "number") => void;
  onBlur: (field: string) => void;
  onSelect: (field: string, value: string) => void;
}

const organisationalTypeOptions = [
  { value: "school", label: "School" },
  { value: "business", label: "Business" },
  { value: "ngo", label: "NGO" },
];

const yesNoOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const OrganisationInformationSection: React.FC<OrganisationInformationSectionProps> = ({
  formData,
  errors,
  onChange,
  onBlur,
  onSelect,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Organisation Information</Text>

      <View style={styles.grid}>
        <View style={styles.field}>
          <Text style={styles.label}>Organisational Type *</Text>
          <Dropdown
            value={(formData as any).organisationalType || ""}
            placeholder="Select Organisational Type"
            options={organisationalTypeOptions}
            error={errors.organisationalType}
            onChange={(value) => onSelect("organisationalType", value)}
            onBlur={() => onBlur("organisationalType")}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Is Company Registered? *</Text>
          <Dropdown
            value={(formData as any).isCompanyRegistered || ""}
            placeholder="Select Registration Status"
            options={yesNoOptions}
            error={errors.isCompanyRegistered}
            onChange={(value) => onSelect("isCompanyRegistered", value)}
            onBlur={() => onBlur("isCompanyRegistered")}
          />
        </View>

        {(formData as any)?.isCompanyRegistered === "Yes" && (
          <View style={styles.field}>
            <Text style={styles.label}>Date of Registration *</Text>
            <TextInput
              style={[
                styles.input,
                errors.dateOfRegistration && styles.inputErrorBorder,
              ]}
              placeholder="YYYY-MM-DD"
              value={(formData as any).dateOfRegistration || ""}
              onChangeText={(text) => onChange("dateOfRegistration", text)}
              onBlur={() => onBlur("dateOfRegistration")}
            />
            {!!errors.dateOfRegistration && (
              <Text style={styles.errorText}>
                ⚠ {errors.dateOfRegistration}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    backgroundColor: "#f8f9fa",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#071D6A",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#071D6A",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  field: {
    width: "100%",
    marginBottom: 12,
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
  inputErrorBorder: {
    borderColor: "#dc3545",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "#dc3545",
  },
});

export default OrganisationInformationSection;
