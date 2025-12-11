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
import { useDispatch } from "react-redux";
import { Check } from "lucide-react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase"; // keep your existing path if different
import { authService } from "../../../../redux/configuration/auth.service";
import {
  setConnectedApps,
  toggleApp,
} from "../../../../redux/slice/affiliatedAppsSlice";
import type { AppDispatch } from "../../../../redux/store";

interface ConnectedAppsState {
  knowledgeCity: boolean;
  nerves: boolean;
  muzik: boolean;
}

const AffiliatedApps: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [connectedApps, setConnectedAppsState] = useState<ConnectedAppsState>({
    knowledgeCity: false,
    nerves: false,
    muzik: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // WHY: mirror web logic, but use RN feedback + keep Firebase read.
  useEffect(() => {
    const loadAffiliatesData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser?.uid) return;
        const ref = doc(db, "affiliatedApps", currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as ConnectedAppsState;
          setConnectedAppsState((prev) => ({ ...prev, ...data }));
          dispatch(setConnectedApps(data));
        }
      } catch (e) {
        Alert.alert("Error", "Failed to load affiliated apps.");
      } finally {
        setInitialLoad(false);
      }
    };
    loadAffiliatesData();
  }, [dispatch]);

  const handleToggle = (key: keyof ConnectedAppsState) => {
    const next = { ...connectedApps, [key]: !connectedApps[key] };
    setConnectedAppsState(next);
    dispatch(toggleApp(key));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // keep your backend update here (omitted in original snippet)
      setSubmitted(true);
      Alert.alert("Saved", "Affiliated apps updated.");
    } catch {
      Alert.alert("Error", "Unable to update affiliates.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (initialLoad) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.muted}>Loading affiliated apps…</Text>
      </View>
    );
  }

  if (submitted) {
    return (
      <View style={styles.successWrap}>
        <Check size={48} />
        <Text style={styles.successTitle}>Preferences Updated</Text>
        <Text style={styles.muted}>
          Your affiliated apps were saved successfully.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Affiliated Apps</Text>
      <View style={styles.card}>
        <RowToggle
          label="KnowledgeCity"
          value={connectedApps.knowledgeCity}
          onValueChange={() => handleToggle("knowledgeCity")}
        />
        <RowToggle
          label="Nerves"
          value={connectedApps.nerves}
          onValueChange={() => handleToggle("nerves")}
        />
        <RowToggle
          label="Muzik"
          value={connectedApps.muzik}
          onValueChange={() => handleToggle("muzik")}
        />
        <TouchableOpacity
          disabled={isSubmitting}
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Saving…" : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RowToggle = ({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: () => void;
}) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

const styles = StyleSheet.create({
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
    paddingVertical: 10,
  },
  rowLabel: { fontSize: 16 },
  button: {
    marginTop: 16,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#111827",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  muted: { color: "#6b7280", marginTop: 8 },
  successWrap: { padding: 24, alignItems: "center" },
  successTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
  },
});

export default AffiliatedApps;
