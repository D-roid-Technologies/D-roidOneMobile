import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import type { UserType } from "../../../utils/Types";

interface ReadOnlyInformationSectionProps {
  formData: UserType;
}

const ReadOnlyInformationSection: React.FC<ReadOnlyInformationSectionProps> = ({
  formData,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Read-Only Information</Text>

      <View style={styles.grid}>
        <View style={styles.field}>
          <Text style={styles.label}>User Type</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={(formData as any).userType}
            editable={false}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Unique ID</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={(formData as any).uniqueId}
            editable={false}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={(formData as any).email}
            editable={false}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Disability Status</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={(formData as any).disability ? "Yes" : "No"}
            editable={false}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Policy Agreement</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={(formData as any).agreeToPolicy ? "Yes" : "No"}
            editable={false}
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
  readOnlyInput: {
    backgroundColor: "#111",
    color: "#888",
  },
});

export default ReadOnlyInformationSection;
