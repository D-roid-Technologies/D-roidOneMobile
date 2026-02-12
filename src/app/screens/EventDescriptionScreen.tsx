import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import EventRegistrationForm from "../components/EventRegistrationForm";
import { useDispatch, useSelector } from "react-redux";
import { createAndDispatchNotification } from "../utils/Notifications";
import { addRegisteredEvent } from "../redux/slice/droideventsSlice";
import Toast from "react-native-toast-message";
import { authService } from "../redux/configuration/auth.service";

const EventDescriptionScreen: React.FunctionComponent = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { event }: any = route.params;

  // Get registered events from Redux store
  const registeredEvents = useSelector(
    (state: any) => state.events?.registeredEvents || [],
  );

  // Registration modal states
  const [isRegistrationModalVisible, setIsRegistrationModalVisible] =
    useState(false);
  const [isRegisteredEventsModalVisible, setIsRegisteredEventsModalVisible] =
    useState(false);

  // Check if current event is already registered
  const isEventRegistered = useMemo(() => {
    return registeredEvents.some((e: any) => e.id === event?.id);
  }, [registeredEvents, event?.id]);

  // Check event status based on date
  const checkEventStatus = (sampleDateStr: string): string => {
    const sampleDate = new Date(
      sampleDateStr.replace(/(\d+)(st|nd|rd|th)/, "$1"),
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffInMs = sampleDate.getTime() - today.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 1) {
      return "Event Upcoming";
    } else if (diffInDays === 1) {
      return "Event Tomorrow";
    } else if (diffInDays < 0) {
      return "Event Passed";
    } else {
      return "Event Ongoing";
    }
  };

  // Memoize event status to avoid recalculation on every render
  const eventStatus = useMemo(() => {
    if (event?.date) {
      return checkEventStatus(event.date);
    }
    return null;
  }, [event?.date]);

  // Get status color based on event status
  const getStatusColor = (status: string | null): string => {
    switch (status) {
      case "Event Ongoing":
        return "#10B981"; // Green
      case "Event Tomorrow":
        return "#F59E0B"; // Amber
      case "Event Upcoming":
        return "#3B82F6"; // Blue
      case "Event Passed":
        return "#6B7280"; // Gray
      default:
        return "#3B82F6";
    }
  };

  const handleEventRegister = (event: any) => {
    setIsRegistrationModalVisible(true);
  };

  const handleRegistrationSubmit = async (formData: any) => {
    // console.log("Registration submitted:", formData);

    // Add event to registered events in Redux store
    dispatch(
      addRegisteredEvent({
        ...event,
        registrationData: formData,
        registeredAt: new Date().toISOString(),
      }),
    );

    setIsRegistrationModalVisible(false);

    await authService.updateUserForms(formData).then(() => {
      createAndDispatchNotification(dispatch, {
        title: "Event Registration Confirmed",
        message: `You've successfully registered for ${event?.title || "The event"}.`,
      });
    });
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Event not found.</Text>
      </View>
    );
  }

  const isPastEvent = eventStatus === "Event Passed";

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.header}>Event Details</Text>

        {/* View Registered Events Button */}
        <TouchableOpacity
          style={styles.registeredEventsIconButton}
          onPress={() => setIsRegisteredEventsModalVisible(true)}
        >
          <Ionicons name="list-circle" size={28} color="#3B82F6" />
          {registeredEvents.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{registeredEvents.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Event Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={
              typeof event.image === "string"
                ? { uri: event.image }
                : event.image
            }
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

        {/* Event Status Badge */}
        {eventStatus && (
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(eventStatus) },
            ]}
          >
            <Ionicons
              name={
                eventStatus === "Event Passed"
                  ? "checkmark-circle"
                  : eventStatus === "Event Ongoing"
                    ? "flame"
                    : "time"
              }
              size={16}
              color="#fff"
            />
            <Text style={styles.statusText}>{eventStatus}</Text>
          </View>
        )}

        {/* Already Registered Badge */}
        {isEventRegistered && (
          <View style={styles.alreadyRegisteredBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text style={styles.alreadyRegisteredText}>Already Registered</Text>
          </View>
        )}

        {/* Title */}
        <Text style={styles.title}>{event.title}</Text>

        {/* Content */}
        {event.content.map((paragraph: string, idx: number) => (
          <View key={idx} style={styles.contentCard}>
            <Text style={styles.content}>{paragraph}</Text>
          </View>
        ))}

        {/* Apply Now Button - Only for Internship */}
        {event.isInternship && (
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => (navigation as any).navigate("Careers")}
          >
            <Text style={styles.applyButtonText}>Apply Now</Text>
            <Ionicons name="arrow-forward" size={20} color="#071D6A" />
          </TouchableOpacity>
        )}

        {/* Register Button - For all other events (not internship) */}
        {!event.isInternship && !isPastEvent && (
          <TouchableOpacity
            style={[
              styles.registerButton,
              isEventRegistered && styles.registeredButton,
            ]}
            onPress={() => handleEventRegister(event)}
            disabled={isEventRegistered}
          >
            <Text style={styles.registerButtonText}>
              {isEventRegistered ? "Registered" : "Register for Event"}
            </Text>
            {isEventRegistered && (
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        )}

        {/* Past Event Message */}
        {!event.isInternship && isPastEvent && (
          <View style={styles.pastEventContainer}>
            <Ionicons name="calendar-outline" size={24} color="#6B7280" />
            <Text style={styles.pastEventText}>
              This event has already passed
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Registration Modal */}
      <Modal
        visible={isRegistrationModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsRegistrationModalVisible(false)}
      >
        <EventRegistrationForm
          selectedEvent={event}
          onClose={() => setIsRegistrationModalVisible(false)}
          onSubmit={handleRegistrationSubmit}
        />
      </Modal>

      {/* Registered Events Modal */}
      <Modal
        visible={isRegisteredEventsModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsRegisteredEventsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#0A0A1A" />

          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>My Registered Events</Text>
            <TouchableOpacity
              onPress={() => setIsRegisteredEventsModalVisible(false)}
            >
              <Ionicons name="close-circle" size={32} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Registered Events List */}
          <ScrollView contentContainerStyle={styles.modalScrollContainer}>
            {registeredEvents.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={64} color="#6B7280" />
                <Text style={styles.emptyStateTitle}>No Registered Events</Text>
                <Text style={styles.emptyStateText}>
                  You haven't registered for any events yet.
                </Text>
              </View>
            ) : (
              registeredEvents.map((registeredEvent: any, index: number) => {
                const status = registeredEvent.date
                  ? checkEventStatus(registeredEvent.date)
                  : null;

                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.eventCard}
                    onPress={() => {
                      setIsRegisteredEventsModalVisible(false);
                      // Navigate to event details if different from current event
                      if (registeredEvent.id !== event.id) {
                        (navigation as any).push("EventDescription", {
                          event: registeredEvent,
                        });
                      }
                    }}
                  >
                    <Image
                      source={
                        typeof registeredEvent.image === "string"
                          ? { uri: registeredEvent.image }
                          : registeredEvent.image
                      }
                      style={styles.eventCardImage}
                    />
                    <View style={styles.eventCardContent}>
                      <View style={styles.eventCardHeader}>
                        <Text style={styles.eventCardTitle}>
                          {registeredEvent.title}
                        </Text>
                        {status && (
                          <View
                            style={[
                              styles.eventCardStatusBadge,
                              { backgroundColor: getStatusColor(status) },
                            ]}
                          >
                            <Text style={styles.eventCardStatusText}>
                              {status.replace("Event ", "")}
                            </Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.eventCardInfo}>
                        <Ionicons name="calendar" size={14} color="#C7D2FE" />
                        <Text style={styles.eventCardDate}>
                          {registeredEvent.date}
                        </Text>
                      </View>
                      <View style={styles.eventCardInfo}>
                        <Ionicons name="location" size={14} color="#C7D2FE" />
                        <Text style={styles.eventCardCategory}>
                          {registeredEvent.category}
                        </Text>
                      </View>
                      <View style={styles.eventCardInfo}>
                        <Ionicons
                          name="checkmark-circle"
                          size={14}
                          color="#10B981"
                        />
                        <Text style={styles.registeredAtText}>
                          Registered on{" "}
                          {new Date(
                            registeredEvent.registeredAt,
                          ).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default EventDescriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A1A",
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    flex: 1,
    marginLeft: 12,
  },
  registeredEventsIconButton: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF4D6D",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  scrollContainer: {
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
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
    gap: 6,
  },
  statusText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  alreadyRegisteredBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
    gap: 6,
    backgroundColor: "#1E1E3F",
    borderWidth: 1,
    borderColor: "#10B981",
  },
  alreadyRegisteredText: {
    color: "#10B981",
    fontSize: 13,
    fontWeight: "600",
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
  applyButton: {
    backgroundColor: "#C7D2FE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: "#071D6A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  applyButtonText: {
    color: "#071D6A",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  registerButton: {
    backgroundColor: "#C7D2FE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: "#071D6A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    gap: 8,
  },
  registeredButton: {
    backgroundColor: "#10B981",
    shadowColor: "#10B981",
  },
  registerButtonText: {
    color: "#071D6A",
    fontSize: 16,
    fontWeight: "700",
  },
  pastEventContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
    backgroundColor: "#1E1E3F",
    gap: 8,
  },
  pastEventText: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: "600",
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#0A0A1A",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1E1E3F",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
  },
  modalScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 16,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#C7D2FE",
    marginTop: 8,
    textAlign: "center",
  },
  eventCard: {
    backgroundColor: "#1E1E3F",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  eventCardImage: {
    width: "100%",
    height: 150,
  },
  eventCardContent: {
    padding: 16,
  },
  eventCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  eventCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
    marginRight: 8,
  },
  eventCardStatusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  eventCardStatusText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  eventCardInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  eventCardDate: {
    color: "#C7D2FE",
    fontSize: 13,
  },
  eventCardCategory: {
    color: "#C7D2FE",
    fontSize: 13,
  },
  registeredAtText: {
    color: "#10B981",
    fontSize: 12,
    fontStyle: "italic",
  },
});
