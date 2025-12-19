import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CropToolScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Ionicons name="crop" size={80} color="#3B82F6" />
                <Text style={styles.title}>Crop Tool</Text>
                <Text style={styles.description}>
                    Image cropping functionality will be implemented here.
                </Text>
                <Text style={styles.placeholder}>
                    ✂️ Coming Soon
                </Text>
            </View>
        </View>
    );
};

export default CropToolScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101828",
        paddingTop: Platform.OS === "android" ? 40 : 60,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
        marginTop: 20,
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: "#CBD5E1",
        textAlign: "center",
        marginBottom: 24,
        paddingHorizontal: 32,
    },
    placeholder: {
        fontSize: 24,
        color: "#64748B",
        fontWeight: "600",
    },
});
