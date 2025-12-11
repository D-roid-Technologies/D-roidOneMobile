import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Globe, Palette, Bell, Clock, Check } from "lucide-react-native";
import type { UserType } from "../../../../utils/Types";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const options = useMemo(
    () => ({
      languages: ["English", "French", "Spanish", "German"],
      themes: ["light", "dark", "system"],
      notifications: ["email", "push", "sms", "none"],
      timeZones: ["Africa/Lagos", "UTC", "Europe/London", "America/New_York"],
    }),
    []
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Persist to your backend as needed.
      onChange(
        user
          ? { ...user, preferences: { ...preferences } as any }
          : ({ preferences } as any)
      );
      setSubmitted(true);
      Alert.alert("Saved", "Preferences updated.");
    } catch {
      Alert.alert("Error", "Failed to update preferences.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={pStyles.success}>
        <Check size={48} />
        <Text style={pStyles.successTitle}>Preferences Updated</Text>
        <Text style={pStyles.muted}>Your changes have been saved.</Text>
      </View>
    );
  }

  return (
    <View style={pStyles.container}>
      <Text style={pStyles.title}>Preferences</Text>

      <Section title="Language" icon={<Globe size={18} />}>
        <Chips
          values={options.languages}
          selected={preferences.language}
          onSelect={(v) => setPreferences((s) => ({ ...s, language: v }))}
        />
      </Section>

      <Section title="Theme" icon={<Palette size={18} />}>
        <Chips
          values={options.themes}
          selected={preferences.theme}
          onSelect={(v) => setPreferences((s) => ({ ...s, theme: v }))}
        />
      </Section>

      <Section title="Notifications" icon={<Bell size={18} />}>
        <Chips
          values={options.notifications}
          selected={preferences.notificationPreference}
          onSelect={(v) =>
            setPreferences((s) => ({ ...s, notificationPreference: v }))
          }
        />
      </Section>

      <Section title="Time Zone" icon={<Clock size={18} />}>
        <Chips
          values={options.timeZones}
          selected={preferences.timeZone}
          onSelect={(v) => setPreferences((s) => ({ ...s, timeZone: v }))}
        />
      </Section>

      <TouchableOpacity
        style={pStyles.button}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={pStyles.buttonText}>
          {isSubmitting ? "Saving…" : "Save Preferences"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <View style={pStyles.section}>
    <View style={pStyles.sectionHeader}>
      {icon}
      <Text style={pStyles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const Chips = ({
  values,
  selected,
  onSelect,
}: {
  values: string[];
  selected?: string;
  onSelect: (val: string) => void;
}) => (
  <View style={pStyles.chipsWrap}>
    {values.map((v) => {
      const active = selected === v;
      return (
        <TouchableOpacity
          key={v}
          onPress={() => onSelect(v)}
          style={[pStyles.chip, active && pStyles.chipActive]}
        >
          <Text style={[pStyles.chipText, active && pStyles.chipTextActive]}>
            {v}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const pStyles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  section: { marginBottom: 16 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionTitle: { marginLeft: 8, fontWeight: "600" },
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  chipActive: { backgroundColor: "#111827", borderColor: "#111827" },
  chipText: { color: "#111827" },
  chipTextActive: { color: "#fff" },
  button: {
    marginTop: 8,
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  success: { padding: 24, alignItems: "center" },
  successTitle: { fontSize: 18, fontWeight: "600", marginTop: 8 },
  muted: { color: "#6b7280", marginTop: 6 },
});

export default PreferencesUI;
