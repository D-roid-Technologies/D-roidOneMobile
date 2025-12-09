import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
    Platform,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateEvent, deleteEvent, Event } from "../../redux/slice/eventSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { authService } from "../../redux/configuration/auth.service";

type RouteParams = { itemId: string };

const EventDetailScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
    const dispatch = useDispatch();
    const events = useSelector((state: RootState) => state.events.events);

    const event = events.find((e) => e.id === route.params.itemId);

    const [title, setTitle] = useState(event?.title || "");
    const [description, setDescription] = useState(event?.description || "");
    const [startDate, setStartDate] = useState(event?.startDate || "");
    const [endDate, setEndDate] = useState(event?.endDate || "");
    const [startTime, setStartTime] = useState(event?.startTime || "");
    const [endTime, setEndTime] = useState(event?.endTime || "");

    // Optional fields
    const [location, setLocation] = useState(event?.location || "");
    const [participants, setParticipants] = useState(
        event?.participants ? event.participants.join(", ") : ""
    );
    const [taskStatus, setTaskStatus] = useState(event?.taskStatus || "pending");
    const [taskPriority, setTaskPriority] = useState(event?.taskPriority || "medium");
    const [noteItems, setNoteItems] = useState(event?.noteItems?.join(", ") || "");

    // Date/time pickers
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    if (!event) return <View style={styles.container}><Text style={{ color: "#fff" }}>Event not found</Text></View>;

    const onUpdate = async () => {
        const updatedEvent: Event = {
            ...event,
            title,
            description,
            startDate,
            endDate,
            startTime,
            endTime,
            location: location || undefined,
            participants: participants ? participants.split(",").map(p => p.trim()) : undefined,
            taskStatus,
            taskPriority,
            noteItems: noteItems ? noteItems.split(",").map(n => n.trim()) : undefined,
        };
        await authService.updateScheduleInFirebase(updatedEvent).then(() => {
            navigation.goBack();
        })
    };

    const onDelete = () => {
        Alert.alert("Confirm Delete", "Are you sure you want to delete this event?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    await authService.deleteScheduleFromFirebase(event.id);
                    navigation.goBack();
                },
            },
        ]);
    };

    const onChangeDate = (eventArg: any, selected: Date | undefined, which: "start" | "end") => {
        if (!selected) return;
        const dateStr = selected.toISOString().split("T")[0];
        if (which === "start") setStartDate(dateStr);
        else setEndDate(dateStr);
        setShowStartDatePicker(false);
        setShowEndDatePicker(false);
    };

    const onChangeTime = (eventArg: any, selected: Date | undefined, which: "start" | "end") => {
        if (!selected) return;
        const timeStr = selected.toTimeString().slice(0, 5);
        if (which === "start") setStartTime(timeStr);
        else setEndTime(timeStr);
        setShowStartTimePicker(false);
        setShowEndTimePicker(false);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.title}>Event Details</Text>
                <View style={{ width: 26 }} />
            </View>

            {/* Title & Description */}
            <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} placeholderTextColor="#000105" />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input, { height: 80 }]} multiline placeholderTextColor="#000105" />

            {/* Dates & Times */}
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}><Text style={styles.dateText}>Add Start Date: {startDate}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}><Text style={styles.dateText}>Add End Date: {endDate}</Text></TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.dateButton}><Text style={styles.dateText}>Add Start Time: {startTime}</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.dateButton}><Text style={styles.dateText}>Add End Time: {endTime}</Text></TouchableOpacity>
            </View>

            {/* Optional Pickers */}
            {showStartDatePicker && <DateTimePicker value={new Date(startDate)} mode="date" display={Platform.OS === "ios" ? "spinner" : "default"} onChange={(e, d) => onChangeDate(e, d, "start")} />}
            {showEndDatePicker && <DateTimePicker value={new Date(endDate)} mode="date" display={Platform.OS === "ios" ? "spinner" : "default"} onChange={(e, d) => onChangeDate(e, d, "end")} />}
            {showStartTimePicker && <DateTimePicker value={new Date()} mode="time" display={Platform.OS === "ios" ? "spinner" : "default"} onChange={(e, d) => onChangeTime(e, d, "start")} />}
            {showEndTimePicker && <DateTimePicker value={new Date()} mode="time" display={Platform.OS === "ios" ? "spinner" : "default"} onChange={(e, d) => onChangeTime(e, d, "end")} />}

            {/* Conditional fields based on event type */}
            {(event.type === "Meeting" || event.type === "Appointment") && (
                <>
                    <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} placeholderTextColor="#000105" />
                    <TextInput placeholder="Participants (comma separated)" value={participants} onChangeText={setParticipants} style={styles.input} placeholderTextColor="#000105" />
                </>
            )}

            {event.type === "Task" && (
                <>
                    <Text>Task Status</Text>
                    <View style={styles.row}>
                        {["pending", "in-progress", "completed"].map((status) => (
                            <TouchableOpacity key={status} onPress={() => setTaskStatus(status as any)} style={[styles.radioRow, taskStatus === status && styles.radioSelected]}>
                                <Text style={{ color: "#fff" }}>{status}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text>Task Priority</Text>
                    <View style={styles.row}>
                        {["low", "medium", "high"].map((priority) => (
                            <TouchableOpacity key={priority} onPress={() => setTaskPriority(priority as any)} style={[styles.radioRow, taskPriority === priority && styles.radioSelected]}>
                                <Text style={{ color: "#fff" }}>{priority}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}

            {event.type === "Note" && (
                <TextInput placeholder="Note Items (comma separated)" value={noteItems} onChangeText={setNoteItems} style={styles.input} placeholderTextColor="#000105" />
            )}

            {/* Action Buttons */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity style={styles.saveButton} onPress={onUpdate}><Text style={styles.saveButtonText}>Update Event</Text></TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={onDelete}><Text style={styles.deleteButtonText}>Delete Event</Text></TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000105", padding: 16 },
    title: { fontSize: 22, fontWeight: "700", color: "#fff", textAlign: "center" },
    headerContainer: { flexDirection: "row", alignItems: "center", marginBottom: 12, justifyContent: "space-between" },
    input: { backgroundColor: "#C7D2FE", color: "#000", padding: 12, borderRadius: 8, marginBottom: 16 },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap" },
    dateButton: { backgroundColor: "#000c3a", padding: 12, borderRadius: 8, flex: 0.48 },
    dateText: { color: "#fff", textAlign: "center" },
    saveButton: { backgroundColor: "#34D399", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 24 },
    saveButtonText: { color: "#000", fontWeight: "700", fontSize: 16 },
    deleteButton: { backgroundColor: "#EF4678", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 12 },
    deleteButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    radioRow: { padding: 8, marginRight: 8, marginBottom: 8, borderRadius: 8, backgroundColor: "#334155" },
    radioSelected: { backgroundColor: "#2563EB" },
});
