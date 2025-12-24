import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList,
    StyleSheet,
    Alert,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

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

    const handleSearch = () => {
        if (!query) {
            Alert.alert("Enter Email or D'roid ID to search");
            return;
        }
        const filtered = mockUsers.filter(
            (user) =>
                user.email.toLowerCase() === query.toLowerCase() ||
                user.droidId.toLowerCase() === query.toLowerCase()
        );
        setResults(filtered);
    };

    const handleBook = (user: User, day: string) => {
        Alert.alert("Booking Confirmed", `You booked ${user.name} on ${day}`);
        // Here you could integrate with a calendar API
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Find Someone</Text>
                <View style={{ width: 26 }} /> {/* placeholder */}
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email or D'roid ID"
                    placeholderTextColor="#888"
                    value={query}
                    onChangeText={setQuery}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Ionicons name="search" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {results.length === 0 && query ? (
                    <Text style={styles.noResults}>No user found.</Text>
                ) : null}

                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.userCard}>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{item.name}</Text>
                                <Text style={styles.userEmail}>{item.email}</Text>
                                <Text style={styles.userDroidId}>{item.droidId}</Text>
                            </View>

                            <View style={styles.freeDaysContainer}>
                                <Text style={styles.freeDaysTitle}>Free Days:</Text>
                                <FlatList
                                    data={item.freeDays}
                                    horizontal
                                    keyExtractor={(d) => d}
                                    renderItem={({ item: day }) => (
                                        <TouchableOpacity
                                            style={styles.dayButton}
                                            onPress={() => handleBook(item, day)}
                                        >
                                            <Text style={styles.dayText}>{day}</Text>
                                        </TouchableOpacity>
                                    )}
                                    contentContainerStyle={{ gap: 8 }}
                                />
                            </View>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                />
            </ScrollView>
        </View>
    );
};

export default FindSomeoneScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "#000c3a",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: "#fff",
    },
    searchContainer: {
        flexDirection: "row",
        margin: 16,
        gap: 8,
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
        color: "#fff",
        textAlign: "center",
        marginTop: 20,
    },
    userCard: {
        backgroundColor: "#C7D2FE",
        borderRadius: 12,
        padding: 16,
    },
    userInfo: {
        marginBottom: 12,
    },
    userName: {
        fontSize: 16,
        fontWeight: "700",
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
        fontWeight: "600",
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