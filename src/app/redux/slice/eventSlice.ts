// redux/slice/eventSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type EventType =

    // | "Reminder"
    | "Note"
    | "Task"
    | "Appointment"
    | "Meeting"
// | "Deadline"
// | "Call"
// | "Birthday"
// | "Holiday";

export interface Event {
    id: string;
    type: EventType;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;

    // Optional fields depending on event type
    location?: string;
    participants?: string[];   // Meeting / Appointment
    taskStatus?: "pending" | "in-progress" | "completed"; // Task-specific
    taskPriority?: "low" | "medium" | "high"; // Task-specific
    noteItems?: string[]; // Notes
}


interface EventState {
    events: Event[];
}


const initialState: EventState = {
    events: [],
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        // Add a new event
        addEvent: (state, action: PayloadAction<Event>) => {
            state.events.push(action.payload);
        },

        // Update an existing event
        updateEvent: (state, action: PayloadAction<Event>) => {
            const index = state.events.findIndex((e) => e.id === action.payload.id);
            if (index !== -1) state.events[index] = action.payload;
        },

        // Delete an event
        deleteEvent: (state, action: PayloadAction<string>) => {
            state.events = state.events.filter((e) => e.id !== action.payload);
        },

        // Replace all events (useful for initial load)
        setEvents: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload;
        },
    },
});

export const { addEvent, updateEvent, deleteEvent, setEvents } = eventSlice.actions;

// Selector
export const selectEvents = (state: any): Event[] => state.event.events;

export default eventSlice.reducer;
