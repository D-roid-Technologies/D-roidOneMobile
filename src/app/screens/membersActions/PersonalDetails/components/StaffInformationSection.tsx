import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import type { UserType } from "../../../utils/Types";
import type { ValidationErrors } from "../PersonalDetailsScreen";
import Dropdown, { DropdownOption } from "./Dropdown";

interface StaffInformationSectionProps {
  formData: UserType;
  errors: ValidationErrors;
  onChange: (field: string, value: string, type?: "text" | "number") => void;
  onBlur: (field: string) => void;
  onSelect: (field: string, value: string) => void;
  employmentStatusOptions: DropdownOption[];
  workLocationOptions: DropdownOption[];
}

const StaffInformationSection: React.FC<StaffInformationSectionProps> = ({
  formData,
  errors,
  onChange,
  onBlur,
  onSelect,
  employmentStatusOptions,
  workLocationOptions,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Staff Information</Text>

      <View style={styles.grid}>
        <View style={styles.field}>
          <Text style={styles.label}>Position/Job Title *</Text>
          <TextInput
            style={[
              styles.input,
              errors.position && styles.inputErrorBorder,
            ]}
            placeholder="Enter position or job title"
            value={(formData as any)?.position || ""}
            onChangeText={(text) => onChange("position", text)}
            onBlur={() => onBlur("position")}
          />
          {!!errors.position && (
            <Text style={styles.errorText}>⚠ {errors.position}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Department *</Text>
          <TextInput
            style={[
              styles.input,
              errors.department && styles.inputErrorBorder,
            ]}
            placeholder="Enter department"
            value={(formData as any)?.department || ""}
            onChangeText={(text) => onChange("department", text)}
            onBlur={() => onBlur("department")}
          />
          {!!errors.department && (
            <Text style={styles.errorText}>⚠ {errors.department}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Employee ID *</Text>
          <TextInput
            style={[
              styles.input,
              errors.employeeId && styles.inputErrorBorder,
            ]}
            placeholder="Enter employee ID"
            value={(formData as any)?.employeeId || ""}
            onChangeText={(text) => onChange("employeeId", text)}
            onBlur={() => onBlur("employeeId")}
          />
          {!!errors.employeeId && (
            <Text style={styles.errorText}>⚠ {errors.employeeId}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Join Date *</Text>
          <TextInput
            style={[
              styles.input,
              errors.joinDate && styles.inputErrorBorder,
            ]}
            placeholder="YYYY-MM-DD"
            value={(formData as any)?.joinDate || ""}
            onChangeText={(text) => onChange("joinDate", text)}
            onBlur={() => onBlur("joinDate")}
          />
          {!!errors.joinDate && (
            <Text style={styles.errorText}>⚠ {errors.joinDate}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Employment Status *</Text>
          <Dropdown
            value={(formData as any)?.employmentStatus || ""}
            placeholder="Select Employment Status"
            options={employmentStatusOptions}
            error={errors.employmentStatus}
            onChange={(value) => onSelect("employmentStatus", value)}
            onBlur={() => onBlur("employmentStatus")}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Work Location *</Text>
          <Dropdown
            value={(formData as any)?.workLocation || ""}
            placeholder="Select Work Location"
            options={workLocationOptions}
            error={errors.workLocation}
            onChange={(value) => onSelect("workLocation", value)}
            onBlur={() => onBlur("workLocation")}
          />
        </View>
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

export default StaffInformationSection;
