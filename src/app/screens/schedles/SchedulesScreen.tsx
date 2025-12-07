import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Calendar, Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Event } from "../../redux/slice/eventSlice";

const CalendarScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(
    today.toISOString().split("T")[0]
  );
  const [viewMode, setViewMode] = useState<"month" | "week" | "agenda">(
    "month"
  );
  const [currentDate, setCurrentDate] = useState(today);
  const events = useSelector((state: RootState) => state.events.events)

  const renderEventItem = ({ item }: { item: Event }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventType}>{item.type}</Text>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.eventDate}>
        {item.startDate} {item.startTime} - {item.endDate} {item.endTime}
      </Text>
    </View>
  );

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") newDate.setMonth(newDate.getMonth() - 1);
    else if (viewMode === "week") newDate.setDate(newDate.getDate() - 7);
    else if (viewMode === "agenda") newDate.setDate(newDate.getDate() - 1);

    setCurrentDate(newDate);
    setSelectedDate(newDate.toISOString().split("T")[0]);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") newDate.setMonth(newDate.getMonth() + 1);
    else if (viewMode === "week") newDate.setDate(newDate.getDate() + 7);
    else if (viewMode === "agenda") newDate.setDate(newDate.getDate() + 1);

    setCurrentDate(newDate);
    setSelectedDate(newDate.toISOString().split("T")[0]);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scheduler</Text>
      <Text style={styles.subtitle}>
        Access, Create and Manage all your Events and Tasks in one place.
      </Text>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPrevious} style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{viewMode.toUpperCase()}</Text>
        <TouchableOpacity onPress={goToNext} style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* View Mode Switch */}
      <View style={styles.viewSwitch}>
        {["month", "week", "agenda"].map((mode) => (
          <TouchableOpacity key={mode} onPress={() => setViewMode(mode as any)}>
            <Text
              style={[styles.switchText, viewMode === mode && styles.switchActive]}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendar */}
      {viewMode === "month" && (
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#C7D2FE" },
            [today.toISOString().split("T")[0]]: { selected: true, selectedColor: "#C7D2FE" },
          }}
          theme={{
            backgroundColor: "#000105",
            calendarBackground: "#000105",
            textSectionTitleColor: "#fff",
            dayTextColor: "#fff",
            monthTextColor: "#fff",
            arrowColor: "#C7D2FE",
            todayTextColor: "#C7D2FE",
          }}
        />
      )}

      {viewMode === "agenda" && (
        <Agenda
          selected={selectedDate}
          onDayPress={onDayPress}
          theme={{
            backgroundColor: "#000105",
            calendarBackground: "#000105",
            agendaKnobColor: "#C7D2FE",
            dayTextColor: "#fff",
            monthTextColor: "#fff",
            todayTextColor: "#C7D2FE",
          }}
        />
      )}

      {viewMode === "week" && (
        <Calendar
          current={selectedDate}
          firstDay={1}
          hideExtraDays
          onDayPress={onDayPress}
          markingType="period"
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#C7D2FE" },
          }}
          theme={{
            backgroundColor: "#000105",
            calendarBackground: "#000105",
            textSectionTitleColor: "#fff",
            dayTextColor: "#fff",
            monthTextColor: "#fff",
            arrowColor: "#C7D2FE",
            todayTextColor: "#C7D2FE",
          }}
        />
      )}

      {/* Event List */}
      <Text style={styles.eventsTitle}>Events for {selectedDate}</Text>
      <FlatList<Event>
        data={events.filter(
          (e) => e.startDate <= selectedDate && e.endDate >= selectedDate
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderEventItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#fff", marginTop: 20 }}>
            No events for this day
          </Text>
        }
      />

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("CreateEvent", { date: selectedDate })}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000105", paddingTop: 20, paddingHorizontal: 16 },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#C7D2FE",
    textAlign: "center",
    marginBottom: 20,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  navButton: { padding: 8 },
  viewSwitch: { flexDirection: "row", justifyContent: "space-around", marginBottom: 16 },
  switchText: { color: "#fff", fontSize: 16 },
  switchActive: { color: "#C7D2FE", fontWeight: "700" },
  eventsTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginVertical: 12 },
  // eventItem: { backgroundColor: "#1E293B", padding: 14, borderRadius: 10, marginBottom: 10 },
  // eventType: { color: "#C7D2FE", fontWeight: "900", marginBottom: 4 },
  // eventTitle: { color: "#fff", fontSize: 16, fontWeight: "300" },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#C7D2FE",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    color: "red"
  },
  eventItem: {
    backgroundColor: "#1E293B",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventType: { color: "#34D399", fontWeight: "700", marginBottom: 4 },
  eventTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  eventDescription: { color: "#fff", fontSize: 14, marginVertical: 4 },
  eventDate: { color: "#D1D5DB", fontSize: 12 },
});