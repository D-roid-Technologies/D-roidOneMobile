import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    ScrollView,
    TextInput,
    Image,
    Alert,
    Platform
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import Toast from "react-native-toast-message";

const tools = [
    { id: "1", title: "Crop Tool", icon: "crop", color: "#3B82F6" },
    { id: "2", title: "Word Counter", icon: "font", color: "#10B981" },
];

const ToolboxsScreen: React.FC = () => {
    const [selectedTool, setSelectedTool] = useState<string | null>(null);

    // --- Word Counter State ---
    const [text, setText] = useState("");

    // --- Crop Tool State ---
    const [image, setImage] = useState<string | null>(null);

    const handleClose = () => {
        setSelectedTool(null);
        setText("");
        setImage(null);
    };

    // --- Word Counter Logic ---
    const getStats = () => {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        // Counts all types of whitespace (spaces, tabs, newlines)
        const spaces = (text.match(/\s/g) || []).length;
        return { words, chars, spaces };
    };

    // --- Crop Tool Logic ---
    // --- Image Picker Logic ---
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Toast.show({
                type: 'error',
                text1: 'Permission Denied',
                text2: 'Gallery access is required to select photos.'
            });
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], 
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            Toast.show({
                type: 'success',
                text1: 'Image Loaded',
                text2: 'You can now download or edit this image.'
            });
        }
    };

    // --- Save Image Logic ---
    const saveImage = async () => {
        if (!image) {
            Toast.show({
                type: 'info',
                text1: 'No Image',
                text2: 'Please select an image first.'
            });
            return;
        }

        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
            try {
                await MediaLibrary.saveToLibraryAsync(image);
                Toast.show({
                    type: 'success',
                    text1: 'Saved Successfully ✅',
                    text2: 'The image is now in your gallery.'
                });
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Save Failed',
                    text2: 'An error occurred while saving.'
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Permission Denied',
                text2: 'We need permission to save to your gallery.'
            });
        }
    };

    const renderToolContent = (toolName: string) => {
        if (toolName === "Word Counter") {
            const stats = getStats();
            return (
                <View style={styles.toolWrapper}>
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNum}>{stats.words}</Text>
                            <Text style={styles.statLabel}>Words</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNum}>{stats.chars}</Text>
                            <Text style={styles.statLabel}>Chars</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNum}>{stats.spaces}</Text>
                            <Text style={styles.statLabel}>Spaces</Text>
                        </View>
                    </View>
                    <TextInput
                        multiline
                        style={styles.textArea}
                        placeholder="Start typing..."
                        placeholderTextColor="#999"
                        value={text}
                        onChangeText={setText}
                    />
                    <TouchableOpacity style={styles.actionBtn} onPress={() => setText("")}>
                        <Text style={styles.actionBtnText}>Clear All</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (toolName === "Crop Tool") {
            return (
                <View style={styles.toolWrapper}>
                    {image ? (
                        <View style={{ alignItems: 'center' }}>
                            <Image source={{ uri: image }} style={styles.previewImage} />
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={[styles.actionBtn, { flex: 1, marginRight: 10, backgroundColor: '#475569' }]} onPress={pickImage}>
                                    <Ionicons name="refresh" size={20} color="#fff" />
                                    <Text style={styles.actionBtnText}> Change Image</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionBtn, { flex: 1, backgroundColor: '#3B82F6' }]} onPress={saveImage}>
                                    <Ionicons name="download-outline" size={20} color="#fff" />
                                    <Text style={styles.actionBtnText}>Download Image</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                            <Ionicons name="cloud-upload-outline" size={50} color="#3B82F6" />
                            <Text style={styles.uploadText}>Tap to upload image</Text>
                        </TouchableOpacity>
                    )}
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Toolbox</Text>
            <Text style={styles.subtitle}>Utility tools for your daily tasks</Text>

            <View style={styles.grid}>
                {tools.map((tool) => (
                    <TouchableOpacity
                        key={tool.id}
                        style={[styles.toolCard, { backgroundColor: tool.color }]}
                        onPress={() => setSelectedTool(tool.title)}
                    >
                        <FontAwesome5 name={tool.icon as any} size={28} color="#fff" />
                        <Text style={styles.toolText}>{tool.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Modal visible={!!selectedTool} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{selectedTool}</Text>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <Ionicons name="close" size={26} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {selectedTool && renderToolContent(selectedTool)}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

export default ToolboxsScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000105", padding: 16, paddingTop: 60 },
    title: { fontSize: 28, fontWeight: "900", color: "#ffffff", textAlign: "left" },
    subtitle: { fontSize: 14, color: "#64748b", textAlign: "left", marginBottom: 30 },
    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    toolCard: { width: width / 2 - 24, height: 120, borderRadius: 20, justifyContent: "center", alignItems: "center", marginBottom: 16 },
    toolText: { color: "#fff", fontWeight: "700", fontSize: 14, marginTop: 10 },

    modalContainer: { flex: 1, backgroundColor: "#F8FAFC" },
    modalHeader: { backgroundColor: "#000105", paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    modalTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
    closeButton: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 4 },
    scrollContent: { padding: 20 },
    toolWrapper: { width: '100%' },

    // Word Counter
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    statCard: { backgroundColor: '#fff', padding: 12, borderRadius: 12, width: '31%', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
    statNum: { fontSize: 18, fontWeight: '900', color: '#000105' },
    statLabel: { fontSize: 10, color: '#64748b', marginTop: 4, textTransform: 'uppercase' },
    textArea: { backgroundColor: '#fff', borderRadius: 16, padding: 15, height: 300, textAlignVertical: 'top', fontSize: 16, color: '#1e293b', borderWidth: 1, borderColor: '#e2e8f0' },

    // Crop Tool
    uploadBox: { height: 350, borderStyle: 'dashed', borderWidth: 2, borderColor: '#cbd5e1', borderRadius: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    uploadText: { marginTop: 15, color: '#64748b', fontWeight: '500' },
    previewImage: { width: '100%', height: 400, borderRadius: 20, marginBottom: 20 },
    buttonRow: { flexDirection: 'row', width: '100%' },

    actionBtn: { backgroundColor: '#000105', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'center' },
    actionBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 }
});