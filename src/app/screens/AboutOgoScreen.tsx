import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Linking,
} from "react-native";

const GOOGLE_PLAY_URL =
    "https://play.google.com/store/apps/details?id=com.ogo.app"; // replace later

const AboutOgoScreen: React.FunctionComponent = ({ navigation }: any) => {
    const openPlayStore = () => {
        Linking.openURL(GOOGLE_PLAY_URL);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#ffffff" />
                </TouchableOpacity>

                <Text style={styles.header}>About Ogoo</Text>
            </View>

            {/* Card: Overview */}
            <View style={styles.item}>
                <Text style={styles.mHeader}>What is Ogo?</Text>
                <Text style={styles.message}>
                    Ogo is a voice-first personal and healthcare assistant designed to
                    support people with calm, understanding, and care.
                </Text>
                <Text style={styles.message}>
                    Ogo exists to help people feel heard, supported, and less alone —
                    especially those who may be elderly, unwell, or overwhelmed by modern
                    technology.
                </Text>
            </View>

            {/* Card: What Ogo Does */}
            <View style={styles.item}>
                <Text style={styles.mHeader}>What Ogo Does</Text>

                <Text style={styles.message}>
                    • Provides voice-based conversation to reduce loneliness
                </Text>
                <Text style={styles.message}>
                    • Supports emotional wellbeing through calm interaction
                </Text>
                <Text style={styles.message}>
                    • Helps manage time, routines, and reminders
                </Text>
                <Text style={styles.message}>
                    • Offers clear, voice-activated access to helpful information
                </Text>
                <Text style={styles.message}>
                    • Supports awareness and faster response for vulnerable users
                </Text>
            </View>

            {/* Card: Healthcare Focus */}
            <View style={styles.item}>
                <Text style={styles.mHeader}>Healthcare & Wellbeing</Text>
                <Text style={styles.message}>
                    Ogo does not replace doctors or medical professionals.
                </Text>
                <Text style={styles.message}>
                    Instead, Ogo acts as a supportive companion between healthcare
                    interactions — offering reassurance, continuity, and a calm voice when
                    human support is not immediately available.
                </Text>
            </View>

            {/* Card: Vision */}
            <View style={styles.item}>
                <Text style={styles.mHeader}>Our Vision</Text>
                <Text style={styles.message}>
                    Ogo’s vision is to become a trusted digital companion that improves
                    wellbeing, reduces isolation, and supports better healthcare
                    experiences for people everywhere.
                </Text>
                <Text style={styles.message}>
                    In the future, Ogo aims to work alongside healthcare providers,
                    families, and communities to support people not just when they are
                    unwell — but every day.
                </Text>
            </View>

            {/* Action */}
            {/* <View style={styles.item}>
                <TouchableOpacity onPress={openPlayStore} style={styles.markReadBtn}>
                    <Text style={styles.markReadText}>
                        Download Ogo on Google Play
                    </Text>
                </TouchableOpacity>
            </View> */}

            {/* Footer */}
            <Text style={styles.emptyText}>
                Ogo is built with care, responsibility, and respect for human life.
            </Text>
        </ScrollView>
    );
};

export default AboutOgoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
        padding: 16,
        paddingTop: 40
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