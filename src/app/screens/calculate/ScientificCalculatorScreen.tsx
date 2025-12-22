import React from "react";
import { View, StyleSheet } from "react-native";
import ScientificCalculator from "./tools/sc";

const BasicCalculatorScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <ScientificCalculator />
        </View>
    );
};

export default BasicCalculatorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101828",
    },
});
