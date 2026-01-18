import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { createAndDispatchNotification } from "../utils/Notifications";
import Toast from "react-native-toast-message";
import { authService } from "../redux/configuration/auth.service";

const EventDescriptionScreen: React.FunctionComponent = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { event }: any = route.params;

  // Registration modal states
  const [isRegistrationModalVisible, setIsRegistrationModalVisible] =
    useState(false);

  const handleEventRegister = (event: any) => {
    setIsRegistrationModalVisible(true);
  };

  const handleRegistrationSubmit = async (formData: any) => {
    // console.log("Registration submitted:", formData);

    setIsRegistrationModalVisible(false);

    await authService.updateUserForms(formData).then(() => {
      createAndDispatchNotification(dispatch, {
        title: "Event Registration Confirmed",
        message: `You've successfully registered for ${event?.title || "The event"}.`,
      });
    })
  };

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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.header}>Event Details</Text>
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
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        )}

        {/* Register Button - For all other events (not internship) */}
        {!event.isInternship && (
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => handleEventRegister(event)}
          >
            <Text style={styles.registerButtonText}>Register for Event</Text>
            {/* <Ionicons name="calendar" size={20} color="#fff" /> */}
          </TouchableOpacity>
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
    gap: 12,
    marginBottom: 20,
    paddingLeft: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
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
    backgroundColor: "#10B981",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  registerButton: {
    backgroundColor: "#3B82F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
});

// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   StatusBar,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import BackButton from "../components/BackButton";

// const EventDescriptionScreen: React.FunctionComponent = () => {
//   const route = useRoute();
//   const navigation = useNavigation();

//   const { event }: any = route.params; // event is the full object

//   if (!event) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.notFound}>Event not found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         barStyle={Platform.OS === "ios" ? "light-content" : "dark-content"}
//         backgroundColor="transparent"
//         translucent
//       />

//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={26} color="#ffffff" />
//         </TouchableOpacity>
//         <Text style={styles.header}>Event Details</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Event Image */}
//         <View style={styles.imageWrapper}>
//           <Image
//             source={
//               typeof event.image === "string"
//                 ? { uri: event.image }
//                 : event.image
//             }
//             style={styles.eventImage}
//           />
//           {event.featured && (
//             <View style={styles.featuredRibbon}>
//               <Text style={styles.featuredText}>FEATURED</Text>
//             </View>
//           )}
//         </View>

//         {/* Event Info */}
//         <View style={styles.infoContainer}>
//           <View style={styles.authorContainer}>
//             <Image
//               source={{ uri: event.authorAvatar }}
//               style={styles.authorAvatar}
//             />
//             <View style={{ marginLeft: 8 }}>
//               <Text style={styles.authorName}>{event.author}</Text>
//               <Text style={styles.date}>{event.date}</Text>
//             </View>
//           </View>
//           <View style={styles.categoryBadge}>
//             <Text style={styles.categoryText}>{event.category}</Text>
//           </View>
//         </View>

//         {/* Title */}
//         <Text style={styles.title}>{event.title}</Text>

//         {/* Content */}
//         {event.content.map(
//           (
//             paragraph:
//               | string
//               | number
//               | bigint
//               | boolean
//               | React.ReactElement<
//                   unknown,
//                   string | React.JSXElementConstructor<any>
//                 >
//               | Iterable<React.ReactNode>
//               | React.ReactPortal
//               | Promise<
//                   | string
//                   | number
//                   | bigint
//                   | boolean
//                   | React.ReactPortal
//                   | React.ReactElement<
//                       unknown,
//                       string | React.JSXElementConstructor<any>
//                     >
//                   | Iterable<React.ReactNode>
//                   | null
//                   | undefined
//                 >
//               | null
//               | undefined,
//             idx: React.Key | null | undefined
//           ) => (
//             <View key={idx} style={styles.contentCard}>
//               <Text style={styles.content}>{paragraph}</Text>
//             </View>
//           )
//         )}

//         {/* Apply Now Button - Only for Internship */}
//         {event.isInternship && (
//           <TouchableOpacity
//             style={styles.applyButton}
//             onPress={() => (navigation as any).navigate("Careers")}
//           >
//             <Text style={styles.applyButtonText}>Apply Now</Text>
//             <Ionicons name="arrow-forward" size={20} color="#fff" />
//           </TouchableOpacity>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default EventDescriptionScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0A0A1A",
//     paddingTop: 40,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 20,
//     paddingLeft: 10,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: "#ffffff",
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   scrollContainer: {
//     // paddingTop: Platform.OS === "ios" ? 100 : 80,
//     paddingHorizontal: 16,
//     paddingBottom: 40,
//   },
//   imageWrapper: {
//     position: "relative",
//     marginBottom: 16,
//   },
//   eventImage: {
//     width: "100%",
//     height: 220,
//     borderRadius: 16,
//   },
//   featuredRibbon: {
//     position: "absolute",
//     top: 12,
//     right: -40,
//     backgroundColor: "#FF4D6D",
//     paddingVertical: 4,
//     paddingHorizontal: 60,
//     transform: [{ rotate: "45deg" }],
//     shadowColor: "#000",
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.4,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   featuredText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 12,
//   },
//   infoContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   authorContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   authorAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   authorName: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   date: {
//     color: "#C7D2FE",
//     fontSize: 12,
//   },
//   categoryBadge: {
//     backgroundColor: "#3B82F6",
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 8,
//   },
//   categoryText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "700",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#fff",
//     marginBottom: 16,
//   },
//   contentCard: {
//     backgroundColor: "#1E1E3F",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//   },
//   content: {
//     color: "#E0E7FF",
//     fontSize: 14,
//     lineHeight: 22,
//   },
//   notFound: {
//     color: "#fff",
//     fontSize: 18,
//     textAlign: "center",
//     marginTop: 50,
//   },
//   applyButton: {
//     backgroundColor: "#10B981",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 12,
//     marginTop: 24,
//     shadowColor: "#10B981",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   applyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//     marginRight: 8,
//   },
// });
