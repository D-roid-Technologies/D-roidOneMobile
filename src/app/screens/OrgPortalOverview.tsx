import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const OrgPortalOverview: React.FunctionComponent = ({ navigation }: any) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#0F172A" }}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 120 }} // Extra padding for the fixed button
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={26} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={styles.header}>Organisational Portal</Text>
                </View>

                {/* Intro Card */}
                <View style={[styles.item, styles.unread]}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.mHeader}>The Governance Hub</Text>
                        <View style={styles.unreadDot} />
                    </View>
                    <Text style={styles.message}>
                        A centralized command center for Schools, NGOs, and Businesses.
                        Manage complex operations, resource allocation, and stakeholder
                        engagement.
                    </Text>
                    <View style={[styles.badge, styles.info]}>
                        <Text style={styles.badgeText}>Enterprise Management</Text>
                    </View>
                </View>

                {/* Sector Specifics: Schools */}
                <View style={styles.item}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.mHeader}>Education Systems</Text>
                    </View>
                    <Text style={styles.message}>
                        Streamline student enrollment, faculty workflows, and academic
                        reporting. Transform institutional data into actionable insights.
                    </Text>
                    <View style={[styles.badge, styles.success]}>
                        <Text style={styles.badgeText}>Institutional Oversight</Text>
                    </View>
                </View>

                {/* Sector Specifics: NGOs */}
                <View style={styles.item}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.mHeader}>Impact & NGO Logic</Text>
                    </View>
                    <Text style={styles.message}>
                        Track donor contributions, volunteer coordination, and project
                        milestones. Transparency-first logic for mission accountability.
                    </Text>
                    <View style={[styles.badge, styles.success]}>
                        <Text style={styles.badgeText}>Mission Accountability</Text>
                    </View>
                </View>

                {/* Sector Specifics: Businesses */}
                <View style={styles.item}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.mHeader}>Business Operations</Text>
                    </View>
                    <Text style={styles.message}>
                        Manage payroll, inventory, and B2B relations. Automate the 
                        back-office so you can focus on growth.
                    </Text>
                    <View style={[styles.badge, styles.success]}>
                        <Text style={styles.badgeText}>Scalable Infrastructure</Text>
                    </View>
                </View>

                {/* Security & Access */}
                <View style={styles.item}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.mHeader}>Secure Multi-Tenancy</Text>
                    </View>
                    <Text style={styles.message}>
                        Top-tier encryption and role-based access control (RBAC).
                        Verified personnel access only.
                    </Text>
                    <View style={[styles.badge, styles.error]}>
                        <Text style={styles.badgeText}>Encrypted & Restricted</Text>
                    </View>
                </View>
            </ScrollView>

            {/* NEW: Navigation Action Footer */}
            <View style={styles.footerAction}>
                <Text style={styles.footerNote}>Authorized Access Required</Text>
                <TouchableOpacity 
                    style={styles.portalButton}
                    onPress={() => navigation.navigate("PortalAuthScreen")} // Update with your actual route
                >
                    <Text style={styles.portalButtonText}>Enter Portal</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F172A",
        padding: 16,
        paddingTop: 40,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "900",
        color: "#ffffff",
    },
    item: {
        backgroundColor: "#F1F5F9",
        padding: 18,
        borderRadius: 15,
        marginBottom: 14,
        borderLeftWidth: 5,
        borderLeftColor: "#1E293B",
    },
    unread: {
        opacity: 1,
        borderLeftColor: "#E64A19",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    mHeader: {
        fontSize: 20,
        fontWeight: "900",
        color: "#0F172A",
    },
    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#E64A19",
    },
    message: {
        fontSize: 15,
        color: "#334155",
        marginTop: 10,
        fontWeight: "400",
        lineHeight: 22,
    },
    badge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        marginTop: 14,
    },
    success: { backgroundColor: "#0F172A" },
    error: { backgroundColor: "#991B1B" },
    info: { backgroundColor: "#2563EB" },
    badgeText: {
        fontSize: 10,
        fontWeight: "900",
        color: "#FFF",
        textTransform: 'uppercase'
    },
    /* FOOTER STYLES */
    footerAction: {
        position: 'absolute',
        bottom: 0,
        width: width,
        backgroundColor: '#0F172A',
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#1E293B',
    },
    footerNote: {
        color: '#64748B',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    portalButton: {
        backgroundColor: '#E64A19', // Primary Orange for the call to action
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    portalButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1,
    }
});

export default OrgPortalOverview;