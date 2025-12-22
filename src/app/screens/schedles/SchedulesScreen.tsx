import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform,
  Dimensions,
} from "react-native";
import { Calendar, Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Event } from "../../redux/slice/eventSlice";

const { height } = Dimensions.get('window'); // Get screen height for modal styling

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
  const events = useSelector((state: RootState) => state.events.events);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderEventItem = ({ item }: { item: Event }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("EventDetail", { itemId: item.id })}
      style={styles.eventItem}>
      <Text style={styles.eventType}>{item.type}</Text>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.eventDate}>
        {item.startDate} {item.startTime} - {item.endDate} {item.endTime}
      </Text>
    </TouchableOpacity>
  );

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") newDate.setMonth(newDate.getMonth() - 1);
    else if (viewMode === "week") newDate.setDate(newDate.getDate() - 7);
    // else if (viewMode === "agenda") newDate.setDate(newDate.getDate() - 1);

    setCurrentDate(newDate);
    setSelectedDate(newDate.toISOString().split("T")[0]);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === "month") newDate.setMonth(newDate.getMonth() + 1);
    else if (viewMode === "week") newDate.setDate(newDate.getDate() + 7);
    // else if (viewMode === "agenda") newDate.setDate(newDate.getDate() + 1);

    setCurrentDate(newDate);
    setSelectedDate(newDate.toISOString().split("T")[0]);
  };

  // Build marked dates with red dots for event days
  const getMarkedDates = () => {
    const marks: any = {};

    events.forEach((event) => {
      let current = new Date(event.startDate);
      const end = new Date(event.endDate);

      while (current <= end) {
        const dateString = current.toISOString().split("T")[0];

        marks[dateString] = {
          ...(marks[dateString] || {}),
          marked: true,
          dotColor: "red",
        };

        current.setDate(current.getDate() + 1);
      }
    });

    // Selected date styling (overrides dot only visually)
    marks[selectedDate] = {
      ...(marks[selectedDate] || {}),
      selected: true,
      selectedColor: "#C7D2FE",
      selectedTextColor: "#000c3a",
      marked: true,
      dotColor: "red",
    };

    // Today styling
    const todayString = today.toISOString().split("T")[0];
    marks[todayString] = {
      ...(marks[todayString] || {}),
      marked: true,
      dotColor: "red",
    };

    return marks;
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
        {["month", "week"].map((mode) => (
          <TouchableOpacity key={mode} onPress={() => setViewMode(mode as any)}>
            <Text
              style={[styles.switchText, viewMode === mode && styles.switchActive]}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendar Views */}
      {viewMode === "month" && (
        <Calendar
          onDayPress={onDayPress}
          markedDates={getMarkedDates()}
          theme={calendarTheme}
        />
      )}

      {viewMode === "week" && (
        <View style={styles.weekCalendarWrapper}>
          <Calendar
            current={selectedDate}
            // Correct props to hide the header area
            hideArrows={true}
            renderHeader={() => <View />}
            hideExtraDays={true}
            firstDay={1}
            onDayPress={onDayPress}
            markedDates={getMarkedDates()}
            theme={calendarTheme}
            style={styles.weekCalendarStyle}
          />
        </View>
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
          <Text style={{ textAlign: "center", color: "#64748b", marginTop: 20 }}>
            No events for this day
          </Text>
        }
      />

      {/* Bottom Sheet Style Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContentContainer} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHandle} />

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate("CreateEvent", { date: selectedDate });
              }}
            >
              <Ionicons name="calendar-outline" size={24} color="#000c3a" />
              <Text style={styles.modalButtonText}>Create Event</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate('Settings'); // Or 'Find Someone' screen
              }}
            >
              <Ionicons name="search-outline" size={24} color="#000c3a" />
              <Text style={styles.modalButtonText}>Find Someone</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Floating Button - Now opens Modal */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="add" size={32} color="#000105" />
      </TouchableOpacity>
    </View>
  );
};

const calendarTheme = {
  backgroundColor: "#000105",
  calendarBackground: "#000105",
  textSectionTitleColor: "#ffffff",
  dayTextColor: "#ffffff",
  monthTextColor: "#ffffff",
  arrowColor: "#C7D2FE",
  todayTextColor: "#C7D2FE",
  selectedDayBackgroundColor: "#C7D2FE",
  selectedDayTextColor: "#000c3a",
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000105", paddingTop: 60, paddingHorizontal: 16, },
  title: { fontSize: 28, fontWeight: "900", color: "#ffffff", textAlign: "left" },
  subtitle: { fontSize: 14, color: "#94A3B8", textAlign: "left", marginBottom: 30 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  navButton: { padding: 8 },
  viewSwitch: { flexDirection: "row", justifyContent: "space-around", marginBottom: 16 },
  switchText: { color: "#fff", fontSize: 16 },
  switchActive: { color: "#C7D2FE", fontWeight: "700" },
  eventsTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginVertical: 12 },
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
    backgroundColor: "#000c3a",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventType: { color: "#34D399", fontWeight: "900", marginBottom: 4, fontSize: 18 },
  eventTitle: { color: "#ffffff", fontSize: 16, fontWeight: "900" },
  eventDescription: { color: "#ffffff", fontSize: 14, marginVertical: 4, fontWeight: "300" },
  eventDate: { color: "#D1D5DB", fontSize: 12, fontWeight: "300" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end", // Align content to the bottom
  },
  modalContentContainer: {
    backgroundColor: "#000105",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    maxHeight: height * 0.7
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ffffff',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 15,
  },
  modalUserInfo: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 15,
  },
  modalAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    backgroundColor: '#C7D2FE',
  },
  modalUserName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  modalUserDetail: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 4,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#F3F4F6', // Light gray background
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#000c3a',
  },
  signOutButton: {
    backgroundColor: '#FFEBEE', // Light red for sign out context
    marginTop: 10,
  },
  signOutButtonText: {
    color: '#FF6F61', // Red text
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#999',
  },

  weekCalendarWrapper: {
    height: 80, // Restrict height to show only one row
    overflow: 'hidden',
    marginBottom: 10,
  },
  weekCalendarStyle: {
    marginTop: -40, // Pull up to hide the header/days label if needed
  },

});