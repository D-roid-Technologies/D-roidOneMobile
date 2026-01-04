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
    const load = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser?.uid) return;

        const ref = doc(db, "securitySettings", currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setSecuritySettings(snap.data() as SecuritySettings);
        }
      } catch (error) {
        // console.log("Error loading security settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      onChange(
        user
          ? ({ ...user, securitySettings } as UserType)
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
      <View style={sStyles.textWrap}>
        <Text style={sStyles.rowTitle}>{title}</Text>
        {!!subtitle && <Text style={sStyles.rowSubtitle}>{subtitle}</Text>}
      </View>
    </View>

    <View style={sStyles.switchWrapper}>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  </View>
);

const sStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#ffffff",
  },

  card: {
    backgroundColor: "#C7D2FE",
    borderRadius: 16,
    padding: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },

  textWrap: {
    marginLeft: 12,
    flex: 1,
    paddingRight: 12,
  },

  switchWrapper: {
    paddingTop: 2,
  },

  rowTitle: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    color: "#071D6A",
  },

  rowSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: "#071D6A",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#A5B4FC",
    marginVertical: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    marginLeft: 8,
    color: "#071D6A",
    fontSize: 13,
  },

  button: {
    marginTop: 16,
    backgroundColor: "#071D6A",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  muted: {
    color: "#071D6A",
    marginTop: 8,
  },

  success: {
    padding: 24,
    alignItems: "center",
  },

  successTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    color: "#071D6A",
  },
});

export default SecuritySettingsUI;
