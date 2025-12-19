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

const BMICalculatorScreen: React.FC = () => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState("");
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");

    const calculateBMI = () => {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);

        if (!weightNum || !heightNum || heightNum === 0) {
            return;
        }

        let bmiValue: number;

        if (unit === "metric") {
            // BMI = weight (kg) / (height (m))^2
            const heightInMeters = heightNum / 100;
            bmiValue = weightNum / (heightInMeters * heightInMeters);
        } else {
            // BMI = (weight (lbs) / (height (inches))^2) * 703
            bmiValue = (weightNum / (heightNum * heightNum)) * 703;
        }

        setBmi(bmiValue);

        // Set category
        if (bmiValue < 18.5) {
            setCategory("Underweight");
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
            setCategory("Normal Weight");
        } else if (bmiValue >= 25 && bmiValue < 30) {
            setCategory("Overweight");
        } else {
            setCategory("Obese");
        }
    };

    const reset = () => {
        setWeight("");
        setHeight("");
        setBmi(null);
        setCategory("");
    };

    const getCategoryColor = () => {
        if (!category) return "#fff";
        if (category === "Underweight") return "#FCD34D";
        if (category === "Normal Weight") return "#34D399";
        if (category === "Overweight") return "#FB923C";
        return "#EF4444";
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>BMI Calculator</Text>
                <Text style={styles.subheaderText}>
                    Calculate your Body Mass Index
                </Text>
            </View>

            {/* Unit Toggle */}
            <View style={styles.unitToggle}>
                <TouchableOpacity
                    style={[
                        styles.unitButton,
                        unit === "metric" && styles.unitButtonActive,
                    ]}
                    onPress={() => setUnit("metric")}
                >
                    <Text
                        style={[
                            styles.unitButtonText,
                            unit === "metric" && styles.unitButtonTextActive,
                        ]}
                    >
                        Metric
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.unitButton,
                        unit === "imperial" && styles.unitButtonActive,
                    ]}
                    onPress={() => setUnit("imperial")}
                >
                    <Text
                        style={[
                            styles.unitButtonText,
                            unit === "imperial" && styles.unitButtonTextActive,
                        ]}
                    >
                        Imperial
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Weight ({unit === "metric" ? "kg" : "lbs"})
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={`Enter weight in ${unit === "metric" ? "kg" : "lbs"}`}
                    placeholderTextColor="#64748B"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>
                    Height ({unit === "metric" ? "cm" : "inches"})
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={`Enter height in ${unit === "metric" ? "cm" : "inches"}`}
                    placeholderTextColor="#64748B"
                    keyboardType="numeric"
                    value={height}
                    onChangeText={setHeight}
                />
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.calculateButton]}
                    onPress={calculateBMI}
                >
                    <Text style={styles.buttonText}>Calculate BMI</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.resetButton]}
                    onPress={reset}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>

            {/* Result */}
            {bmi !== null && (
                <View style={styles.resultContainer}>
                    <View style={styles.resultCard}>
                        <Ionicons
                            name="fitness"
                            size={48}
                            color={getCategoryColor()}
                        />
                        <Text style={styles.resultLabel}>Your BMI</Text>
                        <Text style={styles.resultValue}>{bmi.toFixed(1)}</Text>
                        <View
                            style={[
                                styles.categoryBadge,
                                { backgroundColor: getCategoryColor() },
                            ]}
                        >
                            <Text style={styles.categoryText}>{category}</Text>
                        </View>
                    </View>

                    {/* BMI Chart */}
                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>BMI Categories</Text>
                        <View style={styles.chartItem}>
                            <View
                                style={[
                                    styles.chartDot,
                                    { backgroundColor: "#FCD34D" },
                                ]}
                            />
                            <Text style={styles.chartText}>
                                Underweight: {"<"} 18.5
                            </Text>
                        </View>
                        <View style={styles.chartItem}>
                            <View
                                style={[
                                    styles.chartDot,
                                    { backgroundColor: "#34D399" },
                                ]}
                            />
                            <Text style={styles.chartText}>
                                Normal Weight: 18.5 - 24.9
                            </Text>
                        </View>
                        <View style={styles.chartItem}>
                            <View
                                style={[
                                    styles.chartDot,
                                    { backgroundColor: "#FB923C" },
                                ]}
                            />
                            <Text style={styles.chartText}>
                                Overweight: 25 - 29.9
                            </Text>
                        </View>
                        <View style={styles.chartItem}>
                            <View
                                style={[
                                    styles.chartDot,
                                    { backgroundColor: "#EF4444" },
                                ]}
                            />
                            <Text style={styles.chartText}>Obese: ≥ 30</Text>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

export default BMICalculatorScreen;

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
    unitToggle: {
        flexDirection: "row",
        backgroundColor: "#1E293B",
        borderRadius: 12,
        padding: 4,
        marginBottom: 24,
    },
    unitButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: "center",
        borderRadius: 8,
    },
    unitButtonActive: {
        backgroundColor: "#2563EB",
    },
    unitButtonText: {
        color: "#94A3B8",
        fontSize: 16,
        fontWeight: "600",
    },
    unitButtonTextActive: {
        color: "#fff",
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
    input: {
        backgroundColor: "#1E293B",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        color: "#fff",
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#334155",
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
        marginBottom: 32,
    },
    button: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    calculateButton: {
        backgroundColor: "#16A34A",
    },
    resetButton: {
        backgroundColor: "#334155",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    resultContainer: {
        marginTop: 8,
    },
    resultCard: {
        backgroundColor: "#1E293B",
        borderRadius: 16,
        padding: 32,
        alignItems: "center",
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#334155",
    },
    resultLabel: {
        color: "#CBD5E1",
        fontSize: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    resultValue: {
        color: "#fff",
        fontSize: 56,
        fontWeight: "700",
        marginBottom: 16,
    },
    categoryBadge: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 24,
        marginTop: 8,
    },
    categoryText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "700",
    },
    chartContainer: {
        backgroundColor: "#1E293B",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: "#334155",
    },
    chartTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
    },
    chartItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    chartDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12,
    },
    chartText: {
        color: "#E2E8F0",
        fontSize: 14,
    },
});
