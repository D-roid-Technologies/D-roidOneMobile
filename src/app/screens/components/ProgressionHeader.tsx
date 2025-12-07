import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { selectMembershipTier } from "../../redux/slice/membershiptierslice";
import { useNavigation } from "@react-navigation/native";

const ProgressionHeader = () => {
    const navigation = useNavigation<any>();

    // Pull all membership data from Redux
    const {
        tier,
        totalHours,
        progressPercentage,
    } = useSelector(selectMembershipTier);

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={26} color="#fff" />
            </TouchableOpacity>

            {/* Membership Card */}
            <View style={styles.card}>
                <Text style={styles.title}>{tier} Member</Text>
                <Text style={styles.subtitle}>
                    You are making great progress on your membership journey.
                </Text>

                {/* Progress Bar */}
                <View style={styles.progressSection}>
                    <Text style={styles.progressLabel}>
                        Progress: {progressPercentage}%
                    </Text>

                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${progressPercentage}%` }
                            ]}
                        />
                    </View>

                    <Text style={styles.priceLabel}>₦0/month</Text>
                </View>

                {/* Total Time on App */}
                <View style={styles.timeBox}>
                    <Text style={styles.timeLabel}>Total Time in App</Text>
                    <Text style={styles.timeValue}>
                        {totalHours.toFixed(1)} hours
                    </Text>
                </View>
            </View>

            {/* Upgrade Section */}
            <View style={styles.upgradeSection}>
                <Text style={styles.upgradeTitle}>Upgrade your membership</Text>
                <Text style={styles.upgradeDesc}>
                    Unlock exclusive benefits and rewards as you move up to Gold or Platinum tiers.
                </Text>
            </View>

            {/* Upgrade Cards */}
            <TouchableOpacity style={styles.tierCard}>
                <Text style={styles.tierTitle}>Gold Tier</Text>
                <Text style={styles.tierPrice}>₦5,000/month</Text>
                <Text style={styles.tierDesc}>
                    Enjoy increased rewards, premium access, and more exclusive perks.
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tierCard}>
                <Text style={styles.tierTitle}>Platinum Tier</Text>
                <Text style={styles.tierPrice}>₦15,000/month</Text>
                <Text style={styles.tierDesc}>
                    Unlock every premium feature, VIP support, and elite membership benefits.
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProgressionHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
        padding: 16,
    },
    backBtn: {
        marginTop: 30,
        marginBottom: 10,
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#000105",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "#000c3a",
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
        height: 255
    },
    title: {
        fontSize: 22,
        fontWeight: "900",
        color: "#fff",
    },
    subtitle: {
        marginTop: 6,
        color: "#e0e0e0",
        fontSize: 14,
        fontWeight: "300"
    },
    progressSection: {
        marginTop: 16,
    },
    progressLabel: {
        color: "#fff",
        marginBottom: 6,
        fontWeight: "600",
    },
    progressBackground: {
        height: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 6,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 6,
        backgroundColor: "#34D399",
    },
    priceLabel: {
        marginTop: 10,
        color: "#fff",
        fontWeight: "700",
    },
    timeBox: {
        marginTop: 16,
        backgroundColor: "rgba(255,255,255,0.15)",
        padding: 12,
        borderRadius: 10,
    },
    timeLabel: {
        color: "#d1d5db",
        fontSize: 12,
    },
    timeValue: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginTop: 4,
    },
    upgradeSection: {
        marginBottom: 50,
    },
    upgradeTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#000105",
        marginBottom: 4,
    },
    upgradeDesc: {
        color: "red",
        fontSize: 14,
    },
    tierCard: {
        backgroundColor: "#000105",
        padding: 18,
        borderRadius: 14,
        marginBottom: 14,
        height: 140
    },
    tierTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    tierPrice: {
        color: "#34D399",
        fontWeight: "700",
        marginVertical: 6,
    },
    tierDesc: {
        color: "#d1d5db",
        fontSize: 14,
    },
});
