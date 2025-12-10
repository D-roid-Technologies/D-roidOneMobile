import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const onboardingSteps = [
        { id: 1, title: 'Welcome Package', description: 'Complete your welcome documentation', completed: true, icon: 'document-text' },
        { id: 2, title: 'Team Introduction', description: 'Meet your team members', completed: true, icon: 'people' },
        { id: 3, title: 'System Access', description: 'Set up your accounts and credentials', completed: true, icon: 'key' },
        { id: 4, title: 'Workspace Setup', description: 'Configure your development environment', completed: false, icon: 'desktop' },
        { id: 5, title: 'Company Policies', description: 'Review and acknowledge policies', completed: false, icon: 'shield-checkmark' },
        { id: 6, title: 'First Project', description: 'Get assigned to your first project', completed: false, icon: 'rocket' },
    ];

    const completedSteps = onboardingSteps.filter(step => step.completed).length;
    const progress = (completedSteps / onboardingSteps.length) * 100;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Onboarding</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Progress Card */}
                <View style={styles.progressCard}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>Your Progress</Text>
                        <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>
                        {completedSteps} of {onboardingSteps.length} steps completed
                    </Text>
                </View>

                {/* Welcome Message */}
                <View style={styles.welcomeCard}>
                    <Ionicons name="hand-right" size={32} color="#EAB308" />
                    <Text style={styles.welcomeTitle}>Welcome to D'roid Technologies!</Text>
                    <Text style={styles.welcomeText}>
                        Complete these onboarding steps to get started on your journey with us.
                    </Text>
                </View>

                {/* Onboarding Steps */}
                <Text style={styles.sectionTitle}>Onboarding Checklist</Text>
                {onboardingSteps.map((step) => (
                    <TouchableOpacity key={step.id} style={styles.stepCard}>
                        <View style={[
                            styles.stepIcon,
                            step.completed && styles.stepIconCompleted
                        ]}>
                            {step.completed ? (
                                <Ionicons name="checkmark" size={24} color="#fff" />
                            ) : (
                                <Ionicons name={step.icon as any} size={24} color="#EAB308" />
                            )}
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={[
                                styles.stepTitle,
                                step.completed && styles.stepTitleCompleted
                            ]}>
                                {step.title}
                            </Text>
                            <Text style={styles.stepDescription}>{step.description}</Text>
                        </View>
                        <Ionicons 
                            name={step.completed ? "checkmark-circle" : "chevron-forward"} 
                            size={24} 
                            color={step.completed ? "#10B981" : "#666"} 
                        />
                    </TouchableOpacity>
                ))}

                {/* Help Section */}
                <View style={styles.helpCard}>
                    <Ionicons name="help-circle-outline" size={24} color="#3B82F6" />
                    <Text style={styles.helpTitle}>Need Help?</Text>
                    <Text style={styles.helpText}>
                        Contact your onboarding buddy or HR team for assistance.
                    </Text>
                    <TouchableOpacity style={styles.helpButton}>
                        <Ionicons name="chatbubbles-outline" size={18} color="#fff" />
                        <Text style={styles.helpButtonText}>Contact Support</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default OnboardingScreen;

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
    progressCard: {
        backgroundColor: '#000c3a',
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    progressPercentage: {
        fontSize: 24,
        fontWeight: '700',
        color: '#EAB308',
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
        backgroundColor: '#EAB308',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 13,
        color: '#999',
    },
    welcomeCard: {
        backgroundColor: '#000c3a',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
    },
    welcomeTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginTop: 12,
        marginBottom: 8,
    },
    welcomeText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
    },
    stepCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000c3a',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    stepIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(234, 179, 8, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    stepIconCompleted: {
        backgroundColor: '#10B981',
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    stepTitleCompleted: {
        color: '#999',
        textDecorationLine: 'line-through',
    },
    stepDescription: {
        fontSize: 13,
        color: '#999',
    },
    helpCard: {
        backgroundColor: '#000c3a',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    helpTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginTop: 8,
        marginBottom: 8,
    },
    helpText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginBottom: 16,
    },
    helpButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3B82F6',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        gap: 6,
    },
    helpButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
});
