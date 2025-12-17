import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const tools = [
    { id: "1", title: "Basic Calculator", icon: "calculator", color: "#3B82F6", screen: "BasicCalculator" },
    { id: "2", title: "BMI Calculator", icon: "heartbeat", color: "#10B981", screen: "BMICalculator" },
    // { id: "3", title: "Loan Calculator", icon: "money-bill-wave", color: "#F59E0B", screen: "LoanCalculator" },
    // { id: "4", title: "Tip Calculator", icon: "hand-holding-usd", color: "#8B5CF6", screen: "TipCalculator" },
    // { id: "5", title: "Currency Converter", icon: "exchange-alt", color: "#EF4444", screen: "CurrencyConverter" },
];

const CalculateListScreen: React.FC = () => {
    const navigation = useNavigation<any>();

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
                        onPress={() => navigation.navigate(tool.screen)}
                    >
                        <FontAwesome5 name={tool.icon as any} size={28} color="#fff" />
                        <Text style={styles.toolText}>{tool.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default CalculateListScreen;

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
});
