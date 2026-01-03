import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InternshipApplication {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    educationLevel: string;
    institution: string;
    fieldOfStudy: string;
    graduationYear: string;
    desiredDepartment: string;
    startDate: string;
    duration: string;
    coverLetter: string;
    resumeUrl?: string;
    skills: string[];
    applicationStatus: "pending" | "under-review" | "accepted" | "rejected";
    submittedAt: string;
}

interface InternshipState {
    applications: InternshipApplication[];
}

const initialState: InternshipState = {
    applications: [],
};

export const internshipSlice = createSlice({
    name: "internship",
    initialState,
    reducers: {
        submitInternshipApplication: (state, action: PayloadAction<InternshipApplication>) => {
            state.applications.push(action.payload);
            // console.log("📝 Internship Application Submitted:", action.payload);
        },

        updateInternshipApplication: (state, action: PayloadAction<InternshipApplication>) => {
            const index = state.applications.findIndex((app) => app.id === action.payload.id);
            if (index !== -1) {
                state.applications[index] = action.payload;
                // console.log("✏️ Internship Application Updated:", action.payload);
            }
        },

        deleteInternshipApplication: (state, action: PayloadAction<string>) => {
            state.applications = state.applications.filter((app) => app.id !== action.payload);
            // console.log("🗑️ Internship Application Deleted - ID:", action.payload);
        },

        setInternshipApplications: (state, action: PayloadAction<InternshipApplication[]>) => {
            state.applications = action.payload;
        },

        updateApplicationStatus: (
            state,
            action: PayloadAction<{ id: string; status: "pending" | "under-review" | "accepted" | "rejected" }>
        ) => {
            const application = state.applications.find((app) => app.id === action.payload.id);
            if (application) {
                application.applicationStatus = action.payload.status;
                // console.log(`🔄 Application ${action.payload.id} status updated to: ${action.payload.status}`);
            }
        },
    },
});

export const {
    submitInternshipApplication,
    updateInternshipApplication,
    deleteInternshipApplication,
    setInternshipApplications,
    updateApplicationStatus,
} = internshipSlice.actions;

export const selectInternshipApplications = (state: any): InternshipApplication[] =>
    state.internship.applications;

export default internshipSlice.reducer;
