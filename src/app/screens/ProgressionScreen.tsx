import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Platform,
    AppState,
    AppStateStatus
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { selectMembershipTier } from "../redux/slice/membershiptierslice";

const ProgressionHeader: React.FunctionComponent = () => {
    const navigation = useNavigation<any>();

    const {
        tier,
        totalHours,
        progressPercentage,
        nextTier,
        status,
        desc
    } = useSelector(selectMembershipTier);

    const [totalSeconds, setTotalSeconds] = useState(0);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        // 1. Handle background/foreground transitions
        const subscription = AppState.addEventListener("change", (nextAppState: AppStateStatus) => {
            appState.current = nextAppState;
        });

        // 2. The Timer Logic
        const interval = setInterval(() => {
            if (appState.current === "active") {
                setTotalSeconds((prev) => prev + 1);
            }
        }, 1000);

        // 3. Clean up on unmount
        return () => {
            subscription.remove();
            clearInterval(interval);
        };
    }, []);

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');

        return `${hours}-${minutes}-${seconds}`;
    };

    return (
        <View style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Back Button */}
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>

                {/* 1. CURRENT MEMBERSHIP CARD */}
                <View style={styles.card}>
                    <Text style={styles.title}>{tier} Member</Text>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center", }}>
                        <Text style={styles.subtitleA}>
                            {status}
                        </Text>
                        <Text style={styles.subtitleA}>
                            -
                        </Text>
                        <Text style={styles.subtitleA}>
                                Next Level: {nextTier}
                        </Text>
                    </View>
                    <Text style={styles.subtitle}>
                        {desc}
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
                        <Text style={styles.priceLabel}>Current Plan</Text>
                    </View>

                    {/* Total Time on App */}
                    <View style={styles.timeBox}>
                        <Text style={styles.timeLabel}>Total Time in App</Text>
                        <Text style={styles.timeValue}>
                            {totalHours} hours - {formatTime(totalSeconds)}
                        </Text>
                    </View>
                </View>

                {/* 2. UPGRADE TEXT SECTION */}
                <View style={styles.upgradeSection}>
                    <Text style={styles.upgradeTitle}>Upgrade your membership</Text>
                    <Text style={styles.upgradeDesc}>
                        Unlock exclusive benefits and rewards as you move up to Gold or Platinum tiers.
                    </Text>
                </View>

                {/* 3. UPGRADE CARDS */}
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

                {/* Bottom Padding */}
                <View style={{ height: 40 }} />

            </ScrollView>
        </View>
    );
};

export default ProgressionHeader;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000105', // Matches container background
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#000105',
        padding: 20,
    },
    backBtn: {
        marginTop: 10,
        marginBottom: 20,
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "#000c3a", // Dark Blue
        padding: 20,
        borderRadius: 16,
        marginBottom: 30,
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
        fontWeight: "300",
        lineHeight: 20,
    },
    subtitleA: {
        marginTop: 4,
        color: "#e0e0e0",
        fontSize: 16,
        fontWeight: "700",
    },
    progressSection: {
        marginTop: 20,
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
        backgroundColor: "#34D399", // Green
    },
    priceLabel: {
        marginTop: 10,
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
        opacity: 0.8
    },
    timeBox: {
        marginTop: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
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
    // --- Upgrade Section Styles ---
    upgradeSection: {
        marginBottom: 20,
    },
    upgradeTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 8,
    },
    upgradeDesc: {
        color: "#BAB8B8",
        fontSize: 14,
        lineHeight: 20,
    },
    // --- Tier/Upgrade Card Styles ---
    tierCard: {
        backgroundColor: "#C7D2FE", // Dark Grey/Black for contrast against main bg
        padding: 20,
        borderRadius: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#222",
    },
    tierTitle: {
        color: "#000105",
        fontSize: 18,
        fontWeight: "700",
    },
    tierPrice: {
        color: "#3B82F6",
        fontWeight: "700",
        marginVertical: 6,
        fontSize: 16,
    },
    tierDesc: {
        color: "#000105",
        fontSize: 14,
        lineHeight: 20,
    },
});