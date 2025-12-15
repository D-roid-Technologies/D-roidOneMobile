import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface Props {
  label?: string;
  onPress: () => void;
}

const BackButton: React.FC<Props> = ({ label = "Back", onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, pressed && styles.pressed]}>
      <Text style={styles.text}>← {label}</Text>
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  btn: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#F3F4F6",
  },
  pressed: { opacity: 0.85 },
  text: { fontSize: 14, fontWeight: "600", color: "#111827" },
});
