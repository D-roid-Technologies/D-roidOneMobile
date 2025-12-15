import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { TrainingItem } from "../types";
import DetailPage from "./DetailPage";

interface Props {
  item: TrainingItem;
  onContact?: () => void;
}

const TrainingDetail: React.FC<Props> = ({ item, onContact }) => {
  const bullets =
    item.program === "frontend"
      ? [
          "React fundamentals → advanced patterns",
          "Routing, forms, state management",
          "APIs, auth, and production workflows",
          "Portfolio project and mentorship",
        ]
      : [
          "Structured learning plan",
          "Hands-on guided projects",
          "Career preparation and feedback",
          "Practical delivery support",
        ];

  return (
    <View style={styles.wrap}>
      <Text style={styles.meta}>
        {item.duration ? `Duration: ${item.duration}` : ""}
        {item.duration && item.level ? "   •   " : ""}
        {item.level ? `Level: ${item.level}` : ""}
      </Text>

      <DetailPage
        title={item.title}
        description={item.description}
        bullets={bullets}
        onContact={onContact}
        contactLabel="Contact about this Training"
      />
    </View>
  );
};

export default TrainingDetail;

const styles = StyleSheet.create({
  wrap: { paddingTop: 4 },
  meta: { fontSize: 12, color: "#6B7280", marginBottom: 8 },
});
