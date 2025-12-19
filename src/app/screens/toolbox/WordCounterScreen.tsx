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

const WordCounterScreen: React.FC = () => {
    const [text, setText] = useState("");

    const getStats = () => {
        if (!text.trim()) {
            return {
                characters: 0,
                charactersNoSpaces: 0,
                words: 0,
                sentences: 0,
                paragraphs: 0,
            };
        }

        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, "").length;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
        const paragraphs = text.split(/\n+/).filter(para => para.trim().length > 0).length;

        return {
            characters,
            charactersNoSpaces,
            words,
            sentences,
            paragraphs,
        };
    };

    const stats = getStats();

    const clear = () => {
        setText("");
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Ionicons name="text" size={40} color="#10B981" />
                <Text style={styles.headerText}>Word Counter</Text>
                <Text style={styles.subheaderText}>
                    Count words, characters, sentences and more
                </Text>
            </View>

            {/* Text Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type or paste your text here..."
                    placeholderTextColor="#64748B"
                    multiline
                    value={text}
                    onChangeText={setText}
                    textAlignVertical="top"
                />
            </View>

            {/* Clear Button */}
            {text.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={clear}>
                    <Ionicons name="close-circle" size={20} color="#fff" />
                    <Text style={styles.clearButtonText}>Clear Text</Text>
                </TouchableOpacity>
            )}

            {/* Statistics */}
            <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>Statistics</Text>

                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Ionicons name="text-outline" size={32} color="#10B981" />
                        <Text style={styles.statValue}>{stats.words}</Text>
                        <Text style={styles.statLabel}>Words</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Ionicons name="analytics-outline" size={32} color="#3B82F6" />
                        <Text style={styles.statValue}>{stats.characters}</Text>
                        <Text style={styles.statLabel}>Characters</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Ionicons name="remove-outline" size={32} color="#F59E0B" />
                        <Text style={styles.statValue}>{stats.charactersNoSpaces}</Text>
                        <Text style={styles.statLabel}>No Spaces</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Ionicons name="chatbox-outline" size={32} color="#8B5CF6" />
                        <Text style={styles.statValue}>{stats.sentences}</Text>
                        <Text style={styles.statLabel}>Sentences</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Ionicons name="document-text-outline" size={32} color="#EF4444" />
                        <Text style={styles.statValue}>{stats.paragraphs}</Text>
                        <Text style={styles.statLabel}>Paragraphs</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default WordCounterScreen;

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
        alignItems: "center",
        marginBottom: 24,
    },
    headerText: {
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
        marginTop: 12,
        marginBottom: 8,
    },
    subheaderText: {
        fontSize: 16,
        color: "#CBD5E1",
        textAlign: "center",
    },
    inputContainer: {
        marginBottom: 16,
    },
    textInput: {
        backgroundColor: "#1E293B",
        borderRadius: 12,
        padding: 16,
        color: "#fff",
        fontSize: 16,
        minHeight: 200,
        borderWidth: 1,
        borderColor: "#334155",
    },
    clearButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#334155",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 24,
        gap: 8,
    },
    clearButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    statsContainer: {
        backgroundColor: "#1E293B",
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: "#334155",
    },
    statsTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 16,
        textAlign: "center",
    },
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },
    statCard: {
        backgroundColor: "#0F172A",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        width: "47%",
        borderWidth: 1,
        borderColor: "#334155",
    },
    statValue: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "700",
        marginVertical: 8,
    },
    statLabel: {
        color: "#94A3B8",
        fontSize: 14,
        fontWeight: "600",
    },
});
