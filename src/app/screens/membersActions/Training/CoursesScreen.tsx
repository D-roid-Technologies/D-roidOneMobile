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

const CoursesScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const membership = useSelector(selectMembershipTier);

  const isPlatinum = membership.tier === "Platinum";
  const isGoldOrAbove =
    membership.tier === "Gold" || membership.tier === "Platinum";

  const courses = [
    {
      id: "course-rn",
      title: "React Native Essentials",
      category: "programming",
      durationHours: 8,
      lessons: 12,
      difficulty: "Intermediate",
      membershipTier: "Gold" as MembershipTier,
      description:
        "Master the fundamentals of React Native and build cross-platform mobile applications.",
      instructor: "John Doe",
    },
    {
      id: "course-ts",
      title: "Advanced TypeScript",
      category: "programming",
      durationHours: 10,
      lessons: 18,
      difficulty: "Advanced",
      membershipTier: "Platinum" as MembershipTier,
      description:
        "Deep dive into TypeScript's advanced features and type system.",
      instructor: "Jane Smith",
    },
    {
      id: "course-js",
      title: "JavaScript Fundamentals",
      category: "programming",
      durationHours: 6,
      lessons: 10,
      difficulty: "Beginner",
      membershipTier: "Silver" as MembershipTier,
      description:
        "Learn the core concepts of JavaScript programming from scratch.",
      instructor: "Mike Johnson",
    },
    {
      id: "course-uiux",
      title: "UI/UX Design Principles",
      category: "design",
      durationHours: 7,
      lessons: 14,
      difficulty: "Intermediate",
      membershipTier: "Gold" as MembershipTier,
      description:
        "Master user interface and user experience design principles.",
      instructor: "Sarah Williams",
    },
    {
      id: "course-figma",
      title: "Figma for Beginners",
      category: "design",
      durationHours: 5,
      lessons: 8,
      difficulty: "Beginner",
      membershipTier: "Silver" as MembershipTier,
      description: "Learn to create stunning designs using Figma.",
      instructor: "David Lee",
    },
    {
      id: "course-react",
      title: "React Advanced Patterns",
      category: "programming",
      durationHours: 12,
      lessons: 20,
      difficulty: "Advanced",
      membershipTier: "Platinum" as MembershipTier,
      description: "Explore advanced React patterns and best practices.",
      instructor: "Emily Chen",
    },
    {
      id: "course-nodejs",
      title: "Node.js Backend Development",
      category: "programming",
      durationHours: 9,
      lessons: 15,
      difficulty: "Intermediate",
      membershipTier: "Gold" as MembershipTier,
      description: "Build scalable backend applications with Node.js.",
      instructor: "Robert Brown",
    },
    {
      id: "course-python",
      title: "Python for Everyone",
      category: "programming",
      durationHours: 8,
      lessons: 12,
      difficulty: "Beginner",
      membershipTier: "Silver" as MembershipTier,
      description: "Start your programming journey with Python.",
      instructor: "Lisa Anderson",
    },
    {
      id: "course-branding",
      title: "Brand Identity Design",
      category: "design",
      durationHours: 6,
      lessons: 10,
      difficulty: "Intermediate",
      membershipTier: "Gold" as MembershipTier,
      description: "Create compelling brand identities and visual systems.",
      instructor: "Mark Taylor",
    },
    {
      id: "course-webdev",
      title: "Full Stack Web Development",
      category: "programming",
      durationHours: 15,
      lessons: 25,
      difficulty: "Advanced",
      membershipTier: "Platinum" as MembershipTier,
      description: "Become a full stack developer with modern technologies.",
      instructor: "Anna Martinez",
    },
  ];

  const categories = [
    { id: "all", label: "All Courses" },
    { id: "programming", label: "Programming" },
    { id: "design", label: "Design" },
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

  const filteredCourses = (
    selectedCategory === "all"
      ? courses
      : courses.filter((item) => item.category === selectedCategory)
  ).filter((item) => hasAccess(membership.tier, item.membershipTier));

  const handleStartCourse = (course: any) => {
    if (!hasAccess(membership.tier, course.membershipTier)) {
      Alert.alert(
        "Upgrade Required",
        `This course requires a ${course.membershipTier} membership.`,
        [
          {
            text: "Upgrade",
            onPress: () => navigation.navigate("UpgradeMembership"),
          },
        ],
      );
      return;
    }

    setSelectedCourse(course);
    setDownloadModalVisible(true);
  };

  const handleDownload = () => {
    // download logic here
    setDownloadModalVisible(false);
    // navigation.navigate("CourseDetail", { id: selectedCourse.id });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.header}>Courses</Text>
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

        {/* Course Cards */}
        {filteredCourses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            {/* Header */}
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle}>{course.title}</Text>

              <View style={{ flexDirection: "row", gap: 6 }}>
                {/* Difficulty Badge */}
                <View
                  style={[
                    styles.typeBadge,
                    {
                      backgroundColor:
                        getDifficultyColor(course.difficulty) + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.typeText,
                      { color: getDifficultyColor(course.difficulty) },
                    ]}
                  >
                    {course.difficulty}
                  </Text>
                </View>

                {/* Membership Tier Badge */}
                <View
                  style={[
                    styles.typeBadge,
                    {
                      backgroundColor:
                        getTierColor(course.membershipTier) + "20",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.typeText,
                      { color: getTierColor(course.membershipTier) },
                    ]}
                  >
                    {course.membershipTier}
                  </Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <Text style={styles.courseDescription}>{course.description}</Text>

            {/* Instructor */}
            <View style={styles.instructorRow}>
              <Ionicons name="person-outline" size={14} color="#666" />
              <Text style={styles.instructorText}>{course.instructor}</Text>
            </View>

            {/* Info */}
            <View style={styles.courseDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={14} color="#999" />
                <Text style={styles.detailText}>
                  {course.durationHours} hrs
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="book-outline" size={14} color="#999" />
                <Text style={styles.detailText}>{course.lessons} lessons</Text>
              </View>
            </View>

            {/* Start Button */}
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => handleStartCourse(course)}
            >
              <Text style={styles.startButtonText}>Start Course</Text>
              <Ionicons name="arrow-forward" size={16} color="#F59E0B" />
            </TouchableOpacity>
          </View>
        ))}

        {filteredCourses.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={64} color="#64748B" />
            <Text style={styles.emptyStateText}>No courses available</Text>
            <Text style={styles.emptyStateSubtext}>
              Check back later or upgrade your membership
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Bar */}
      {/* <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[styles.primaryActionBtn, !isPlatinum && styles.disabledBtn]}
          disabled={!isPlatinum}
          onPress={() => navigation.navigate("CreateCourse")}
        >
          <Ionicons
            name="create-outline"
            size={18}
            color={isPlatinum ? "#000105" : "#64748B"}
          />
          <Text
            style={[
              styles.primaryActionText,
              !isPlatinum && styles.disabledText,
            ]}
          >
            Create a Course
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryActionBtn,
            !isGoldOrAbove && styles.disabledBtn,
          ]}
          disabled={!isGoldOrAbove}
          onPress={() => navigation.navigate("UploadCourse")}
        >
          <Ionicons
            name="cloud-upload-outline"
            size={18}
            color={isGoldOrAbove ? "#ffffff" : "#94A3B8"}
          />
          <Text
            style={[
              styles.secondaryActionText,
              !isGoldOrAbove && styles.disabledText,
            ]}
          >
            Upload a Course
          </Text>
        </TouchableOpacity>
      </View> */}

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
              <Ionicons name="download-outline" size={48} color="#ffffff" />
            </View>

            {/* Title */}
            <Text style={styles.modalTitle}>Download Knowledge City App</Text>

            {/* Description */}
            <Text style={styles.modalDescription}>
              You are about to download the Knowledge City app to access this
              course and continue your learning journey.
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
      return "#F59E0B";
    case "Platinum":
      return "#67E8F9";
    default:
      return "#CBD5E1";
  }
};

export default CoursesScreen;

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

  /* Course Cards */
  courseCard: {
    backgroundColor: "#C7D2FE",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },

  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  courseTitle: {
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

  courseDescription: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 12,
    lineHeight: 20,
  },

  instructorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },

  instructorText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },

  courseDetails: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 14,
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

  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000c3a",
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

  /* Empty State */
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyStateText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#CBD5E1",
    marginTop: 16,
  },

  emptyStateSubtext: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 8,
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
    backgroundColor: "#264fa1",
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
