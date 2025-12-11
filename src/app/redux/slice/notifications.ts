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
    isLoading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    isLoading: false,
    error: null,
};

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
            // Return default notifications if none stored
            return [
                {
                    id: "1",
                    message: "Your appointment with Dr. Smith is tomorrow at 10:00 AM.",
                    isRead: false,
                },
                {
                    id: "2",
                    message: "Daily reminder: Take your morning medication.",
                    isRead: false,
                },
                {
                    id: "3",
                    message: "Your prescription has been refilled and is ready for pickup.",
                    isRead: true,
                },
            ];
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

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        // Pure reducers without side effects
        addNotification: (state, action: PayloadAction<NotificationItem>) => {
            state.notifications.unshift(action.payload);
        },

        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
        },

        clearNotifications: (state) => {
            state.notifications = [];
        },

        markNotificationAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find((n) => n.id === action.payload);
            if (notification) {
                notification.isRead = true;
            }
        },

        markAllAsRead: (state) => {
            // Optimize: only update if there are unread notifications
            const hasUnread = state.notifications.some((n) => !n.isRead);
            if (hasUnread) {
                state.notifications.forEach((n) => {
                    n.isRead = true;
                });
            }
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
