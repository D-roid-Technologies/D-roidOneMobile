import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event {
  id: string | number;
  title: string;
  date: string;
  image: any;
  category: string;
  author: string;
  authorAvatar: string;
  content: string[];
  featured?: boolean;
  isInternship?: boolean;
  registrationData?: any;
  registeredAt?: string;
}

interface DroidEventsState {
  registeredEvents: Event[];
}

const initialState: DroidEventsState = {
  registeredEvents: [],
};

const droideventsSlice = createSlice({
  name: "droidevents",
  initialState,
  reducers: {
    addRegisteredEvent: (state, action: PayloadAction<Event>) => {
      // Check if event is already registered to avoid duplicates
      const existingEvent = state.registeredEvents.find(
        (e) => e.id === action.payload.id
      );

      if (!existingEvent) {
        state.registeredEvents.push(action.payload);
      }
    },
    removeRegisteredEvent: (
      state,
      action: PayloadAction<{ id: string | number }>
    ) => {
      state.registeredEvents = state.registeredEvents.filter(
        (e) => e.id !== action.payload.id
      );
    },
    clearRegisteredEvents: (state) => {
      state.registeredEvents = [];
    },
  },
});

export const {
  addRegisteredEvent,
  removeRegisteredEvent,
  clearRegisteredEvents,
} = droideventsSlice.actions;

export default droideventsSlice.reducer;
