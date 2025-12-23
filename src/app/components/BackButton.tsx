import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BackButtonProps {
  navigation?: any;
  navigateTo?: string;
  color?: string;
  size?: number;
  onPress?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({
  navigation,
  navigateTo = "BottomTabs", // Default navigation target
  color = "#ffffff",
  size = 24,
  onPress,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigation) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.backButton}
      activeOpacity={0.7}
    >
      <Ionicons name="chevron-back" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
});

export default BackButton;
