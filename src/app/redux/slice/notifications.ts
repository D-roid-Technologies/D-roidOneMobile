import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: "appointment" | "reminder" | "prescription" | "general";
    read: boolean;
    timestamp: string;
    relatedLink?: string;
    priority?: "low" | "medium" | "high";
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [
        {
            id: "1",
            title: "Appointment Reminder",
            message: "Your appointment with Dr. John Smith at Riverside Clinic is scheduled for tomorrow, December 10th, 2025, at 10:00 AM. Please arrive 10 minutes early and bring your insurance card.",
            type: "appointment",
            read: false,
            timestamp: "2025-12-09T08:00:00Z",
            relatedLink: "/appointments/12345",
            priority: "high",
        },
        {
            id: "2",
            title: "Medication Reminder",
            message: "Daily reminder: Take your morning medication, Metformin 500mg, with a full glass of water. Remember to check your blood sugar before taking it.",
            type: "reminder",
            read: false,
            timestamp: "2025-12-09T07:30:00Z",
            relatedLink: "/medications/6789",
            priority: "medium",
        },
        {
            id: "3",
            title: "Prescription Ready",
            message: "Your prescription for Lisinopril 10mg has been refilled and is ready for pickup at Riverside Pharmacy. You can pick it up anytime between 9:00 AM and 6:00 PM today.",
            type: "prescription",
            read: true,
            timestamp: "2025-12-08T16:45:00Z",
            relatedLink: "/prescriptions/98765",
            priority: "low",
        },
    ],
};

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.push(action.payload);

            // Save to async storage
            AsyncStorage.setItem(
                "notifications",
                JSON.stringify(state.notifications)
            );
        },

        loadNotifications: (state) => {
            // Load async (must be awaited in component)
            // console.warn("loadNotifications must be called from a component with await");
        },

        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
        },

        clearNotifications: (state) => {
            state.notifications = [];
            AsyncStorage.setItem("notifications", JSON.stringify([]));
        },
    },
});

export const { addNotification, loadNotifications, clearNotifications, setNotifications }
    = notificationsSlice.actions;

export default notificationsSlice.reducer;