import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const KnowledgeCityOverview: React.FunctionComponent = ({ navigation }: any) => {
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

                <Text style={styles.header}>About Knowledge City</Text>
            </View>

            {/* Intro Card */}
            <View style={[styles.item, styles.unread]}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>What is Knowledge City?</Text>
                    <View style={styles.unreadDot} />
                </View>
                <Text style={styles.message}>
                    Knowledge City is a problem-first learning world designed to
                    strengthen your critical thinking and problem-solving skills.
                    You don’t watch courses here — you face real challenges and
                    learn only what you need to move forward.
                </Text>
                <View style={[styles.badge, styles.info]}>
                    <Text style={styles.badgeText}>Problem-First Learning</Text>
                </View>
            </View>

            {/* How It Works */}
            <View style={styles.item}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>How It Works</Text>
                </View>
                <Text style={styles.message}>
                    Each experience begins with a complex situation inside the city.
                    Information is incomplete, time is limited, and every decision
                    has consequences. Knowledge appears only when your thinking
                    demands it.
                </Text>
                <Text style={styles.meta}>
                    Problem → Think → Learn → Apply → Reflect
                </Text>
            </View>

            {/* Critical Thinking */}
            <View style={styles.item}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>Critical Thinking</Text>
                </View>
                <Text style={styles.message}>
                    You’ll learn to question assumptions, detect bias, analyze
                    trade-offs, and reason through uncertainty. There are no obvious
                    answers — only better and worse decisions.
                </Text>
                <View style={[styles.badge, styles.success]}>
                    <Text style={styles.badgeText}>Think Clearly</Text>
                </View>
            </View>

            {/* Problem Solving */}
            <View style={styles.item}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>Problem Solving</Text>
                </View>
                <Text style={styles.message}>
                    Problems in Knowledge City mirror real life. You must define the
                    problem, choose a strategy, and deal with the consequences —
                    including long-term effects that may surface later.
                </Text>
                <View style={[styles.badge, styles.success]}>
                    <Text style={styles.badgeText}>Solve Real Problems</Text>
                </View>
            </View>

            {/* No Courses */}
            <View style={styles.item}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>No Courses. No Videos.</Text>
                </View>
                <Text style={styles.message}>
                    Knowledge City removes passive learning entirely. There is no
                    browsing, no long lectures, and no certificates. Progress is
                    earned only through reasoning, decisions, and reflection.
                </Text>
                <View style={[styles.badge, styles.error]}>
                    <Text style={styles.badgeText}>Anti-Course Platform</Text>
                </View>
            </View>

            {/* Outcome */}
            <View style={styles.item}>
                <View style={styles.cardHeader}>
                    <Text style={styles.mHeader}>What You Gain</Text>
                </View>
                <Text style={styles.message}>
                    Over time, your city becomes a record of how you think — the
                    problems you solved, the mistakes you learned from, and the
                    judgment you developed. This is proof of skill, not memorization.
                </Text>
                <Text style={styles.meta}>
                    Build judgment. Build clarity. Build better decisions.
                </Text>
            </View>

            {/* Action */}
            {/* <View style={styles.item}>
                <TouchableOpacity style={styles.markReadBtn}>
                    <Text style={styles.markReadText}>
                        Download Knowledge City on Google Play
                    </Text>
                </TouchableOpacity>
            </View> */}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
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

    /* Actions */
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    actionText: {
        color: "#C7D2FE",
        fontWeight: "600",
    },
    clearText: {
        color: "#FF3B30",
    },

    /* Card */
    item: {
        backgroundColor: "#C7D2FE",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    read: { opacity: 0.6 },
    unread: { opacity: 1 },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    mHeader: {
        fontSize: 20,
        fontWeight: "900",
        color: "#000105",
    },

    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#FF3B30",
    },

    message: {
        fontSize: 16,
        color: "#000105",
        marginTop: 8,
        fontWeight: "300"
    },

    meta: {
        fontSize: 12,
        color: "#334155",
        marginTop: 6,
        fontWeight: "300"
    },

    badge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 8,
    },
    success: { backgroundColor: "#34D399" },
    error: { backgroundColor: "#F87171" },
    info: { backgroundColor: "#60A5FA" },

    badgeText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#000",
    },

    markReadBtn: {
        marginTop: 10,
        alignSelf: "flex-end",
    },
    markReadText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#000105",
    },

    emptyText: {
        color: "#64748B",
        textAlign: "center",
        marginTop: 40,
    },
});

export default KnowledgeCityOverview