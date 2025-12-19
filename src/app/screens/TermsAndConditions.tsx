// TermsAndConditions.tsx
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TermsAndConditions: React.FunctionComponent = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.topLinksContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.loginLink}>Signup</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle}>Terms and Conditions</Text>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                <Section title="Introduction">
                    Welcome to D'roid. These terms and conditions outline the rules and regulations
                    for the use of D'roid's services. By accessing this application, you accept these
                    terms and conditions. Do not continue to use D'roid if you do not agree with them.
                </Section>

                <Section title="Use of Our Services">
                    D'roid connects developers, organisations, and staff in a collaborative environment.
                    Using our services means you agree to follow our rules. Violations may result in
                    account termination.
                </Section>

                <Section title="Account Creation">
                    To use some features, you must create an account. You are responsible for maintaining
                    the confidentiality of your account information. Inform us immediately if you detect
                    unauthorized access.
                </Section>

                <Section title="User Conduct">
                    You agree not to misuse the services, overload our systems, or harm other users.
                    Illegal or abusive behavior is strictly prohibited.
                </Section>

                <Section title="Privacy Policy">
                    Please refer to our Privacy Policy for details on how we collect, store, and protect
                    your personal information.
                </Section>

                <Section title="Intellectual Property">
                    All content including text, graphics, logos, and software is owned by D'roid.
                    You may not reproduce or distribute it without permission.
                </Section>

                <Section title="Limitation of Liability">
                    D'roid is not liable for any damages resulting from use or inability to use the service.
                    We do not guarantee uninterrupted or error-free service.
                </Section>

                <Section title="Termination">
                    We may suspend or terminate your account for violations. Upon termination, usage must stop
                    immediately.
                </Section>

                <Section title="Changes to the Terms">
                    We may modify these terms at any time. The updated date will be reflected at the top of the page.
                </Section>

                <Section title="Contact Us">
                    For questions, email us at:
                    <Text style={styles.email}>team@droidtechhq.com</Text>
                </Section>

            </ScrollView>
        </SafeAreaView>
    );
};

// Reusable section component
const Section = ({ title, children }: any) => (
    <View style={{ marginBottom: 25 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.paragraph}>{children}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
    },

    header: {
        backgroundColor: "#000105",
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: "center",
    },

    backButton: {
        flexDirection: "row",
        alignItems: "center",
    },

    backText: {
        color: "#FFFFFF",
        marginLeft: 8,
        fontSize: 16,
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
    headerTitle: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "700",
        marginTop: 10,
    },

    content: {
        padding: 20,
        backgroundColor: "#FFFFFF",
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#071D6A",
        marginBottom: 10,
    },

    paragraph: {
        fontSize: 16,
        color: "#333",
        lineHeight: 22,
    },

    email: {
        color: "#479BE8",
        marginTop: 5,
    },
});

export default TermsAndConditions;