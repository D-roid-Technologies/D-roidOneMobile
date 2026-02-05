import React, { ReactNode } from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: ReactNode | string; // Allow string for FontAwesome5 icon name
  color?: string;
  onPress: () => void;
}

const ServicesNewCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon = "cog",
  color = "#6366F1",
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && <FontAwesome5 name={icon as any} size={28} color="#fff" />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

export default ServicesNewCard;

const styles = StyleSheet.create({
  card: {
    width: width / 2 - 24,
    minHeight: 160,
    borderRadius: 16,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    textAlign: "center",
  },
  description: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },
});
