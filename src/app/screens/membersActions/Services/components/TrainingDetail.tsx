import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from "react-native";
import { ChevronDown, ChevronUp, Code, Clock, Users, Award, MessageCircle } from "lucide-react-native";
import type { TrainingItem } from "../types";
import { trainingPrograms } from "../data/trainingPrograms";

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface Props {
  item: TrainingItem;
  onContact?: () => void;
}

const TrainingDetail: React.FC<Props> = ({ item, onContact }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const programData = trainingPrograms.find((p) => p.id === item.program);

  // Fallback if no matching program found
  if (!programData) return null;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const handleContactClick = () => {
    if (onContact) {
      onContact();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.container,
        isExpanded && styles.containerExpanded
      ]}
      onPress={toggleExpand}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleWrapper}>
            {programData.icon}
            <Text style={styles.title}>{programData.title}</Text>
          </View>
          <Text style={styles.subTitle}>{programData.subTitle}</Text>
        </View>

        <View style={styles.iconWrapper}>
          {isExpanded ? (
            <ChevronUp color="#2667cc" size={20} />
          ) : (
            <ChevronDown color="#2667cc" size={20} />
          )}
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Clock color="#2667cc" size={16} />
          <Text style={styles.statText}>{programData.duration}</Text>
        </View>

        <View style={styles.statItem}>
          <Users color="#2667cc" size={16} />
          <Text style={styles.statText}>{programData.level}</Text>
        </View>

        <View style={styles.statItem}>
          <Award color="#2667cc" size={16} />
          <Text style={styles.statText}>Certificate</Text>
        </View>
      </View>

      {/* Summary */}
      <Text style={[styles.summary, isExpanded && styles.summaryExpanded]}>
        {programData.summary}
      </Text>

      {/* Expanded Content */}
      {isExpanded && (
        <View style={styles.expandedContent}>
          {/* Tools & Technologies */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tools & Technologies</Text>
            <View style={styles.toolsWrapper}>
              {programData.tools.map((tool, index) => (
                <View key={index} style={styles.toolBadge}>
                  <Text style={styles.toolBadgeText}>{tool}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What You'll Gain</Text>
            <View style={styles.benefitsList}>
              {programData.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <View style={styles.benefitBullet} />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Pricing */}
          <View style={styles.pricingBox}>
            <Text style={styles.sectionTitle}>Investment Options</Text>
            {programData.price.map((price, index) => (
              <Text key={index} style={styles.priceItem}>
                {price}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Contact Button */}
      {/* We put the button OUTSIDE the expanded check usually, but in the reference it was at the bottom.
          If we want it to be clickable without expanding, we might need zIndex or stopPropagation.
          However, the container itself is a TouchableOpacity.
          So clicking the button might trigger the container toggle if we don't handle it.
      */}
      <TouchableOpacity
        style={styles.contactButton}
        onPress={(e) => {
          // In RN, events bubble differently, but nested Touchable usually handles it.
          // We need to ensure this doesn't toggle expand.
          handleContactClick();
        }}
      >
        <MessageCircle color="white" size={18} />
        <Text style={styles.contactButtonText}>Contact Us</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TrainingDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20, // 2rem approx 32, but 20 is safer for mobile density
    shadowColor: "#071d6a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 5,
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 20,
  },
  containerExpanded: {
    borderColor: "#2667cc",
  },
  header: {
    flexDirection: "row", // display: flex
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24, // 1.5rem
  },
  headerContent: {
    flex: 1,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20, // 1.5rem
    fontWeight: "700",
    color: "#071d6a",
    marginLeft: 8,
    flex: 1, // Wrap text if long
  },
  subTitle: {
    color: "#64748b",
    fontSize: 14, // 1rem
    marginBottom: 16,
    lineHeight: 20,
  },
  iconWrapper: {
    backgroundColor: "#f1f5f9",
    padding: 8,
    borderRadius: 8,
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12, // Gap support in newer RN or use margin
    marginBottom: 24,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    marginRight: 8, // fallback for gap
    marginBottom: 8,
  },
  statText: {
    fontSize: 13, // 0.9rem
    color: "#475569",
    fontWeight: "500",
    marginLeft: 6,
  },
  summary: {
    color: "#334155",
    lineHeight: 22,
    marginBottom: 24,
    fontSize: 15,
  },
  summaryExpanded: {
    marginBottom: 32,
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16, // 1.1rem
    fontWeight: "600",
    color: "#071d6a",
    marginBottom: 16,
  },
  toolsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  toolBadge: {
    backgroundColor: "#2667cc",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 6,
  },
  toolBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  benefitsList: {
    //
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  benefitBullet: {
    width: 6,
    height: 6,
    backgroundColor: "#2667cc",
    borderRadius: 3,
    marginTop: 8,
    marginRight: 8,
  },
  benefitText: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  pricingBox: {
    backgroundColor: "#f8fafc",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  priceItem: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 8,
    fontWeight: "500",
  },
  contactButton: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#2667cc",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2667cc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  contactButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
