import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  title: string;
  description: string;
  bullets?: string[];
  onContact?: () => void;
  contactLabel?: string;
}

const DetailPage: React.FC<Props> = ({
  title,
  description,
  bullets,
  onContact,
  contactLabel = "Contact",
}) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>

      {!!bullets?.length && (
        <View style={styles.bullets}>
          {bullets.map((b, idx) => (
            <View key={`${idx}-${b}`} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{b}</Text>
            </View>
          ))}
        </View>
      )}

      {!!onContact && (
        <Pressable onPress={onContact} style={({ pressed }) => [styles.cta, pressed && styles.pressed]}>
          <Text style={styles.ctaText}>{contactLabel}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 6,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  bullets: {
    marginTop: 14,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: 12,
  },
  bulletRow: { flexDirection: "row", marginBottom: 8 },
  bulletDot: { width: 16, fontSize: 16, color: "#111827" },
  bulletText: { flex: 1, fontSize: 14, color: "#111827", lineHeight: 20 },
  cta: {
    marginTop: 18,
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  pressed: { opacity: 0.9 },
  ctaText: { color: "#fff", fontSize: 14, fontWeight: "700" },
});
