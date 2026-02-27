import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { locationSlice } from "./slice/location";
// Assuming the user slice is imported from a relative path
import { userSlice } from "./slice/user";
import { notificationsSlice } from "./slice/notifications";
import { membershipTierSlice } from "./slice/membershiptierslice";
import { eventSlice } from "./slice/eventSlice";
import { affiliatedAppsSlice } from "./slice/affiliatedAppsSlice";
import { internshipSlice } from "./slice/internshipSlice";
import droideventsReducer from "./slice/droideventsSlice"; // ADDED THIS

const rootReducer = combineReducers({
  // Add all your slice reducers here
  user: userSlice.reducer,
  location: locationSlice.reducer,
  notifications: notificationsSlice.reducer,
  membershipTier: membershipTierSlice.reducer,
  events: eventSlice.reducer,
  droidevents: droideventsReducer, // ADDED THIS
  affiliatedApps: affiliatedAppsSlice.reducer,
  internship: internshipSlice.reducer,
});

// 1. Configure the store using the root reducer directly.
export const store = configureStore({
  reducer: rootReducer,
});

// 2. Persistence objects (persistor) are removed.

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
