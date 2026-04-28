import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from "react-native";

const ToolBoxOverview: React.FunctionComponent = ({ navigation }: any) => {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#ffffff" />
                </TouchableOpacity>

                <Text style={styles.header}>Tool Box</Text>
            </View>

            {/* Intro Card */}
            <View style={[styles.item, styles.unread]}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>What is the Tool Box?</Text>
                    <View style={styles.unreadDot} />
                </View>
                <Text style={styles.message}>
                    The Tool Box is a suite of high-performance developer utilities
                    designed to eliminate repetitive tasks. It’s not just code—it’s
                    a collection of refined frameworks and logic patterns ready
                    for immediate deployment.
                </Text>
                <View style={[styles.badge, styles.info]}>
                    <Text style={styles.badgeText}>Developer Infrastructure</Text>
                </View>
            </View>

            {/* Automation Logic */}
            <View style={styles.item}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>Rapid Deployment</Text>
                </View>
                <Text style={styles.message}>
                    Every tool follows a plug-and-play philosophy. Stop rebuilding
                    auth flows, network layers, and state management from scratch.
                    Import, configure, and ship your product faster.
                </Text>
                <Text style={styles.meta}>
                    Configure → Integrate → Optimize → Deploy
                </Text>
            </View>

            {/* System Performance */}
            <View style={styles.item}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>Precision Engineering</Text>
                </View>
                <Text style={styles.message}>
                    Each utility is stress-tested for scalability. We focus on
                    low-latency logic, memory management, and clean architecture
                    so your focus stays on the user experience.
                </Text>
                <View style={[styles.badge, styles.success]}>
                    <Text style={styles.badgeText}>Zero Latency Focus</Text>
                </View>
            </View>

            {/* Reusable Components */}
            <View style={styles.item}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>Component Library</Text>
                </View>
                <Text style={styles.message}>
                    Access a curated library of high-end UI components built with
                    React Native and Reanimated. Beautiful, fluid, and fully
                    accessible right out of the box.
                </Text>
                <View style={[styles.badge, styles.success]}>
                    <Text style={styles.badgeText}>Clean UI Patterns</Text>
                </View>
            </View>

            {/* Outcome */}
            <View style={styles.item}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>The Productive Edge</Text>
                </View>
                <Text style={styles.message}>
                    The Tool Box is built for engineers who value time. By utilizing
                    pre-built infrastructure, you reduce development cycles by up
                    to 40% without compromising on code quality.
                </Text>
                <Text style={styles.meta}>
                    Build faster. Build stronger. Build scalable.
                </Text>
            </View>

            {/* Anti-Bloat Policy */}
            <View style={styles.item}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>Zero Bloat Policy</Text>
                </View>
                <Text style={styles.message}>
                    Unlike heavy frameworks, the Tool Box is modular. Take only
                    the logic you need. No unnecessary dependencies, no hidden
                    weight—just pure, productive performance.
                </Text>
                <View style={[styles.badge, styles.error]}>
                    <Text style={styles.badgeText}>Optimized Build Size</Text>
                </View>
            </View>
            {/* Download Link */}
            <View style={styles.item}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>Get the Tool Box</Text>
                </View>
                <Text style={styles.message}>
                    Ready to streamline your workflow? Download the official
                    Tool Box app on the Google Play Store and start building
                    smarter today.
                </Text>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.devekene.ToolBox')}
                    style={[styles.badge, { backgroundColor: '#34A853' }]}
                >
                    <Text style={styles.badgeText}>Download on Google Play</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105", // Deep Professional Black
        padding: 16,
        paddingTop: 40,
    },

    /* Header */
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "900",
        color: "#ffffff",
    },

    /* Card */
    item: {
        backgroundColor: "#E2E8F0", // Slate grey/blue for a more "metal/tool" feel
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    unread: { opacity: 1 },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    mHeader: {
        fontSize: 20,
        fontWeight: "900",
        color: "#0F172A",
    },

    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#E64A19", // Your Primary Orange
    },

    message: {
        fontSize: 16,
        color: "#1E293B",
        marginTop: 8,
        fontWeight: "400",
        lineHeight: 22,
    },

    meta: {
        fontSize: 12,
        color: "#475569",
        marginTop: 10,
        fontWeight: "700",
        letterSpacing: 1,
        textTransform: 'uppercase'
    },

    badge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 12,
    },
    success: { backgroundColor: "#10B981" },
    error: { backgroundColor: "#F43F5E" },
    info: { backgroundColor: "#3B82F6" },

    badgeText: {
        fontSize: 11,
        fontWeight: "800",
        color: "#FFF",
    },
});

export default ToolBoxOverview;