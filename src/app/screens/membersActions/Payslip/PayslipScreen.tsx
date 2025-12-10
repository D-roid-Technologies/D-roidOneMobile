import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const PayslipScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const user = useSelector((state: RootState) => state.user);

    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    const payslipData = {
        employeeId: user.staffId,
        employeeName: `${user.firstName} ${user.lastName}`,
        department: user.department || 'Engineering',
        position: user.position || 'Software Developer',
        payPeriod: currentMonth,
        payDate: '25th December 2025',
        earnings: [
            { label: 'Basic Salary', amount: 150000 },
            { label: 'Housing Allowance', amount: 50000 },
            { label: 'Transport Allowance', amount: 30000 },
            { label: 'Meal Allowance', amount: 20000 },
        ],
        deductions: [
            { label: 'Tax', amount: 15000 },
            { label: 'Pension', amount: 12000 },
            { label: 'Health Insurance', amount: 5000 },
        ],
    };

    const totalEarnings = payslipData.earnings.reduce((sum, item) => sum + item.amount, 0);
    const totalDeductions = payslipData.deductions.reduce((sum, item) => sum + item.amount, 0);
    const netPay = totalEarnings - totalDeductions;

    const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payslip</Text>
                <TouchableOpacity style={styles.downloadButton}>
                    <Ionicons name="download-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Employee Info */}
                <View style={styles.infoCard}>
                    <Text style={styles.cardTitle}>Employee Information</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Employee ID</Text>
                        <Text style={styles.infoValue}>{payslipData.employeeId}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Name</Text>
                        <Text style={styles.infoValue}>{payslipData.employeeName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Department</Text>
                        <Text style={styles.infoValue}>{payslipData.department}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Position</Text>
                        <Text style={styles.infoValue}>{payslipData.position}</Text>
                    </View>
                </View>

                {/* Pay Period */}
                <View style={styles.periodCard}>
                    <View style={styles.periodItem}>
                        <Text style={styles.periodLabel}>Pay Period</Text>
                        <Text style={styles.periodValue}>{payslipData.payPeriod}</Text>
                    </View>
                    <View style={styles.periodDivider} />
                    <View style={styles.periodItem}>
                        <Text style={styles.periodLabel}>Pay Date</Text>
                        <Text style={styles.periodValue}>{payslipData.payDate}</Text>
                    </View>
                </View>

                {/* Earnings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Earnings</Text>
                    {payslipData.earnings.map((item, index) => (
                        <View key={index} style={styles.amountRow}>
                            <Text style={styles.amountLabel}>{item.label}</Text>
                            <Text style={styles.amountValue}>{formatCurrency(item.amount)}</Text>
                        </View>
                    ))}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Earnings</Text>
                        <Text style={styles.totalValue}>{formatCurrency(totalEarnings)}</Text>
                    </View>
                </View>

                {/* Deductions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Deductions</Text>
                    {payslipData.deductions.map((item, index) => (
                        <View key={index} style={styles.amountRow}>
                            <Text style={styles.amountLabel}>{item.label}</Text>
                            <Text style={[styles.amountValue, styles.deductionValue]}>-{formatCurrency(item.amount)}</Text>
                        </View>
                    ))}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Deductions</Text>
                        <Text style={[styles.totalValue, styles.deductionValue]}>-{formatCurrency(totalDeductions)}</Text>
                    </View>
                </View>

                {/* Net Pay */}
                <View style={styles.netPayCard}>
                    <Text style={styles.netPayLabel}>Net Pay</Text>
                    <Text style={styles.netPayValue}>{formatCurrency(netPay)}</Text>
                </View>

                {/* Download Button */}
                <TouchableOpacity style={styles.downloadFullButton}>
                    <Ionicons name="document-text-outline" size={20} color="#fff" />
                    <Text style={styles.downloadFullButtonText}>Download PDF</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default PayslipScreen;

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
    downloadButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 16,
    },
    infoCard: {
        backgroundColor: '#000c3a',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#C7D2FE',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    infoLabel: {
        fontSize: 14,
        color: '#999',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    periodCard: {
        flexDirection: 'row',
        backgroundColor: '#000c3a',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    periodItem: {
        flex: 1,
        alignItems: 'center',
    },
    periodDivider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginHorizontal: 16,
    },
    periodLabel: {
        fontSize: 13,
        color: '#999',
        marginBottom: 4,
    },
    periodValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    section: {
        backgroundColor: '#000c3a',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#C7D2FE',
        marginBottom: 12,
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    amountLabel: {
        fontSize: 14,
        color: '#999',
    },
    amountValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#10B981',
    },
    deductionValue: {
        color: '#EF4444',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
    },
    totalValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#10B981',
    },
    netPayCard: {
        backgroundColor: '#14B8A6',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    netPayLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 8,
    },
    netPayValue: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
    },
    downloadFullButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B82F6',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },
    downloadFullButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
