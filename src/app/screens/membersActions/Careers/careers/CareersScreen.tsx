import React, { ReactNode, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { Briefcase, GraduationCap, ArrowLeft } from "lucide-react-native";
import { DashboardCard } from "./components/DashboardCard";
import { MobileTrainingApplicationForm } from "./components/MobileTrainingApplicationForm";
// Adjust import path based on actual project structure relative to this file
import { RootState } from "../../../../redux/store";

type Job = {
  icon: ReactNode;
  title: string;
  type: string;
  location: string;
  description: string;
  url: string;
  subTitle?: string;
  summary: string;
  duration?: string;
  level?: string;
  tools?: string[];
  mode?: string;
  howToApply?: string;
  benefits?: string;
  gallery?: string[];
};

const CareersScreen: React.FC = () => {
  const [showContentMain, setShowContentMain] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showTitle, setShowTitle] = useState<string>("");
  const [showDesc, setShowDesc] = useState<string>("");

  const isUserLoggedIn = useSelector(
    (state: RootState) => state.user.isLoggedIn
  );

  const openings: Job[] = [
    {
      icon: <GraduationCap size={24} color="#3b82f6" />,
      title: "Story Writer / Content Manager",
      type: "Full-time",
      location: "Fully Remote",
      description:
        "D'roid Technologies Ltd is seeking a creative and detail-oriented Story Writer / Content Manager to shape and manage engaging written content across our SaaS platforms, blogs, and marketing materials. This role combines storytelling, content strategy, and digital publishing to help position our products and brand effectively in the Nigerian and global tech landscape.",
      url: "https://droidtechnologies.com/careers/story-writer-content-manager",
      subTitle: "Tell Stories That Power Software and Inspire Innovation",
      summary:
        "We're looking for a talented writer with a knack for storytelling and a strategic mindset to manage content that connects with audiences and elevates our SaaS brand.",
      duration: "Permanent",
      level: "Entry-level",
      tools: [
        "Grammarly",
        "WordPress",
        "Notion",
        "Google Docs",
        "SEO Tools (e.g., Ahrefs, SEMrush)",
        "CMS Platforms",
        "Basic HTML/CSS (optional)",
      ],
      mode: "Fully Remote",
      howToApply:
        "Submit your CV, writing portfolio, and a short cover letter via our careers page. Candidates with experience in SaaS or tech storytelling will be prioritized.",
      benefits:
        "Competitive salary, performance bonuses, professional development allowance, hybrid work flexibility, paid time off, access to premium content tools, and a dynamic, creative environment.",
      gallery: [
        "https://droidtechnologies.com/gallery/content-team.jpg",
        "https://droidtechnologies.com/gallery/brainstorm.jpg",
        "https://droidtechnologies.com/gallery/editorial.jpg",
      ],
    },
  ];

  const handleJobPress = (item: Job) => {
    if (isUserLoggedIn) {
      setShowContent(true);
      setShowContentMain(false);
      setShowTitle(item.title);
      setShowDesc(item.description);
    } else {
      Alert.alert(
        "Login Required",
        "Please log in to apply for this position."
      );
    }
  };

  const handleBack = () => {
    setShowContent(false);
    setShowContentMain(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {showContentMain && (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Careers</Text>
              <Text style={styles.headerSubtitle}>
                Join our team and help shape the future.
              </Text>
            </View>

            <View style={styles.grid}>
              {openings.map((item, index) => (
                <DashboardCard
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  onPress={() => handleJobPress(item)}
                />
              ))}
            </View>
          </ScrollView>
        )}

        {showContent && (
          <View style={styles.detailContainer}>
            <View style={styles.detailHeader}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <ArrowLeft size={20} color="#374151" />
                <Text style={styles.backButtonText}>Back to Careers</Text>
              </TouchableOpacity>
            </View>
            
            <View style={{ flex: 1 }}>
              <MobileTrainingApplicationForm 
                 programTitle={showTitle} 
                 onSuccess={() => {
                   // Optional: clean up or navigate back after success?
                   // For now, staying on the success screen of the form is fine.
                 }}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  grid: {
    gap: 16,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
});

export default CareersScreen;
