import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";

const PartnerWithDroid: React.FC = ({ navigation }: any) => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        partnershipType: "",
        country: "",
        website: "",
        experienceYears: "",
        budgetRange: "",
        message: "",
    });

    const handleChange = (key: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const partnerRequest = {
            ...form,
            submittedAt: new Date().toISOString(),
        };

        console.log("Partner with D'roid submission:", partnerRequest);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={26} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.header}>Partner with D'roid</Text>
            </View>

            {/* Form */}
            <KeyboardAwareScrollView
                contentContainerStyle={styles.formContent}
                showsVerticalScrollIndicator={false}
                enableOnAndroid
                extraScrollHeight={120}
            >
                <Text style={styles.subtitle}>
                    Tell us about yourself and how you’d like to partner with D'roid.
                </Text>

                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={form.fullName}
                    onChangeText={(v) => handleChange("fullName", v)}
                />

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    value={form.email}
                    onChangeText={(v) => handleChange("email", v)}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={form.phone}
                    onChangeText={(v) => handleChange("phone", v)}
                />

                <Text style={styles.label}>Company / Brand Name</Text>
                <TextInput
                    style={styles.input}
                    value={form.companyName}
                    onChangeText={(v) => handleChange("companyName", v)}
                />

                <Text style={styles.label}>Partnership Type</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={form.partnershipType}
                        onValueChange={(v) => handleChange("partnershipType", v)}
                    >
                        <Picker.Item label="Select partnership type" value="" />
                        <Picker.Item label="Technology Partner" value="technology" />
                        <Picker.Item label="Content Partner" value="content" />
                        <Picker.Item label="Sponsor" value="sponsor" />
                        <Picker.Item label="Reseller" value="reseller" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>

                <Text style={styles.label}>Country</Text>
                <TextInput
                    style={styles.input}
                    value={form.country}
                    onChangeText={(v) => handleChange("country", v)}
                />

                <Text style={styles.label}>Website / App URL</Text>
                <TextInput
                    style={styles.input}
                    value={form.website}
                    onChangeText={(v) => handleChange("website", v)}
                />

                <Text style={styles.label}>Years of Experience</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={form.experienceYears}
                    onChangeText={(v) => handleChange("experienceYears", v)}
                />

                <Text style={styles.label}>Estimated Budget Range</Text>
                <TextInput
                    style={styles.input}
                    value={form.budgetRange}
                    onChangeText={(v) => handleChange("budgetRange", v)}
                />

                <Text style={styles.label}>Message / Proposal</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    multiline
                    numberOfLines={4}
                    value={form.message}
                    onChangeText={(v) => handleChange("message", v)}
                />
            </KeyboardAwareScrollView>

            {/* Fixed Bottom Button */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Submit Partnership Request</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PartnerWithDroid;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000105",
    },

    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 20,
    },

    header: {
        fontSize: 24,
        fontWeight: "900",
        color: "#ffffff",
    },

    subtitle: {
        fontSize: 14,
        color: "#CBD5E1",
        marginBottom: 20,
    },

    formContent: {
        paddingHorizontal: 20,
        paddingBottom: 140,
    },

    label: {
        fontSize: 13,
        fontWeight: "700",
        color: "#CBD5E1",
        marginBottom: 6,
    },

    input: {
        backgroundColor: "#C7D2FE",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        fontWeight: "600",
        color: "#000105",
        marginBottom: 14,
    },

    pickerWrapper: {
        backgroundColor: "#C7D2FE",
        borderRadius: 10,
        marginBottom: 14,
        overflow: "hidden",
    },

    textArea: {
        height: 100,
        textAlignVertical: "top",
    },

    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#1E293B",
        backgroundColor: "#000105",
    },

    submitButton: {
        backgroundColor: "#4F46E5",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },

    submitText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "900",
    },
});