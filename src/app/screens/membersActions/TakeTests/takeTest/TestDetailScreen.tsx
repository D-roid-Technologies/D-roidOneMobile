import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { 
  Clock, 
  BarChart2, 
  CheckCircle, 
  Play,
  FileText
} from 'lucide-react-native';
import BackButton from '../../../../components/BackButton';

const TestDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { testData } = route.params || {};

  if (!testData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Test data not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleStartTest = () => {
    navigation.navigate('QuizScreen', { testData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#071D6A" />

      {/* Header */}
      <View style={styles.header}>
          <BackButton 
              onPress={() => navigation.goBack()} 
              iconColor="#FFFFFF"
              backgroundColor="rgba(255, 255, 255, 0.2)"
          />
          <Text style={styles.headerTitle} numberOfLines={1}>{testData.title}</Text>
          <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.title}>{testData.title} Test</Text>
          <Text style={styles.subtitle}>{testData.subTitle}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaBadge}>
              <Clock size={16} color="#071D6A" />
              <Text style={styles.metaText}>{testData.duration}</Text>
            </View>
            <View style={styles.metaBadge}>
              <BarChart2 size={16} color="#071D6A" />
              <Text style={styles.metaText}>{testData.level}</Text>
            </View>
            {testData.quiz && (
              <View style={styles.metaBadge}>
                <FileText size={16} color="#071D6A" />
                <Text style={styles.metaText}>{testData.quiz.length} Questions</Text>
              </View>
            )}
          </View>
        </View>

        {/* Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.descriptionText}>{testData.description}</Text>
          <Text style={[styles.descriptionText, { marginTop: 8 }]}>{testData.summary}</Text>
        </View>

        {/* What You'll Learn */}
        {testData.learn && testData.learn.length > 0 && (
          <View style={styles.section}>
             <Text style={styles.sectionTitle}>What You'll Be Tested On</Text>
             {testData.learn.map((item: string, index: number) => (
                <View key={index} style={styles.learnItem}>
                  <CheckCircle size={20} color="#10b981" style={{ marginTop: 2 }} />
                  <Text style={styles.learnText}>{item}</Text>
                </View>
             ))}
          </View>
        )}

        {/* Tools */}
        {testData.tools && testData.tools.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tools & Technologies</Text>
            <View style={styles.tagsContainer}>
              {testData.tools.map((tool: string, index: number) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tool}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.startButton, (!testData.quiz || testData.quiz.length === 0) && styles.disabledButton]}
          onPress={handleStartTest}
          disabled={!testData.quiz || testData.quiz.length === 0}
        >
          <Text style={styles.startButtonText}>
            Start Test
          </Text>
          <Play size={20} color="#fff" fill="#fff" />
        </TouchableOpacity>
        {(!testData.quiz || testData.quiz.length === 0) && (
             <Text style={styles.warningText}>No questions available for this test yet.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#071D6A",
  },
  headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#FFFFFF",
      textAlign: 'center',
      flex: 1,
      marginHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    padding: 24,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 20,
    lineHeight: 24,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#071D6A',
    fontWeight: '600',
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 26,
  },
  learnItem: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
    paddingRight: 16,
  },
  learnText: {
    fontSize: 16,
    color: '#334155',
    flex: 1,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tagText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  startButton: {
    backgroundColor: '#071D6A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  disabledButton: {
    backgroundColor: '#94a3b8',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  warningText: {
    textAlign: 'center',
    color: '#ef4444',
    marginTop: 8,
    fontSize: 12,
  },
  backButton: {
      padding: 10,
      backgroundColor: '#071D6A',
      borderRadius: 5,
      marginTop: 20
  },
  backButtonText: {
      color: '#fff'
  }
});

export default TestDetailScreen;
