// @ts-nocheck
import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicyScreen: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.topLinksContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.loginLink}>Back to Signup</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle}>Privacy Policy</Text>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.heading}>Introduction</Text>
                <Text style={styles.paragraph}>
                    D'roid Technologies Ltd ("we", "our", "us") is committed to protecting
                    and respecting your privacy. This Privacy Policy outlines the types of
                    information we collect from you, how we use it, and the measures we
                    take to protect it.
                </Text>

                <Text style={styles.heading}>Information We Collect</Text>
                <Text style={styles.subHeading}>Personal Information</Text>
                <Text style={styles.paragraph}>
                    We may collect the following personal information:
                </Text>
                <View style={styles.list}>
                    <Text style={styles.listItem}>• Name</Text>
                    <Text style={styles.listItem}>• Email address</Text>
                    <Text style={styles.listItem}>• Phone number</Text>
                    <Text style={styles.listItem}>• Mailing address</Text>
                    <Text style={styles.listItem}>• Payment information</Text>
                    <Text style={styles.listItem}>• User account details</Text>
                </View>

                <Text style={styles.subHeading}>Non-Personal Information</Text>
                <View style={styles.list}>
                    <Text style={styles.listItem}>• Browser type and version</Text>
                    <Text style={styles.listItem}>• Operating system</Text>
                    <Text style={styles.listItem}>• Pages visited</Text>
                    <Text style={styles.listItem}>• Time and date of visit</Text>
                    <Text style={styles.listItem}>• Time spent on pages</Text>
                </View>

                <Text style={styles.heading}>How We Use Your Information</Text>
                <View style={styles.list}>
                    <Text style={styles.listItem}>• To provide and maintain services</Text>
                    <Text style={styles.listItem}>• To manage accounts and transactions</Text>
                    <Text style={styles.listItem}>• To improve our website</Text>
                    <Text style={styles.listItem}>• To send updates (with consent)</Text>
                    <Text style={styles.listItem}>• To comply with legal obligations</Text>
                </View>

                <Text style={styles.heading}>Sharing Your Information</Text>
                <Text style={styles.paragraph}>
                    We do not sell your information. We may share it with:
                </Text>
                <View style={styles.list}>
                    <Text style={styles.listItem}>
                        • **Service Providers** – assisting with operations
                    </Text>
                    <Text style={styles.listItem}>
                        • **Legal Authorities** – when required by law
                    </Text>
                    <Text style={styles.listItem}>
                        • **Business Transfers** – mergers or acquisitions
                    </Text>
                </View>

                <Text style={styles.heading}>Data Security</Text>
                <Text style={styles.paragraph}>
                    We implement security measures including encryption, secure servers,
                    audits, and employee training. However, no system is 100% secure.
                </Text>

                <Text style={styles.heading}>Your Rights</Text>
                <View style={styles.list}>
                    <Text style={styles.listItem}>• Access your information</Text>
                    <Text style={styles.listItem}>• Request corrections</Text>
                    <Text style={styles.listItem}>• Request deletion</Text>
                    <Text style={styles.listItem}>• Object to processing</Text>
                    <Text style={styles.listItem}>• Request data portability</Text>
                </View>

                <Text style={styles.heading}>Cookies</Text>
                <Text style={styles.paragraph}>
                    Our website uses cookies to enhance your browsing experience. You may
                    disable cookies, but some features might not work properly.
                </Text>

                <Text style={styles.heading}>Third-Party Links</Text>
                <Text style={styles.paragraph}>
                    We are not responsible for the privacy practices of external websites.
                </Text>

                <Text style={styles.heading}>Changes to Policy</Text>
                <Text style={styles.paragraph}>
                    We may update this policy and will notify users by updating this page.
                </Text>

                <Text style={styles.heading}>Contact Us</Text>
                <View style={styles.list}>
                    <Text
                        style={styles.link}
                        onPress={() => Linking.openURL("mailto:team@droidtechhq.com")}
                    >
                        • Email: team@droidtechhq.com
                    </Text>
                    <Text style={styles.listItem}>• Phone: (+234) 09165275635</Text>
                    <Text style={styles.listItem}>• WhatsApp: (+234) 09165275635</Text>
                </View>

                <TouchableOpacity
                    style={styles.contactButton}
                    onPress={() => navigation.navigate("Contact")}
                >
                    <Text style={styles.contactButtonText}>Contact Us</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default PrivacyPolicyScreen;

// STYLES
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9F9F9" },

    header: {
        backgroundColor: "#000105",
        paddingVertical: 18,
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    backButton: {
        flexDirection: "row",
        position: "absolute",
        left: 20,
        top: 18,
    },
    backText: { color: "#FFF", marginLeft: 6, fontSize: 16 },
    headerTitle: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "700",
    },
    topLinksContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
        marginBottom: 30,
    },
    loginLink: {
        color: '#C7D2FE',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    contentContainer: { padding: 20, paddingBottom: 60 },
    heading: {
        fontSize: 22,
        fontWeight: "700",
        color: "#071D6A",
        marginTop: 20,
        marginBottom: 10,
    },
    subHeading: {
        fontSize: 18,
        fontWeight: "600",
        color: "#071D6A",
        marginBottom: 5,
    },
    paragraph: {
        color: "#444",
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 10,
    },
    list: { paddingLeft: 10, marginBottom: 10 },
    listItem: {
        fontSize: 15,
        color: "#444",
        marginBottom: 6,
    },
    link: {
        fontSize: 15,
        color: "#479BE8",
        marginBottom: 6,
        textDecorationLine: "underline",
    },
    contactButton: {
        marginTop: 20,
        backgroundColor: "#071D6A",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    contactButtonText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 16,
    },
});