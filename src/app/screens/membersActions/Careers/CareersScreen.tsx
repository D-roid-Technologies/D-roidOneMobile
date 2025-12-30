import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CareersScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const openPositions = [
        { id: 1, title: 'Senior React Native Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
        { id: 2, title: 'UI/UX Designer', department: 'Design', type: 'Full-time', location: 'Hybrid' },
        { id: 3, title: 'Backend Engineer', department: 'Engineering', type: 'Full-time', location: 'On-site' },
        { id: 4, title: 'Product Manager', department: 'Product', type: 'Full-time', location: 'Remote' },
        { id: 5, title: 'DevOps Engineer', department: 'Engineering', type: 'Contract', location: 'Remote' },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Careers</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Banner */}
                <View style={styles.banner}>
                    <FontAwesome5 name="briefcase" size={40} color="#F59E0B" />
                    <Text style={styles.bannerTitle}>Join Our Team</Text>
                    <Text style={styles.bannerText}>
                        Build the future of technology with D'roid Technologies
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Open Positions</Text>

                {openPositions.map((job) => (
                    <View key={job.id} style={styles.jobCard}>
                        <View style={styles.jobHeader}>
                            <Text style={styles.jobTitle}>{job.title}</Text>
                            <View style={styles.typeBadge}>
                                <Text style={styles.typeText}>{job.type}</Text>
                            </View>
                        </View>
                        <View style={styles.jobDetails}>
                            <View style={styles.detailItem}>
                                <Ionicons name="business-outline" size={14} color="#999" />
                                <Text style={styles.detailText}>{job.department}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Ionicons name="location-outline" size={14} color="#999" />
                                <Text style={styles.detailText}>{job.location}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.applyButton}>
                            <Text style={styles.applyButtonText}>Apply Now</Text>
                            <Ionicons name="arrow-forward" size={16} color="#F59E0B" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default CareersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
    },

    /* Header */
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#000105",
    },
    backButton: {
        padding: 6,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "900",
        color: "#ffffff",
    },
    placeholder: {
        width: 24,
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    /* Banner */
    banner: {
        backgroundColor: "#C7D2FE",
        padding: 24,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 30,
    },
    bannerTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#000105",
        marginTop: 12,
        marginBottom: 6,
    },
    bannerText: {
        fontSize: 14,
        color: "#334155",
        textAlign: "center",
        fontWeight: "300",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#ffffff",
        marginBottom: 12,
        marginTop: 10,
    },

    /* Job Card */
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
        color: "#92400E",
        fontWeight: "700",
    },

    jobDetails: {
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

    /* Apply Button */
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
        color: "#92400E",
    },
});

