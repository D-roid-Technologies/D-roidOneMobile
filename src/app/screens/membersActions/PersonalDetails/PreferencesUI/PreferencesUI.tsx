import React, { Dispatch, SetStateAction, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Globe, Palette, Bell, Clock, Check } from "lucide-react-native";
import type { UserType } from "../../../../utils/Types";
const PRIMARY = "#21349a";

interface PreferencesUIProps {
  user: UserType | null;
  onChange: Dispatch<SetStateAction<UserType | null>>;
}

const PreferencesUI: React.FC<PreferencesUIProps> = ({ user, onChange }) => {
  const [preferences, setPreferences] = useState({
    language: "English",
    theme: "light",
    notificationPreference: "email",
    timeZone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onChange(
        user
          ? ({ ...user, preferences } as any)
          : ({ preferences } as any)
      );
      setSubmitted(true);
      setIsSubmitting(false);
    }, 500);
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Check size={36} color="#fff" />
        </View>

        <Text style={styles.successTitle}>Preferences Updated!</Text>
        <Text style={styles.successMessage}>
          Your account preferences have been saved successfully.
        </Text>

        <View style={styles.summaryBox}>
          <SummaryRow label="Language" value={preferences.language} />
          <SummaryRow label="Theme" value={preferences.theme} />
          <SummaryRow label="Notifications" value={preferences.notificationPreference} />
          <SummaryRow label="Time Zone" value={preferences.timeZone || "Not set"} />
        </View>

        <Pressable style={styles.backBtn} onPress={() => setSubmitted(false)}>
          <Text style={styles.backBtnText}>Modify Preferences</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Account Preferences</Text>
      <Text style={styles.subtitle}>
        Customize your account to suit your needs.
      </Text>

      <PreferenceCard
        icon={<Globe color="#fff" />}
        title="Preferred Language"
        description="Choose the language for your account interface"
      >
        <Picker
          selectedValue={preferences.language}
          onValueChange={(v) =>
            setPreferences((p) => ({ ...p, language: v }))
          }
        >
          <Picker.Item label="English" value="English" />
          <Picker.Item label="French" value="French" />
          <Picker.Item label="Spanish" value="Spanish" />
        </Picker>
      </PreferenceCard>

      <PreferenceCard
        icon={<Palette color="#fff" />}
        title="Theme Mode"
        description="Select your preferred visual theme"
      >
        <Picker
          selectedValue={preferences.theme}
          onValueChange={(v) =>
            setPreferences((p) => ({ ...p, theme: v }))
          }
        >
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
          <Picker.Item label="System Default" value="system" />
        </Picker>
      </PreferenceCard>

      <PreferenceCard
        icon={<Bell color="#fff" />}
        title="Notification Preference"
        description="How would you like to receive notifications?"
      >
        <Picker
          selectedValue={preferences.notificationPreference}
          onValueChange={(v) =>
            setPreferences((p) => ({
              ...p,
              notificationPreference: v,
            }))
          }
        >
          <Picker.Item label="Email" value="email" />
          <Picker.Item label="SMS" value="sms" />
          <Picker.Item label="Push Notification" value="push" />
        </Picker>
      </PreferenceCard>

      <PreferenceCard
        icon={<Clock color="#fff" />}
        title="Time Zone"
        description="Set your local time zone for accurate scheduling"
      >
        <Picker
          selectedValue={preferences.timeZone}
          onValueChange={(v) =>
            setPreferences((p) => ({ ...p, timeZone: v }))
          }
        >
          <Picker.Item label="Select Time Zone" value="" />
          <Picker.Item label="Africa/Lagos" value="Africa/Lagos" />
          <Picker.Item label="UTC" value="UTC" />
          <Picker.Item label="Europe/London" value="Europe/London" />
        </Picker>
      </PreferenceCard>

      <Pressable
        style={[styles.submitBtn, isSubmitting && { opacity: 0.6 }]}
        disabled={isSubmitting}
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>
          {isSubmitting ? "Saving..." : "Save Preferences"}
        </Text>
      </Pressable>
    </ScrollView>
  );
};
const PreferenceCard = ({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.iconBox}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
      </View>
    </View>

    <View style={styles.pickerWrapper}>{children}</View>
  </View>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#071D6A",
  },

  subtitle: {
    color: "#071D6A",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#C7D2FE",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  cardHeader: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#071D6A",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#071D6A",
  },

  cardDesc: {
    fontSize: 13,
    color: "#071D6A",
    marginTop: 4,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#A5B4FC",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#EEF2FF",
  },

  submitBtn: {
    marginTop: 12,
    backgroundColor: "#071D6A",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  successContainer: {
    padding: 24,
    alignItems: "center",
  },

  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  successTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  successMessage: {
    color: "#6b7280",
    textAlign: "center",
    marginVertical: 12,
  },

  summaryBox: {
    width: "100%",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 16,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  summaryLabel: {
    fontWeight: "600",
    color: "#333",
  },

  summaryValue: {
    color: PRIMARY,
    fontWeight: "600",
  },

  backBtn: {
    marginTop: 20,
    backgroundColor: PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  backBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default PreferencesUI;

