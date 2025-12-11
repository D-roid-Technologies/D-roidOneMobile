import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setNotifications } from "../redux/slice/notifications";
import { RootState } from "../redux/store";
import { Ionicons } from "@expo/vector-icons";

const NotificationScreen: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const notifications = useSelector(
        (state: RootState) => state.notifications.notifications
    );


    // Load saved notifications from AsyncStorage
    useEffect(() => {
        const loadFromStorage = async () => {
            try {
                const saved = await AsyncStorage.getItem("notifications");
                if (saved) {
                    dispatch(setNotifications(JSON.parse(saved)));
                }
            } catch (error) {
                console.log("Error loading notifications: ", error);
            }
        };

        loadFromStorage();
    }, []);

    const renderNotification = ({ item }: any) => (
        <View style={[styles.item, item.read ? styles.read : styles.unread]}>
            <Text style={styles.message}>{item.message}</Text>

            {!item.read && (
                <View style={styles.unreadDot} />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#ffffff" />
                </TouchableOpacity>

                <Text style={styles.header}>Notifications</Text>

                {/* Spacer to balance layout */}
                <View style={{ width: 26 }} />
            </View>

            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
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
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 12,
        color: "#ffffff"
    },
    item: {
        backgroundColor: "#C7D2FE",
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    message: {
        flex: 1,
        fontSize: 16,
        fontWeight: "300",
        color: "#000105"
    },
    unreadDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#FF3B30",
    },
    read: {
        opacity: 0.6,
    },
    unread: {
        opacity: 1,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        justifyContent: "space-between",
    },
    // header: {
    //     fontSize: 24,
    //     fontWeight: "700",
    // },
});
