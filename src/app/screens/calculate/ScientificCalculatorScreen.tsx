import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BUTTON_MARGIN = 6;

interface CalculatorState {
    displayValue: string;
    previousValue: string | null;
    operator: string | null;
    waitingForOperand: boolean;
    angleMode: "DEG" | "RAD";
    history: string[];
}

interface ComponentProps {
    onClose?: () => void;
}

const ScientificCalculator: React.FC<ComponentProps> = ({ onClose }) => {
    const [state, setState] = useState<CalculatorState>({
        displayValue: "0",
        previousValue: null,
        operator: null,
        waitingForOperand: false,
        angleMode: "DEG",
        history: [],
    });

    const numericRows = [
        ["7", "8", "9", "÷"],
        ["4", "5", "6", "×"],
        ["1", "2", "3", "-"],
        ["0", ".", "=", "+"],
    ];

    const scientificButtons = [
        "sin", "cos", "tan", "log", "ln", "sqrt", "x^2", "x^3",
        "10^x", "e^x", "1/x", "abs", "fact", "pi", "e", "y^x"
    ];

    // Calculate button sizes
    const NUM_COLS_MAIN = 4; // numeric + operators
    //   const BUTTON_SIZE_MAIN = (SCREEN_WIDTH - BUTTON_MARGIN * (NUM_COLS_MAIN + 1)) / NUM_COLS_MAIN;

    const NUM_COLS_SCI = 5; // scientific buttons per row
    //   const BUTTON_SIZE_SCI = (SCREEN_WIDTH - BUTTON_MARGIN * (NUM_COLS_SCI + 1)) / NUM_COLS_SCI;

    const BUTTON_SIZE_MAIN = (SCREEN_WIDTH - BUTTON_MARGIN * 7) / 4.2; // divide by 4.2 to fit nicely
    const BUTTON_SIZE_SCI = (SCREEN_WIDTH - BUTTON_MARGIN * 6) / 5;

    // Utility
    const formatResult = (value: number) => {
        if (isNaN(value)) return "Error";
        if (!isFinite(value)) return value > 0 ? "∞" : "-∞";
        return String(parseFloat(value.toPrecision(12)));
    };

    const factorial = (n: number) => {
        if (n < 0 || n > 170 || n % 1 !== 0) throw new Error("Invalid factorial");
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    };

    // Handlers
    const clearAll = () => setState(prev => ({ ...prev, displayValue: "0", previousValue: null, operator: null, waitingForOperand: false }));

    const inputDigit = (digit: string) => setState(prev => ({
        ...prev,
        displayValue: prev.waitingForOperand || prev.displayValue === "0" ? digit : prev.displayValue + digit,
        waitingForOperand: false,
    }));

    const inputDot = () => setState(prev => {
        if (prev.waitingForOperand) return { ...prev, displayValue: "0.", waitingForOperand: false };
        if (!prev.displayValue.includes(".")) return { ...prev, displayValue: prev.displayValue + "." };
        return prev;
    });

    const toggleSign = () => setState(prev => ({ ...prev, displayValue: String(parseFloat(prev.displayValue) * -1) }));

    const inputPercent = () => setState(prev => ({ ...prev, displayValue: String(parseFloat(prev.displayValue) / 100), waitingForOperand: true }));

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(state.displayValue);
        if (state.previousValue === null || state.operator === null || state.waitingForOperand) {
            setState({ ...state, previousValue: state.displayValue, operator: nextOperator, waitingForOperand: true });
        } else {
            const previous = parseFloat(state.previousValue);
            let result = 0;
            switch (state.operator) {
                case "+": result = previous + inputValue; break;
                case "-": result = previous - inputValue; break;
                case "×": result = previous * inputValue; break;
                case "÷": result = inputValue === 0 ? NaN : previous / inputValue; break;
                case "y^x": result = Math.pow(previous, inputValue); break;
                default: result = inputValue;
            }
            const formatted = formatResult(result);
            setState({
                ...state,
                displayValue: formatted,
                previousValue: formatted,
                operator: nextOperator === "=" ? null : nextOperator,
                waitingForOperand: true,
                history: [...state.history, `${previous} ${state.operator} ${inputValue} = ${formatted}`],
            });
        }
    };

    const handleScientificFunction = (func: string) => {
        const value = parseFloat(state.displayValue);
        let result = 0;
        const rad = state.angleMode === "DEG" ? value * (Math.PI / 180) : value;
        try {
            switch (func) {
                case "sin": result = Math.sin(rad); break;
                case "cos": result = Math.cos(rad); break;
                case "tan": result = Math.tan(rad); break;
                case "asin": result = Math.asin(value); break;
                case "acos": result = Math.acos(value); break;
                case "atan": result = Math.atan(value); break;
                case "ln": result = Math.log(value); break;
                case "log": result = Math.log10(value); break;
                case "sqrt": result = Math.sqrt(value); break;
                case "x^2": result = value ** 2; break;
                case "x^3": result = value ** 3; break;
                case "10^x": result = 10 ** value; break;
                case "e^x": result = Math.exp(value); break;
                case "1/x": result = 1 / value; break;
                case "pi": result = Math.PI; break;
                case "e": result = Math.E; break;
                case "abs": result = Math.abs(value); break;
                case "fact": result = factorial(value); break;
                case "y^x": result = value; break;
                default: result = value;
            }
            setState(prev => ({ ...prev, displayValue: formatResult(result), waitingForOperand: true }));
        } catch {
            setState(prev => ({ ...prev, displayValue: "Error" }));
        }
    };

    const renderButton = (
        label: string,
        onPress: () => void,
        style?: object,
        size?: number,
        key?: string
    ) => (
        <TouchableOpacity
            key={key ?? label}
            style={[styles.button, style, { width: size, height: size }]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, { fontSize: (size ?? 50) * 0.35 }]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {onClose && <TouchableOpacity onPress={onClose}><Ionicons name="close" size={28} color="#fff" /></TouchableOpacity>}
            </View>

            {/* Display */}
            <View style={styles.display}>
                <Text style={styles.mode}>{state.angleMode}</Text>
                <Text style={styles.displayText}>{state.displayValue}</Text>
            </View>

            {/* Numeric + basic operators */}
            <View style={styles.keypad}>
                {/* Clear row */}
                <View style={styles.row}>
                    {renderButton("C", clearAll, undefined, BUTTON_SIZE_MAIN)}
                    {renderButton("±", toggleSign, undefined, BUTTON_SIZE_MAIN)}
                    {renderButton("%", inputPercent, undefined, BUTTON_SIZE_MAIN)}
                </View>

                {/* Numeric + operators */}
                {numericRows.map((row, rIndex) => (
                    <View style={styles.row} key={`row-${rIndex}`}>
                        {row.map((b, cIndex) => {
                            if (["+", "-", "×", "÷", "="].includes(b))
                                return renderButton(b, () => performOperation(b), styles.opButton, BUTTON_SIZE_MAIN, `btn-${rIndex}-${cIndex}`);
                            if (b === ".") return renderButton(b, inputDot, undefined, BUTTON_SIZE_MAIN, `btn-${rIndex}-${cIndex}`);
                            return renderButton(b, () => inputDigit(b), undefined, BUTTON_SIZE_MAIN, `btn-${rIndex}-${cIndex}`);
                        })}
                    </View>
                ))}

                {/* Scientific buttons */}
                <View style={styles.sciContainer}>
                    {scientificButtons.map((f, i) =>
                        renderButton(f, () => handleScientificFunction(f), styles.sciButton, BUTTON_SIZE_SCI, `sci-${i}`)
                    )}
                </View>
            </View>
        </View>
    );
};

export default ScientificCalculator;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#101828", paddingTop: Platform.OS === "android" ? 40 : 60 },
    header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10, paddingHorizontal: 12 },
    display: { backgroundColor: "#1E293B", padding: 16, borderRadius: 12, marginHorizontal: 12, marginBottom: 8, minHeight: SCREEN_HEIGHT * 0.15, justifyContent: "center" },
    displayText: { color: "#fff", fontSize: SCREEN_WIDTH * 0.1, textAlign: "right" },
    mode: { color: "#CBD5E1", fontSize: SCREEN_WIDTH * 0.04, textAlign: "right", marginBottom: 4 },
    keypad: { paddingHorizontal: BUTTON_MARGIN, paddingBottom: 16 },
    row: { flexDirection: "row", justifyContent: "flex-start", marginBottom: BUTTON_MARGIN, flexWrap: "wrap" },
    button: { backgroundColor: "#334155", borderRadius: 12, alignItems: "center", justifyContent: "center", margin: BUTTON_MARGIN },
    buttonText: { color: "#fff", fontWeight: "500" },
    opButton: { backgroundColor: "#2563EB" },
    sciButton: { backgroundColor: "#475569" },
    sciContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" },
});
