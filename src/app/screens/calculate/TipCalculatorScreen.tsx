import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TipCalculatorScreen: React.FC = () => {
    const [billAmount, setBillAmount] = useState("");
    const [tipPercentage, setTipPercentage] = useState("15");
    const [numberOfPeople, setNumberOfPeople] = useState("1");
    const [customTip, setCustomTip] = useState("");

    const presetTips = ["10", "15", "18", "20", "25"];

    const calculateTip = () => {
        const bill = parseFloat(billAmount) || 0;
        const tip = parseFloat(customTip || tipPercentage) || 0;
        const people = parseInt(numberOfPeople) || 1;

        const tipAmount = (bill * tip) / 100;
        const totalAmount = bill + tipAmount;
        const perPerson = totalAmount / people;
        const tipPerPerson = tipAmount / people;

        return {
            tipAmount: tipAmount.toFixed(2),
            totalAmount: totalAmount.toFixed(2),
            perPerson: perPerson.toFixed(2),
            tipPerPerson: tipPerPerson.toFixed(2),
        };
    };

    const result = calculateTip();

    const handlePresetTip = (tip: string) => {
        setTipPercentage(tip);
        setCustomTip("");
    };

    const handleCustomTip = (value: string) => {
        setCustomTip(value);
        setTipPercentage("");
    };

    const reset = () => {
        setBillAmount("");
        setTipPercentage("15");
        setNumberOfPeople("1");
        setCustomTip("");
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Tip Calculator</Text>
                <Text style={styles.subheaderText}>
                    Calculate tips and split bills easily
                </Text>
            </View>

            {/* Bill Amount Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Bill Amount ($)</Text>
                <View style={styles.inputWrapper}>
                    <Ionicons name="receipt-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter bill amount"
                        placeholderTextColor="#64748B"
                        keyboardType="decimal-pad"
                        value={billAmount}
                        onChangeText={setBillAmount}
                    />
                </View>
            </View>

            {/* Tip Percentage Presets */}
            <View style={styles.section}>
                <Text style={styles.label}>Tip Percentage</Text>
                <View style={styles.tipPresets}>
                    {presetTips.map((tip) => (
                        <TouchableOpacity
                            key={tip}
                            style={[
                                styles.tipButton,
                                tipPercentage === tip && !customTip && styles.tipButtonActive,
                            ]}
                            onPress={() => handlePresetTip(tip)}
                        >
                            <Text
                                style={[
                                    styles.tipButtonText,
                                    tipPercentage === tip && !customTip && styles.tipButtonTextActive,
                                ]}
                            >
                                {tip}%
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Custom Tip */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Custom Tip (%)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter custom tip percentage"
                    placeholderTextColor="#64748B"
                    keyboardType="decimal-pad"
                    value={customTip}
                    onChangeText={handleCustomTip}
                />
            </View>

            {/* Number of People */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Number of People</Text>
                <View style={styles.inputWrapper}>
                    <Ionicons name="people-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter number of people"
                        placeholderTextColor="#64748B"
                        keyboardType="number-pad"
                        value={numberOfPeople}
                        onChangeText={setNumberOfPeople}
                    />
                </View>
            </View>

            {/* Results */}
            {billAmount && (
                <View style={styles.resultsContainer}>
                    <View style={styles.resultCard}>
                        <View style={styles.resultRow}>
                            <Text style={styles.resultLabel}>Tip Amount</Text>
                            <Text style={styles.resultValue}>${result.tipAmount}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.resultRow}>
                            <Text style={styles.resultLabel}>Total Amount</Text>
                            <Text style={[styles.resultValue, styles.totalValue]}>${result.totalAmount}</Text>
                        </View>
                    </View>

                    {parseInt(numberOfPeople) > 1 && (
                        <View style={styles.splitCard}>
                            <Text style={styles.splitTitle}>Split Bill</Text>
                            <View style={styles.resultRow}>
                                <Text style={styles.resultLabel}>Per Person</Text>
                                <Text style={styles.resultValue}>${result.perPerson}</Text>
                            </View>
                            <View style={styles.resultRow}>
                                <Text style={styles.resultLabel}>Tip Per Person</Text>
                                <Text style={styles.resultValue}>${result.tipPerPerson}</Text>
                            </View>
                        </View>
                    )}

                    <TouchableOpacity style={styles.resetButton} onPress={reset}>
                        <Ionicons name="refresh" size={20} color="#fff" />
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

export default TipCalculatorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101828",
    },
    contentContainer: {
        padding: 20,
        paddingTop: Platform.OS === "android" ? 40 : 60,
    },
    header: {
        marginBottom: 24,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
        marginBottom: 8,
    },
    subheaderText: {
        fontSize: 16,
        color: "#CBD5E1",
        textAlign: "center",
    },
    section: {
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: "#E2E8F0",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E293B",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#334155",
    },
    inputIcon: {
        marginLeft: 16,
    },
    input: {
        flex: 1,
        backgroundColor: "#1E293B",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        color: "#fff",
        fontSize: 16,
    },
    tipPresets: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    tipButton: {
        flex: 1,
        minWidth: "18%",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#1E293B",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#334155",
        alignItems: "center",
    },
    tipButtonActive: {
        backgroundColor: "#8B5CF6",
        borderColor: "#8B5CF6",
    },
    tipButtonText: {
        color: "#94A3B8",
        fontSize: 16,
        fontWeight: "600",
    },
    tipButtonTextActive: {
        color: "#fff",
    },
    resultsContainer: {
        marginTop: 24,
    },
    resultCard: {
        backgroundColor: "#1E293B",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#334155",
    },
    splitCard: {
        backgroundColor: "#1E293B",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#334155",
    },
    splitTitle: {
        color: "#CBD5E1",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
    },
    resultRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    resultLabel: {
        color: "#CBD5E1",
        fontSize: 16,
    },
    resultValue: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
    },
    totalValue: {
        color: "#34D399",
        fontSize: 24,
    },
    divider: {
        height: 1,
        backgroundColor: "#334155",
        marginVertical: 12,
    },
    resetButton: {
        flexDirection: "row",
        backgroundColor: "#334155",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    resetButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});
