import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const AttendanceScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const user = useSelector((state: RootState) => state.user);
    const [selectedMonth, setSelectedMonth] = useState('December 2025');

    const attendanceData = {
        totalDays: 22,
        present: 18,
        absent: 2,
        late: 2,
        workingHours: 144,
    };

    const attendanceRecords = [
        { date: '2025-12-09', day: 'Monday', status: 'present', checkIn: '08:45 AM', checkOut: '05:30 PM', hours: 8.75 },
        { date: '2025-12-08', day: 'Sunday', status: 'weekend', checkIn: '-', checkOut: '-', hours: 0 },
        { date: '2025-12-07', day: 'Saturday', status: 'weekend', checkIn: '-', checkOut: '-', hours: 0 },
        { date: '2025-12-06', day: 'Friday', status: 'present', checkIn: '08:30 AM', checkOut: '05:15 PM', hours: 8.75 },
        { date: '2025-12-05', day: 'Thursday', status: 'late', checkIn: '09:30 AM', checkOut: '05:45 PM', hours: 8.25 },
        { date: '2025-12-04', day: 'Wednesday', status: 'present', checkIn: '08:40 AM', checkOut: '05:20 PM', hours: 8.67 },
        { date: '2025-12-03', day: 'Tuesday', status: 'absent', checkIn: '-', checkOut: '-', hours: 0 },
        { date: '2025-12-02', day: 'Monday', status: 'present', checkIn: '08:35 AM', checkOut: '05:25 PM', hours: 8.83 },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'present': return '#10B981';
            case 'absent': return '#EF4444';
            case 'late': return '#F59E0B';
            case 'weekend': return '#6366F1';
            default: return '#999';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'present': return 'checkmark-circle';
            case 'absent': return 'close-circle';
            case 'late': return 'time';
            case 'weekend': return 'calendar';
            default: return 'help-circle';
        }
    };

    const attendancePercentage = (attendanceData.present / attendanceData.totalDays) * 100;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Attendance</Text>
                <TouchableOpacity style={styles.calendarButton}>
                    <Ionicons name="calendar-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Summary Card */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Monthly Summary</Text>
                    <Text style={styles.summaryMonth}>{selectedMonth}</Text>
                    
                    <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                            <Ionicons name="calendar" size={24} color="#6366F1" />
                            <Text style={styles.statValue}>{attendanceData.totalDays}</Text>
                            <Text style={styles.statLabel}>Total Days</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                            <Text style={styles.statValue}>{attendanceData.present}</Text>
                            <Text style={styles.statLabel}>Present</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="close-circle" size={24} color="#EF4444" />
                            <Text style={styles.statValue}>{attendanceData.absent}</Text>
                            <Text style={styles.statLabel}>Absent</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="time" size={24} color="#F59E0B" />
                            <Text style={styles.statValue}>{attendanceData.late}</Text>
                            <Text style={styles.statLabel}>Late</Text>
                        </View>
                    </View>

                    <View style={styles.progressSection}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressLabel}>Attendance Rate</Text>
                            <Text style={styles.progressValue}>{Math.round(attendancePercentage)}%</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, { width: `${attendancePercentage}%` }]} />
                        </View>
                    </View>

                    <View style={styles.hoursSection}>
                        <Ionicons name="time-outline" size={20} color="#6366F1" />
                        <Text style={styles.hoursText}>
                            Total Working Hours: <Text style={styles.hoursValue}>{attendanceData.workingHours}h</Text>
                        </Text>
                    </View>
                </View>

                {/* Attendance Records */}
                <Text style={styles.sectionTitle}>Recent Records</Text>
                {attendanceRecords.map((record, index) => (
                    <View key={index} style={styles.recordCard}>
                        <View style={styles.recordLeft}>
                            <View style={[
                                styles.statusIcon,
                                { backgroundColor: getStatusColor(record.status) + '20' }
                            ]}>
                                <Ionicons 
                                    name={getStatusIcon(record.status) as any} 
                                    size={24} 
                                    color={getStatusColor(record.status)} 
                                />
                            </View>
                            <View style={styles.recordInfo}>
                                <Text style={styles.recordDate}>{record.date}</Text>
                                <Text style={styles.recordDay}>{record.day}</Text>
                            </View>
                        </View>

                        <View style={styles.recordRight}>
                            {record.status !== 'weekend' && record.status !== 'absent' ? (
                                <>
                                    <View style={styles.timeInfo}>
                                        <Text style={styles.timeLabel}>In: {record.checkIn}</Text>
                                        <Text style={styles.timeLabel}>Out: {record.checkOut}</Text>
                                    </View>
                                    <Text style={styles.hoursLabel}>{record.hours}h</Text>
                                </>
                            ) : (
                                <View style={[
                                    styles.statusBadge,
                                    { backgroundColor: getStatusColor(record.status) + '20' }
                                ]}>
                                    <Text style={[
                                        styles.statusText,
                                        { color: getStatusColor(record.status) }
                                    ]}>
                                        {record.status}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                ))}

                {/* Check In/Out Button */}
                <TouchableOpacity style={styles.checkInButton}>
                    <Ionicons name="finger-print" size={24} color="#fff" />
                    <Text style={styles.checkInButtonText}>Check In/Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default AttendanceScreen;

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
    calendarButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 16,
    },
    summaryCard: {
        backgroundColor: '#000c3a',
        padding: 20,
        borderRadius: 12,
        marginBottom: 24,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#C7D2FE',
        marginBottom: 4,
    },
    summaryMonth: {
        fontSize: 14,
        color: '#999',
        marginBottom: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 20,
    },
    statItem: {
        width: '48%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    progressSection: {
        marginBottom: 16,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressLabel: {
        fontSize: 14,
        color: '#999',
    },
    progressValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6366F1',
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#6366F1',
        borderRadius: 4,
    },
    hoursSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    hoursText: {
        fontSize: 14,
        color: '#999',
    },
    hoursValue: {
        fontWeight: '700',
        color: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
    },
    recordCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000c3a',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    recordLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    statusIcon: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    recordInfo: {
        flex: 1,
    },
    recordDate: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 2,
    },
    recordDay: {
        fontSize: 13,
        color: '#999',
    },
    recordRight: {
        alignItems: 'flex-end',
    },
    timeInfo: {
        alignItems: 'flex-end',
        marginBottom: 4,
    },
    timeLabel: {
        fontSize: 12,
        color: '#999',
    },
    hoursLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6366F1',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    checkInButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6366F1',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
        marginTop: 8,
    },
    checkInButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
