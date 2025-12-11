import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Shield, Check, Mail, Smartphone } from "lucide-react-native";
import { authService } from "../../../../redux/configuration/auth.service";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";
import type { UserType } from "../../../../utils/Types";

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
}

interface SecuritySettingsUIProps {
  user: UserType | null;
  onChange: (u: UserType | null) => void;
}

const SecuritySettingsUI: React.FC<SecuritySettingsUIProps> = ({
  user,
  onChange,
}) => {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    loginAlerts: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  try {
    throw new Error("Security Test Error Breakpoint");
  } catch (e) {
    console.log("Component renders OK:", e);
  }
}, []);


  // WHY: keep original fetch pattern, show RN loader.


  useEffect(() => {

  const load = async () => {
    try {

      const currentUser = await authService.getCurrentUser();

      const ref = doc(db, "securitySettings", currentUser.uid);

      const snap = await getDoc(ref);

      if (!snap.exists()) {
      } else {
        console.log("No security settings doc found — using defaults");
      }
    } catch (error) {
      console.log("Error inside securitySettings load():", error);
    } finally {
      setIsLoading(false);
    }
  };

  load();
}, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // persist changes as needed
      onChange(
        user
          ? ({ ...user, securitySettings } as any)
          : ({ securitySettings } as any)
      );
      setSubmitted(true);
      Alert.alert("Saved", "Security settings updated.");
    } catch {
      Alert.alert("Error", "Failed to update security settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={sStyles.center}>
        <ActivityIndicator />
        <Text style={sStyles.muted}>Loading security…</Text>
      </View>
    );
  }

  if (submitted) {
    return (
      <View style={sStyles.success}>
        <Check size={48} />
        <Text style={sStyles.successTitle}>Security Updated</Text>
        <Text style={sStyles.muted}>Your settings have been saved.</Text>
      </View>
    );
  }

  return (
    <View style={sStyles.container}>
      <Text style={sStyles.title}>Security Settings</Text>

      <View style={sStyles.card}>
        <RowToggle
          icon={<Shield size={18} />}
          title="Two-Factor Authentication"
          subtitle="Add an extra layer of security to your account."
          value={securitySettings.twoFactorEnabled}
          onValueChange={(v) =>
            setSecuritySettings((s) => ({ ...s, twoFactorEnabled: v }))
          }
        />
        <RowToggle
          icon={<Mail size={18} />}
          title="Login Alerts"
          subtitle="Receive alerts when a new device signs in."
          value={securitySettings.loginAlerts}
          onValueChange={(v) =>
            setSecuritySettings((s) => ({ ...s, loginAlerts: v }))
          }
        />

        <View style={sStyles.divider} />

        <View style={sStyles.infoRow}>
          <Smartphone size={18} />
          <Text style={sStyles.infoText}>
            Manage trusted devices in your account page.
          </Text>
        </View>

        <TouchableOpacity
          style={sStyles.button}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={sStyles.buttonText}>
            {isSubmitting ? "Saving…" : "Save Settings"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RowToggle = ({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) => (
  <View style={sStyles.row}>
    <View style={sStyles.rowLeft}>
      {icon}
      <View style={{ marginLeft: 10 }}>
        <Text style={sStyles.rowTitle}>{title}</Text>
        {!!subtitle && <Text style={sStyles.rowSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

const sStyles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    // borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  rowTitle: { fontWeight: "600" },
  rowSubtitle: { color: "#6b7280", marginTop: 2 },
  divider: { height: 1, backgroundColor: "#e5e7eb", marginVertical: 12 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  infoText: { marginLeft: 8, color: "#374151" },
  button: {
    marginTop: 16,
    backgroundColor: "#111827",
    // borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  muted: { color: "#6b7280", marginTop: 8 },
  success: { padding: 24, alignItems: "center" },
  successTitle: { fontSize: 18, fontWeight: "600", marginTop: 8 },
});

export default SecuritySettingsUI;
