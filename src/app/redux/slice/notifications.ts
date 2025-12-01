import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NotificationItem {
    id: string;
    message: string;
    read: boolean;
}

interface NotificationState {
    notifications: NotificationItem[];
}

const initialState: NotificationState = {
    notifications: [
        {
            id: "1",
            message: "Your appointment with Dr. Smith is tomorrow at 10:00 AM.",
            read: false,
        },
        {
            id: "2",
            message: "Daily reminder: Take your morning medication.",
            read: false,
        },
        {
            id: "3",
            message: "Your prescription has been refilled and is ready for pickup.",
            read: true,
        },
    ],
};

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<NotificationItem>) => {
            state.notifications.push(action.payload);

            // Save to async storage
            AsyncStorage.setItem(
                "notifications",
                JSON.stringify(state.notifications)
            );
        },

        loadNotifications: (state) => {
            // Load async (must be awaited in component)
            console.warn("loadNotifications must be called from a component with await");
        },

        setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
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