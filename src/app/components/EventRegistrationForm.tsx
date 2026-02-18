import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// ─────────────────────────────────────────────────────────
// Rotating Spinner Component (delayed start)
// ─────────────────────────────────────────────────────────
const RotatingSpinner: React.FC<{
  size?: number;
  color?: string;
  delay?: number;
}> = ({ size = 20, color = "#fff", delay = 300 }) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in after delay, then start spinning
    const fadeIn = Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      delay,
      useNativeDriver: true,
    });

    const spin = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    );

    const timeout = setTimeout(() => {
      spin.start();
    }, delay);

    fadeIn.start();

    return () => {
      clearTimeout(timeout);
      spin.stop();
      fadeIn.stop();
    };
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ opacity, transform: [{ rotate }] }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2.5,
          borderColor: "rgba(255,255,255,0.3)",
          borderTopColor: color,
        }}
      />
    </Animated.View>
  );
};

interface Event {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  category: string;
  readTime: string;
  image: any;
  content: string[];
}

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  experienceLevel: string;
  areasOfInterest: string;
  teamName: string;
  teamMembers: string;
  projectIdea: string;
  technicalSkills: string;
  githubProfile: string;
  portfolioUrl: string;
  role: string;
  profession: string;
  organization: string;
  specialization: string;
  businessStage: string;
  industry: string;
  challenges: string;
  expectations: string;
  dietaryRestrictions: string;
  specialNeeds: string;
  country: string;
  fieldOfInterest: string;
  programmingLanguages: string;
  motivation: string;
  // Chess-specific fields
  chessUsername: string;
  chessEloRating: string;
  chessTier: string;
  chessPreferredFormat: string;
  chessYearsPlaying: string;
  chessGoal: string;
  chessHasCompeted: string;
  chessDiscovery: string;
}

interface EventRegistrationFormProps {
  selectedEvent: Event | null;
  onClose: () => void;
  onSubmit: (data: FormData & { eventId: number }) => void;
}

// ─────────────────────────────────────────────────────────
// Custom Dropdown Component
// ─────────────────────────────────────────────────────────
interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onSelect,
  placeholder = "Select...",
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen(true)}
      >
        <Text
          style={[
            styles.dropdownButtonText,
            !value && styles.dropdownPlaceholder,
          ]}
        >
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.dropdownModal}>
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownHeaderText}>{label}</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Ionicons name="close" size={24} color="#000c3a" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownOption,
                    value === item && styles.dropdownOptionSelected,
                  ]}
                  onPress={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      value === item && styles.dropdownOptionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {value === item && (
                    <Ionicons name="checkmark" size={20} color="#203499" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

// ─────────────────────────────────────────────────────────
// Initial form state
// ─────────────────────────────────────────────────────────
const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  experienceLevel: "",
  areasOfInterest: "",
  teamName: "",
  teamMembers: "",
  projectIdea: "",
  technicalSkills: "",
  githubProfile: "",
  portfolioUrl: "",
  role: "",
  profession: "",
  organization: "",
  specialization: "",
  businessStage: "",
  industry: "",
  challenges: "",
  expectations: "",
  dietaryRestrictions: "",
  specialNeeds: "",
  country: "",
  fieldOfInterest: "",
  programmingLanguages: "",
  motivation: "",
  chessUsername: "",
  chessEloRating: "",
  chessTier: "",
  chessPreferredFormat: "",
  chessYearsPlaying: "",
  chessGoal: "",
  chessHasCompeted: "",
  chessDiscovery: "",
};

// ─────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────
const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  selectedEvent,
  onClose,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const isSubmittingRef = useRef(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validation
  const validate = (): string | null => {
    if (!formData.email || !formData.phoneNumber) {
      return "Please fill in all required fields";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address";
    }
    if (!selectedEvent) {
      return "No event selected";
    }
    if (selectedEvent.id === 25) {
      if (!formData.chessTier || !formData.chessPreferredFormat) {
        return "Please select your Competition Tier and Preferred Format";
      }
    }
    if (selectedEvent.id === 24) {
      if (!formData.fullName) {
        return "Please enter your full name";
      }
      if (!formData.fieldOfInterest || !formData.experienceLevel) {
        return "Please fill in Field of Interest and Experience Level";
      }
    }
    return null;
  };

  //  Submit handler
  const handleSubmit = async () => {
    if (isSubmittingRef.current) return;

    const error = validate();
    if (error) {
      Alert.alert("Error", error);
      return;
    }

    isSubmittingRef.current = true;
    setIsLoading(true);

    try {
      await onSubmit({ ...formData, eventId: selectedEvent!.id });

      const hasProgressScreen =
        selectedEvent!.id === 25 || selectedEvent!.id === 24;
      if (!hasProgressScreen) {
        Alert.alert("Success", "Registration submitted successfully!");
      }
    } catch {
      Alert.alert("Error", "Failed to submit registration. Please try again.");
    } finally {
      isSubmittingRef.current = false;
      setIsLoading(false);
    }
  };

  // Field renderers

  const renderCommonFields = () => (
    <>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Full Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={formData.fullName}
          onChangeText={(text) => updateField("fullName", text)}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Email Address <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="your.email@example.com"
          value={formData.email}
          onChangeText={(text) => updateField("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Phone Number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="+234 XXX XXX XXXX"
          value={formData.phoneNumber}
          onChangeText={(text) => updateField("phoneNumber", text)}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>
    </>
  );

  // Chess Championship (event id 25)
  const renderChessFields = () => {
    const countries = [
      "Nigeria",
      "Ghana",
      "Kenya",
      "South Africa",
      "Cameroon",
      "Ethiopia",
      "Senegal",
      "United States",
      "United Kingdom",
      "Canada",
      "Other",
    ];
    const yearsOptions = [
      "Less than 1 year",
      "1 – 2 years",
      "3 – 5 years",
      "6 – 10 years",
      "10+ years",
    ];
    const discoveryOptions = [
      "Social Media",
      "Friend / Family",
      "D'roid App",
      "Chess Community",
      "Online Forum",
      "Other",
    ];

    return (
      <>
        {/* Hero Banner */}
        <View style={chessStyles.heroBanner}>
          <Text style={chessStyles.heroIcon}>♟</Text>
          <Text style={chessStyles.heroTitle}>Your Move Awaits</Text>
          <Text style={chessStyles.heroSub}>
            Fill in your details below and claim your spot on the board.
          </Text>
        </View>

        {/* Personal Info */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Full Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(text) => updateField("fullName", text)}
            placeholderTextColor="#999"
            editable={!isLoading}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Email Address <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            value={formData.email}
            onChangeText={(text) => updateField("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
            editable={!isLoading}
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <Text style={styles.label}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="+234..."
              value={formData.phoneNumber}
              onChangeText={(text) => updateField("phoneNumber", text)}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
              editable={!isLoading}
            />
          </View>

          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <CustomDropdown
              label="Country"
              value={formData.country}
              options={countries}
              onSelect={(value) => updateField("country", value)}
              placeholder="Select country"
            />
          </View>
        </View>

        {/* Chess Profile Divider */}
        <View style={chessStyles.divider}>
          <View style={chessStyles.dividerLine} />
          <Text style={chessStyles.dividerLabel}>♟ Chess Profile</Text>
          <View style={chessStyles.dividerLine} />
        </View>

        {/* Chess Username */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Chess.com / Lichess Username</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. magnus_fan99"
            value={formData.chessUsername}
            onChangeText={(text) => updateField("chessUsername", text)}
            autoCapitalize="none"
            placeholderTextColor="#999"
            editable={!isLoading}
          />
          <Text style={chessStyles.fieldHint}>
            Optional — helps us verify your rating for tier placement.
          </Text>
        </View>

        {/* ELO + Years */}
        <View style={styles.rowContainer}>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <Text style={styles.label}>Estimated ELO Rating</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 1450"
              value={formData.chessEloRating}
              onChangeText={(text) => updateField("chessEloRating", text)}
              keyboardType="numeric"
              placeholderTextColor="#999"
              editable={!isLoading}
            />
          </View>

          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <CustomDropdown
              label="Years Playing Chess"
              value={formData.chessYearsPlaying}
              options={yearsOptions}
              onSelect={(value) => updateField("chessYearsPlaying", value)}
              placeholder="Select range"
            />
          </View>
        </View>

        {/* Competition Tier */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Competition Tier <Text style={styles.required}>*</Text>
          </Text>
          <Text style={chessStyles.fieldHint}>
            Select the tier that best matches your skill level.
          </Text>
          <View style={chessStyles.tierContainer}>
            {[
              {
                key: "Elite",
                label: "Elite",
                elo: "ELO 1800+",
                icon: "♛",
                color: "#F59E0B",
                bg: "#FFFBEB",
                border: "#FDE68A",
              },
              {
                key: "Challenger",
                label: "Challenger",
                elo: "ELO 1200–1799",
                icon: "♜",
                color: "#203499",
                bg: "#EEF2FF",
                border: "#C7D2FE",
              },
              {
                key: "Rising Star",
                label: "Rising Star",
                elo: "Under 1200",
                icon: "♞",
                color: "#10B981",
                bg: "#ECFDF5",
                border: "#A7F3D0",
              },
            ].map((tier) => {
              const selected = formData.chessTier === tier.key;
              return (
                <TouchableOpacity
                  key={tier.key}
                  style={[
                    chessStyles.tierCard,
                    {
                      backgroundColor: selected ? tier.bg : "#F9FAFB",
                      borderColor: selected ? tier.color : "#E5E7EB",
                      borderWidth: selected ? 2 : 1,
                    },
                  ]}
                  onPress={() => updateField("chessTier", tier.key)}
                  disabled={isLoading}
                >
                  <Text style={chessStyles.tierIcon}>{tier.icon}</Text>
                  <Text
                    style={[
                      chessStyles.tierLabel,
                      { color: selected ? tier.color : "#374151" },
                    ]}
                  >
                    {tier.label}
                  </Text>
                  <Text style={chessStyles.tierElo}>{tier.elo}</Text>
                  {selected && (
                    <View
                      style={[
                        chessStyles.tierCheck,
                        { backgroundColor: tier.color },
                      ]}
                    >
                      <Ionicons name="checkmark" size={10} color="#fff" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Preferred Format */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Preferred Format <Text style={styles.required}>*</Text>
          </Text>
          <View style={chessStyles.formatContainer}>
            {[
              {
                key: "Classical",
                desc: "Long-form, deep strategy",
                icon: "⏳",
              },
              { key: "Rapid", desc: "25 mins per player", icon: "⚡" },
              { key: "Blitz", desc: "5 mins, all instinct", icon: "🔥" },
              { key: "Both", desc: "I'm in for everything", icon: "♟" },
            ].map((fmt) => {
              const selected = formData.chessPreferredFormat === fmt.key;
              return (
                <TouchableOpacity
                  key={fmt.key}
                  style={[
                    chessStyles.formatCard,
                    selected && chessStyles.formatCardSelected,
                  ]}
                  onPress={() => updateField("chessPreferredFormat", fmt.key)}
                  disabled={isLoading}
                >
                  <Text style={chessStyles.formatIcon}>{fmt.icon}</Text>
                  <Text
                    style={[
                      chessStyles.formatLabel,
                      selected && chessStyles.formatLabelSelected,
                    ]}
                  >
                    {fmt.key}
                  </Text>
                  <Text style={chessStyles.formatDesc}>{fmt.desc}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* More About You Divider */}
        <View style={chessStyles.divider}>
          <View style={chessStyles.dividerLine} />
          <Text style={chessStyles.dividerLabel}>♟ More About You</Text>
          <View style={chessStyles.dividerLine} />
        </View>

        {/* Prior Competition */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Have you competed before?</Text>
          <View style={styles.radioGroup}>
            {[
              "Yes, multiple times",
              "Yes, once or twice",
              "No, this is my first",
            ].map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.radioButton,
                  formData.chessHasCompeted === opt &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => updateField("chessHasCompeted", opt)}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.radioText,
                    formData.chessHasCompeted === opt &&
                      styles.radioTextSelected,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Goal */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            What's your goal for this championship?
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g. Win the Rising Star tier, improve my endgame, represent Nigeria..."
            value={formData.chessGoal}
            onChangeText={(text) => updateField("chessGoal", text)}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
            editable={!isLoading}
          />
        </View>

        {/* Discovery */}
        <View style={styles.fieldContainer}>
          <CustomDropdown
            label="How did you hear about this event?"
            value={formData.chessDiscovery}
            options={discoveryOptions}
            onSelect={(value) => updateField("chessDiscovery", value)}
            placeholder="Select source"
          />
        </View>

        {/* Info Card */}
        <View style={chessStyles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#203499"
          />
          <Text style={chessStyles.infoCardText}>
            Matches are played online. A link to the tournament platform will be
            sent to your email before the event starts.
          </Text>
        </View>
      </>
    );
  };

  //  DevDive (event id 24)
  const renderDevDiveFields = () => {
    const countries = [
      "Nigeria",
      "Ghana",
      "Kenya",
      "South Africa",
      "United States",
      "United Kingdom",
      "Canada",
      "Other",
    ];
    const fieldsOfInterest = ["Frontend Development"];
    const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

    return (
      <>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Full Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(text) => updateField("fullName", text)}
            placeholderTextColor="#999"
            editable={!isLoading}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Email Address <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            value={formData.email}
            onChangeText={(text) => updateField("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
            editable={!isLoading}
          />
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <Text style={styles.label}>
              Phone Number <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="+234..."
              value={formData.phoneNumber}
              onChangeText={(text) => updateField("phoneNumber", text)}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
              editable={!isLoading}
            />
          </View>

          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <CustomDropdown
              label="Country"
              value={formData.country}
              options={countries}
              onSelect={(value) => updateField("country", value)}
              placeholder="Select country"
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <CustomDropdown
              label="Field of Interest"
              value={formData.fieldOfInterest}
              options={fieldsOfInterest}
              onSelect={(value) => updateField("fieldOfInterest", value)}
              placeholder="Select field"
              required
            />
          </View>

          <View style={[styles.fieldContainer, styles.halfWidth]}>
            <CustomDropdown
              label="Experience Level"
              value={formData.experienceLevel}
              options={experienceLevels}
              onSelect={(value) => updateField("experienceLevel", value)}
              placeholder="Select level"
              required
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Programming Languages / Tools (if applicable)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., React, Python, Figma..."
            value={formData.programmingLanguages}
            onChangeText={(text) => updateField("programmingLanguages", text)}
            placeholderTextColor="#999"
            editable={!isLoading}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Why do you want to join this program?
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us about your motivation..."
            value={formData.motivation}
            onChangeText={(text) => updateField("motivation", text)}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
            editable={!isLoading}
          />
        </View>
      </>
    );
  };

  // Tech Webinar (event id 23)
  const renderTechWebinarFields = () => (
    <>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Experience Level <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.radioGroup}>
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.radioButton,
                formData.experienceLevel === level &&
                  styles.radioButtonSelected,
              ]}
              onPress={() => updateField("experienceLevel", level)}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.radioText,
                  formData.experienceLevel === level &&
                    styles.radioTextSelected,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Areas of Interest</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g., Web Development, Mobile Apps, AI/ML..."
          value={formData.areasOfInterest}
          onChangeText={(text) => updateField("areasOfInterest", text)}
          multiline
          numberOfLines={3}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>What do you hope to learn?</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Share your expectations..."
          value={formData.expectations}
          onChangeText={(text) => updateField("expectations", text)}
          multiline
          numberOfLines={3}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>
    </>
  );

  //  Conference/Hackathon (event id 22)
  const renderConferenceHackathonFields = () => (
    <>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Team Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your team name"
          value={formData.teamName}
          onChangeText={(text) => updateField("teamName", text)}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Team Members (Names & Roles)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g., John Doe - Developer, Jane Smith - Designer..."
          value={formData.teamMembers}
          onChangeText={(text) => updateField("teamMembers", text)}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Project Idea (Brief)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your project idea..."
          value={formData.projectIdea}
          onChangeText={(text) => updateField("projectIdea", text)}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Technical Skills</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="List your team's technical skills..."
          value={formData.technicalSkills}
          onChangeText={(text) => updateField("technicalSkills", text)}
          multiline
          numberOfLines={3}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>
    </>
  );

  //  Hackathon (event id 21)
  const renderHackathonFields = () => (
    <>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Your Role <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.radioGroup}>
          {["Frontend Dev", "Backend Dev", "UI/UX Designer", "Full Stack"].map(
            (role) => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.radioButton,
                  formData.role === role && styles.radioButtonSelected,
                ]}
                onPress={() => updateField("role", role)}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.radioText,
                    formData.role === role && styles.radioTextSelected,
                  ]}
                >
                  {role}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>GitHub Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="https://github.com/username"
          value={formData.githubProfile}
          onChangeText={(text) => updateField("githubProfile", text)}
          autoCapitalize="none"
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Portfolio URL</Text>
        <TextInput
          style={styles.input}
          placeholder="https://yourportfolio.com"
          value={formData.portfolioUrl}
          onChangeText={(text) => updateField("portfolioUrl", text)}
          autoCapitalize="none"
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Technical Skills <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="List your technical skills (e.g., React, Node.js, Python...)"
          value={formData.technicalSkills}
          onChangeText={(text) => updateField("technicalSkills", text)}
          multiline
          numberOfLines={3}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>
    </>
  );

  //  Health Innovation (event id 20)
  const renderHealthInnovationFields = () => (
    <>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Profession <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.radioGroup}>
          {[
            "Healthcare Professional",
            "Tech Innovator",
            "Researcher",
            "Student",
            "Other",
          ].map((prof) => (
            <TouchableOpacity
              key={prof}
              style={[
                styles.radioButton,
                formData.profession === prof && styles.radioButtonSelected,
              ]}
              onPress={() => updateField("profession", prof)}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.radioText,
                  formData.profession === prof && styles.radioTextSelected,
                ]}
              >
                {prof}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Organization / Institution</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your organization name"
          value={formData.organization}
          onChangeText={(text) => updateField("organization", text)}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Specialization / Area of Focus</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g., Digital Health, AI in Healthcare, Telemedicine..."
          value={formData.specialization}
          onChangeText={(text) => updateField("specialization", text)}
          multiline
          numberOfLines={3}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>
    </>
  );

  //  Entrepreneurial (event id 19)
  const renderEntrepreneurialFields = () => (
    <>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Business Stage <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.radioGroup}>
          {["Idea Stage", "Startup", "Growth Stage", "Established"].map(
            (stage) => (
              <TouchableOpacity
                key={stage}
                style={[
                  styles.radioButton,
                  formData.businessStage === stage &&
                    styles.radioButtonSelected,
                ]}
                onPress={() => updateField("businessStage", stage)}
                disabled={isLoading}
              >
                <Text
                  style={[
                    styles.radioText,
                    formData.businessStage === stage &&
                      styles.radioTextSelected,
                  ]}
                >
                  {stage}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Industry / Sector</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Technology, Healthcare, E-commerce..."
          value={formData.industry}
          onChangeText={(text) => updateField("industry", text)}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Current Challenges</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="What challenges are you facing in your business?"
          value={formData.challenges}
          onChangeText={(text) => updateField("challenges", text)}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>What do you hope to gain?</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Share your expectations from this webinar..."
          value={formData.expectations}
          onChangeText={(text) => updateField("expectations", text)}
          multiline
          numberOfLines={3}
          placeholderTextColor="#999"
          editable={!isLoading}
        />
      </View>
    </>
  );

  // ─ Route to correct event form
  const renderEventSpecificFields = () => {
    if (!selectedEvent) return null;
    const { id } = selectedEvent;

    if (id === 25) return renderChessFields();
    if (id === 24) return renderDevDiveFields();
    if (id === 23) return renderTechWebinarFields();
    if (id === 22) return renderConferenceHackathonFields();
    if (id === 21) return renderHackathonFields();
    if (id === 20) return renderHealthInnovationFields();
    if (id === 19) return renderEntrepreneurialFields();
    return null;
  };

  // Guard: no event

  if (!selectedEvent) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No event selected</Text>
      </View>
    );
  }

  const isChess = selectedEvent.id === 25;
  const isDevDive = selectedEvent.id === 24;

  const submitLabel = isChess
    ? "♟  Claim My Spot"
    : isDevDive
      ? "Submit Application"
      : "Submit Registration";

  // Render

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, isChess && chessStyles.chessHeader]}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          disabled={isLoading}
        >
          <Ionicons
            name="close"
            size={24}
            color={isChess ? "#ffffff" : "#000c3a"}
          />
        </TouchableOpacity>
        <Text
          style={[styles.headerTitle, isChess && chessStyles.chessHeaderTitle]}
        >
          {isChess
            ? "♟ Championship Registration"
            : isDevDive
              ? "DevDive Application"
              : "Event Registration"}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Scrollable Form */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={!isLoading}
      >
        {/* Chess uses its own hero banner; all other events show an info banner */}
        {!isChess && (
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{selectedEvent.title}</Text>
            <Text style={styles.eventDate}>{selectedEvent.date}</Text>
          </View>
        )}

        {isChess ? (
          <View style={styles.formSection}>{renderEventSpecificFields()}</View>
        ) : (
          <>
            {!isDevDive && (
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                {renderCommonFields()}
              </View>
            )}

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>
                {isDevDive
                  ? "Application Information"
                  : "Event-Specific Information"}
              </Text>
              {renderEventSpecificFields()}
            </View>

            {!isDevDive && (
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>
                  Additional Information (Optional)
                </Text>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Dietary Restrictions</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Any dietary restrictions or allergies?"
                    value={formData.dietaryRestrictions}
                    onChangeText={(text) =>
                      updateField("dietaryRestrictions", text)
                    }
                    placeholderTextColor="#999"
                    editable={!isLoading}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>
                    Special Needs / Accommodations
                  </Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Any special accommodations needed?"
                    value={formData.specialNeeds}
                    onChangeText={(text) => updateField("specialNeeds", text)}
                    multiline
                    numberOfLines={3}
                    placeholderTextColor="#999"
                    editable={!isLoading}
                  />
                </View>
              </View>
            )}
          </>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            isChess && chessStyles.chessSubmitButton,
            isLoading && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <RotatingSpinner size={20} color="#fff" delay={300} />
              <Text style={styles.submitButtonText}>Submitting...</Text>
            </View>
          ) : (
            <Text style={styles.submitButtonText}>{submitLabel}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Full-Screen Loader Overlay */}
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderContainer}>
            <RotatingSpinner size={40} color="#203499" delay={0} />
            <Text style={styles.loaderText}>
              {isChess
                ? "Securing your board..."
                : "Submitting your registration..."}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

// ─────────────────────────────────────────────────────────
// Chess-specific styles
// ─────────────────────────────────────────────────────────
const chessStyles = StyleSheet.create({
  chessHeader: {
    backgroundColor: "#000c3a",
    borderBottomColor: "#1a2a6c",
  },
  chessHeaderTitle: {
    color: "#ffffff",
  },
  heroBanner: {
    backgroundColor: "#000c3a",
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 28,
  },
  heroIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  heroSub: {
    fontSize: 13,
    color: "#C7D2FE",
    textAlign: "center",
    lineHeight: 20,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerLabel: {
    marginHorizontal: 12,
    fontSize: 13,
    fontWeight: "700",
    color: "#203499",
  },
  fieldHint: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
    marginBottom: 2,
  },
  tierContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 10,
  },
  tierCard: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    position: "relative",
  },
  tierIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  tierLabel: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4,
    textAlign: "center",
  },
  tierElo: {
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
    fontWeight: "500",
  },
  tierCheck: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  formatContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  formatCard: {
    width: "47%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  formatCardSelected: {
    borderColor: "#203499",
    backgroundColor: "#EEF2FF",
    borderWidth: 2,
  },
  formatIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  formatLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 2,
  },
  formatLabelSelected: {
    color: "#203499",
  },
  formatDesc: {
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "center",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#EEF2FF",
    borderRadius: 10,
    padding: 14,
    gap: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  infoCardText: {
    flex: 1,
    fontSize: 13,
    color: "#203499",
    lineHeight: 19,
    fontWeight: "500",
  },
  chessSubmitButton: {
    backgroundColor: "#000c3a",
  },
});

// ─────────────────────────────────────────────────────────
// Shared styles
// ─────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000c3a",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  eventInfo: {
    backgroundColor: "#C7D2FE",
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000c3a",
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: "#071D6A",
    fontWeight: "500",
  },
  formSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000c3a",
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  required: {
    color: "#EF4444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#F9FAFB",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  dropdownButtonText: {
    fontSize: 14,
    color: "#000",
  },
  dropdownPlaceholder: {
    color: "#999",
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  dropdownModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000c3a",
  },
  dropdownOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownOptionSelected: {
    backgroundColor: "#f0f4ff",
  },
  dropdownOptionText: {
    fontSize: 14,
    color: "#333",
  },
  dropdownOptionTextSelected: {
    color: "#203499",
    fontWeight: "600",
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  radioButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  radioButtonSelected: {
    backgroundColor: "#203499",
    borderColor: "#203499",
  },
  radioText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  radioTextSelected: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#203499",
    marginHorizontal: 16,
    marginTop: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.75,
    backgroundColor: "#4a5fa8",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  loaderContainer: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#000c3a",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
    marginTop: 40,
  },
});

export default EventRegistrationForm;
