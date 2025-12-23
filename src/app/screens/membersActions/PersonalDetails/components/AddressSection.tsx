import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import type { UserType } from "../../../utils/Types";
import type { ValidationErrors } from "../PersonalDetailsScreen";

interface AddressSectionProps {
  formData: UserType;
  errors: ValidationErrors;
  onChange: (field: string, value: string, type?: "text" | "number") => void;
  onBlur: (field: string) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  formData,
  errors,
  onChange,
  onBlur,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View style={styles.field}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={[
              styles.input,
              errors.phone && styles.inputErrorBorder,
            ]}
            placeholder="e.g., +234 800 123 4567"
            value={(formData as any).phone || ""}
            onChangeText={(text) => onChange("phone", text)}
            onBlur={() => onBlur("phone")}
            keyboardType="phone-pad"
          />
          {!!errors.phone && (
            <Text style={styles.errorText}>⚠ {errors.phone}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Street Number *</Text>
          <TextInput
            style={[
              styles.input,
              errors.streetNumber && styles.inputErrorBorder,
            ]}
            placeholder="Enter street number"
            value={(formData as any).streetNumber || ""}
            onChangeText={(text) => onChange("streetNumber", text)}
            onBlur={() => onBlur("streetNumber")}
          />
          {!!errors.streetNumber && (
            <Text style={styles.errorText}>⚠ {errors.streetNumber}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Street Name *</Text>
          <TextInput
            style={[
              styles.input,
              errors.streetName && styles.inputErrorBorder,
            ]}
            placeholder="Enter street name"
            value={(formData as any).streetName || ""}
            onChangeText={(text) => onChange("streetName", text)}
            onBlur={() => onBlur("streetName")}
          />
          {!!errors.streetName && (
            <Text style={styles.errorText}>⚠ {errors.streetName}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>City *</Text>
          <TextInput
            style={[
              styles.input,
              errors.city && styles.inputErrorBorder,
            ]}
            placeholder="Enter city"
            value={(formData as any).city || ""}
            onChangeText={(text) => onChange("city", text)}
            onBlur={() => onBlur("city")}
          />
          {!!errors.city && (
            <Text style={styles.errorText}>⚠ {errors.city}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>State *</Text>
          <TextInput
            style={[
              styles.input,
              errors.state && styles.inputErrorBorder,
            ]}
            placeholder="Enter state"
            value={(formData as any).state || ""}
            onChangeText={(text) => onChange("state", text)}
            onBlur={() => onBlur("state")}
          />
          {!!errors.state && (
            <Text style={styles.errorText}>⚠ {errors.state}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Country *</Text>
          <TextInput
            style={[
              styles.input,
              errors.country && styles.inputErrorBorder,
            ]}
            placeholder="Enter country"
            value={(formData as any).country || ""}
            onChangeText={(text) => onChange("country", text)}
            onBlur={() => onBlur("country")}
          />
          {!!errors.country && (
            <Text style={styles.errorText}>⚠ {errors.country}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
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

export default AddressSection;
