import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const PersonalDetailsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const user = useSelector((state: RootState) => state.user);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Personal Details</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Section */}
                <View style={styles.card}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{user.initials || 'U'}</Text>
                        </View>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>Basic Information</Text>
                        
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Full Name</Text>
                            <Text style={styles.value}>{user.firstName} {user.lastName}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.value}>{user.email}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Phone</Text>
                            <Text style={styles.value}>{user.phone || 'Not provided'}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>User Type</Text>
                            <Text style={styles.value}>{user.userType}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Staff ID</Text>
                            <Text style={styles.value}>{user.staffId}</Text>
                        </View>
                    </View>
                </View>

                {/* Edit Button */}
                <TouchableOpacity style={styles.editButton}>
                    <Ionicons name="create-outline" size={20} color="#fff" />
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default PersonalDetailsScreen;

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
    card: {
        backgroundColor: '#000c3a',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#C7D2FE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#000105',
    },
    infoSection: {
        gap: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#C7D2FE',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    label: {
        fontSize: 14,
        color: '#999',
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B82F6',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
