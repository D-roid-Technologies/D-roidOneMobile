import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CalculatorState {
    displayValue: string;
    previousValue: string | null;
    operator: string | null;
    waitingForOperand: boolean;
    memory: number;
    angleMode: "DEG" | "RAD";
    showHistory: boolean;
    history: string[];
    showSecondary: boolean;
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
        memory: 0,
        angleMode: "DEG",
        showHistory: false,
        history: [],
        showSecondary: false,
    });

    // Utility functions
    const formatResult = (value: number): string => {
        if (isNaN(value)) return "Error";
        if (!isFinite(value)) return value > 0 ? "∞" : "-∞";
        if (Math.abs(value) >= 1e10 || (Math.abs(value) < 1e-7 && value !== 0)) {
            return value.toExponential(8);
        }
        return String(parseFloat(value.toPrecision(12)));
    };

    const factorial = (n: number): number => {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    };

    // Handlers
    const clearAll = () =>
        setState((prev) => ({
            ...prev,
            displayValue: "0",
            previousValue: null,
            operator: null,
            waitingForOperand: false,
        }));

    const inputDigit = (digit: string) =>
        setState((prev) => ({
            ...prev,
            displayValue:
                prev.waitingForOperand || prev.displayValue === "0"
                    ? digit
                    : prev.displayValue + digit,
            waitingForOperand: false,
        }));

    const inputDot = () =>
        setState((prev) => {
            if (prev.waitingForOperand)
                return { ...prev, displayValue: "0.", waitingForOperand: false };
            if (!prev.displayValue.includes("."))
                return {
                    ...prev,
                    displayValue: prev.displayValue + ".",
                    waitingForOperand: false,
                };
            return prev;
        });

    const toggleSign = () =>
        setState((prev) => ({
            ...prev,
            displayValue: String(parseFloat(prev.displayValue) * -1),
        }));

    const inputPercent = () =>
        setState((prev) => ({
            ...prev,
            displayValue: String(parseFloat(prev.displayValue) / 100),
            waitingForOperand: true,
        }));

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(state.displayValue);
        if (state.previousValue === null) {
            setState({
                ...state,
                previousValue: state.displayValue,
                operator: nextOperator,
                waitingForOperand: true,
            });
        } else if (state.operator) {
            const previousValue = parseFloat(state.previousValue);
            let newValue = 0;

            switch (state.operator) {
                case "+": newValue = previousValue + inputValue; break;
                case "-": newValue = previousValue - inputValue; break;
                case "×": newValue = previousValue * inputValue; break;
                case "÷": newValue = previousValue / inputValue; break;
                case "y^x": newValue = Math.pow(previousValue, inputValue); break;
                default: newValue = inputValue;
            }

            const formatted = formatResult(newValue);
            const historyEntry = `${state.previousValue} ${state.operator} ${state.displayValue} = ${formatted}`;

            setState({
                ...state,
                displayValue: formatted,
                previousValue: formatted,
                operator: nextOperator,
                waitingForOperand: true,
                history: [...state.history, historyEntry],
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
                case "x^2": result = Math.pow(value, 2); break;
                case "x^3": result = Math.pow(value, 3); break;
                case "10^x": result = Math.pow(10, value); break;
                case "e^x": result = Math.exp(value); break;
                case "1/x": result = 1 / value; break;
                case "pi": result = Math.PI; break;
                case "e": result = Math.E; break;
                case "abs": result = Math.abs(value); break;
                case "fact":
                    if (value < 0 || value > 170 || value % 1 !== 0)
                        throw new Error("Invalid");
                    result = factorial(value);
                    break;
                default:
                    result = value;
            }

            const formatted = formatResult(result);
            const historyEntry = `${func}(${state.displayValue}) = ${formatted}`;
            setState({
                ...state,
                displayValue: formatted,
                waitingForOperand: true,
                history: [...state.history, historyEntry],
            });
        } catch {
            setState({ ...state, displayValue: "Error" });
        }
    };

    // UI Render
    const renderButton = (label: string, onPress: () => void, style?: object) => (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {onClose && (
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={28} color="#fff" />
                    </TouchableOpacity>
                )}
                {/* <Text style={styles.headerText}>Scientific Calculator</Text>
                <TouchableOpacity onPress={() => setState({ ...state, showHistory: !state.showHistory })}>
                    <Ionicons name="time-outline" size={24} color="#fff" />
                </TouchableOpacity> */}
            </View>

            {/* Display */}
            <View style={styles.display}>
                <Text style={styles.mode}>{state.angleMode}</Text>
                <Text style={styles.displayText}>{state.displayValue}</Text>
            </View>

            {/* History */}
            {state.showHistory && (
                <ScrollView style={styles.history}>
                    {state.history.length === 0 ? (
                        <Text style={styles.historyItem}>No history yet</Text>
                    ) : (
                        state.history.map((h, i) => (
                            <Text key={i} style={styles.historyItem}>{h}</Text>
                        ))
                    )}
                </ScrollView>
            )}

            {/* Buttons */}
            <ScrollView contentContainerStyle={styles.keypad}>
                <View style={styles.row}>
                    {["C", "±", "%", "÷"].map((b) =>
                        renderButton(b, () => {
                            if (b === "C") clearAll();
                            else if (b === "±") toggleSign();
                            else if (b === "%") inputPercent();
                            else performOperation("÷");
                        })
                    )}
                </View>

                {[
                    ["7", "8", "9", "×"],
                    ["4", "5", "6", "-"],
                    ["1", "2", "3", "+"],
                ].map((row, i) => (
                    <View key={i} style={styles.row}>
                        {row.map((b) =>
                            ["+", "-", "×"].includes(b)
                                ? renderButton(b, () => performOperation(b), styles.opButton)
                                : renderButton(b, () => inputDigit(b))
                        )}
                    </View>
                ))}

                <View style={styles.row}>
                    {renderButton("0", () => inputDigit("0"), { flex: 2 })}
                    {renderButton(".", inputDot)}
                    {renderButton("=", () => performOperation("="), styles.eqButton)}
                </View>

                {/* Scientific */}
                <View style={styles.row}>
                    {["sin", "cos", "tan", "log", "ln", "sqrt"].map((f) =>
                        renderButton(f, () => handleScientificFunction(f))
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default ScientificCalculator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101828",
        paddingTop: Platform.OS === "android" ? 40 : 60,
        width: "100%"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: "30%",
        marginBottom: 10,
    },
    headerText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    display: {
        backgroundColor: "#1E293B",
        padding: 16,
        borderRadius: 12,
        margin: 12,
    },
    displayText: {
        color: "#fff",
        fontSize: 40,
        textAlign: "right",
    },
    mode: {
        color: "#CBD5E1",
        fontSize: 14,
        textAlign: "right",
        marginBottom: 4,
    },
    history: {
        backgroundColor: "#1E293B",
        marginHorizontal: 12,
        padding: 8,
        borderRadius: 8,
        maxHeight: 150,
    },
    historyItem: {
        color: "#E2E8F0",
        fontSize: 14,
        paddingVertical: 2,
    },
    keypad: {
        padding: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 6,
    },
    button: {
        flex: 1,
        backgroundColor: "#334155",
        marginHorizontal: 4,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "500",
    },
    opButton: {
        backgroundColor: "#2563EB",
    },
    eqButton: {
        backgroundColor: "#16A34A",
    },
});