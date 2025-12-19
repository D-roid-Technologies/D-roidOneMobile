import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ContactUsScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const contactMethods = [
        { id: 1, icon: 'mail', title: 'Email', value: 'info@droidtech.com', action: 'mailto:info@droidtech.com', color: '#3B82F6' },
        { id: 2, icon: 'call', title: 'Phone', value: '+234 123 456 7890', action: 'tel:+2341234567890', color: '#10B981' },
        { id: 3, icon: 'logo-whatsapp', title: 'WhatsApp', value: '+234 123 456 7890', action: 'https://wa.me/2341234567890', color: '#25D366' },
        { id: 4, icon: 'location', title: 'Address', value: 'Calabar, Cross River State', action: null, color: '#F59E0B' },
    ];

    const socialMedia = [
        { id: 1, icon: 'logo-twitter', name: 'Twitter', color: '#1DA1F2', url: 'https://twitter.com/droidtech' },
        { id: 2, icon: 'logo-facebook', name: 'Facebook', color: '#4267B2', url: 'https://facebook.com/droidtech' },
        { id: 3, icon: 'logo-instagram', name: 'Instagram', color: '#E4405F', url: 'https://instagram.com/droidtech' },
        { id: 4, icon: 'logo-linkedin', name: 'LinkedIn', color: '#0077B5', url: 'https://linkedin.com/company/droidtech' },
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
                        <Text style={styles.hoursTime}>9:00 AM - 6:00 PM</Text>
                    </View>
                    <View style={styles.hoursRow}>
                        <Text style={styles.hoursDay}>Saturday</Text>
                        <Text style={styles.hoursTime}>10:00 AM - 4:00 PM</Text>
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
        backgroundColor: '#000105',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 16,
        backgroundColor: '#000c3a',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    placeholder: {
        width: 40,
    },
    content: {
        padding: 16,
    },
    banner: {
        backgroundColor: '#000c3a',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 24,
    },
    bannerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginTop: 12,
        marginBottom: 8,
    },
    bannerText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
        marginTop: 8,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000c3a',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    contactIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contactContent: {
        flex: 1,
    },
    contactTitle: {
        fontSize: 14,
        color: '#999',
        marginBottom: 4,
    },
    contactValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    socialContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    socialButton: {
        width: '48%',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        gap: 8,
    },
    socialText: {
        fontSize: 14,
        fontWeight: '600',
    },
    hoursCard: {
        backgroundColor: '#000c3a',
        padding: 16,
        borderRadius: 12,
    },
    hoursTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 12,
    },
    hoursRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    hoursDay: {
        fontSize: 14,
        color: '#999',
    },
    hoursTime: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
});
