import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    StatusBar,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const EventDescriptionScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const { event }: any = route.params; // event is the full object

    if (!event) {
        return (
            <View style={styles.container}>
                <Text style={styles.notFound}>Event not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={Platform.OS === "ios" ? "light-content" : "dark-content"}
                backgroundColor="transparent"
                translucent
            />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Event Details</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Event Image */}
                <View style={styles.imageWrapper}>
                    <Image
                        source={typeof event.image === 'string' ? { uri: event.image } : event.image}
                        style={styles.eventImage}
                    />
                    {event.featured && (
                        <View style={styles.featuredRibbon}>
                            <Text style={styles.featuredText}>FEATURED</Text>
                        </View>
                    )}
                </View>

                {/* Event Info */}
                <View style={styles.infoContainer}>
                    <View style={styles.authorContainer}>
                        <Image
                            source={{ uri: event.authorAvatar }}
                            style={styles.authorAvatar}
                        />
                        <View style={{ marginLeft: 8 }}>
                            <Text style={styles.authorName}>{event.author}</Text>
                            <Text style={styles.date}>{event.date}</Text>
                        </View>
                    </View>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{event.category}</Text>
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.title}>{event.title}</Text>

                {/* Content */}
                {event.content.map((paragraph: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
                    <View key={idx} style={styles.contentCard}>
                        <Text style={styles.content}>{paragraph}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default EventDescriptionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A0A1A",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        top: Platform.OS === "ios" ? 50 : 20,
        left: 16,
        right: 16,
        zIndex: 10,
        backgroundColor: "rgba(0,12,58,0.6)",
        padding: 8,
        borderRadius: 10,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    scrollContainer: {
        paddingTop: Platform.OS === "ios" ? 100 : 80,
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    imageWrapper: {
        position: "relative",
        marginBottom: 16,
    },
    eventImage: {
        width: "100%",
        height: 220,
        borderRadius: 16,
    },
    featuredRibbon: {
        position: "absolute",
        top: 12,
        right: -40,
        backgroundColor: "#FF4D6D",
        paddingVertical: 4,
        paddingHorizontal: 60,
        transform: [{ rotate: "45deg" }],
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    featuredText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    authorContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    authorAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    authorName: {
        color: "#fff",
        fontWeight: "600",
    },
    date: {
        color: "#C7D2FE",
        fontSize: 12,
    },
    categoryBadge: {
        backgroundColor: "#3B82F6",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    categoryText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 16,
    },
    contentCard: {
        backgroundColor: "#1E1E3F",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    content: {
        color: "#E0E7FF",
        fontSize: 14,
        lineHeight: 22,
    },
    notFound: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        marginTop: 50,
    },
});
