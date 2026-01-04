import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const apps = [
    {
        id: "1",
        title: "Ogoo",
        subtitle: "D'roid's Health & Personal AI Companion",
        icon: "robot",
        color: "#3B82F6",
        owner: "D'roid",
        type: "AI",
    },
    {
        id: "3",
        title: "D'roid Music",
        subtitle: "Stream and manage music",
        icon: "music",
        color: "#F59E0B",
        owner: "D'roid",
        type: "Fun",
    },
    {
        id: "5",
        title: "Chat Buddy",
        subtitle: "Fun AI chatbot",
        icon: "robot",
        color: "#F472B6",
        owner: "Other",
        type: "AI",
    },
    {
        id: "6",
        title: "Task Manager",
        subtitle: "Organize your day",
        icon: "tasks",
        color: "#FBBF24",
        owner: "Other",
        type: "Utility",
    },
];

const ExploreMoreAppsScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const renderAppCard = ({ item }: any) => (
        <TouchableOpacity
            style={[styles.appCard, { backgroundColor: item.color }]}
            onPress={() => console.log(`Opening ${item.title}`)}
        >
            {/* Icon */}
            <FontAwesome5 name={item.icon as any} size={32} color="#fff" />

            {/* Title and subtitle */}
            <Text style={styles.appTitle}>{item.title}</Text>
            <Text style={styles.appSubtitle}>{item.subtitle}</Text>

            {/* Owner and type badges */}
            <View style={styles.badgesContainer}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.owner}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                    <Text style={styles.badgeText}>{item.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#ffffff" />
                </TouchableOpacity>

                <Text style={styles.header}>Explore More Apps</Text>
            </View>

            {/* Apps Grid */}
            <FlatList
                data={apps}
                keyExtractor={(item) => item.id}
                renderItem={renderAppCard}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

export default ExploreMoreAppsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
        padding: 16,
        paddingTop: 40,
    },
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

    /* App Cards */
    appCard: {
        width: width / 2 - 20,
        minHeight: 180,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        padding: 16,
        position: "relative",
    },
    appTitle: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
        marginTop: 12,
        textAlign: "center",
    },
    appSubtitle: {
        color: "#E0E0E0",
        fontSize: 12,
        textAlign: "center",
        marginTop: 4,
    },

    badgesContainer: {
        flexDirection: "row",
        marginTop: 10,
        gap: 6,
    },
    badge: {
        backgroundColor: "rgba(0,0,0,0.3)",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: "600",
        color: "#fff",
    },
});
