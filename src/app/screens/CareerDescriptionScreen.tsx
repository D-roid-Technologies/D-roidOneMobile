import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const CareerDescriptionScreen: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const { position }: any = route.params;

    if (!position) {
        return (
            <View style={styles.container}>
                <Text style={styles.notFound}>Position not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={Platform.OS === "ios" ? "light-content" : "dark-content"}
                backgroundColor="transparent"
                translucent
            />

            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.header}>Job Details</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Job Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{position.title}</Text>
                    <Text style={styles.subInfo}>
                        {position.department} | {position.type} | {position.experienceLevel}
                    </Text>
                    <Text style={styles.subInfo}>
                        Location: {position.location}
                    </Text>
                    <Text style={styles.subInfo}>
                        Salary: {position.salaryRange}
                    </Text>
                    <Text style={styles.subInfo}>
                        Posted: {position.postedDate} | Deadline: {position.deadline}
                    </Text>
                    <Text style={styles.status}>
                        Status: {position.status}
                    </Text>
                </View>

                {/* Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Job Description</Text>
                    <Text style={styles.sectionContent}>{position.description}</Text>
                </View>

                {/* Responsibilities */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Responsibilities</Text>
                    {position.responsibilities.map((item: string, idx: number) => (
                        <Text key={idx} style={styles.listItem}>• {item}</Text>
                    ))}
                </View>

                {/* Requirements */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Requirements</Text>
                    {position.requirements.map((item: string, idx: number) => (
                        <Text key={idx} style={styles.listItem}>• {item}</Text>
                    ))}
                </View>

                {/* Benefits */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Benefits</Text>
                    {position.benefits.map((item: string, idx: number) => (
                        <Text key={idx} style={styles.listItem}>• {item}</Text>
                    ))}
                </View>

                {/* Contact */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact</Text>
                    <Text style={styles.sectionContent}>{position.contactEmail}</Text>
                </View>

                {/* Apply Button */}
                {position.status.toLowerCase() === "open" && (
                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={() => (navigation as any).navigate("InternshipApplication")}
                    >
                        <Text style={styles.applyButtonText}>Apply Now</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

export default CareerDescriptionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A0A1A",
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
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    infoContainer: {
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 4,
    },
    subInfo: {
        fontSize: 14,
        color: "#C7D2FE",
        marginBottom: 2,
    },
    status: {
        fontSize: 14,
        color: "#10B981",
        fontWeight: "700",
        marginTop: 4,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 6,
    },
    sectionContent: {
        color: "#E0E7FF",
        fontSize: 14,
        lineHeight: 22,
    },
    listItem: {
        color: "#E0E7FF",
        fontSize: 14,
        lineHeight: 22,
        marginLeft: 8,
    },
    notFound: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        marginTop: 50,
    },
    applyButton: {
        backgroundColor: "#10B981",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginTop: 24,
        shadowColor: "#10B981",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    applyButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginRight: 8,
    },
});