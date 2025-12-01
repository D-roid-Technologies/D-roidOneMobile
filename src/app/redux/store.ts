import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { locationSlice } from "./slice/location";
// Assuming the user slice is imported from a relative path
import { userSlice } from "./slice/user";
import { notificationsSlice } from "./slice/notifications";

const rootReducer = combineReducers({
    // Add all your slice reducers here
    user: userSlice.reducer,
    location: locationSlice.reducer,
    notifictions: notificationsSlice.reducer
});

// 1. Configure the store using the root reducer directly.
export const store = configureStore({
    reducer: rootReducer,
    // Note: The default middleware is used, and no custom serializableCheck is required.
});

// 2. Persistence objects (persistor) are removed.

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;