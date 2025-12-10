import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TakeTestsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const tests = [
        { id: 1, title: 'JavaScript Fundamentals', category: 'programming', duration: '30 min', questions: 20, difficulty: 'Beginner' },
        { id: 2, title: 'React Native Basics', category: 'programming', duration: '45 min', questions: 25, difficulty: 'Intermediate' },
        { id: 3, title: 'UI/UX Principles', category: 'design', duration: '25 min', questions: 15, difficulty: 'Beginner' },
        { id: 4, title: 'TypeScript Advanced', category: 'programming', duration: '60 min', questions: 30, difficulty: 'Advanced' },
        { id: 5, title: 'Problem Solving', category: 'general', duration: '40 min', questions: 20, difficulty: 'Intermediate' },
    ];

    const categories = [
        { id: 'all', label: 'All Tests' },
        { id: 'programming', label: 'Programming' },
        { id: 'design', label: 'Design' },
        { id: 'general', label: 'General' },
    ];

    const filteredTests = selectedCategory === 'all' 
        ? tests 
        : tests.filter(test => test.category === selectedCategory);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Beginner': return '#10B981';
            case 'Intermediate': return '#F59E0B';
            case 'Advanced': return '#EF4444';
            default: return '#999';
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Take Tests</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryChip,
                                selectedCategory === category.id && styles.categoryChipActive
                            ]}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === category.id && styles.categoryTextActive
                            ]}>
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Tests List */}
                {filteredTests.map((test) => (
                    <View key={test.id} style={styles.testCard}>
                        <View style={styles.testHeader}>
                            <Text style={styles.testTitle}>{test.title}</Text>
                            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(test.difficulty) + '20' }]}>
                                <Text style={[styles.difficultyText, { color: getDifficultyColor(test.difficulty) }]}>
                                    {test.difficulty}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.testInfo}>
                            <View style={styles.infoItem}>
                                <Ionicons name="time-outline" size={16} color="#999" />
                                <Text style={styles.infoText}>{test.duration}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Ionicons name="help-circle-outline" size={16} color="#999" />
                                <Text style={styles.infoText}>{test.questions} questions</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.startButton}>
                            <Text style={styles.startButtonText}>Start Test</Text>
                            <Ionicons name="play-circle-outline" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default TakeTestsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000105',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16,
        backgroundColor: '#000c3a',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    placeholder: {
        width: 40,
    },
    content: {
        padding: 16,
    },
    categoriesContainer: {
        marginBottom: 20,
    },
    categoryChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#000c3a',
        marginRight: 8,
    },
    categoryChipActive: {
        backgroundColor: '#8B5CF6',
    },
    categoryText: {
        fontSize: 14,
        color: '#999',
        fontWeight: '600',
    },
    categoryTextActive: {
        color: '#fff',
    },
    testCard: {
        backgroundColor: '#000c3a',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    testHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    testTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        flex: 1,
        marginRight: 8,
    },
    difficultyBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    difficultyText: {
        fontSize: 12,
        fontWeight: '600',
    },
    testInfo: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 12,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    infoText: {
        fontSize: 13,
        color: '#999',
    },
    startButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8B5CF6',
        paddingVertical: 10,
        borderRadius: 8,
        gap: 6,
    },
    startButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
});
