import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ContactForm from "./ContactForm";

const SERVICE_ID = "service_o1jbklr";
const TEMPLATE_ID = "template_p8h58ur";
const PUBLIC_KEY = "hcj3DsJ8MfNfUrE8J";

const ContactUsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Contact Us</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>We’d love to hear from you</Text>
          <Text style={styles.introText}>
            Have a question or need our services? Kindly fill the form below and
            our team will respond promptly.
          </Text>
        </View>

        <ContactForm
          serviceId={SERVICE_ID}
          templateId={TEMPLATE_ID}
          publicKey={PUBLIC_KEY}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000105",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#000c3a",
    elevation: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  introCard: {
    backgroundColor: "#000c3a",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  introText: {
    fontSize: 14,
    color: "#cfcfcf",
    lineHeight: 20,
  },
});
