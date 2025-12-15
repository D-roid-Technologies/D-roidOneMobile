import React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

/**
 * Minimal, dependency-free WhatsApp floating button.
 * If you prefer an icon, swap the content with lucide-react-native or vector-icons.
 */
interface Props {
  phone?: string; // international format without "+", e.g. 2348012345678
  message?: string;
}

const WhatsAppButton: React.FC<Props> = ({
  phone = "2348012345678",
  message = "Hello, I would like to make an enquiry.",
}) => {
  const openWhatsApp = async () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    const can = await Linking.canOpenURL(url);
    if (can) await Linking.openURL(url);
  };

  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      <Pressable onPress={openWhatsApp} style={({ pressed }) => [styles.fab, pressed && styles.pressed]}>
        <Text style={styles.label}>WhatsApp</Text>
      </Pressable>
    </View>
  );
};

export default WhatsAppButton;

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    right: 16,
    bottom: 18,
  },
  fab: {
    backgroundColor: "#16a34a",
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  pressed: { opacity: 0.9 },
  label: { color: "#fff", fontSize: 14, fontWeight: "800" },
});
