import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { googleAppScriptService } from "../../../../googleAppScriptService/googleAppScriptService";

type DocKey =
  | "meansOfIdentification"
  | "proofOfAddress"
  | "educationCert"
  | "resume"
  | "medicalDoc"
  | "signature"
  | "passport"
  | "offerLetter";

type PickedFile = {
  name: string;
  size?: number;
  mimeType?: string;
  uri: string;
} | null;

const initialState: Record<DocKey, PickedFile> = {
  meansOfIdentification: null,
  proofOfAddress: null,
  educationCert: null,
  resume: null,
  medicalDoc: null,
  signature: null,
  passport: null,
  offerLetter: null,
};

const DocumentUploadUI: React.FC = () => {
  const user = useSelector((s: RootState) => s.auth?.user);
  const [documents, setDocuments] =
    useState<Record<DocKey, PickedFile>>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const rows = useMemo(
    () =>
      [
        ["meansOfIdentification", "Means of Identification"],
        ["proofOfAddress", "Proof of Address"],
        ["educationCert", "Education Certificate"],
        ["resume", "Resume"],
        ["medicalDoc", "Medical Document"],
        ["signature", "Signature"],
        ["passport", "Passport Photo"],
        ["offerLetter", "Offer Letter"],
      ] as [DocKey, string][],
    []
  );

  // WHY: RN doesn't have <input type="file">; use expo-document-picker.
  const pickFile = async (key: DocKey) => {
    const res = await DocumentPicker.getDocumentAsync({
      multiple: false,
      copyToCacheDirectory: true,
    });
    if (res.canceled) return;
    const f = res.assets?.[0];
    if (!f) return;

    if (f.size && f.size > 10 * 1024 * 1024) {
      Alert.alert("File too large", `${f.name ?? "File"} should be < 10MB.`);
      return;
    }

    setDocuments((s) => ({
      ...s,
      [key]: {
        name: f.name ?? "document",
        size: f.size,
        mimeType: f.mimeType,
        uri: f.uri,
      },
    }));
  };

  const clearFile = (key: DocKey) => {
    setDocuments((s) => ({ ...s, [key]: null }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Adapt your upload pipe (e.g., googleAppScriptService) to accept RN file URIs.
      await googleAppScriptService.uploadDocuments(user?.id, documents);
      setSubmitted(true);
      Alert.alert("Uploaded", "Documents uploaded successfully.");
    } catch (e) {
      Alert.alert("Upload failed", "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={dStyles.success}>
        <Text style={dStyles.successTitle}>Documents Uploaded</Text>
        <Text style={dStyles.muted}>We’ll review them shortly.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={dStyles.container}>
      <Text style={dStyles.title}>Document Uploads</Text>
      <View style={dStyles.card}>
        {rows.map(([key, label]) => {
          const f = documents[key];
          return (
            <View key={key} style={dStyles.row}>
              <View style={{ flex: 1 }}>
                <Text style={dStyles.rowLabel}>{label}</Text>
                {!!f && (
                  <Text style={dStyles.fileMeta} numberOfLines={1}>
                    {f.name}{" "}
                    {typeof f.size === "number"
                      ? `• ${(f.size / (1024 * 1024)).toFixed(2)} MB`
                      : ""}
                  </Text>
                )}
              </View>
              <View style={dStyles.rowActions}>
                {f ? (
                  <TouchableOpacity
                    onPress={() => clearFile(key)}
                    style={[dStyles.btn, dStyles.btnGhost]}
                  >
                    <Text style={[dStyles.btnText, dStyles.btnGhostText]}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  onPress={() => pickFile(key)}
                  style={dStyles.btn}
                >
                  <Text style={dStyles.btnText}>
                    {f ? "Replace" : "Choose"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={dStyles.submitBtn}
        >
          <Text style={dStyles.submitText}>
            {isSubmitting ? "Uploading…" : "Submit Documents"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const dStyles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    gap: 12,
  },
  rowLabel: { fontWeight: "600" },
  fileMeta: { color: "#6b7280", marginTop: 4, maxWidth: 220 },
  rowActions: { flexDirection: "row", gap: 8 },
  btn: {
    backgroundColor: "#111827",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: { color: "#fff", fontWeight: "600" },
  btnGhost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  btnGhostText: { color: "#111827" },
  submitBtn: {
    marginTop: 12,
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "600" },
  success: { padding: 24, alignItems: "center" },
  successTitle: { fontSize: 18, fontWeight: "600", marginBottom: 6 },
  muted: { color: "#6b7280" },
});

export default DocumentUploadUI;
