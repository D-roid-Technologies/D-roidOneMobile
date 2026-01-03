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
import { selectMembershipTier, setTier } from "../../redux/slice/membershiptierslice";
import { CheckoutPage } from "./CheckoutPage";
import type { Plan } from "../../utils/Types";
import { authService } from "../../redux/configuration/auth.service";
import { store } from "../../redux/store";
import { createAndDispatchNotification } from "../../utils/Notifications";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const ProgressionHeader: React.FunctionComponent = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();

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
    const [text, setText] = useState<string>("Downgrade to Silver")

    const handlePlanSelect = (plan: Plan) => {
        setSelectedPlan(plan);
        setCheckoutModalVisible(true);
    };

    const handlePaymentSuccess = () => {
        // console.log("Payment successful! User upgraded to:", selectedPlan?.name);
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

    const onDowngradePress = () => {
        let newTier: any = {
            tier: "Silver",
            nextTier: "Gold",
            progressPercentage: 33,
            status: "Active",
            desc: "You are making great progress on your membership journey."
        };
        setText("...please wait!")
        authService.updateProgressionInformation(newTier).then(() => {
            store.dispatch(setTier(newTier));
            createAndDispatchNotification(dispatch, {
                title: `Payment Successful for ${newTier.tier}`,
                message: `Your subscription for ${newTier.tier} has been completed successfully.`,
            });
            createAndDispatchNotification(dispatch, {
                title: `Upgrade to your ${newTier.tier} membership is successful`,
                message: `Your upgrade to ${newTier.tier} membership has been completed successfully.`,
            });
            Toast.show({
                type: "success",
                text1: "Payment Successful!",
                text2: `You are now a ${newTier.tier} member.`,
                visibilityTime: 8000,
            });
        }).catch(() => {
            Toast.show({
                type: "error",
                text1: "Payment Unsuccessful",
                text2: "Payment was not successful, please try again.",
                visibilityTime: 8000,
            });

            createAndDispatchNotification(dispatch, {
                title: `Payment Unsuccessful for ${newTier.tier}`,
                message: `Your subscription for ${newTier.tier} was unsuccessful.`,
            });
            createAndDispatchNotification(dispatch, {
                title: `Upgrade to your ${newTier.tier} membership is unsuccessful`,
                message: `Your upgrade to ${newTier.tier} membership was unsuccessfully.`,
            });
        })
    }

    return (
        <View style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={26} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={styles.header}>Progressions</Text>
                </View>

                {/* 1. CURRENT MEMBERSHIP CARD */}
                <View style={styles.card}>
                    <Text style={styles.title}>{tier} Member</Text>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center", }}>
                        <Text style={styles.subtitleA}>
                            {status}
                        </Text>

                        {tier === "Platinum" ? null : <Text style={styles.subtitleA}>
                            -
                        </Text>}
                        {tier === "Platinum" ? null : (<Text style={styles.subtitleA}>
                            Next Level: {nextTier}
                        </Text>)}
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
                        <View>
                            <Text style={styles.timeLabel}>Total Time in App</Text>
                            <Text style={styles.timeValue}>{totalHours} hours</Text>
                        </View>

                        {tier !== "Silver" && (
                            <TouchableOpacity onPress={onDowngradePress}>
                                <Text style={styles.downgradeText}>
                                    {text}
                                </Text>
                            </TouchableOpacity>
                        )}

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
        paddingTop: 40
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
    card: {
        backgroundColor: "#000c3a",
        padding: 20,
        borderRadius: 16,
        marginBottom: 30,
    },
    timeBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#020617",
    },

    downgradeText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#94A3B8",
        textDecorationLine: "underline",
    },

    title: {
        fontSize: 22,
        fontWeight: "900",
        color: "#ffffff",
        marginBottom: 6,
    },
    subtitleA: {
        fontSize: 14,
        fontWeight: "700",
        color: "#E0E7FF",
    },
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
    backButton: {
        padding: 6,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "900",
        color: "#ffffff",
    },
    placeholder: {
        width: 24,
    },
    subtitle: {
        marginTop: 10,
        fontSize: 14,
        lineHeight: 20,
        color: "#E0E7FF",
        fontWeight: "400",
    },

    /* Progress */
    progressSection: {
        marginTop: 20,
    },
    progressLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#E0E7FF",
        marginBottom: 6,
    },
    progressBackground: {
        height: 10,
        backgroundColor: "grey",
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
        color: "#E0E7FF",
    },
    timeLabel: {
        fontSize: 12,
        color: "#ffffff",
    },
    timeValue: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: "800",
        color: "#ffffff",
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
