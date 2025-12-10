import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
}

const TasksScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

    const tasks: Task[] = [
        { id: '1', title: 'Complete project documentation', description: 'Finish writing technical docs', status: 'in-progress', priority: 'high', dueDate: '2025-12-15' },
        { id: '2', title: 'Review code submissions', description: 'Review pull requests from team', status: 'pending', priority: 'medium', dueDate: '2025-12-12' },
        { id: '3', title: 'Update employee records', description: 'Update staff information in system', status: 'completed', priority: 'low', dueDate: '2025-12-10' },
        { id: '4', title: 'Prepare monthly report', description: 'Compile performance metrics', status: 'pending', priority: 'high', dueDate: '2025-12-20' },
        { id: '5', title: 'Team meeting preparation', description: 'Prepare agenda for weekly sync', status: 'in-progress', priority: 'medium', dueDate: '2025-12-11' },
    ];

    const filteredTasks = tasks.filter(task => {
        if (filter === 'pending') return task.status === 'pending';
        if (filter === 'completed') return task.status === 'completed';
        return true;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return '#10B981';
            case 'in-progress': return '#F59E0B';
            case 'pending': return '#6366F1';
            default: return '#999';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return '#EF4444';
            case 'medium': return '#F59E0B';
            case 'low': return '#10B981';
            default: return '#999';
        }
    };

    const renderTask = ({ item }: { item: Task }) => (
        <TouchableOpacity style={styles.taskCard}>
            <View style={styles.taskHeader}>
                <View style={styles.taskTitleRow}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) + '20' }]}>
                        <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                            {item.priority}
                        </Text>
                    </View>
                </View>
                <Text style={styles.taskDescription}>{item.description}</Text>
            </View>

            <View style={styles.taskFooter}>
                <View style={styles.taskInfo}>
                    <Ionicons name="calendar-outline" size={14} color="#999" />
                    <Text style={styles.taskDate}>{item.dueDate}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status.replace('-', ' ')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Tasks</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add-circle-outline" size={26} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                {['all', 'pending', 'completed'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.filterTab, filter === tab && styles.filterTabActive]}
                        onPress={() => setFilter(tab as any)}
                    >
                        <Text style={[styles.filterText, filter === tab && styles.filterTextActive]}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Tasks List */}
            <FlatList
                data={filteredTasks}
                renderItem={renderTask}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="checkmark-done-circle-outline" size={60} color="#666" />
                        <Text style={styles.emptyText}>No tasks found</Text>
                    </View>
                }
            />
        </View>
    );
};

export default TasksScreen;

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
    addButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
        backgroundColor: '#000105',
    },
    filterTab: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#000c3a',
        alignItems: 'center',
    },
    filterTabActive: {
        backgroundColor: '#4F46E5',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#999',
    },
    filterTextActive: {
        color: '#fff',
    },
    listContent: {
        padding: 16,
    },
    taskCard: {
        backgroundColor: '#000c3a',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    taskHeader: {
        marginBottom: 12,
    },
    taskTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        flex: 1,
        marginRight: 8,
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    priorityText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    taskDescription: {
        fontSize: 14,
        color: '#999',
    },
    taskFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    taskDate: {
        fontSize: 13,
        color: '#999',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        marginTop: 12,
    },
});
