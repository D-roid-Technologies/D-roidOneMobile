import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TrainingScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const trainingModules = [
        { id: 1, title: 'React Native Fundamentals', duration: '4 hours', progress: 100, status: 'completed', category: 'Development' },
        { id: 2, title: 'Advanced TypeScript', duration: '6 hours', progress: 65, status: 'in-progress', category: 'Development' },
        { id: 3, title: 'UI/UX Best Practices', duration: '3 hours', progress: 0, status: 'not-started', category: 'Design' },
        { id: 4, title: 'Firebase Integration', duration: '5 hours', progress: 30, status: 'in-progress', category: 'Backend' },
        { id: 5, title: 'Team Collaboration', duration: '2 hours', progress: 100, status: 'completed', category: 'Soft Skills' },
        { id: 6, title: 'Security Best Practices', duration: '4 hours', progress: 0, status: 'not-started', category: 'Security' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return '#10B981';
            case 'in-progress': return '#F59E0B';
            case 'not-started': return '#6366F1';
            default: return '#999';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Development': return '#3B82F6';
            case 'Design': return '#EC4899';
            case 'Backend': return '#8B5CF6';
            case 'Soft Skills': return '#10B981';
            case 'Security': return '#EF4444';
            default: return '#999';
        }
    };

    const totalModules = trainingModules.length;
    const completedModules = trainingModules.filter(m => m.status === 'completed').length;
    const overallProgress = (completedModules / totalModules) * 100;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Training</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Overall Progress */}
                <View style={styles.overallCard}>
                    <View style={styles.overallHeader}>
                        <Ionicons name="school" size={40} color="#EC4899" />
                        <View style={styles.overallStats}>
                            <Text style={styles.overallTitle}>Training Progress</Text>
                            <Text style={styles.overallSubtitle}>
                                {completedModules} of {totalModules} modules completed
                            </Text>
                        </View>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${overallProgress}%` }]} />
                    </View>
                    <Text style={styles.progressPercentage}>{Math.round(overallProgress)}%</Text>
                </View>

                {/* Training Modules */}
                <Text style={styles.sectionTitle}>Available Modules</Text>
                {trainingModules.map((module) => (
                    <TouchableOpacity key={module.id} style={styles.moduleCard}>
                        <View style={styles.moduleHeader}>
                            <View style={styles.moduleTitleRow}>
                                <Text style={styles.moduleTitle}>{module.title}</Text>
                                <View style={[
                                    styles.categoryBadge,
                                    { backgroundColor: getCategoryColor(module.category) + '20' }
                                ]}>
                                    <Text style={[
                                        styles.categoryText,
                                        { color: getCategoryColor(module.category) }
                                    ]}>
                                        {module.category}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.moduleInfo}>
                            <View style={styles.infoItem}>
                                <Ionicons name="time-outline" size={14} color="#999" />
                                <Text style={styles.infoText}>{module.duration}</Text>
                            </View>
                            <View style={[
                                styles.statusBadge,
                                { backgroundColor: getStatusColor(module.status) + '20' }
                            ]}>
                                <Text style={[
                                    styles.statusText,
                                    { color: getStatusColor(module.status) }
                                ]}>
                                    {module.status.replace('-', ' ')}
                                </Text>
                            </View>
                        </View>

                        {module.progress > 0 && (
                            <View style={styles.moduleProgressContainer}>
                                <View style={styles.moduleProgressBar}>
                                    <View style={[
                                        styles.moduleProgressFill,
                                        { width: `${module.progress}%`, backgroundColor: getStatusColor(module.status) }
                                    ]} />
                                </View>
                                <Text style={styles.moduleProgressText}>{module.progress}%</Text>
                            </View>
                        )}

                        <TouchableOpacity style={[
                            styles.actionButton,
                            module.status === 'completed' && styles.actionButtonCompleted
                        ]}>
                            <Text style={styles.actionButtonText}>
                                {module.status === 'completed' ? 'Review' : module.status === 'in-progress' ? 'Continue' : 'Start'}
                            </Text>
                            <Ionicons 
                                name={module.status === 'completed' ? 'refresh' : 'play-circle'} 
                                size={18} 
                                color="#fff" 
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}

                {/* Certificates */}
                <TouchableOpacity style={styles.certificateCard}>
                    <Ionicons name="ribbon" size={32} color="#F59E0B" />
                    <Text style={styles.certificateTitle}>View Certificates</Text>
                    <Text style={styles.certificateText}>
                        Access your earned training certificates
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default TrainingScreen;

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
    overallCard: {
        backgroundColor: '#000c3a',
        padding: 20,
        borderRadius: 12,
        marginBottom: 24,
    },
    overallHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    overallStats: {
        marginLeft: 16,
        flex: 1,
    },
    overallTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    overallSubtitle: {
        fontSize: 13,
        color: '#999',
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#EC4899',
        borderRadius: 4,
    },
    progressPercentage: {
        fontSize: 14,
        fontWeight: '700',
        color: '#EC4899',
        textAlign: 'right',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
    },
    moduleCard: {
        backgroundColor: '#000c3a',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    moduleHeader: {
        marginBottom: 12,
    },
    moduleTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    moduleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        flex: 1,
        marginRight: 8,
    },
    categoryBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '700',
    },
    moduleInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    moduleProgressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    moduleProgressBar: {
        flex: 1,
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    moduleProgressFill: {
        height: '100%',
        borderRadius: 3,
    },
    moduleProgressText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#999',
        width: 40,
        textAlign: 'right',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EC4899',
        paddingVertical: 10,
        borderRadius: 8,
        gap: 6,
    },
    actionButtonCompleted: {
        backgroundColor: '#10B981',
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    certificateCard: {
        backgroundColor: '#000c3a',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    certificateTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginTop: 12,
        marginBottom: 8,
    },
    certificateText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
});
