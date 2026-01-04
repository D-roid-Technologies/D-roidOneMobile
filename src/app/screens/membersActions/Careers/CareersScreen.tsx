import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CareersScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const openPositions = [
        {
            id: 1,
            title: "Senior React Native Developer",
            department: "Engineering",
            type: "Full-time",
            location: "Remote",
            experienceLevel: "Senior",
            salaryRange: "₦600,000 – ₦900,000 / month",
            postedDate: "2025-01-10",
            deadline: "2025-02-15",
            description:
                "We are looking for a Senior React Native Developer to lead the development of high-performance mobile applications for D'roid One users.",
            responsibilities: [
                "Develop and maintain React Native applications",
                "Collaborate with backend and UI/UX teams",
                "Optimize application performance",
                "Mentor junior developers",
            ],
            requirements: [
                "4+ years of React Native experience",
                "Strong knowledge of TypeScript",
                "Experience with Firebase and Redux",
                "Published apps on App Store or Play Store",
            ],
            benefits: [
                "Remote work flexibility",
                "Health insurance",
                "Paid annual leave",
                "Learning & development budget",
            ],
            contactEmail: "careers@droidtechnologies.com",
            status: "Open",
        },
        {
            id: 2,
            title: "UI/UX Designer",
            department: "Design",
            type: "Full-time",
            location: "Hybrid",
            experienceLevel: "Mid-level",
            salaryRange: "₦400,000 – ₦600,000 / month",
            postedDate: "2025-01-08",
            deadline: "2025-02-10",
            description:
                "We are seeking a creative UI/UX Designer to design intuitive and visually appealing user experiences across web and mobile platforms.",
            responsibilities: [
                "Design user flows, wireframes, and prototypes",
                "Collaborate with product managers and developers",
                "Conduct usability testing",
                "Maintain design consistency across products",
            ],
            requirements: [
                "2+ years of UI/UX design experience",
                "Proficiency in Figma or Adobe XD",
                "Strong portfolio of design work",
                "Understanding of mobile-first design principles",
            ],
            benefits: [
                "Hybrid work setup",
                "Health insurance",
                "Creative freedom",
                "Paid training workshops",
            ],
            contactEmail: "careers@droidtechnologies.com",
            status: "Open",
        },
    ];


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#ffffff" />
                </TouchableOpacity>

                <Text style={styles.header}>Careers</Text>
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

                <Text style={styles.sectionTitle}>Full Time Positions</Text>
                <Text style={styles.bannerTextA}>
                    Join our Full time positions by applying for any of the below.
                </Text>

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
                        <TouchableOpacity onPress={() => navigation.navigate("CareerDescriptionScreen", { position: job })} style={styles.applyButton}>
                            <Text style={styles.applyButtonText}>Apply Now</Text>
                            <Ionicons name="arrow-forward" size={16} color="#F59E0B" />
                        </TouchableOpacity>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Intership Positions</Text>
                <Text style={styles.bannerTextA}>
                    Join our Intership positions by applying for any of the below.
                </Text>
            </ScrollView>
        </View>
    );
};

export default CareersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
        paddingTop: 40
    },

    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
        paddingLeft: 10
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

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    /* Banner */
    banner: {
        backgroundColor: "#000c3a",
        padding: 24,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 30,
    },
    bannerTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#ffffff",
        marginTop: 12,
        marginBottom: 6,
    },
    bannerText: {
        fontSize: 14,
        color: "#E0E7FF",
        textAlign: "center",
        fontWeight: "300",
    },
    bannerTextA: {
        fontSize: 14,
        color: "#E0E7FF",
        textAlign: "left",
        fontWeight: "300",
        paddingBottom: 10
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
        color: "#000c3a",
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
        color: "#000c3a",
    },
});

