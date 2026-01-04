

import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
    setNotifications,
    markNotificationAsRead,
    markAllAsRead,
    clearNotifications,
} from "../redux/slice/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { authService } from "../redux/configuration/auth.service";

const NotificationScreen: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const notifications = useSelector(
        (state: RootState) => state.notifications.notifications
    );

    useEffect(() => {
        const loadFromStorage = async () => {
            try {
                const saved = await AsyncStorage.getItem("notifications");
                if (saved) {
                    dispatch(setNotifications(JSON.parse(saved)));
                }
            } catch (error) {
                // console.log("Error loading notifications: ", error);
            }
        };

        loadFromStorage();
    }, []);

    useEffect(() => {
        authService.pullNotificationsFromFirebase();
    }, []);

    const onMarkAsRead = async (id: string) => {
        await authService.markNotificationAsReadInFirebase(id);
    };

    const renderNotification = ({ item }: any) => (
        <View style={[styles.item, item.isRead ? styles.read : styles.unread]}>
            {/* Header row */}
            <View style={styles.cardHeader}>
                <Text style={styles.mHeader}>
                    {item.title || "Notification"}
                </Text>

                {!item.isRead && <View style={styles.unreadDot} />}
            </View>

            {/* Message */}
            <Text style={styles.message}>{item.message}</Text>

            {/* Meta info */}
            {(item.date || item.time) && (
                <Text style={styles.meta}>
                    {item.date} {item.time}
                </Text>
            )}

            {/* Type badge */}
            {item.type && (
                <View style={[
                    styles.badge,
                    item.type === "success" && styles.success,
                    item.type === "error" && styles.error,
                    item.type === "info" && styles.info,
                ]}>
                    <Text style={styles.badgeText}>
                        {item.type.toUpperCase()}
                    </Text>
                </View>
            )}

            {/* Mark as read */}
            {!item.isRead && (
                <TouchableOpacity
                    style={styles.markReadBtn}
                    onPress={() => onMarkAsRead(item.id)}
                >
                    <Text style={styles.markReadText}>Mark as read</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#ffffff" />
                </TouchableOpacity>

                <Text style={styles.header}>Notifications</Text>
            </View>
            <FlatList
                data={[...notifications].sort((a, b) => Number(a.isRead) - Number(b.isRead))}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No notifications</Text>
                }
            />
        </View>
    );
};

export default NotificationScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
        padding: 16,
        paddingTop: 40
    },

    /* Header */
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

    /* Actions */
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    actionText: {
        color: "#C7D2FE",
        fontWeight: "600",
    },
    clearText: {
        color: "#FF3B30",
    },

    /* Card */
    item: {
        backgroundColor: "#C7D2FE",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    read: { opacity: 0.6 },
    unread: { opacity: 1 },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    mHeader: {
        fontSize: 20,
        fontWeight: "900",
        color: "#000105",
    },

    unreadDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#FF3B30",
    },

    message: {
        fontSize: 16,
        color: "#000105",
        marginTop: 8,
        fontWeight: "300"
    },

    meta: {
        fontSize: 12,
        color: "#334155",
        marginTop: 6,
        fontWeight: "300"
    },

    badge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 8,
    },
    success: { backgroundColor: "#34D399" },
    error: { backgroundColor: "#F87171" },
    info: { backgroundColor: "#60A5FA" },

    badgeText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#000",
    },

    markReadBtn: {
        marginTop: 10,
        alignSelf: "flex-end",
    },
    markReadText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#000105",
    },

    emptyText: {
        color: "#64748B",
        textAlign: "center",
        marginTop: 40,
    },
});

