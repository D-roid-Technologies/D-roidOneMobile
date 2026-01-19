import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { authService } from "../redux/configuration/auth.service";

interface User {
    id: string;
    name: string;
    email: string;
    droidId: string;
    freeDays: string[];
}

const mockUsers: User[] = [
    {
        id: "1",
        name: "Jane Doe",
        email: "jane.doe@example.com",
        droidId: "DT-JD001-M",
        freeDays: ["2025-12-25", "2025-12-28", "2025-12-30"],
    },
    {
        id: "2",
        name: "John Smith",
        email: "john.smith@example.com",
        droidId: "DT-JS002-M",
        freeDays: ["2025-12-26", "2025-12-29"],
    },
];

const FindSomeoneScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<User[]>([]);

    const handleSearch = async () => {
        if (!query) {
            // Alert.alert("Enter Email or D'roid ID to search");
            return;
        }
        await authService.searchUsers(query)
        // const filtered = mockUsers.filter(
        //     (user) =>
        //         user.email.toLowerCase() === query.toLowerCase() ||
        //         user.droidId.toLowerCase() === query.toLowerCase()
        // );
        // setResults(filtered);
    };

    const handleBook = (user: User, day: string) => {
        // Alert.alert("Booking Confirmed", `You booked ${user.name} on ${day}`);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#ffffff" />
                </TouchableOpacity>

                <Text style={styles.header}>Find Someone</Text>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.inputWithButton}
                    placeholder="Enter email or D'roid ID"
                    placeholderTextColor="#888"
                    value={query}
                    onChangeText={setQuery}
                />
                <TouchableOpacity
                    style={styles.searchButtonInside}
                    onPress={handleSearch}
                >
                    <Ionicons name="search" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Results */}
            <FlatList
                data={results}
                keyExtractor={(user) => user.id}
                contentContainerStyle={{ padding: 20 }}
                ListEmptyComponent={() =>
                    query ? <Text style={styles.noResults}>No user found.</Text> : null
                }
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                renderItem={({ item: user }) => (
                    <View style={styles.userCard}>
                        {/* User Info */}
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userEmail}>{user.email}</Text>
                            <Text style={styles.userDroidId}>{user.droidId}</Text>
                        </View>

                        {/* Free Days */}
                        <View style={styles.freeDaysContainer}>
                            <Text style={styles.freeDaysTitle}>Free Days:</Text>
                            <FlatList
                                data={user.freeDays}
                                horizontal
                                keyExtractor={(day) => day}
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                                contentContainerStyle={{ paddingVertical: 4 }}
                                renderItem={({ item: day }) => (
                                    <TouchableOpacity
                                        style={styles.dayButton}
                                        onPress={() => handleBook(user, day)} // ✅ pass correct user
                                    >
                                        <Text style={styles.dayText}>{day}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default FindSomeoneScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
        paddingTop: 40,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
        paddingLeft: 10
    },
    header: {
        fontSize: 24,
        fontWeight: "900",
        color: "#ffffff",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: "#fff",
    },
    searchContainer: {
        margin: 16,
        // position: "relative",
    },

    inputWithButton: {
        backgroundColor: "#C7D2FE",
        borderRadius: 12,
        paddingHorizontal: 32,
        paddingVertical: 10,
        color: "#000105",
        fontSize: 16,
        height: 70
    },

    searchButtonInside: {
        position: "absolute",
        right: 12,
        top: "40%",
        transform: [{ translateY: -12 }], // center vertically
        backgroundColor: "#06B6D4",
        borderRadius: 8,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        flex: 1,
        backgroundColor: "#C7D2FE",
        borderRadius: 12,
        paddingHorizontal: 12,
        color: "#000105",
    },
    searchButton: {
        backgroundColor: "#06B6D4",
        borderRadius: 12,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    noResults: {
        color: "#F59E0B",
        textAlign: "center",
        fontStyle: "italic",
        marginTop: 20,
        fontWeight: "600",
    },

    /* User Card - matches CareersScreen style */
    userCard: {
        backgroundColor: "#C7D2FE",
        padding: 16,
        borderRadius: 12,
    },
    userInfo: {
        marginBottom: 12,
    },
    userName: {
        fontSize: 16,
        fontWeight: "800",
        color: "#000105",
    },
    userEmail: {
        fontSize: 14,
        color: "#334155",
        marginBottom: 2,
    },
    userDroidId: {
        fontSize: 12,
        color: "#475569",
    },

    freeDaysContainer: {
        marginTop: 8,
    },
    freeDaysTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#000105",
        marginBottom: 4,
    },
    dayButton: {
        backgroundColor: "#10B98120",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    dayText: {
        color: "#10B981",
        fontWeight: "600",
        fontSize: 12,
    },
});