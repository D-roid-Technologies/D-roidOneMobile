import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { ChevronLeft } from "lucide-react-native";

interface Props {
  onPress: () => void;
  style?: ViewStyle;
}

const BackButton: React.FC<Props> = ({ onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
      <ChevronLeft size={26} color="#111827" />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F4F6", // Light gray to match light theme vs Progression's dark theme
    justifyContent: "center",
    alignItems: "center",
  },
});
