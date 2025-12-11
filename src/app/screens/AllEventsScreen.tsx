import React from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ASSETS } from "../constants/Assets";

const AllEventsScreen: React.FC = ({ navigation, route }: any) => {
    const eventsPosts = route.params?.eventsPosts;

    const renderEvent = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("EventDescription", { event: item })}
            style={styles.eventCard}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                    source={item.image}
                    style={{ width: 100, height: 100, borderRadius: 8 }}
                    accessibilityLabel="Event Image"
                />
                <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <Text style={styles.eventDate}>{item.date}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={Platform.OS === "ios" ? "light-content" : "dark-content"}
                backgroundColor="#203499"
            />
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Events</Text>
            </View>

            <FlatList
                data={eventsPosts.sort(
                    (a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(a.date).getTime() - new Date(b.date).getTime()
                )}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderEvent}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

export default AllEventsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#ffffff",
        paddingHorizontal: 16,
        // paddingVertical: 14,
    },
    eventCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#ffffff",
        marginHorizontal: 16,
        marginVertical: 6,
        borderRadius: 12,
        height: 120,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000c3a",
    },
    eventDate: {
        fontSize: 12,
        color: "#666",
        fontWeight: "300",
        marginTop: 4,
    },
});