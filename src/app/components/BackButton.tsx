import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { ChevronLeft } from "lucide-react-native";

interface Props {
  onPress: () => void;
  style?: ViewStyle;
  iconColor?: string;
  backgroundColor?: string;
}

const BackButton: React.FC<Props> = ({ 
  onPress, 
  style, 
  iconColor = "#111827", 
  backgroundColor = "#F3F4F6" 
}) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.btn, { backgroundColor }, style]}
    >
      <ChevronLeft size={26} color={iconColor} />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});


