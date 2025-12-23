import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onPress: () => void;
}

const ServiceCard: React.FC<Props> = ({ title, description, icon, onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      {!!icon && <View style={styles.iconWrap}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      {!!description && (
        <Text style={styles.desc} numberOfLines={4}>
          {description}
        </Text>
      )}
    </Pressable>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#000c3a",
    // Android shadow
    elevation: 3,
    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.2, // Increased opacity for dark mode
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    minHeight: 140,
  },
  pressed: {
    opacity: 0.85,
  },
  iconWrap: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    color: "#e0e0e0",
    lineHeight: 18,
  },
});
