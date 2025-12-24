import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFICATIONS_STORAGE_KEY = "notifications";

export interface NotificationItem {
    id: string;
    title?: string;
    message: string;
    date?: string;
    time?: string;
    type?: "success" | "error" | "info";
    isRead: boolean;
}

interface NotificationState {
    notifications: NotificationItem[];
    unreadCount: number;
    isLoading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
};

const registrationTime = new Date();

// Async Thunks for AsyncStorage operations
export const loadNotifications = createAsyncThunk(
    "notifications/loadNotifications",
    async (_, { rejectWithValue }) => {
        try {
            const stored = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as NotificationItem[];
                return parsed;
            }
            return [
                {
                    id: "1",
                    title: "Welcome to D'roid One",
                    message: "We're excited to have you onboard! Explore features and get started.",
                    date: registrationTime.toLocaleDateString("en-GB"), // DD/MM/YYYY
                    time: registrationTime.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }), // HH:MM
                    isRead: false,
                },
                {
                    id: "2",
                    title: "Complete Your Personal Details",
                    message: "Please complete your personal details and finish onboarding if necessary.",
                    date: registrationTime.toLocaleDateString("en-GB"),
                    time: registrationTime.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }),
                    isRead: false,
                },
                
            ] as NotificationItem[]

        } catch (error) {
            console.error("Failed to load notifications:", error);
            return rejectWithValue("Failed to load notifications");
        }
    }
);

export const persistNotifications = createAsyncThunk(
    "notifications/persistNotifications",
    async (notifications: NotificationItem[], { rejectWithValue }) => {
        try {
            await AsyncStorage.setItem(
                NOTIFICATIONS_STORAGE_KEY,
                JSON.stringify(notifications)
            );
            return notifications;
        } catch (error) {
            console.error("Failed to persist notifications:", error);
            return rejectWithValue("Failed to save notifications");
        }
    }
);

const countUnread = (notifications: NotificationItem[]) =>
    notifications.filter(n => !n.isRead).length;

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<NotificationItem>) => {
            state.notifications.unshift(action.payload);

            if (!action.payload.isRead) {
                state.unreadCount += 1;
            }
        },

        setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
            state.notifications = action.payload;
            state.unreadCount = countUnread(action.payload);
        },

        clearNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
        },

        markNotificationAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(
                n => n.id === action.payload
            );

            if (notification && !notification.isRead) {
                notification.isRead = true;
                state.unreadCount -= 1;
            }
        },

        markAllAsRead: (state) => {
            state.notifications.forEach(n => {
                n.isRead = true;
            });

            state.unreadCount = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // Load notifications
            .addCase(loadNotifications.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notifications = action.payload;
                state.unreadCount = countUnread(action.payload);
            })
            .addCase(loadNotifications.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Persist notifications
            .addCase(persistNotifications.pending, (state) => {
                state.error = null;
            })
            .addCase(persistNotifications.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const {
    addNotification,
    setNotifications,
    clearNotifications,
    markNotificationAsRead,
    markAllAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
