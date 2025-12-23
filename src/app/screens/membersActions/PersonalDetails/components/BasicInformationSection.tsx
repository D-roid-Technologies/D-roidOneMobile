import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import type { UserType } from "../../../utils/Types";
import type { ValidationErrors } from "../PersonalDetailsScreen";
import Dropdown from "./Dropdown";

interface BasicInformationSectionProps {
  formData: UserType;
  userType: string;
  errors: ValidationErrors;
  onChange: (field: string, value: string, type?: "text" | "number") => void;
  onBlur: (field: string) => void;
  onSelect: (field: string, value: string) => void;
}

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  formData,
  userType,
  errors,
  onChange,
  onBlur,
  onSelect,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Basic Information</Text>

      <View style={styles.grid}>
        <View style={styles.field}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={[
              styles.input,
              errors.firstName && styles.inputErrorBorder,
            ]}
            placeholder="Enter first name"
            value={(formData as any).firstName || ""}
            onChangeText={(text) => onChange("firstName", text)}
            onBlur={() => onBlur("firstName")}
          />
          {!!errors.firstName && (
            <Text style={styles.errorText}>⚠ {errors.firstName}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Last Name *</Text>
          <TextInput
            style={[
              styles.input,
              errors.lastName && styles.inputErrorBorder,
            ]}
            placeholder="Enter last name"
            value={(formData as any).lastName || ""}
            onChangeText={(text) => onChange("lastName", text)}
            onBlur={() => onBlur("lastName")}
          />
          {!!errors.lastName && (
            <Text style={styles.errorText}>⚠ {errors.lastName}</Text>
          )}
        </View>

        {userType !== "Organisation" && (
          <View style={styles.field}>
            <Text style={styles.label}>Middle Name</Text>
            <TextInput
              style={[
                styles.input,
                errors.middleName && styles.inputErrorBorder,
              ]}
              placeholder="Enter middle name"
              value={(formData as any).middleName || ""}
              onChangeText={(text) => onChange("middleName", text)}
              onBlur={() => onBlur("middleName")}
            />
            {!!errors.middleName && (
              <Text style={styles.errorText}>⚠ {errors.middleName}</Text>
            )}
          </View>
        )}

        {userType !== "Organisation" && (
          <View style={styles.field}>
            <Text style={styles.label}>Gender *</Text>
            <Dropdown
              value={(formData as any).gender || ""}
              placeholder="Select Gender"
              options={genderOptions}
              error={errors.gender}
              onChange={(value) => onSelect("gender", value)}
              onBlur={() => onBlur("gender")}
            />
          </View>
        )}

        {userType !== "Organisation" && (
          <View style={styles.field}>
            <Text style={styles.label}>Date of Birth *</Text>
            <TextInput
              style={[
                styles.input,
                errors.dateOfBirth && styles.inputErrorBorder,
              ]}
              placeholder="YYYY-MM-DD"
              value={(formData as any).dateOfBirth || ""}
              onChangeText={(text) => onChange("dateOfBirth", text)}
              onBlur={() => onBlur("dateOfBirth")}
            />
            {!!errors.dateOfBirth && (
              <Text style={styles.errorText}>⚠ {errors.dateOfBirth}</Text>
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
    borderColor: "#222",
    backgroundColor: "#000c3a",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#3B82F6",
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
    color: "#ffffff",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: "#1a1a2e",
    borderWidth: 1,
    borderColor: "#333",
    color: "#ffffff",
  },
  inputErrorBorder: {
    borderColor: "#dc3545",
    backgroundColor: "rgba(114, 28, 36, 0.2)",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "#f87171",
  },
});

export default BasicInformationSection;
