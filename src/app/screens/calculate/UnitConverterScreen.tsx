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
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

type ConversionCategory = "length" | "weight" | "temperature" | "volume";

interface ConversionUnit {
    name: string;
    toBase: (value: number) => number;
    fromBase: (value: number) => number;
}

const conversions: Record<ConversionCategory, Record<string, ConversionUnit>> = {
    length: {
        meter: { name: "Meter (m)", toBase: (v) => v, fromBase: (v) => v },
        kilometer: { name: "Kilometer (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        centimeter: { name: "Centimeter (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
        millimeter: { name: "Millimeter (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        mile: { name: "Mile (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
        yard: { name: "Yard (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
        foot: { name: "Foot (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
        inch: { name: "Inch (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    },
    weight: {
        kilogram: { name: "Kilogram (kg)", toBase: (v) => v, fromBase: (v) => v },
        gram: { name: "Gram (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        milligram: { name: "Milligram (mg)", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
        ton: { name: "Metric Ton (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
        pound: { name: "Pound (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
        ounce: { name: "Ounce (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    },
    temperature: {
        celsius: { name: "Celsius (°C)", toBase: (v) => v, fromBase: (v) => v },
        fahrenheit: { name: "Fahrenheit (°F)", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => (v * 9 / 5) + 32 },
        kelvin: { name: "Kelvin (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
    volume: {
        liter: { name: "Liter (L)", toBase: (v) => v, fromBase: (v) => v },
        milliliter: { name: "Milliliter (mL)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
        gallon: { name: "Gallon (gal)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
        quart: { name: "Quart (qt)", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
        pint: { name: "Pint (pt)", toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
        cup: { name: "Cup", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    },
};

const UnitConverterScreen: React.FC = () => {
    const [category, setCategory] = useState<ConversionCategory>("length");
    const [fromUnit, setFromUnit] = useState("meter");
    const [toUnit, setToUnit] = useState("kilometer");
    const [inputValue, setInputValue] = useState("");

    const convert = () => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return "0";

        const fromConversion = conversions[category][fromUnit];
        const toConversion = conversions[category][toUnit];

        const baseValue = fromConversion.toBase(value);
        const result = toConversion.fromBase(baseValue);

        return result.toFixed(6).replace(/\.?0+$/, "");
    };

    const handleCategoryChange = (newCategory: ConversionCategory) => {
        setCategory(newCategory);
        const units = Object.keys(conversions[newCategory]);
        setFromUnit(units[0]);
        setToUnit(units[1] || units[0]);
    };

    const swapUnits = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
    };

    const result = inputValue ? convert() : "0";

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Unit Converter</Text>
                <Text style={styles.subheaderText}>
                    Convert between different units of measurement
                </Text>
            </View>

            {/* Category Selection */}
            <View style={styles.categoryContainer}>
                <TouchableOpacity
                    style={[styles.categoryButton, category === "length" && styles.categoryButtonActive]}
                    onPress={() => handleCategoryChange("length")}
                >
                    <Ionicons name="resize-outline" size={20} color={category === "length" ? "#fff" : "#94A3B8"} />
                    <Text style={[styles.categoryText, category === "length" && styles.categoryTextActive]}>
                        Length
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.categoryButton, category === "weight" && styles.categoryButtonActive]}
                    onPress={() => handleCategoryChange("weight")}
                >
                    <Ionicons name="barbell-outline" size={20} color={category === "weight" ? "#fff" : "#94A3B8"} />
                    <Text style={[styles.categoryText, category === "weight" && styles.categoryTextActive]}>
                        Weight
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.categoryButton, category === "temperature" && styles.categoryButtonActive]}
                    onPress={() => handleCategoryChange("temperature")}
                >
                    <Ionicons name="thermometer-outline" size={20} color={category === "temperature" ? "#fff" : "#94A3B8"} />
                    <Text style={[styles.categoryText, category === "temperature" && styles.categoryTextActive]}>
                        Temp
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.categoryButton, category === "volume" && styles.categoryButtonActive]}
                    onPress={() => handleCategoryChange("volume")}
                >
                    <Ionicons name="water-outline" size={20} color={category === "volume" ? "#fff" : "#94A3B8"} />
                    <Text style={[styles.categoryText, category === "volume" && styles.categoryTextActive]}>
                        Volume
                    </Text>
                </TouchableOpacity>
            </View>

            {/* From Unit */}
            <View style={styles.conversionSection}>
                <Text style={styles.label}>From</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={fromUnit}
                        onValueChange={(value) => setFromUnit(value)}
                        style={styles.picker}
                        dropdownIconColor="#fff"
                    >
                        {Object.entries(conversions[category]).map(([key, unit]) => (
                            <Picker.Item key={key} label={unit.name} value={key} />
                        ))}
                    </Picker>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Enter value"
                    placeholderTextColor="#64748B"
                    keyboardType="decimal-pad"
                    value={inputValue}
                    onChangeText={setInputValue}
                />
            </View>

            {/* Swap Button */}
            <View style={styles.swapContainer}>
                <TouchableOpacity style={styles.swapButton} onPress={swapUnits}>
                    <Ionicons name="swap-vertical" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* To Unit */}
            <View style={styles.conversionSection}>
                <Text style={styles.label}>To</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={toUnit}
                        onValueChange={(value) => setToUnit(value)}
                        style={styles.picker}
                        dropdownIconColor="#fff"
                    >
                        {Object.entries(conversions[category]).map(([key, unit]) => (
                            <Picker.Item key={key} label={unit.name} value={key} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.resultBox}>
                    <Text style={styles.resultText}>{result}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default UnitConverterScreen;

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
    categoryContainer: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 24,
    },
    categoryButton: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: 12,
        backgroundColor: "#1E293B",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#334155",
    },
    categoryButtonActive: {
        backgroundColor: "#6366F1",
        borderColor: "#6366F1",
    },
    categoryText: {
        color: "#94A3B8",
        fontSize: 12,
        fontWeight: "600",
        marginTop: 4,
    },
    categoryTextActive: {
        color: "#fff",
    },
    conversionSection: {
        marginBottom: 16,
    },
    label: {
        color: "#E2E8F0",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    pickerContainer: {
        backgroundColor: "#1E293B",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#334155",
        marginBottom: 12,
    },
    picker: {
        color: "#fff",
        height: 50,
    },
    input: {
        backgroundColor: "#1E293B",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
        borderWidth: 1,
        borderColor: "#334155",
    },
    swapContainer: {
        alignItems: "center",
        marginVertical: 8,
    },
    swapButton: {
        backgroundColor: "#334155",
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    resultBox: {
        backgroundColor: "#1E293B",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#334155",
    },
    resultText: {
        color: "#34D399",
        fontSize: 24,
        fontWeight: "700",
        textAlign: "right",
    },
});
