import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { StoryItem } from "../types";

interface Props {
  story: StoryItem;
}

const StoryDetail: React.FC<Props> = ({ story }) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.desc}>{story.description}</Text>
      <View style={styles.bodyWrap}>
        <Text style={styles.body}>{story.content}</Text>
      </View>
    </View>
  );
};

export default StoryDetail;

const styles = StyleSheet.create({
  wrap: { paddingBottom: 24 },
  title: { fontSize: 22, fontWeight: "800", color: "#111827", marginBottom: 8 },
  desc: { fontSize: 13, color: "#6B7280", marginBottom: 14 },
  bodyWrap: {
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: 12,
  },
  body: { fontSize: 14, color: "#111827", lineHeight: 21 },
});
