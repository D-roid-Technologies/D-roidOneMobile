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
import { db } from "../../../../../firebase";
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

  const [connectedApps, setConnectedAppsState] =
    useState<ConnectedAppsState>({
      knowledgeCity: false,
      nerves: false,
      muzik: false,
    });

  const [initialLoad, setInitialLoad] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Load from Firestore (from droidaccount collection, user.affiliates path)
   */
  useEffect(() => {
    const load = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser?.uid) return;

        const ref = doc(db, "droidaccount", currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const userData = snap.data();
          const affiliates = userData?.user?.affiliates || {};
          
          // Transform from Firestore format { knowledgeCity: { user: boolean } }
          // to component state format { knowledgeCity: boolean }
          const transformedData: ConnectedAppsState = {
            knowledgeCity: affiliates.knowledgeCity?.user || false,
            nerves: affiliates.nerves?.user || false,
            muzik: affiliates.muzik?.user || false,
          };
          
          setConnectedAppsState(transformedData);
          dispatch(setConnectedApps(transformedData));
        }
      } catch (error) {
        console.error("Failed to load affiliated apps:", error);
        Alert.alert("Error", "Failed to load affiliated apps.");
      } finally {
        setInitialLoad(false);
      }
    };

    load();
  }, [dispatch]);

  /**
   * Mirror WEB handleToggle:
   * - Update local state
   * - Update Redux
   * - Persist immediately
   */
  const handleToggle = async (app: keyof ConnectedAppsState) => {
    const nextValue = !connectedApps[app];

    // optimistic UI
    setConnectedAppsState((prev) => ({
      ...prev,
      [app]: nextValue,
    }));

    dispatch(toggleApp(app));

    try {
      await authService.updateAffiliatesData({
        [app]: { user: nextValue },
      });
    } catch {
      // rollback on failure
      setConnectedAppsState((prev) => ({
        ...prev,
        [app]: !nextValue,
      }));
      Alert.alert("Error", `Failed to update ${app}`);
    }
  };

  /**
   * Save / confirmation (matches web success flow)
   */
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      setSubmitted(true);
      Alert.alert("Saved", "Affiliated apps updated.");
    } catch {
      Alert.alert("Error", "Unable to save changes.");
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
        <Text style={styles.successTitle}>Settings Updated</Text>
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
          label="Knowledge City"
          value={connectedApps.knowledgeCity}
          onToggle={() => handleToggle("knowledgeCity")}
        />
        <RowToggle
          label="Nerves"
          value={connectedApps.nerves}
          onToggle={() => handleToggle("nerves")}
        />
        <RowToggle
          label="Muzik"
          value={connectedApps.muzik}
          onToggle={() => handleToggle("muzik")}
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
  onToggle,
}: {
  label: string;
  value: boolean;
  onToggle: () => void;
}) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Switch value={value} onValueChange={onToggle} />
  </View>
);

const styles = StyleSheet.create({
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

  rowLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#071D6A",
  },

  button: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#071D6A",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
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

  successWrap: {
    padding: 24,
    alignItems: "center",
  },

  successTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    color: "#071D6A",
  },
});

export default AffiliatedApps;
