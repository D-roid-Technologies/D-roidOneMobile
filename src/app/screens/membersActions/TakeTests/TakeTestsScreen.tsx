import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  selectMembershipTier,
  TierType,
} from "../../../redux/slice/membershiptierslice";
import { useSelector } from "react-redux";

type MembershipTier = "Silver" | "Gold" | "Platinum";

const tierOrder: MembershipTier[] = ["Silver", "Gold", "Platinum"];

const hasAccess = (userTier: MembershipTier, contentTier: MembershipTier) => {
  return tierOrder.indexOf(userTier) >= tierOrder.indexOf(contentTier);
};

const TakeTestsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const membership = useSelector(selectMembershipTier);

  const isPlatinum = membership.tier === "Platinum";
  const isGoldOrAbove =
    membership.tier === "Gold" || membership.tier === "Platinum";

  const learningContent = [
    {
      id: "test-js",
      type: "test",
      title: "JavaScript Fundamentals",
      category: "programming",
      durationMinutes: 30,
      questions: 20,
      difficulty: "Beginner",
      membershipTier: "Silver" as MembershipTier,
    },
    {
      id: "course-rn",
      type: "course",
      title: "React Native Essentials",
      category: "programming",
      durationHours: 8,
      lessons: 12,
      difficulty: "Intermediate",
      membershipTier: "Gold" as MembershipTier,
    },
    {
      id: "test-uiux",
      type: "test",
      title: "UI/UX Principles",
      category: "design",
      durationMinutes: 25,
      questions: 15,
      difficulty: "Beginner",
      membershipTier: "Silver" as MembershipTier,
    },
    {
      id: "course-ts",
      type: "course",
      title: "Advanced TypeScript",
      category: "programming",
      durationHours: 10,
      lessons: 18,
      difficulty: "Advanced",
      membershipTier: "Platinum" as MembershipTier,
    },
    {
      id: "test-logic",
      type: "test",
      title: "Problem Solving",
      category: "general",
      durationMinutes: 40,
      questions: 20,
      difficulty: "Intermediate",
      membershipTier: "Gold" as MembershipTier,
    },
  ];

  const categories = [
    { id: "all", label: "All Content" },
    { id: "programming", label: "Programming" },
    { id: "design", label: "Design" },
    { id: "general", label: "General" },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "#10B981";
      case "Intermediate":
        return "#F59E0B";
      case "Advanced":
        return "#EF4444";
      default:
        return "#999";
    }
  };

  const filteredContent = (
    selectedCategory === "all"
      ? learningContent
      : learningContent.filter((item) => item.category === selectedCategory)
  ).filter((item) => hasAccess(membership.tier, item.membershipTier));

  const handleStartContent = (item: any) => {
    if (!hasAccess(membership.tier, item.membershipTier)) {
      Alert.alert(
        "Upgrade Required",
        `This content requires a ${item.membershipTier} membership.`,
        [
          {
            text: "Upgrade",
            onPress: () => navigation.navigate("UpgradeMembership"),
          },
        ],
      );
      return;
    }

    setSelectedContent(item);
    setDownloadModalVisible(true);
  };

  const handleDownload = () => {
    // Handle download logic here
    setDownloadModalVisible(false);
    // You can add navigation or download logic here
    // navigation.navigate(
    //   selectedContent.type === "course" ? "CourseDetail" : "TestDetail",
    //   { id: selectedContent.id }
    // );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.header}>Tests</Text>
      </View>

      {/* Membership Tier Bar */}
      <View style={styles.tierBar}>
        {tierOrder.map((tier) => {
          const isActive = membership.tier === tier;
          const isLocked =
            tierOrder.indexOf(tier) > tierOrder.indexOf(membership.tier);

          return (
            <View
              key={tier}
              style={[
                styles.tierChip,
                isActive && styles.tierActive,
                isLocked && styles.tierLocked,
              ]}
            >
              <Ionicons
                name={
                  isActive
                    ? "checkmark-circle"
                    : isLocked
                      ? "lock-closed"
                      : "ellipse-outline"
                }
                size={14}
                color={isActive ? "#10B981" : "#64748B"}
              />
              <Text
                style={[
                  styles.tierText,
                  isActive && styles.tierTextActive,
                  isLocked && styles.tierTextLocked,
                ]}
              >
                {tier}
              </Text>
            </View>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content Cards */}
        {filteredContent.map((item) => (
          <View key={item.id} style={styles.jobCard}>
            {/* Header */}
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{item.title}</Text>

              <View style={{ flexDirection: "row", gap: 6 }}>
                {/* Difficulty Badge */}
                <View
                  style={[
                    styles.typeBadge,
                    {
                      backgroundColor:
                        getDifficultyColor(item.difficulty) + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.typeText,
                      { color: getDifficultyColor(item.difficulty) },
                    ]}
                  >
                    {item.difficulty}
                  </Text>
                </View>

                {/* Membership Tier Badge */}
                <View
                  style={[
                    styles.typeBadge,
                    {
                      backgroundColor: getTierColor(item.membershipTier) + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.typeText,
                      { color: getTierColor(item.membershipTier) },
                    ]}
                  >
                    {item.membershipTier}
                  </Text>
                </View>
              </View>
            </View>

            {/* Type Label */}
            <Text style={styles.bannerTextA}>{getTypeLabel(item.type)}</Text>

            {/* Info */}
            <View style={styles.jobDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={14} color="#999" />
                <Text style={styles.detailText}>
                  {"durationMinutes" in item
                    ? `${item.durationMinutes} min`
                    : `${item.durationHours} hrs`}
                </Text>
              </View>

              {"questions" in item && (
                <View style={styles.detailItem}>
                  <Ionicons name="help-circle-outline" size={14} color="#999" />
                  <Text style={styles.detailText}>
                    {item.questions} questions
                  </Text>
                </View>
              )}

              {"lessons" in item && (
                <View style={styles.detailItem}>
                  <Ionicons name="book-outline" size={14} color="#999" />
                  <Text style={styles.detailText}>{item.lessons} lessons</Text>
                </View>
              )}
            </View>

            {/* Start/Apply Button */}
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => handleStartContent(item)}
            >
              <Text style={styles.applyButtonText}>
                {getPrimaryActionLabel(item.type)}
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#F59E0B" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Download Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={downloadModalVisible}
        onRequestClose={() => setDownloadModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            {/* <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setDownloadModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity> */}

            {/* Icon */}
            <View style={styles.modalIconContainer}>
              <Ionicons name="download-outline" size={48} color="#8B5CF6" />
            </View>

            {/* Title */}
            <Text style={styles.modalTitle}>Download Knowledge City App</Text>

            {/* Description */}
            <Text style={styles.modalDescription}>
              You are about to download the Knowledge City app to access this
              {selectedContent?.type === "course" ? " course" : " test"} and
              continue your learning journey.
            </Text>

            {/* Download Button */}
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={handleDownload}
            >
              <Ionicons name="download" size={20} color="#ffffff" />
              <Text style={styles.downloadButtonText}>Download Now</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setDownloadModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getTierColor = (tier: TierType) => {
  switch (tier) {
    case "Silver":
      return "#94A3B8";
    case "Gold":
      return "#000105";
    case "Platinum":
      return "#67E8F9";
    default:
      return "#CBD5E1";
  }
};

const getTypeLabel = (type: string) => (type === "course" ? "Course" : "Test");

const getPrimaryActionLabel = (type: string) =>
  type === "course" ? "Start Course" : "Start Test";

export default TakeTestsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000105",
    paddingTop: 40,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    paddingLeft: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
  },
  placeholder: {
    width: 24,
  },
  disabledBtn: {
    opacity: 0.45,
  },

  disabledText: {
    color: "#64748B",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  /* Categories */
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#C7D2FE",
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: "#8B5CF6",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000105",
  },
  categoryTextActive: {
    color: "#ffffff",
  },

  tierBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  tierBadgeText: {
    fontSize: 12,
    fontWeight: "900",
  },
  /* Test Card */
  testCard: {
    backgroundColor: "#C7D2FE",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  testHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000105",
    flex: 1,
    marginRight: 8,
  },

  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "800",
  },

  testInfo: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 14,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "400",
  },

  /* Start Button */
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#000105",
    gap: 6,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#ffffff",
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 6,
  },

  /* Bottom Action Bar */
  bottomActions: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#1E293B",
    backgroundColor: "#000105",
  },

  primaryActionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#C7D2FE",
    paddingVertical: 14,
    borderRadius: 10,
  },

  primaryActionText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#000105",
  },

  secondaryActionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    borderRadius: 10,
  },

  secondaryActionText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#ffffff",
  },
  /* Tier Bar */
  tierBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#020617",
  },

  tierChip: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 10,
    borderRadius: 10,
  },

  tierActive: {
    backgroundColor: "#022C22",
  },

  tierLocked: {
    opacity: 0.45,
  },

  tierText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#CBD5E1",
  },

  tierTextActive: {
    color: "#10B981",
  },

  tierTextLocked: {
    color: "#64748B",
  },
  /* Reused CareersScreen styles */
  jobCard: {
    backgroundColor: "#C7D2FE",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  jobTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000105",
    flex: 1,
    marginRight: 8,
  },

  typeBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.25)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 12,
    color: "#000c3a",
    fontWeight: "700",
  },

  jobDetails: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 14,
  },
  bannerTextA: {
    fontSize: 14,
    color: "#E0E7FF",
    textAlign: "left",
    fontWeight: "300",
    paddingBottom: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "400",
  },

  applyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000c3a",
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    position: "relative",
  },

  modalCloseButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },

  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000105",
    textAlign: "center",
    marginBottom: 12,
  },

  modalDescription: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },

  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#264fa1",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    marginBottom: 12,
  },

  downloadButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
  },

  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },

  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
  },
});
