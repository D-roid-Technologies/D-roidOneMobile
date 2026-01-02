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

const DiscountCalculatorScreen: React.FC = () => {
    const [originalPrice, setOriginalPrice] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [taxRate, setTaxRate] = useState("0");

    const presetDiscounts = ["10", "15", "20", "25", "30", "50"];

    const calculate = () => {
        const price = parseFloat(originalPrice) || 0;
        const discount = parseFloat(discountPercentage) || 0;
        const tax = parseFloat(taxRate) || 0;

        const discountAmount = (price * discount) / 100;
        const priceAfterDiscount = price - discountAmount;
        const taxAmount = (priceAfterDiscount * tax) / 100;
        const finalPrice = priceAfterDiscount + taxAmount;
        const totalSavings = price - finalPrice;

        return {
            discountAmount: discountAmount.toFixed(2),
            priceAfterDiscount: priceAfterDiscount.toFixed(2),
            taxAmount: taxAmount.toFixed(2),
            finalPrice: finalPrice.toFixed(2),
            totalSavings: totalSavings.toFixed(2),
            savingsPercentage: price > 0 ? ((totalSavings / price) * 100).toFixed(1) : "0",
        };
    };

    const result = calculate();

    const handlePresetDiscount = (discount: string) => {
        setDiscountPercentage(discount);
    };

    const reset = () => {
        setOriginalPrice("");
        setDiscountPercentage("");
        setTaxRate("0");
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Discount Calculator</Text>
                <Text style={styles.subheaderText}>
                    Calculate discounts, taxes, and final prices
                </Text>
            </View>

            {/* Original Price Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Original Price ($)</Text>
                <View style={styles.inputWrapper}>
                    <Ionicons name="pricetag-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter original price"
                        placeholderTextColor="#64748B"
                        keyboardType="decimal-pad"
                        value={originalPrice}
                        onChangeText={setOriginalPrice}
                    />
                </View>
            </View>

            {/* Discount Percentage Presets */}
            <View style={styles.section}>
                <Text style={styles.label}>Discount Percentage</Text>
                <View style={styles.discountPresets}>
                    {presetDiscounts.map((discount) => (
                        <TouchableOpacity
                            key={discount}
                            style={[
                                styles.discountButton,
                                discountPercentage === discount && styles.discountButtonActive,
                            ]}
                            onPress={() => handlePresetDiscount(discount)}
                        >
                            <Text
                                style={[
                                    styles.discountButtonText,
                                    discountPercentage === discount && styles.discountButtonTextActive,
                                ]}
                            >
                                {discount}%
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Custom Discount */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Custom Discount (%)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter custom discount percentage"
                    placeholderTextColor="#64748B"
                    keyboardType="decimal-pad"
                    value={discountPercentage}
                    onChangeText={setDiscountPercentage}
                />
            </View>

            {/* Tax Rate */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tax Rate (%) - Optional</Text>
                <View style={styles.inputWrapper}>
                    <Ionicons name="receipt-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter tax rate (e.g., 8.5)"
                        placeholderTextColor="#64748B"
                        keyboardType="decimal-pad"
                        value={taxRate}
                        onChangeText={setTaxRate}
                    />
                </View>
            </View>

            {/* Results */}
            {originalPrice && discountPercentage && (
                <View style={styles.resultsContainer}>
                    {/* Savings Card */}
                    <View style={styles.savingsCard}>
                        <Ionicons name="happy-outline" size={48} color="#34D399" />
                        <Text style={styles.savingsLabel}>You Save</Text>
                        <Text style={styles.savingsValue}>${result.totalSavings}</Text>
                        <View style={styles.percentageBadge}>
                            <Text style={styles.percentageText}>{result.savingsPercentage}% OFF</Text>
                        </View>
                    </View>

                    {/* Breakdown Card */}
                    <View style={styles.breakdownCard}>
                        <Text style={styles.breakdownTitle}>Price Breakdown</Text>

                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>Original Price</Text>
                            <Text style={styles.breakdownValue}>${originalPrice}</Text>
                        </View>

                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>Discount ({discountPercentage}%)</Text>
                            <Text style={[styles.breakdownValue, styles.discountValue]}>
                                -${result.discountAmount}
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.breakdownRow}>
                            <Text style={styles.breakdownLabel}>Price After Discount</Text>
                            <Text style={styles.breakdownValue}>${result.priceAfterDiscount}</Text>
                        </View>

                        {parseFloat(taxRate) > 0 && (
                            <>
                                <View style={styles.breakdownRow}>
                                    <Text style={styles.breakdownLabel}>Tax ({taxRate}%)</Text>
                                    <Text style={styles.breakdownValue}>+${result.taxAmount}</Text>
                                </View>
                                <View style={styles.divider} />
                            </>
                        )}

                        <View style={styles.breakdownRow}>
                            <Text style={styles.finalLabel}>Final Price</Text>
                            <Text style={styles.finalValue}>${result.finalPrice}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.resetButton} onPress={reset}>
                        <Ionicons name="refresh" size={20} color="#fff" />
                        <Text style={styles.resetButtonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

export default DiscountCalculatorScreen;

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
    discountPresets: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    discountButton: {
        flex: 1,
        minWidth: "28%",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#1E293B",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#334155",
        alignItems: "center",
    },
    discountButtonActive: {
        backgroundColor: "#14B8A6",
        borderColor: "#14B8A6",
    },
    discountButtonText: {
        color: "#94A3B8",
        fontSize: 16,
        fontWeight: "600",
    },
    discountButtonTextActive: {
        color: "#fff",
    },
    resultsContainer: {
        marginTop: 24,
    },
    savingsCard: {
        backgroundColor: "#1E293B",
        borderRadius: 16,
        padding: 32,
        alignItems: "center",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#334155",
    },
    savingsLabel: {
        color: "#CBD5E1",
        fontSize: 16,
        marginTop: 12,
    },
    savingsValue: {
        color: "#34D399",
        fontSize: 48,
        fontWeight: "700",
        marginVertical: 8,
    },
    percentageBadge: {
        backgroundColor: "#34D399",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 8,
    },
    percentageText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700",
    },
    breakdownCard: {
        backgroundColor: "#1E293B",
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#334155",
    },
    breakdownTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
    },
    breakdownRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    breakdownLabel: {
        color: "#CBD5E1",
        fontSize: 15,
    },
    breakdownValue: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    discountValue: {
        color: "#EF4444",
    },
    divider: {
        height: 1,
        backgroundColor: "#334155",
        marginVertical: 12,
    },
    finalLabel: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    finalValue: {
        color: "#34D399",
        fontSize: 24,
        fontWeight: "700",
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
