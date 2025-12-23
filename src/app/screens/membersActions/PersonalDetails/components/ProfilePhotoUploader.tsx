import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface ProfilePhotoUploaderProps {
  photoUri: string | null;
  error?: string;
  onPhotoChange: (uri: string) => void;
}

const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  photoUri,
  error,
  onPhotoChange,
}) => {
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "We need access to your photos to update your profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      onPhotoChange(result.assets[0].uri);
    }
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>Profile Photo</Text>
      {photoUri ? (
        <Image
          source={{ uri: photoUri }}
          style={styles.photo}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.noPhotoText}>No photo selected</Text>
      )}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handlePickImage}
        activeOpacity={0.8}
      >
        <Text style={styles.secondaryButtonText}>Choose Photo</Text>
      </TouchableOpacity>
      {!!error && (
        <Text style={styles.errorText}>
          ⚠ {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: 4,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  noPhotoText: {
    color: "#9ca3af",
    marginBottom: 8,
  },
  secondaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3B82F6",
    alignSelf: "flex-start",
  },
  secondaryButtonText: {
    color: "#3B82F6",
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "#f87171",
  },
});

export default ProfilePhotoUploader;
