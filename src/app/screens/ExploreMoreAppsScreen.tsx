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
const CARD_WIDTH = (width - 48) / 2; // 👈 responsive card width

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
        title: "Knowledge City",
        subtitle: "Learning which is streamlined to you",
        icon: "book",
        color: "#F59E0B",
        owner: "D'roid",
        type: "Education",
    },
];

const ExploreMoreAppsScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const renderAppCard = ({ item }: any) => (
        <TouchableOpacity
            style={[styles.appCard, { backgroundColor: item.color }]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(`${item.title}`)}
        >
            {/* Icon */}
            <View style={styles.iconWrapper}>
                <FontAwesome5 name={item.icon as any} size={18} color="#ffffff" />
            </View>

            {/* Title & subtitle */}
            <Text style={styles.appTitle}>{item.title}</Text>
            <Text style={styles.appSubtitle} numberOfLines={2}>
                {item.subtitle}
            </Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Badges */}
            <View style={styles.badgesContainer}>
                <View style={styles.badgePrimary}>
                    <Text style={styles.badgeText}>{item.owner}</Text>
                </View>

                <View style={styles.badgeSecondary}>
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

    appCard: {
        width: CARD_WIDTH,              // ✅ responsive width
        borderRadius: 16,
        padding: 14,                    // ⬇ reduced padding
        marginBottom: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },

    iconWrapper: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    appTitle: {
        fontSize: 15,
        fontWeight: "900",
        color: "#ffffff",
        marginBottom: 2,
    },

    appSubtitle: {
        fontSize: 12,
        color: "rgba(255,255,255,0.85)",
        lineHeight: 16,
    },

    divider: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.25)",
        marginVertical: 10,
    },

    badgesContainer: {
        flexDirection: "row",
        gap: 6,
        flexWrap: "wrap",
    },

    badgePrimary: {
        backgroundColor: "rgba(255,255,255,0.3)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 14,
    },

    badgeSecondary: {
        backgroundColor: "rgba(255,255,255,0.15)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 14,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: "800",
        color: "#ffffff",
    },
});