import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    ScrollView,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectMembershipTier } from "../../redux/slice/membershiptierslice";
import ScientificCalculatorScreen from "./ScientificCalculatorScreen";
import BMICalculatorScreen from "./BMICalculatorScreen";
import TipCalculatorScreen from "./TipCalculatorScreen";
import UnitConverterScreen from "./UnitConverterScreen";
import DiscountCalculatorScreen from "./DiscountCalculatorScreen";

export const tools = [
    { id: "1", title: "Scientific Calculator", icon: "calculator", color: "#3B82F6", requiredTier: "Silver" },
    { id: "2", title: "BMI Calculator", icon: "heartbeat", color: "#10B981", requiredTier: "Silver" },
    { id: "3", title: "Loan Calculator", icon: "money-bill-wave", color: "#F59E0B", requiredTier: "Gold" },
    { id: "4", title: "Tip Calculator", icon: "hand-holding-usd", color: "#8B5CF6", requiredTier: "Silver" },
    { id: "5", title: "Currency Converter", icon: "exchange-alt", color: "#EF4444", requiredTier: "Platinum" },
    { id: "6", title: "Unit Converter", icon: "ruler-combined", color: "#6366F1", requiredTier: "Silver" },
    { id: "7", title: "Investment Calc", icon: "chart-line", color: "#EC4899", requiredTier: "Platinum" },
    { id: "8", title: "Discount Calc", icon: "percentage", color: "#14B8A6", requiredTier: "Gold" },
    { id: "9", title: "Fuel Cost Calc", icon: "gas-pump", color: "#F43F5E", requiredTier: "Platinum" },
    { id: "10", title: "Mortgage Calc", icon: "home", color: "#8B5CF6", requiredTier: "Platinum" },
];


const CalculatorsScreen: React.FC = () => {
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const userMembership = useSelector(selectMembershipTier);

    const handleClose = () => setSelectedTool(null);

    // Helper to determine if a tool is accessible based on tier hierarchy
    const isTierAccessible = (required: string) => {
        const tiers = ["Silver", "Gold", "Platinum"];
        return tiers.indexOf(userMembership.tier) >= tiers.indexOf(required);
    };

    const renderToolContent = (toolName: string) => {
        switch (toolName) {
            case "Scientific Calculator":
                return <ScientificCalculatorScreen />;
            case "BMI Calculator":
                return <BMICalculatorScreen />;
            case "Tip Calculator":
                return <TipCalculatorScreen />;
            case "Unit Converter":
                return <UnitConverterScreen />;
            case "Discount Calc":
                return <DiscountCalculatorScreen />;
            case "Loan Calculator":
                return <Text style={styles.toolPlaceholder}>💰 Loan Calculator UI</Text>;
            case "Currency Converter":
                return <Text style={styles.toolPlaceholder}>💱 Currency Converter UI</Text>;
            case "Investment Calc":
                return <Text style={styles.toolPlaceholder}>📈 Investment Calculator UI</Text>;
            case "Fuel Cost Calc":
                return <Text style={styles.toolPlaceholder}>⛽ Fuel Cost Calculator UI</Text>;
            case "Mortgage Calc":
                return <Text style={styles.toolPlaceholder}>🏠 Mortgage Calculator UI</Text>;
            default:
                return <Text style={styles.toolPlaceholder}>Tool Interface Coming Soon</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculators</Text>
            <Text style={styles.subtitle}>
                Access various calculators for your needs
            </Text>

            {/* Scrollable Tools List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <View style={styles.grid}>
                    {tools.map((tool) => {
                        const isLocked = !isTierAccessible(tool.requiredTier);

                        return (
                            <TouchableOpacity
                                key={tool.id}
                                style={[
                                    styles.toolCard,
                                    { backgroundColor: tool.color, opacity: isLocked ? 0.5 : 1 }
                                ]}
                                onPress={() => !isLocked && setSelectedTool(tool.title)}
                                disabled={isLocked}
                            >
                                {/* Membership Type Badge */}
                                <View style={styles.tierBadge}>
                                    <Text style={styles.tierBadgeText}>{tool.requiredTier}</Text>
                                </View>

                                <FontAwesome5 name={tool.icon as any} size={28} color="#fff" />
                                <Text style={styles.toolText}>{tool.title}</Text>

                                {isLocked && (
                                    <Ionicons name="lock-closed" size={18} color="#fff" style={styles.lockIcon} />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Fullscreen Modal for Tools */}
            <Modal visible={!!selectedTool} animationType="slide" transparent={false}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{selectedTool}</Text>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <Ionicons name="close" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContent}>
                        {selectedTool && renderToolContent(selectedTool)}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CalculatorsScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
        padding: 16,
        paddingTop: 60
    },
    title: { fontSize: 28, fontWeight: "900", color: "#ffffff", textAlign: "left" },
    subtitle: { fontSize: 14, color: "#64748b", textAlign: "left", marginBottom: 30 },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    toolCard: {
        width: width / 2 - 24,
        height: 140,
        borderRadius: 16, // Smoother corners
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        elevation: 3,
        position: 'relative', // For absolute badge placement
    },
    toolText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
        marginTop: 10,
        textAlign: "center",
        paddingHorizontal: 5
    },
    tierBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Darker for better contrast on colors
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    tierBadgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    lockIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#F8FAFC", // Light background for the actual tool interface
    },
    modalHeader: {
        backgroundColor: "#000c3a", // Matches theme
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    modalTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
    },
    closeButton: {
        padding: 8,
    },
    modalContent: {
        flex: 1,
        backgroundColor: "#101828",
    },
    toolPlaceholder: {
        fontSize: 18,
        color: "#000105",
        textAlign: "center",
    },
});