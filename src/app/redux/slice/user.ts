import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../constants/TypesAndInerface";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "@user_data";

const initialState: UserType = {
    firstName: "",
    lastName: "",
    middleName: "",
    initials: "",
    userType: "",
    uniqueId: "",
    staffId: "",
    email: "",
    phone: "",
    agreeToPolicy: false,
    isLoggedIn: false,
    gender: "",
    dateOfBirth: "",
    disability: false,
    disabilityType: "",
    photoUrl: "",
    educationalLevel: "",
    referralName: "",
    secondaryEmail: "",
    securityQuestion: "",
    securityAnswer: "",
    verifiedEmail: false,
    verifyPhoneNumber: false,
    agreedToTerms: false,
    twoFactorSettings: false,
    password: "",
    role: "",
    streetNumber: "",
    streetName: "",
    city: "",
    state: "",
    country: "",
    organisationalType: "",
    isCompanyRegistered: "",
    dateOfRegistration: "",
    skills: [],
    certifications: [],
    accessLevel: "",
    permissions: [],
    notificationPreferences: {
        email: true,
    },

    // Essential fields for Staff Homepage
    position: "",
    department: "",
    employeeId: "",
    joinDate: "",
    performanceScore: 0,
    attendanceRate: 0,
    trainingProgress: 0,
    activeTasks: 0,
    employmentStatus: "",
    workLocation: "",
};

// Helper function to persist data
const saveUserToStorage = async (userData: UserType) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
        console.error("Failed to save user data to storage:", error);
    }
};

// Helper function to load data from storage
export const loadUserFromStorage = async (): Promise<UserType> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error("Failed to load user data from storage:", error);
    }
    return initialState;
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<Partial<UserType>>) {
            const updatedState = { ...state, ...action.payload };
            saveUserToStorage(updatedState); // persist
            return updatedState;
        },

        updateStaffInfo(
            state,
            action: PayloadAction<{
                position?: string;
                department?: string;
                employeeId?: string;
                joinDate?: string;
                employmentStatus?: string;
                workLocation?: string;
            }>
        ) {
            const updatedState = { ...state, ...action.payload };
            saveUserToStorage(updatedState);
            return updatedState;
        },

        updatePerformanceMetrics(
            state,
            action: PayloadAction<{
                performanceScore?: number;
                attendanceRate?: number;
                trainingProgress?: number;
                activeTasks?: number;
            }>
        ) {
            const updatedState = { ...state, ...action.payload };
            saveUserToStorage(updatedState);
            return updatedState;
        },

        updateNotificationPreferences(
            state,
            action: PayloadAction<
                Partial<typeof initialState.notificationPreferences>
            >
        ) {
            state.notificationPreferences = {
                ...state.notificationPreferences,
                ...action.payload,
            };
            saveUserToStorage(state);
        },

        addSkill(state, action: PayloadAction<string>) {
            if (!state.skills.includes(action.payload)) {
                state.skills.push(action.payload);
            }
            saveUserToStorage(state);
        },

        removeSkill(state, action: PayloadAction<string>) {
            state.skills = state.skills.filter((skill) => skill !== action.payload);
            saveUserToStorage(state);
        },

        addCertification(state, action: PayloadAction<string>) {
            if (!state.certifications.includes(action.payload)) {
                state.certifications.push(action.payload);
            }
            saveUserToStorage(state);
        },

        removeCertification(state, action: PayloadAction<string>) {
            state.certifications = state.certifications.filter(
                (cert) => cert !== action.payload
            );
            saveUserToStorage(state);
        },

        updateAccessLevel(
            state,
            action: PayloadAction<{
                accessLevel: string;
                permissions: string[];
            }>
        ) {
            state.accessLevel = action.payload.accessLevel;
            state.permissions = action.payload.permissions;
            saveUserToStorage(state);
        },

        logoutUser() {
            AsyncStorage.removeItem(STORAGE_KEY); // clear storage on logout
            return { ...initialState };
        },
    },
});

export const {
    setUser,
    updateStaffInfo,
    updatePerformanceMetrics,
    updateNotificationPreferences,
    addSkill,
    removeSkill,
    addCertification,
    removeCertification,
    updateAccessLevel,
    logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
