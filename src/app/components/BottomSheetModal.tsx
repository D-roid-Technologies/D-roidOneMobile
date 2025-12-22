import React from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Dimensions,
    ViewStyle,
} from "react-native";

const { height } = Dimensions.get("window");

interface BottomSheetModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxHeight?: number;
    backgroundColor?: string;
    handleColor?: string;
    overlayColor?: string;
    showHandle?: boolean;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
    visible,
    onClose,
    children,
    maxHeight = height * 0.7,
    backgroundColor = "#000105",
    handleColor = "#ffffff",
    overlayColor = "rgba(0, 0, 0, 0.5)",
    showHandle = true,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            {/* Background overlay that closes the modal */}
            <TouchableOpacity
                style={[styles.modalOverlay, { backgroundColor: overlayColor }]}
                activeOpacity={1}
                onPress={onClose}
            >
                {/* Modal content container (stops event propagation) */}
                <View
                    style={[
                        styles.modalContentContainer,
                        {
                            backgroundColor,
                            maxHeight,
                        },
                    ]}
                    onStartShouldSetResponder={() => true}
                >
                    {/* Handle */}
                    {showHandle && (
                        <View style={[styles.modalHandle, { backgroundColor: handleColor }]} />
                    )}

                    {/* Content */}
                    {children}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalContentContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: Platform.OS === "ios" ? 30 : 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
    },
    modalHandle: {
        width: 40,
        height: 5,
        borderRadius: 2.5,
        alignSelf: "center",
        marginBottom: 15,
    },
});
