import React from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";

const WelcomeScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Top Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://i.imgur.com/YXjB6Rr.png" }} // Replace with your company logo
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Title & Subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>D’roid One</Text>
        <Text style={styles.subtitle}>Your One stop shop for everything Tech</Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "flex-start",
  },
  logo: {
    width: 120,
    height: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 70,
    fontWeight: "700",
    color: "#071D6A",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  buttonContainer: {
    paddingBottom: 40,
    width: "100%",
  },
  signupButton: {
    backgroundColor: "#071D6A",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  signupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#071D6A",
    alignItems: "center",
  },
  loginText: {
    color: "#071D6A",
    fontSize: 16,
    fontWeight: "600",
  },
});