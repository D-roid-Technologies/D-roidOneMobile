import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from "react-native";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from "lucide-react-native";

// Enable LayoutAnimation on Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export interface ServiceDetailData {
  title: string;
  subTitle?: string;
  summary: string;
  icon?: React.ReactNode;
  stats?: { icon: React.ReactNode; text: string }[];
  tags?: string[]; // Tools & Technologies
  tagsLabel?: string;
  benefits?: string[]; // What you'll gain / Bullets
  benefitsLabel?: string;
  price?: string[];
}

interface Props {
  data: ServiceDetailData;
  onContact?: () => void;
  contactLabel?: string;
}

const ServiceDetailView: React.FC<Props> = ({
  data,
  onContact,
  contactLabel = "Contact Us",
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

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
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.container, isExpanded && styles.containerExpanded]}
        onPress={toggleExpand}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.titleWrapper}>
              {data.icon && <View style={styles.iconContainer}>{data.icon}</View>}
              <Text style={styles.title}>{data.title}</Text>
            </View>
            {!!data.subTitle && <Text style={styles.subTitle}>{data.subTitle}</Text>}
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
        {!!data.stats && data.stats.length > 0 && (
          <View style={styles.statsGrid}>
            {data.stats.map((stat, idx) => (
              <View key={idx} style={styles.statItem}>
                {stat.icon}
                <Text style={styles.statText}>{stat.text}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Summary */}
        <Text style={[styles.summary, isExpanded && styles.summaryExpanded]}>
          {data.summary}
        </Text>

        {/* Expanded Content */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            {/* Tags / Tools */}
            {!!data.tags && data.tags.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {data.tagsLabel || "Tools & Technologies"}
                </Text>
                <View style={styles.toolsWrapper}>
                  {data.tags.map((tag, index) => (
                    <View key={index} style={styles.toolBadge}>
                      <Text style={styles.toolBadgeText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Benefits */}
            {!!data.benefits && data.benefits.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {data.benefitsLabel || "Key Benefits"}
                </Text>
                <View style={styles.benefitsList}>
                  {data.benefits.map((benefit, index) => (
                    <View key={index} style={styles.benefitItem}>
                      <View style={styles.benefitBullet} />
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Pricing */}
            {!!data.price && data.price.length > 0 && (
              <View style={styles.pricingBox}>
                <Text style={styles.sectionTitle}>Investment Options</Text>
                {data.price.map((price, index) => (
                  <Text key={index} style={styles.priceItem}>
                    {price}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Contact Button */}
        <TouchableOpacity
          style={styles.contactButton}
          onPress={(e) => {
            handleContactClick();
          }}
        >
          <MessageCircle color="white" size={18} />
          <Text style={styles.contactButtonText}>{contactLabel}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ServiceDetailView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
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
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerContent: {
    flex: 1,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  iconContainer: {
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#071d6a",
    flex: 1,
  },
  subTitle: {
    color: "#64748b",
    fontSize: 14,
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
    gap: 12,
    marginBottom: 24,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  statText: {
    fontSize: 13,
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
    fontSize: 16,
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
