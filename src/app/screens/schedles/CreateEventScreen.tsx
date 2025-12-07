import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Install via: npm install @react-native-picker/picker
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addEvent, updateEvent, Event } from "../../redux/slice/eventSlice";
import DateTimePicker from "@react-native-community/datetimepicker";

type RouteParams = {
    date: string;
    eventId?: string;
};

const eventTypes: Event["type"][] = [
    "Meeting",
    "Reminder",
    "Note",
    "Task",
    "Appointment",
    "Deadline",
    "Call",
    "Birthday",
    "Holiday",
];

const CreateEventScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<{ params: RouteParams }, "params">>();
    const dispatch = useDispatch();
    const events = useSelector((state: RootState) => state.events.events);

    const editingEvent = route.params?.eventId
        ? events.find((e) => e.id === route.params.eventId)
        : null;

    const [title, setTitle] = useState(editingEvent?.title || "");
    const [description, setDescription] = useState(editingEvent?.description || "");
    const [type, setType] = useState<Event["type"]>(editingEvent?.type || "Meeting");
    const [startDate, setStartDate] = useState(editingEvent?.startDate || route.params.date);
    const [endDate, setEndDate] = useState(editingEvent?.endDate || route.params.date);
    const [startTime, setStartTime] = useState(editingEvent?.startTime || "09:00");
    const [endTime, setEndTime] = useState(editingEvent?.endTime || "10:00");

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const onSave = () => {
        if (!title.trim()) return;

        const newEvent: Event = {
            id: editingEvent ? editingEvent.id : Date.now().toString(),
            title,
            description,
            type,
            startDate,
            endDate,
            startTime,
            endTime,
        };

        if (editingEvent) {
            dispatch(updateEvent(newEvent));
        } else {
            dispatch(addEvent(newEvent));
        }

        navigation.goBack();
    };

    const onChangeDate = (event: any, selected: Date | undefined, which: "start" | "end") => {
        if (!selected) return;
        const dateStr = selected.toISOString().split("T")[0];
        if (which === "start") setStartDate(dateStr);
        else setEndDate(dateStr);

        setShowStartDatePicker(false);
        setShowEndDatePicker(false);
    };

    const onChangeTime = (event: any, selected: Date | undefined, which: "start" | "end") => {
        if (!selected) return;
        const timeStr = selected.toTimeString().slice(0, 5);
        if (which === "start") setStartTime(timeStr);
        else setEndTime(timeStr);

        setShowStartTimePicker(false);
        setShowEndTimePicker(false);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
            <Text style={styles.title}>{editingEvent ? "Edit Event" : "Create Event"}</Text>

            {/* Title */}
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholderTextColor="#999"
            />

            {/* Description */}
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, { height: 80 }]}
                multiline
                placeholderTextColor="#999"
            />

            {/* Event Type Dropdown */}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue) => setType(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#fff"
                >
                    {eventTypes.map((t) => (
                        <Picker.Item key={t} label={t} value={t} />
                    ))}
                </Picker>
            </View>

            {/* Start & End Date */}
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
                    <Text style={styles.dateText}>Start Date: {startDate}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}>
                    <Text style={styles.dateText}>End Date: {endDate}</Text>
                </TouchableOpacity>
            </View>

            {/* Start & End Time */}
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.dateButton}>
                    <Text style={styles.dateText}>Start Time: {startTime}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.dateButton}>
                    <Text style={styles.dateText}>End Time: {endTime}</Text>
                </TouchableOpacity>
            </View>

            {/* Date & Time Pickers */}
            {showStartDatePicker && (
                <DateTimePicker
                    value={new Date(startDate)}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(e, d) => onChangeDate(e, d, "start")}
                />
            )}
            {showEndDatePicker && (
                <DateTimePicker
                    value={new Date(endDate)}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(e, d) => onChangeDate(e, d, "end")}
                />
            )}
            {showStartTimePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(e, d) => onChangeTime(e, d, "start")}
                />
            )}
            {showEndTimePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={(e, d) => onChangeTime(e, d, "end")}
                />
            )}

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                <Text style={styles.saveButtonText}>{editingEvent ? "Update Event" : "Create Event"}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000105", padding: 16 },
    title: { fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 16, textAlign: "center" },
    input: {
        backgroundColor: "#1E293B",
        color: "#fff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    pickerContainer: {
        backgroundColor: "#1E293B",
        borderRadius: 8,
        marginBottom: 16,
        overflow: "hidden",
    },
    picker: {
        color: "#fff",
    },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
    dateButton: { backgroundColor: "#1E293B", padding: 12, borderRadius: 8, flex: 0.48 },
    dateText: { color: "#fff", textAlign: "center" },
    saveButton: {
        backgroundColor: "#C7D2FE",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 24,
    },
    saveButtonText: { color: "#000", fontWeight: "700", fontSize: 16 },
});