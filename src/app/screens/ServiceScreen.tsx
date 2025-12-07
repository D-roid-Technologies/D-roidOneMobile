import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Platform,
    LayoutAnimation,
    UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const servicesPosts = [
    {
        id: 1,
        title: "Software Development",
        description:
            "We build custom software solutions tailored to your business needs, including web apps, mobile apps, and enterprise systems.",
        howWeWork: "Our team follows agile methodology, working in sprints to deliver iterative progress with clear milestones.",
        howToPay: "Payments can be made via bank transfer, PayPal, or other digital payment platforms.",
        extra: "We offer post-launch support and maintenance packages to ensure your software runs smoothly.",
    },
    {
        id: 2,
        title: "Tech Training",
        description:
            "We provide hands-on tech training for individuals and organizations, covering programming, cloud computing, AI, and more.",
        howWeWork: "Our sessions are interactive, combining theory, practical projects, and personalized mentorship.",
        howToPay: "Pay per course, subscription packages, or group training options are available.",
        extra: "Certificates of completion are provided for all training programs.",
    },
    {
        id: 3,
        title: "Animation and Consultancy",
        description:
            "We create high-quality animations for marketing, education, and corporate presentations, and provide tech consultancy for businesses.",
        howWeWork: "We start with a consultation, draft storyboards or strategy plans, and iterate with client feedback.",
        howToPay: "Flexible payment options include milestones or full upfront payments depending on project size.",
        extra: "We also offer ongoing consultancy for animation and technology strategy to ensure business growth.",
    },
];

const ServicesScreen: React.FunctionComponent = ({ navigation }: any) => {
    const [expandedIds, setExpandedIds] = useState<number[]>([]);

    const toggleExpand = (id: any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (expandedIds.includes(id)) {
            setExpandedIds(expandedIds.filter((eid) => eid !== id));
        } else {
            setExpandedIds([...expandedIds, id]);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={Platform.OS === "ios" ? "light-content" : "dark-content"}
                backgroundColor="#203499"
            />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Our Services</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {servicesPosts.map((service) => {
                    const isExpanded = expandedIds.includes(service.id);
                    return (
                        <View key={service.id} style={styles.serviceCard}>
                            <TouchableOpacity
                                onPress={() => toggleExpand(service.id)}
                                style={styles.serviceHeader}
                            >
                                <Text style={styles.serviceTitle}>{service.title}</Text>
                                <Ionicons
                                    name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
                                    size={20}
                                    color="#fff"
                                />
                            </TouchableOpacity>

                            {isExpanded && (
                                <View style={styles.serviceContent}>
                                    <Text style={styles.sectionHeader}>Description</Text>
                                    <Text style={styles.serviceText}>{service.description}</Text>

                                    <Text style={styles.sectionHeader}>How We Work</Text>
                                    <Text style={styles.serviceText}>{service.howWeWork}</Text>

                                    <Text style={styles.sectionHeader}>How to Pay</Text>
                                    <Text style={styles.serviceText}>{service.howToPay}</Text>

                                    {service.extra && (
                                        <>
                                            <Text style={styles.sectionHeader}>Extras</Text>
                                            <Text style={styles.serviceText}>{service.extra}</Text>
                                        </>
                                    )}
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default ServicesScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000105" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#203499",
        height: 60,
    },
    headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
    scrollContainer: { padding: 16, paddingBottom: 50 },
    serviceCard: {
        backgroundColor: "#0A0A1A",
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    serviceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    serviceTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
    serviceContent: { marginTop: 10 },
    sectionHeader: { color: "#3B82F6", fontSize: 14, fontWeight: "600", marginTop: 10 },
    serviceText: { color: "#E0E7FF", fontSize: 14, lineHeight: 22, marginTop: 4 },
});
