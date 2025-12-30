import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    ScrollView,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectMembershipTier } from "../../redux/slice/membershiptierslice";
import WordCounterScreen from "./WordCounterScreen";
import CropToolScreen from "./CropToolScreen";
import QRGeneratorScreen from "./QRGeneratorScreen";
import TranslatorScreen from "./TranslatorScreen";

const tools = [
    { id: "1", title: "Crop Tool", icon: "crop", color: "#3B82F6", requiredTier: "Silver" },
    { id: "2", title: "Word Counter", icon: "font", color: "#10B981", requiredTier: "Silver" },
    { id: "3", title: "PDF Scanner", icon: "file-pdf", color: "#F59E0B", requiredTier: "Gold" },
    { id: "4", title: "QR Generator", icon: "qrcode", color: "#8B5CF6", requiredTier: "Silver" },
    { id: "5", title: "Video Trim", icon: "video", color: "#EF4444", requiredTier: "Premium" },
    { id: "6", title: "Image Compress", icon: "compress-arrows-alt", color: "#6366F1", requiredTier: "Gold" },
    { id: "7", title: "Translator", icon: "language", color: "#EC4899", requiredTier: "Silver" },
    { id: "8", title: "Audio Rec", icon: "microphone", color: "#14B8A6", requiredTier: "Gold" },
    { id: "9", title: "Zip Creator", icon: "file-archive", color: "#F43F5E", requiredTier: "Premium" },
    { id: "10", title: "Notes Pro", icon: "sticky-note", color: "#8B5CF6", requiredTier: "Premium" },
];

const ToolboxsScreen: React.FC = () => {
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
    const userMembership = useSelector(selectMembershipTier);

    const handleClose = () => {
        setSelectedTool(null);
    };

    const isTierAccessible = (required: string) => {
        const tiers = ["Silver", "Gold", "Platinum"];
        return tiers.indexOf(userMembership.tier) >= tiers.indexOf(required);
    };

    const renderToolContent = (toolName: string) => {
        // Shared wrapper style for consistency
        const ToolView = ({ children }: { children: React.ReactNode }) => (
            <View style={styles.toolWrapper}>{children}</View>
        );

        switch (toolName) {
            case "Crop Tool":
                return <CropToolScreen />;

            case "Word Counter":
                return <WordCounterScreen />;

            case "QR Generator":
                return <QRGeneratorScreen />;

            case "Translator":
                return <TranslatorScreen />;

            case "PDF Scanner":
                return (
                    <ToolView>
                        <Ionicons name="document-text-outline" size={60} color="#F59E0B" style={{ alignSelf: 'center' }} />
                        <Text style={styles.toolPlaceholder}>Scan documents into PDF</Text>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#F59E0B' }]}>
                            <Text style={styles.actionBtnText}>Start Scanning</Text>
                        </TouchableOpacity>
                    </ToolView>
                );

            case "Video Trim":
                return (
                    <ToolView>
                        <Ionicons name="videocam-outline" size={60} color="#EF4444" style={{ alignSelf: 'center' }} />
                        <Text style={styles.toolPlaceholder}>Select a video to trim</Text>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#EF4444' }]}>
                            <Text style={styles.actionBtnText}>Upload Video</Text>
                        </TouchableOpacity>
                    </ToolView>
                );

            case "Image Compress":
                return (
                    <ToolView>
                        <Ionicons name="images-outline" size={60} color="#6366F1" style={{ alignSelf: 'center' }} />
                        <Text style={styles.toolPlaceholder}>Reduce image file size</Text>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#6366F1' }]}>
                            <Text style={styles.actionBtnText}>Select Image</Text>
                        </TouchableOpacity>
                    </ToolView>
                );

            case "Audio Rec":
                return (
                    <ToolView>
                        <Ionicons name="mic-outline" size={60} color="#14B8A6" style={{ alignSelf: 'center' }} />
                        <Text style={styles.toolPlaceholder}>High Quality Voice Recorder</Text>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#14B8A6' }]}>
                            <Text style={styles.actionBtnText}>Record Audio</Text>
                        </TouchableOpacity>
                    </ToolView>
                );

            case "Zip Creator":
                return (
                    <ToolView>
                        <Ionicons name="archive-outline" size={60} color="#F43F5E" style={{ alignSelf: 'center' }} />
                        <Text style={styles.toolPlaceholder}>Compress multiple files into .zip</Text>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#F43F5E' }]}>
                            <Text style={styles.actionBtnText}>Select Files</Text>
                        </TouchableOpacity>
                    </ToolView>
                );

            case "Notes Pro":
                return (
                    <ToolView>
                        <Ionicons name="create-outline" size={60} color="#8B5CF6" style={{ alignSelf: 'center' }} />
                        <Text style={styles.toolPlaceholder}>Advanced note-taking with rich text</Text>
                        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#8B5CF6' }]}>
                            <Text style={styles.actionBtnText}>Create Note</Text>
                        </TouchableOpacity>
                    </ToolView>
                );

            default:
                return <Text style={styles.toolPlaceholder}>Tool Interface Coming Soon</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Toolbox</Text>
            <Text style={styles.subtitle}>Utility tools for your daily tasks</Text>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={styles.grid}>
                    {tools.map((tool) => {
                        const isLocked = !isTierAccessible(tool.requiredTier);
                        return (
                            <TouchableOpacity
                                key={tool.id}
                                style={[styles.toolCard, { backgroundColor: tool.color, opacity: isLocked ? 0.5 : 1 }]}
                                onPress={() => !isLocked && setSelectedTool(tool.title)}
                                disabled={isLocked}
                            >
                                <View style={styles.tierBadge}>
                                    <Text style={styles.tierBadgeText}>{tool.requiredTier}</Text>
                                </View>
                                <FontAwesome5 name={tool.icon as any} size={28} color="#fff" />
                                <Text style={styles.toolText}>{tool.title}</Text>
                                {isLocked && <Ionicons name="lock-closed" size={18} color="#fff" style={styles.lockIcon} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

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

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000105", padding: 16, paddingTop: 60 },
    title: { fontSize: 28, fontWeight: "900", color: "#ffffff" },
    subtitle: { fontSize: 14, color: "#64748b", marginBottom: 30 },
    grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },

    // Tool Card Styling
    toolCard: {
        width: width / 2 - 24,
        height: 140,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        position: 'relative',
        elevation: 3,
    },
    toolText: { color: "#fff", fontWeight: "700", fontSize: 14, marginTop: 10, textAlign: 'center' },

    // Tier & Status Styles
    tierBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
    tierBadgeText: { color: '#fff', fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase' },
    lockIcon: { position: 'absolute', bottom: 10, right: 10 },

    // Modal Styles
    modalContainer: { flex: 1, backgroundColor: "#101828" },
    modalHeader: { backgroundColor: "#000c3a", paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    modalTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
    closeButton: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 4 },
    scrollContent: { padding: 0 },
    toolWrapper: { width: '100%' },

    // Placeholder Tool UI (for Gold/Premium tier tools)
    toolPlaceholder: { fontSize: 18, color: "#64748b", textAlign: 'center', marginTop: 50, padding: 20 },
    actionBtn: { backgroundColor: '#000105', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 20 },
    actionBtnText: { color: '#fff', fontWeight: '700' },
});

export default ToolboxsScreen;