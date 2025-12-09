import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Welcome: undefined;
  Signup: undefined;
};

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Welcome">;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>D’roid One</Text>
        <Text style={styles.subtitle}>
          Your One stop shop for everything Tech
        </Text>
      </View>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupText}>Let's Begin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000105",
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#BAB8B8",
    textAlign: "center",
    fontWeight: "300",
  },
  buttonContainer: {
    width: "100%",
  },
  signupButton: {
    backgroundColor: "#C7D2FE",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  signupText: {
    color: "#000105",
    fontSize: 16,
    fontWeight: "600",
  },
});