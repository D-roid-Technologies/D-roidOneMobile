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
    { id: "1", title: "Crop Tool", icon: "crop", color: "#3B82F6", screen: "CropTool" },
    { id: "2", title: "Word Counter", icon: "font", color: "#10B981", screen: "WordCounter" },
    // { id: "3", title: "Color Converter", icon: "eyedropper", color: "#F59E0B", screen: "ColorConverter" },
    // { id: "4", title: "JSON Formatter", icon: "code", color: "#8B5CF6", screen: "JSONFormatter" },
    // { id: "5", title: "Image Resizer", icon: "image", color: "#EF4444", screen: "ImageResizer" },
];

const ToolboxListScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Toolbox</Text>
            <Text style={styles.subtitle}>
                Access your handy tools below
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

export default ToolboxListScreen;

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
