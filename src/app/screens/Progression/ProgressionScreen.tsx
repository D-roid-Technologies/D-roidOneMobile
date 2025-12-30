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
import { selectMembershipTier } from "../../redux/slice/membershiptierslice";
import { CheckoutPage } from "./CheckoutPage";
import type { Plan } from "../../utils/Types";

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

    const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | undefined>(undefined);

    const handlePlanSelect = (plan: Plan) => {
        setSelectedPlan(plan);
        setCheckoutModalVisible(true);
    };

    const handlePaymentSuccess = () => {
        console.log("Payment successful! User upgraded to:", selectedPlan?.name);
        setCheckoutModalVisible(false);
        // You can add additional logic here, like updating Redux state or navigating
    };

    const goldPlan: Plan = {
        id: "gold",
        name: "Gold Tier",
        price: 6250,
        interval: "month",
        features: [
            "Increased rewards",
            "Premium access",
            "Exclusive perks",
            "Priority support",
            "Advanced analytics",
        ],
    };

    const platinumPlan: Plan = {
        id: "platinum",
        name: "Platinum Tier",
        price: 18750,
        interval: "month",
        features: [
            "All premium features",
            "VIP support",
            "Elite membership benefits",
            "Unlimited access",
            "Personal account manager",
            "Early access to new features",
        ],
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
                            {totalHours} hours
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
                <TouchableOpacity
                    style={styles.tierCard}
                    onPress={() => handlePlanSelect(goldPlan)}
                >
                    <Text style={styles.tierTitle}>Gold Tier</Text>
                    <Text style={styles.tierPrice}>₦6,250/month</Text>
                    <Text style={styles.tierDesc}>
                        Enjoy increased rewards, premium access, and more exclusive perks.
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tierCard}
                    onPress={() => handlePlanSelect(platinumPlan)}
                >
                    <Text style={styles.tierTitle}>Platinum Tier</Text>
                    <Text style={styles.tierPrice}>₦18,750/month</Text>
                    <Text style={styles.tierDesc}>
                        Unlock every premium feature, VIP support, and elite membership benefits.
                    </Text>
                </TouchableOpacity>

                {/* Bottom Padding */}
                <View style={{ height: 40 }} />

            </ScrollView>

            <CheckoutPage
                visible={checkoutModalVisible}
                selectedPlan={selectedPlan}
                onClose={() => setCheckoutModalVisible(false)}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentInitiated={() => { }}
            />
        </View>
    );
};

export default ProgressionHeader;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000105",
    },

    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 30,
        backgroundColor: "#000105",
    },

    /* Back Button */
    backBtn: {
        marginTop: 40,
        marginBottom: 24,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    /* Current Membership Card */
    card: {
        backgroundColor: "#C7D2FE",
        padding: 20,
        borderRadius: 16,
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: "900",
        color: "#000105",
        marginBottom: 6,
    },
    subtitleA: {
        fontSize: 14,
        fontWeight: "700",
        color: "#334155",
    },
    subtitle: {
        marginTop: 10,
        fontSize: 14,
        lineHeight: 20,
        color: "#334155",
        fontWeight: "400",
    },

    /* Progress */
    progressSection: {
        marginTop: 20,
    },
    progressLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#000105",
        marginBottom: 6,
    },
    progressBackground: {
        height: 10,
        backgroundColor: "rgba(0,0,0,0.15)",
        borderRadius: 6,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 6,
        backgroundColor: "#10B981",
    },
    priceLabel: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: "700",
        color: "#475569",
    },

    /* Time Box */
    timeBox: {
        marginTop: 20,
        padding: 14,
        borderRadius: 12,
        backgroundColor: "rgba(0,0,0,0.08)",
    },
    timeLabel: {
        fontSize: 12,
        color: "#475569",
    },
    timeValue: {
        marginTop: 4,
        fontSize: 18,
        fontWeight: "800",
        color: "#000105",
    },

    /* Upgrade Section */
    upgradeSection: {
        marginBottom: 20,
    },
    upgradeTitle: {
        fontSize: 22,
        fontWeight: "900",
        color: "#ffffff",
        marginBottom: 8,
    },
    upgradeDesc: {
        fontSize: 14,
        lineHeight: 20,
        color: "#BAB8B8",
        fontWeight: "300",
    },

    /* Tier Cards */
    tierCard: {
        backgroundColor: "#C7D2FE",
        padding: 20,
        borderRadius: 14,
        marginBottom: 16,
    },
    tierTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#000105",
    },
    tierPrice: {
        marginVertical: 6,
        fontSize: 16,
        fontWeight: "800",
        color: "#3B82F6",
    },
    tierDesc: {
        fontSize: 14,
        lineHeight: 20,
        color: "#000105",
        fontWeight: "400",
    },
});
