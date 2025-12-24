// ——— IMPORTS REMAIN THE SAME ———

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
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addEvent, updateEvent, Event } from "../../redux/slice/eventSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { authService } from "../../redux/configuration/auth.service";
import { createAndDispatchNotification } from "../../utils/Notifications";

// ——— EVENT TYPES ———
type RouteParams = {
    date: string;
    eventId?: string;
};

const eventTypes: Event["type"][] = [
    "Note",
    "Task",
    "Appointment",
    "Meeting",
];

// ——— COMPONENT ———
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

    // ——— ADDITIONAL STATE FOR SPECIALIZED FORMS ———
    const [taskStatus, setTaskStatus] = useState<"pending" | "in-progress" | "completed">(
        editingEvent?.taskStatus || "pending"
    );
    // type TaskPriority = "low" | "medium" | "high";
    const [taskPriority, setTaskPriority] = useState<"low" | "medium" | "high">(
        editingEvent?.taskPriority || "medium"
    );

    const [noteItems, setNoteItems] = useState<string[]>([]);
    const [inputNoteItem, setInputNoteItem] = useState("");

    const [location, setLocation] = useState(editingEvent?.location || "");
    const [participants, setParticipants] = useState<string>(
        editingEvent?.participants?.join(", ") || ""
    );

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [participantsText, setParticipantsText] = useState(
        editingEvent?.participants?.join(", ") || ""
    );
    const [text, setText] = useState<string>("Create Event");
    // const statuses: any = ["pending", "in-progress", "completed"];
    const TASK_STATUSES = [
        "pending",
        "in-progress",
        "completed"
    ] as const

    const TASK_PRIORITY = [
        "low",
        "medium",
        "high"
    ] as const

    const dynamicDescriptionPlaceholder = {
        Note: "Add Note",
        Task: "Describe Task",
        Appointment: "Add Appointment Notes",
        Meeting: "Add Meeting Notes",
    }[type];

    const onSave = async () => {
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

            location,
            participants: Array.isArray(participants)
                ? participants
                : participants
                    ? [participants]
                    : undefined,

            taskStatus,
            taskPriority,
            noteItems,
        };
        setText("...Creating your event")

        await authService.addScheduleToFirebase(newEvent).then(() => {
            setText("Event Created");
            createAndDispatchNotification(dispatch, {
                title: `Scheduler for ${newEvent.type} created.`,
                message: `Your Scheduler for "${newEvent.description}" has been created successfully.`,
            });
            setTimeout(() => {
                navigation.goBack();
            }, 2000)
        }).catch(() => {
            createAndDispatchNotification(dispatch, {
                title: `Scheduler for ${newEvent.type} failed.`,
                message: `Your Scheduler for "${newEvent.description}" has not been created successfully, please try again.`,
            });
            setText(text)
        })

    };

    const onChangeDate = (event: any, selected: Date | undefined, which: "start" | "end") => {
        if (!selected) return;
        const dateStr = selected.toISOString().split("T")[0];
        which === "start" ? setStartDate(dateStr) : setEndDate(dateStr);

        setShowStartDatePicker(false);
        setShowEndDatePicker(false);
    };

    const onChangeTime = (event: any, selected: Date | undefined, which: "start" | "end") => {
        if (!selected) return;
        const timeStr = selected.toTimeString().slice(0, 5);
        which === "start" ? setStartTime(timeStr) : setEndTime(timeStr);

        setShowStartTimePicker(false);
        setShowEndTimePicker(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#000105" }}>
            {/* SCROLLABLE FORM */}
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 150 }}
                showsVerticalScrollIndicator={false}
            >
                {/* HEADER */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={26} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{editingEvent ? "Edit Event" : "Create Event"}</Text>
                </View>

                {/* TITLE */}
                <TextInput
                    placeholder={`Add your Title`}
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholderTextColor="#000105"
                />

                {/* DESCRIPTION */}
                <TextInput
                    placeholder={dynamicDescriptionPlaceholder}
                    value={description}
                    onChangeText={setDescription}
                    style={[styles.input, { height: type === "Note" ? 120 : 80 }]}
                    multiline
                    placeholderTextColor="#000105"
                />

                {/* EVENT TYPE PICKER */}
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={type}
                        onValueChange={(value) => setType(value)}
                        style={styles.picker}
                        dropdownIconColor="#000000"
                    >
                        {eventTypes.map((t) => (
                            <Picker.Item key={t} label={t} value={t} />
                        ))}
                    </Picker>
                </View>

                {/* NOTE MODE */}
                {type === "Note" && (
                    <View>
                        <Text style={styles.sectionTitle}>Note Items</Text>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 15 }}>
                            <TextInput
                                value={inputNoteItem}
                                onChangeText={setInputNoteItem}
                                placeholder="Add list item"
                                placeholderTextColor="#000105"
                                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                            />
                            <TouchableOpacity
                                style={styles.addItemBtn}
                                onPress={() => {
                                    if (inputNoteItem.trim()) {
                                        setNoteItems([...noteItems, inputNoteItem.trim()]);
                                        setInputNoteItem("");
                                    }
                                }}
                            >
                                <Ionicons name="add" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {noteItems.map((item, i) => (
                            <Text key={i} style={{ color: "#fff", marginVertical: 4 }}>
                                • {item}
                            </Text>
                        ))}
                    </View>
                )}

                {/* TASK MODE */}
                {type === "Task" && (
                    <View>
                        <Text style={styles.sectionTitle}>Task Status</Text>

                        {TASK_STATUSES.map((s) => (
                            <TouchableOpacity
                                key={s}
                                onPress={() => setTaskStatus(s)}
                                style={styles.radioRow}
                            >
                                <View
                                    style={[
                                        styles.radioCircle,
                                        taskStatus === s && styles.radioSelected
                                    ]}
                                />
                                <Text style={{ color: "#fff" }}>{s}</Text>
                            </TouchableOpacity>
                        ))}

                        <Text style={styles.sectionTitle}>Priority</Text>

                        {TASK_PRIORITY.map((p) => (
                            <TouchableOpacity
                                key={p}
                                onPress={() => setTaskPriority(p)}
                                style={styles.radioRow}
                            >
                                <View
                                    style={[
                                        styles.radioCircle,
                                        taskPriority === p && styles.radioSelected,
                                    ]}
                                />
                                <Text style={{ color: "#fff" }}>{p}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* APPOINTMENT MODE */}
                {type === "Appointment" && (
                    <View>
                        <Text style={styles.sectionTitle}>Location</Text>
                        <TextInput
                            value={location}
                            onChangeText={setLocation}
                            placeholder="Enter location"
                            placeholderTextColor="#000105"
                            style={styles.input}
                        />
                    </View>
                )}

                {/* MEETING MODE */}
                {type === "Meeting" && (
                    <View>
                        <Text style={styles.sectionTitle}>Location</Text>
                        <TextInput
                            value={location}
                            onChangeText={setLocation}
                            placeholder="Meeting location"
                            placeholderTextColor="#000105"
                            style={styles.input}
                        />

                        <Text style={styles.sectionTitle}>Participants</Text>
                        <TextInput
                            value={participants}
                            onChangeText={setParticipants}
                            placeholder="Enter participants"
                            placeholderTextColor="#000105"
                            style={styles.input}
                        />
                    </View>
                )}

                {/* DATE & TIME */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Date & Time</Text>

                    {/* Dates */}
                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={() => setShowStartDatePicker(true)}
                            style={styles.dateButton}
                        >
                            <Text style={styles.dateText}>Start: {startDate}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowEndDatePicker(true)}
                            style={styles.dateButton}
                        >
                            <Text style={styles.dateText}>End: {endDate}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Times */}
                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={() => setShowStartTimePicker(true)}
                            style={styles.dateButton}
                        >
                            <Text style={styles.dateText}>From: {startTime}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowEndTimePicker(true)}
                            style={styles.dateButton}
                        >
                            <Text style={styles.dateText}>To: {endTime}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* DATE & TIME PICKERS */}
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
                        value={new Date(`${startDate}T${startTime}`)}
                        mode="time"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={(e, d) => onChangeTime(e, d, "start")}
                    />
                )}
                {showEndTimePicker && (
                    <DateTimePicker
                        value={new Date(`${endDate}T${endTime}`)}
                        mode="time"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={(e, d) => onChangeTime(e, d, "end")}
                    />
                )}
            </ScrollView>

            {/* CREATE EVENT BUTTON fixed at bottom */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                    <Text style={styles.saveButtonText}>{text}</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

};

export default CreateEventScreen;

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: "#000105",
        borderTopWidth: 1,
        borderColor: "#1E293B",
    },
    saveButton: {
        backgroundColor: "#C7D2FE",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    saveButtonText: { color: "#000105", fontSize: 18, fontWeight: "800" },
    container: { flex: 1, backgroundColor: "#000105", padding: 16 },
    title: { fontSize: 22, fontWeight: "700", color: "#fff", textAlign: "center" },
    input: {
        width: "100%",
        padding: 12,
        borderRadius: 5,
        backgroundColor: "#C7D2FE", // Light blue input background
        borderWidth: 1,
        borderColor: "#C7D2FE",
        color: "#000105", // Dark text in light input
        marginBottom: 10
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 18,
    },
    pickerContainer: {
        backgroundColor: "#C7D2FE",
        borderRadius: 5,
        marginBottom: 16,
        overflow: "hidden",
    },
    picker: {
        color: "#000000",
        borderRadius: 5
    },
    sectionTitle: { color: "#fff", marginBottom: 10, fontWeight: "600", fontSize: 16 },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
    dateButton: { backgroundColor: "#000c3a", padding: 12, flex: 0.48 },
    dateText: { color: "#ffffff", textAlign: "center", fontWeight: "300" },

    radioRow: { flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 10 },
    radioCircle: {
        width: 18,
        height: 18,
        // borderRadius: 9,
        borderWidth: 2,
        borderColor: "#fff",
    },
    radioSelected: {
        backgroundColor: "#fff",
    },

    addItemBtn: {
        backgroundColor: "#C7D2FE",
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    section: {
        marginTop: 20,
        marginBottom: 10,
    },
});