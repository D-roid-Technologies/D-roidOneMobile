import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ContactUsScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const contactMethods = [
        { id: 1, icon: 'mail', title: 'Email', value: 'team@droidtechhq.com', action: 'mailto:team@droidtechhq.com', color: '#3B82F6' },
        { id: 2, icon: 'call', title: 'Phone', value: '+234 916 527 5635', action: 'tel:+234 916 527 5635', color: '#10B981' },
        { id: 3, icon: 'logo-whatsapp', title: 'WhatsApp', value: '+2349165275635', action: 'https://wa.me/2349165275635', color: '#25D366' },
        { id: 4, icon: 'location', title: 'Address', value: 'Warri, Delta State, Nigeria', action: null, color: '#F59E0B' },
    ];

    const socialMedia = [
        { id: 1, icon: 'logo-twitter', name: 'Twitter', color: '#1DA1F2', url: 'https://x.com/Droidtechn?t=LVFJ6SEetP5DD1BHdSK0rQ&s=09' },
        { id: 2, icon: 'logo-facebook', name: 'Facebook', color: '#4267B2', url: 'https://web.facebook.com/droidtechltd/?locale=eo_EO&_rdc=1&_rdr#' },
        { id: 3, icon: 'logo-instagram', name: 'Instagram', color: '#E4405F', url: 'https://www.instagram.com/droidtechn' },
        { id: 4, icon: 'logo-linkedin', name: 'LinkedIn', color: '#0077B5', url: 'https://www.linkedin.com/company/d-roid-technologies-international/' },
    ];

    const handleContact = (action: string | null) => {
        if (action) {
            Linking.openURL(action);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Contact Us</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Banner */}
                <View style={styles.banner}>
                    <Ionicons name="chatbubbles" size={50} color="#06B6D4" />
                    <Text style={styles.bannerTitle}>Get in Touch</Text>
                    <Text style={styles.bannerText}>
                        We'd love to hear from you. Choose your preferred method below.
                    </Text>
                </View>

                {/* Contact Methods */}
                <Text style={styles.sectionTitle}>Contact Methods</Text>
                {contactMethods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={styles.contactCard}
                        onPress={() => handleContact(method.action)}
                        disabled={!method.action}
                    >
                        <View style={[styles.contactIcon, { backgroundColor: method.color + '20' }]}>
                            <Ionicons name={method.icon as any} size={24} color={method.color} />
                        </View>
                        <View style={styles.contactContent}>
                            <Text style={styles.contactTitle}>{method.title}</Text>
                            <Text style={styles.contactValue}>{method.value}</Text>
                        </View>
                        {method.action && (
                            <Ionicons name="chevron-forward" size={20} color="#666" />
                        )}
                    </TouchableOpacity>
                ))}

                {/* Social Media */}
                <Text style={styles.sectionTitle}>Follow Us</Text>
                <View style={styles.socialContainer}>
                    {socialMedia.map((social) => (
                        <TouchableOpacity
                            key={social.id}
                            style={[styles.socialButton, { backgroundColor: social.color + '20' }]}
                            onPress={() => Linking.openURL(social.url)}
                        >
                            <Ionicons name={social.icon as any} size={28} color={social.color} />
                            <Text style={[styles.socialText, { color: social.color }]}>{social.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Office Hours */}
                <View style={styles.hoursCard}>
                    <Text style={styles.hoursTitle}>Office Hours</Text>
                    <View style={styles.hoursRow}>
                        <Text style={styles.hoursDay}>Monday - Friday</Text>
                        <Text style={styles.hoursTime}>9:00 AM - 5:00 PM</Text>
                    </View>
                    <View style={styles.hoursRow}>
                        <Text style={styles.hoursDay}>Saturday</Text>
                        <Text style={styles.hoursTime}>Closed</Text>
                    </View>
                    <View style={styles.hoursRow}>
                        <Text style={styles.hoursDay}>Sunday</Text>
                        <Text style={styles.hoursTime}>Closed</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
    },

    /* Header */
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#000105",
    },
    backButton: {
        padding: 6,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "900",
        color: "#ffffff",
    },
    placeholder: {
        width: 24,
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    /* Banner */
    banner: {
        backgroundColor: "#C7D2FE",
        padding: 24,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 30,
    },
    bannerTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#000105",
        marginTop: 12,
        marginBottom: 6,
    },
    bannerText: {
        fontSize: 14,
        color: "#334155",
        textAlign: "center",
        fontWeight: "300",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#ffffff",
        marginBottom: 12,
        marginTop: 20,
    },

    /* Contact cards */
    contactCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#C7D2FE",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
    },
    contactIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    contactContent: {
        flex: 1,
    },
    contactTitle: {
        fontSize: 13,
        color: "#334155",
        marginBottom: 2,
        fontWeight: "400",
    },
    contactValue: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000105",
    },

    /* Social */
    socialContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 30,
    },
    socialButton: {
        width: "48%",
        backgroundColor: "#C7D2FE",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 12,
    },
    socialText: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 6,
    },

    /* Office hours */
    hoursCard: {
        backgroundColor: "#C7D2FE",
        padding: 16,
        borderRadius: 10,
    },
    hoursTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#000105",
        marginBottom: 10,
    },
    hoursRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    hoursDay: {
        fontSize: 14,
        color: "#334155",
        fontWeight: "400",
    },
    hoursTime: {
        fontSize: 14,
        fontWeight: "700",
        color: "#000105",
    },
});

