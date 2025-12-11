import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import type { UserType } from "../../../utils/Types";
import type { ValidationErrors } from "../PersonalDetailsScreen";
import Dropdown, { DropdownOption } from "./Dropdown";

interface SecurityInformationSectionProps {
  formData: UserType;
  errors: ValidationErrors;
  onChange: (field: string, value: string, type?: "text" | "number") => void;
  onBlur: (field: string) => void;
  onSelect: (field: string, value: string) => void;
  securityQuestionOptions: DropdownOption[];
}

const SecurityInformationSection: React.FC<SecurityInformationSectionProps> = ({
  formData,
  errors,
  onChange,
  onBlur,
  onSelect,
  securityQuestionOptions,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Security Information</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Security Question *</Text>
        <Dropdown
          value={(formData as any)?.securityQuestion || ""}
          placeholder="Select Security Question"
          options={securityQuestionOptions}
          error={errors.securityQuestion}
          onChange={(value) => onSelect("securityQuestion", value)}
          onBlur={() => onBlur("securityQuestion")}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Security Answer *</Text>
        <TextInput
          style={[
            styles.input,
            errors.securityAnswer && styles.inputErrorBorder,
          ]}
          placeholder="Enter your security answer"
          value={(formData as any).securityAnswer || ""}
          onChangeText={(text) => onChange("securityAnswer", text)}
          onBlur={() => onBlur("securityAnswer")}
        />
        {!!errors.securityAnswer && (
          <Text style={styles.errorText}>⚠ {errors.securityAnswer}</Text>
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
    borderColor: "#e1bee7",
    backgroundColor: "#f3e5f5",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7b1fa2",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#7b1fa2",
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

export default SecurityInformationSection;
