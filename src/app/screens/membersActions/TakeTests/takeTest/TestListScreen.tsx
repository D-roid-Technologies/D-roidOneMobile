import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Questions } from './questions'; // Assuming questions.ts is in the same directory
import BackButton from '../../../../components/BackButton'; // Adjust path if needed
import { 
  Code2, 
  Database, 
  Server, 
  Smartphone, 
  Globe, 
  Terminal,
  Cpu,
  Layers,
  Hash
} from 'lucide-react-native';

const TestListScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [selectedDuration, setSelectedDuration] = useState('all');

    // Extract unique levels and durations
    const levels = useMemo(() => {
        const uniqueLevels = new Set(Questions.map((q) => q.level).filter(Boolean));
        return ["all", ...Array.from(uniqueLevels)];
    }, []);

    const durations = useMemo(() => {
        const uniqueDurations = new Set(Questions.map((q) => q.duration).filter(Boolean));
        return ["all", ...Array.from(uniqueDurations)];
    }, []);

    // Helper to map test titles to icons
    const getIconForTest = (title: string) => {
        const lowerTitle = title.toLowerCase();
        const iconProps = { size: 24, color: '#fff' };
        
        if (lowerTitle.includes('java') && !lowerTitle.includes('script')) return <Code2 {...iconProps} color="#f89820" />;
        if (lowerTitle.includes('javascript')) return <Globe {...iconProps} color="#f7df1e" />;
        if (lowerTitle.includes('python')) return <Terminal {...iconProps} color="#3776ab" />;
        if (lowerTitle.includes('react')) return <Code2 {...iconProps} color="#61dafb" />;
        if (lowerTitle.includes('node')) return <Server {...iconProps} color="#339933" />;
        if (lowerTitle.includes('sql')) return <Database {...iconProps} color="#00758f" />;
        if (lowerTitle.includes('php')) return <Server {...iconProps} color="#777bb4" />;
        if (lowerTitle.includes('swift')) return <Smartphone {...iconProps} color="#f05138" />;
        if (lowerTitle.includes('kotlin')) return <Smartphone {...iconProps} color="#7f52ff" />;
        if (lowerTitle.includes('ruby')) return <Code2 {...iconProps} color="#cc342d" />;
        if (lowerTitle.includes('c#')) return <Hash {...iconProps} color="#239120" />;
        if (lowerTitle.includes('c++')) return <Cpu {...iconProps} color="#00599c" />;
        
        return <Layers {...iconProps} />;
    };

    const filteredTests = useMemo(() => {
        return Questions.filter((test) => {
            const matchesSearch =
                !searchQuery ||
                test.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                test.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    
            const matchesLevel =
                selectedLevel === "all" || test.level === selectedLevel;
            const matchesDuration =
                selectedDuration === "all" || test.duration === selectedDuration;
    
            return matchesSearch && matchesLevel && matchesDuration;
        });
    }, [searchQuery, selectedLevel, selectedDuration]);

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedLevel("all");
        setSelectedDuration("all");
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
                <Text style={styles.headerTitle}>Take Tests</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search tests..."
                        placeholderTextColor="#9ca3af"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color="#9ca3af" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
                    <View style={styles.filterGroup}>
                        {levels.map(level => (
                            <TouchableOpacity 
                                key={`level-${level}`} 
                                style={[
                                    styles.filterChip, 
                                    selectedLevel === level && styles.filterChipActive
                                ]}
                                onPress={() => setSelectedLevel(level)}
                            >
                                <Text style={[
                                    styles.filterText,
                                    selectedLevel === level && styles.filterTextActive
                                ]}>
                                    {level === 'all' ? 'All Levels' : level}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                {/* Duration Filters - Optional second row or mixed? Let's keep separate for clarity if needed, or just combine.
                    For mobile, horizontal scroll of diverse filters is good. 
                */}

                <View style={styles.resultsInfo}>
                    <Text style={styles.resultsText}>
                        Showing {filteredTests.length} tests
                    </Text>
                    {(selectedLevel !== 'all' || selectedDuration !== 'all' || searchQuery) && (
                        <TouchableOpacity onPress={clearFilters}>
                            <Text style={styles.clearText}>Clear Filters</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* Test List */}
                <View style={styles.listContainer}>
                    {filteredTests.map((test, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.card}
                            onPress={() => navigation.navigate('TestDetailScreen', { testData: test })}
                        >
                            <View style={styles.cardHeader}>
                                <View style={styles.iconContainer}>
                                    {getIconForTest(test.title)}
                                </View>
                                <View style={styles.cardTitleContainer}>
                                    <Text style={styles.cardTitle}>{test.title}</Text>
                                    <Text style={styles.cardSubtitle} numberOfLines={1}>{test.subTitle}</Text>
                                </View>
                            </View>
                            
                            <Text style={styles.cardSummary} numberOfLines={2}>
                                {test.summary}
                            </Text>

                            <View style={styles.cardFooter}>
                                <View style={styles.metaItem}>
                                    <Ionicons name="time-outline" size={14} color="#6b7280" />
                                    <Text style={styles.metaText}>{test.duration}</Text>
                                </View>
                                <View style={styles.metaItem}>
                                    <Ionicons name="bar-chart-outline" size={14} color="#6b7280" />
                                    <Text style={styles.metaText}>{test.level}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

                    {filteredTests.length === 0 && (
                        <View style={styles.emptyState}>
                            <Ionicons name="search-outline" size={48} color="#d1d5db" />
                            <Text style={styles.emptyText}>No tests found matching your criteria</Text>
                            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                                <Text style={styles.clearButtonText}>Clear All Filters</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#071D6A",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFFFFF",
        textAlign: 'center',
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1f2937',
    },
    filtersScroll: {
        marginBottom: 16,
    },
    filterGroup: {
        flexDirection: 'row',
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    filterChipActive: {
        backgroundColor: '#071D6A',
        borderColor: '#071D6A',
    },
    filterText: {
        fontSize: 14,
        color: '#4b5563',
        fontWeight: '500',
    },
    filterTextActive: {
        color: '#fff',
    },
    resultsInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    resultsText: {
        fontSize: 14,
        color: '#6b7280',
    },
    clearText: {
        fontSize: 14,
        color: '#071D6A',
        fontWeight: '600',
    },
    listContainer: {
        gap: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#071D6A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardTitleContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#6b7280',
    },
    cardSummary: {
        fontSize: 14,
        color: '#4b5563',
        lineHeight: 20,
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        paddingTop: 12,
        gap: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#6b7280',
        marginTop: 12,
        marginBottom: 16,
    },
    clearButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#071D6A',
        borderRadius: 8,
    },
    clearButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
});

export default TestListScreen;
