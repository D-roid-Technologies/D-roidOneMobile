import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
    Platform,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen: React.FC = () => {
    const [user] = useState({
        name: "John Doe",
        email: "john.doe@email.com",
        accountType: "Member Account",
        memberId: "DR-10452",
        initials: "JD",
    });

    const memberStats = [
        { title: "Membership", value: "Active", change: "Since 2023" },
        { title: "Member Level", value: "Silver", change: "Next: Gold" },
    ];

    const quickActions = [
        { title: "Personal Details", icon: "user", color: "#3B82F6" },
        { title: "Services", icon: "cogs", color: "#10B981" },
        { title: "Careers", icon: "briefcase", color: "#F59E0B" },
        { title: "Take Tests", icon: "clipboard-check", color: "#8B5CF6" },
    ];

    const events = [
        { title: "AI & Automation Expo", date: "Oct 20, 2025" },
        { title: "Tech Careers Fair", date: "Nov 12, 2025" },
        { title: "Mobile Dev Bootcamp", date: "Dec 05, 2025" },
    ];

    const analytics = [
        { metric: "Projects", value: "15" },
        { metric: "Completed Tasks", value: "68" },
        { metric: "Active Teams", value: "4" },
    ];

    const getGreeting = (): string => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            return "Good morning 🌅";
        } else if (currentHour < 18) {
            return "Good afternoon ☀️";
        } else {
            return "Good evening 🌙";
        }
    };

    const greeting = getGreeting();


    return (
        <LinearGradient
            colors={["#F3F4F6", "#FFFFFF"]}
            style={styles.container}
        >
            <StatusBar
                barStyle={Platform.OS === "ios" ? "light-content" : "dark-content"}
                backgroundColor="#203499"
            />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity>
                        <Ionicons name="menu" size={26} color="#071D6A" />
                    </TouchableOpacity>
                    {/* <Text style={styles.headerName}>D'roid One</Text> */}
                </View>

                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
                        <Ionicons name="settings-outline" size={22} color="#071D6A" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="notifications-outline" size={22} color="#071D6A" />
                    </TouchableOpacity>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{user.initials}</Text>
                    </View>
                </View>
            </View>

            {/* Greeting */}
            <View style={styles.greetingContainer}>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.greetingText}>{greeting}</Text>
                            <Text style={styles.userName}>{user.name}</Text>
                        </View>
                        <Text style={styles.userEmail}>{user.email}</Text>
                    </View>

                    <Text style={styles.userDetails}>
                        {user.accountType} • ID: {user.memberId}
                    </Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
            >
                {/* Membership Overview */}
                <Text style={styles.sectionTitle}>Membership Overview</Text>
                <View style={styles.statsContainer}>
                    {memberStats.map((stat, index) => (
                        <View key={index} style={styles.statCard}>
                            <Text style={styles.statTitle}>{stat.title}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statChange}>{stat.change}</Text>
                        </View>
                    ))}
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActionsContainer}>
                    {quickActions.map((action, index) => (
                        <TouchableOpacity key={index} style={styles.actionCard} onPress={() => alert(`${action.title}`)}>
                            <View
                                style={[styles.iconWrapper, { backgroundColor: action.color + "20" }]}
                            >
                                <FontAwesome5
                                    name={action.icon as any}
                                    size={20}
                                    color={action.color}
                                />
                            </View>
                            <Text style={styles.actionText}>{action.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Our Events */}
                <Text style={styles.sectionTitle}>Upcoming Events</Text>
                {events.map((event, index) => (
                    <LinearGradient
                        key={index}
                        colors={["#ffffff", "#E5E7EB"]}
                        style={styles.eventCard}
                    >
                        <View>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventDate}>{event.date}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#999" />
                    </LinearGradient>
                ))}

                {/* Analytics */}
                <Text style={styles.sectionTitle}>Analytics</Text>
                <View style={styles.analyticsContainer}>
                    {analytics.map((a, index) => (
                        <View key={index} style={styles.analyticsCard}>
                            <Text style={styles.analyticsValue}>{a.value}</Text>
                            <Text style={styles.analyticsLabel}>{a.metric}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    headerRight: { flexDirection: "row", alignItems: "center" },
    logo: { width: 100, height: 35, marginLeft: 10 },
    iconBtn: { marginHorizontal: 6 },
    avatar: {
        backgroundColor: "#203499",
        borderRadius: 20,
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    avatarText: { color: "#fff", fontWeight: "700" },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#071D6A",
        marginBottom: 10,
        paddingHorizontal: 16,
        marginTop: 10,
    },
    statsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    statCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        width: "48%",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    statTitle: { color: "#666", fontWeight: "600", marginBottom: 4 },
    statValue: { fontSize: 22, fontWeight: "700", color: "#203499" },
    statChange: { fontSize: 12, color: "#999" },
    quickActionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    actionCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 20,
        alignItems: "center",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    iconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    actionText: { color: "#071D6A", fontWeight: "600", fontSize: 14 },
    eventCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 14,
        marginHorizontal: 16,
        marginBottom: 10,
        padding: 14,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    eventTitle: { fontSize: 16, fontWeight: "600", color: "#071D6A" },
    eventDate: { fontSize: 12, color: "#666" },
    analyticsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginBottom: 30,
    },
    analyticsCard: {
        backgroundColor: "#20349915",
        borderRadius: 14,
        paddingVertical: 20,
        alignItems: "center",
        width: "30%",
    },
    analyticsValue: { fontSize: 22, fontWeight: "700", color: "#203499" },
    analyticsLabel: { fontSize: 12, color: "#555" },
    greetingContainer: {
        backgroundColor: "#203499", // primary color
        borderRadius: 0,
        padding: 20,
        marginBottom: 20,
        marginTop: 5,
        height: 170,
    },
    greetingText: {
        fontSize: 14,
        color: "#E0E7FF",
        marginBottom: 4,
    },
    userName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 4,
    },
    headerName: {
        fontSize: 20,
        fontWeight: "700",
        color: "#203499",
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: "#E0E7FF",
        marginBottom: 2,
    },
    userDetails: {
        fontSize: 13,
        color: "#C7D2FE",
        marginTop: 60
    },
});