import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ServicesScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const services = [
        { id: 1, title: 'Web Development', icon: 'code', color: '#3B82F6', description: 'Custom web applications and websites' },
        { id: 2, title: 'Mobile Apps', icon: 'mobile-alt', color: '#10B981', description: 'iOS and Android development' },
        { id: 3, title: 'UI/UX Design', icon: 'paint-brush', color: '#F59E0B', description: 'User interface and experience design' },
        { id: 4, title: 'Consulting', icon: 'lightbulb', color: '#8B5CF6', description: 'Technical consulting services' },
        { id: 5, title: 'Training', icon: 'graduation-cap', color: '#EC4899', description: 'Tech training and workshops' },
        { id: 6, title: 'Support', icon: 'headset', color: '#06B6D4', description: '24/7 technical support' },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Our Services</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.subtitle}>
                    Explore our comprehensive range of technology services
                </Text>

                {services.map((service) => (
                    <TouchableOpacity key={service.id} style={styles.serviceCard}>
                        <View style={[styles.iconWrapper, { backgroundColor: service.color + '20' }]}>
                            <FontAwesome5 name={service.icon} size={24} color={service.color} />
                        </View>
                        <View style={styles.serviceContent}>
                            <Text style={styles.serviceTitle}>{service.title}</Text>
                            <Text style={styles.serviceDescription}>{service.description}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#666" />
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.contactButton}>
                    <Ionicons name="mail-outline" size={20} color="#fff" />
                    <Text style={styles.contactButtonText}>Request a Service</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default ServicesScreen;

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
    subtitle: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        marginBottom: 24,
    },
    serviceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000c3a',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    iconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    serviceContent: {
        flex: 1,
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 4,
    },
    serviceDescription: {
        fontSize: 13,
        color: '#999',
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#10B981',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
        marginTop: 12,
    },
    contactButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
