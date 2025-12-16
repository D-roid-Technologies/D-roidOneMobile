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
import ScientificCalculator from "../calculate/tools/sc"

const tools = [
    { id: "1", title: "Basic Calculator", icon: "calculator", color: "#3B82F6" },
    { id: "2", title: "BMI Calculator", icon: "heartbeat", color: "#10B981" },
    // { id: "3", title: "Loan Calculator", icon: "money-bill-wave", color: "#F59E0B" },
    // { id: "4", title: "Tip Calculator", icon: "hand-holding-usd", color: "#8B5CF6" },
    // { id: "5", title: "Currency Converter", icon: "exchange-alt", color: "#EF4444" },
];

const CalculatorsScreen: React.FC = () => {
    const [selectedTool, setSelectedTool] = useState<string | null>(null);

    const handleClose = () => setSelectedTool(null);

    const renderToolContent = (toolName: string) => {
        switch (toolName) {
            case "Basic Calculator":
                return <ScientificCalculator />;
            case "BMI Calculator":
                return <Text style={styles.toolPlaceholder}>⚖️ BMI Calculator Tool</Text>;
            case "Loan Calculator":
                return <Text style={styles.toolPlaceholder}>🏦 Loan Calculator Tool</Text>;
            case "Tip Calculator":
                return <Text style={styles.toolPlaceholder}>💰 Tip Calculator Tool</Text>;
            case "Currency Converter":
                return <Text style={styles.toolPlaceholder}>💱 Currency Converter Tool</Text>;
            default:
                return <Text style={styles.toolPlaceholder}>Tool Not Found</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculation Tools</Text>
            <Text style={styles.subtitle}>
                Access various calculators for your needs
            </Text>

            <View style={styles.grid}>
                {tools.map((tool) => (
                    <TouchableOpacity
                        key={tool.id}
                        style={[styles.toolCard, { backgroundColor: tool.color }]}
                        onPress={() => setSelectedTool(tool.title)}
                    >
                        <FontAwesome5 name={tool.icon as any} size={28} color="#fff" />
                        <Text style={styles.toolText}>{tool.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Fullscreen Modal for Tools */}
            <Modal visible={!!selectedTool} animationType="slide" transparent={false}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{selectedTool}</Text>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <Ionicons name="close" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.modalContent}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {selectedTool && renderToolContent(selectedTool)}
                    </ScrollView>
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
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        marginBottom: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    toolCard: {
        width: width / 2 - 24,
        height: 140,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        elevation: 3,
    },
    toolText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
        marginTop: 10,
        textAlign: "center",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    modalHeader: {
        backgroundColor: "#203499",
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
        padding: 20,
    },
    toolPlaceholder: {
        fontSize: 18,
        color: "#071D6A",
        textAlign: "center",
    },
});