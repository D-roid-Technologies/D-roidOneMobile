import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Calendar,
  Clock,
  BookOpen,
  Sword,
  ChevronLeft,
  ChevronRight,
  User,
  Eye,
  Heart,
  Shield,
  Film,
  Building,
  Flame,
  X,
} from "lucide-react-native";
import { Story } from "../storyReader/story.types";

interface Props {
  story: Story;
  onClose: () => void;
}

const { width } = Dimensions.get("window");

const StoryReader: React.FC<Props> = ({ story, onClose }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;

  // Reset state when story changes
  useEffect(() => {
    setCurrentChapter(0);
    setIsReading(false);
    setReadingProgress(0);
  }, [story.id]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;

    const progress = (offsetY / (contentHeight - layoutHeight)) * 100;
    setReadingProgress(Math.min(Math.max(progress, 0), 100));
  };

  const nextChapter = () => {
    if (currentChapter < story.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      // specific logic to scroll to top would go here if we had a ref to the scrollview
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const toggleReadingMode = () => {
    setIsReading(!isReading);
  };

  const getGenreIcon = () => {
    const genreLower = story.genre.toLowerCase();
    if (genreLower.includes("war") || genreLower.includes("action")) return <Sword color="#3B82F6" size={16} />;
    if (genreLower.includes("drama") || genreLower.includes("emotional")) return <Film color="#3B82F6" size={16} />;
    if (genreLower.includes("urban") || genreLower.includes("city")) return <Building color="#3B82F6" size={16} />;
    if (genreLower.includes("medical") || genreLower.includes("resilience")) return <Heart color="#3B82F6" size={16} />;
    return <BookOpen color="#3B82F6" size={16} />;
  };

  // --- Reading Mode View ---
  if (isReading) {
    const chapter = story.chapters[currentChapter];
    
    return (
      <SafeAreaView style={styles.readingContainer}>
        <StatusBar barStyle="light-content" />
        
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${readingProgress}%` }]} />
        </View>

        {/* Header */}
        <View style={styles.readingHeader}>
          <TouchableOpacity onPress={toggleReadingMode} style={styles.backButton}>
            <ChevronLeft color="#4B5563" size={20} />
            <Text style={styles.backButtonText}>Overview</Text>
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerChapterNum}>Chapter {chapter.id} of {story.chapters.length}</Text>
            <Text style={styles.headerChapterTitle} numberOfLines={1}>{chapter.title}</Text>
          </View>
          
          <Text style={styles.progressText}>{Math.round(readingProgress)}%</Text>
        </View>

        <ScrollView 
          style={styles.readingScrollView}
          contentContainerStyle={styles.readingContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.chapterHeader}>
            <Text style={styles.chapterTitleMain}>{chapter.title}</Text>
            <View style={styles.chapterMeta}>
              <Text style={styles.chapterMetaText}>Chapter {chapter.id}</Text>
              <Text style={styles.chapterMetaDot}>•</Text>
              <Text style={styles.chapterMetaText}>~5 min read</Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            {chapter.content.map((paragraph, index) => (
              <Text key={index} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </View>

          {/* Navigation */}
          <View style={styles.navigationFooter}>
            <TouchableOpacity 
              onPress={prevChapter} 
              disabled={currentChapter === 0}
              style={[styles.navButton, currentChapter === 0 && styles.navButtonDisabled]}
            >
              <ChevronLeft color={currentChapter === 0 ? "#9CA3AF" : "#2667cc"} size={20} />
              <Text style={[styles.navButtonText, currentChapter === 0 && styles.navButtonTextDisabled]}>Prev</Text>
            </TouchableOpacity>

            <View style={styles.chapterDots}>
              {story.chapters.map((_, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={() => setCurrentChapter(index)}
                  style={[styles.dot, index === currentChapter && styles.dotActive]}
                />
              ))}
            </View>

            <TouchableOpacity 
              onPress={nextChapter} 
              disabled={currentChapter === story.chapters.length - 1}
              style={[styles.navButton, currentChapter === story.chapters.length - 1 && styles.navButtonDisabled]}
            >
              <Text style={[styles.navButtonText, currentChapter === story.chapters.length - 1 && styles.navButtonTextDisabled]}>Next</Text>
              <ChevronRight color={currentChapter === story.chapters.length - 1 ? "#9CA3AF" : "#2667cc"} size={20} />
            </TouchableOpacity>
          </View>
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- Overview Mode View ---
  return (
    <View style={styles.container}>
      {/* Close Button for the Modal/Screen */}
      {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <X color="#111827" size={24} />
      </TouchableOpacity> */}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.genreTag}>
            {getGenreIcon()}
            <Text style={styles.genreText}>{story.genre}</Text>
          </View>

          <Text style={styles.heroTitle}>{story.title}</Text>
          <Text style={styles.heroSubtitle}>A D'roid Technologies Original</Text>

          <View style={styles.heroMeta}>
            <View style={styles.metaItem}>
              <User color="#6B7280" size={14} />
              <Text style={styles.metaText}>Elder Kemi</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock color="#6B7280" size={14} />
              <Text style={styles.metaText}>{story.runtime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Calendar color="#6B7280" size={14} />
              <Text style={styles.metaText}>{story.releaseDate}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>⭐ 4.8</Text>
            </View>
            <View style={styles.statItem}>
              <Eye color="#6B7280" size={14} />
              <Text style={styles.statValue}>2.4K</Text>
            </View>
            <View style={styles.statItem}>
              <Heart color="#6B7280" size={14} />
              <Text style={styles.statValue}>180</Text>
            </View>
          </View>

          <Text style={styles.description}>{story.description}</Text>

          <TouchableOpacity onPress={toggleReadingMode} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Start Reading</Text>
          </TouchableOpacity>
        </View>

        {/* Synopsis Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield color="#2667cc" size={20} />
            <Text style={styles.sectionTitle}>Synopsis</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.synopsisText}>{story.synopsis}</Text>
          </View>
        </View>

        {/* Themes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitleWithoutIcon}>Key Themes</Text>
          <View style={styles.themesGrid}>
            {story.themes.map((theme, index) => {
              const [title, desc] = theme.split(":");
              return (
                <View key={index} style={styles.themeCard}>
                    <Text style={styles.themeTitle}>{title}</Text>
                  <Text style={styles.themeDesc}>{desc}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Chapters Preview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen color="#2667cc" size={20} />
            <Text style={styles.sectionTitle}>Chapters</Text>
          </View>

          {story.chapters.map((chapter) => (
            <View key={chapter.id} style={styles.chapterCard}>
              <View style={styles.chapterCardHeader}>
                <Text style={styles.chapterCardTitle}>Chapter {chapter.id}: {chapter.title}</Text>
                <View style={styles.chapterTime}>
                   <Clock color="#9CA3AF" size={12} />
                   <Text style={styles.chapterTimeText}>5 min</Text>
                </View>
              </View>
              <Text style={styles.chapterPreview} numberOfLines={2}>
                {chapter.content[0]}
              </Text>
            </View>
          ))}
          
          <TouchableOpacity onPress={toggleReadingMode} style={styles.secondaryButton}>
             <Text style={styles.secondaryButtonText}>Begin Your Journey</Text>
          </TouchableOpacity>
          
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
};

export default StoryReader;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000105" },
  readingContainer: { flex: 1, backgroundColor: "#000105" },
  scrollView: { flex: 1 },
  closeButton: { position: "absolute", top: 16, right: 16, zIndex: 10, padding: 8 },
  
  // Hero
  heroSection: { padding: 20, alignItems: "center" },
  genreTag: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(59, 130, 246, 0.1)", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, marginBottom: 16 },
  genreText: { color: "#3B82F6", fontWeight: "600", fontSize: 12, marginLeft: 6, textTransform: "uppercase" },
  heroTitle: { fontSize: 28, fontWeight: "900", color: "#ffffff", textAlign: "center", marginBottom: 8 },
  heroSubtitle: { fontSize: 16, color: "#9ca3af", marginBottom: 16, fontStyle: "italic" },
  
  heroMeta: { flexDirection: "row", justifyContent: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { color: "#9ca3af", fontSize: 13 },
  
  statsContainer: { flexDirection: "row", justifyContent: "center", gap: 24, marginBottom: 24, paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#222", width: "100%" },
  statItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  statValue: { color: "#e0e0e0", fontWeight: "600", fontSize: 14 },
  
  description: { fontSize: 16, color: "#cbd5e1", textAlign: "center", lineHeight: 24, marginBottom: 24 },
  primaryButton: { backgroundColor: "#3B82F6", paddingVertical: 14, paddingHorizontal: 32, borderRadius: 30, width: "100%", alignItems: "center", shadowColor: "#3B82F6", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  
  // Generic Section
  section: { paddingHorizontal: 20, marginBottom: 30 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: "#ffffff" },
  sectionTitleWithoutIcon: { fontSize: 20, fontWeight: "800", color: "#ffffff", marginBottom: 12 },
  card: { backgroundColor: "#000c3a", padding: 16, borderRadius: 16, borderWidth: 1, borderColor: "#222" },
  synopsisText: { fontSize: 15, color: "#e0e0e0", lineHeight: 24 },
  
  // Themes
  themesGrid: { gap: 12 },
  themeCard: { backgroundColor: "#000c3a", padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#222" },
  themeTitle: { fontSize: 16, fontWeight: "700", color: "#ffffff", marginBottom: 4 },
  themeDesc: { fontSize: 14, color: "#9ca3af", lineHeight: 20 },
  
  // Chapters Scroll
  chapterCard: { marginBottom: 12, padding: 16, backgroundColor: "#000c3a", borderRadius: 12, borderWidth: 1, borderColor: "#222" },
  chapterCardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  chapterCardTitle: { fontSize: 16, fontWeight: "700", color: "#ffffff", flex: 1 },
  chapterTime: { flexDirection: "row", alignItems: "center", gap: 4 },
  chapterTimeText: { fontSize: 12, color: "#6B7280" },
  chapterPreview: { fontSize: 14, color: "#9ca3af" },
  
  secondaryButton: { backgroundColor: "rgba(59, 130, 246, 0.1)", paddingVertical: 14, borderRadius: 12, alignItems: "center", marginTop: 8 },
  secondaryButtonText: { color: "#3B82F6", fontSize: 16, fontWeight: "700" },
  
  // --- Reading Mode Styles ---
  progressBarContainer: { height: 4, backgroundColor: "#222", width: "100%" },
  progressBar: { height: "100%", backgroundColor: "#3B82F6" },
  
  readingHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#222", backgroundColor: "#000105" },
  backButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  backButtonText: { color: "#9ca3af", fontSize: 14, fontWeight: "600" },
  headerTitleContainer: { alignItems: "center", flex: 1, marginHorizontal: 8 },
  headerChapterNum: { fontSize: 10, color: "#6B7280", textTransform: "uppercase", fontWeight: "700" },
  headerChapterTitle: { fontSize: 14, fontWeight: "700", color: "#ffffff" },
  progressText: { fontSize: 12, color: "#9ca3af", width: 40, textAlign: "right" },
  
  readingScrollView: { flex: 1, backgroundColor: "#000105" },
  readingContent: { padding: 24 },
  
  chapterHeader: { marginBottom: 32, alignItems: "center" },
  chapterTitleMain: { fontSize: 24, fontWeight: "900", color: "#ffffff", textAlign: "center", marginBottom: 12 },
  chapterMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  chapterMetaText: { fontSize: 13, color: "#6B7280", textTransform: "uppercase", fontWeight: "600" },
  chapterMetaDot: { color: "#444" },
  
  textContainer: { marginBottom: 40 },
  paragraph: { fontSize: 18, lineHeight: 30, color: "#e0e0e0", marginBottom: 20, fontFamily: "System" },
  
  navigationFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTopWidth: 1, borderTopColor: "#222" },
  navButton: { flexDirection: "row", alignItems: "center", gap: 8, padding: 8 },
  navButtonDisabled: { opacity: 0.5 },
  navButtonText: { fontSize: 15, fontWeight: "600", color: "#3B82F6" },
  navButtonTextDisabled: { color: "#555" },
  
  chapterDots: { flexDirection: "row", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#222" },
  dotActive: { backgroundColor: "#3B82F6" },
});
