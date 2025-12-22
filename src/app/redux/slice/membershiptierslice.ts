import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the valid tiers
export type TierType = "Silver" | "Gold" | "Premium";

export type MembershipTierState = {
  tier: TierType;
  nextTier?: TierType;
  totalHours: number;
  progressPercentage: number;
  status: string;
  desc: string;
};

const initialState: MembershipTierState = {
  tier: "Silver",
  nextTier: "Gold",
  totalHours: 0,
  progressPercentage: 33,
  status: "Active",
  desc: "You are making great progress on your membership journey."
};

export const membershipTierSlice = createSlice({
  name: "membershipTier",
  initialState,
  reducers: {
    // Modified to accept TierType
    setTier: (state, action: PayloadAction<TierType>) => {
      state.tier = action.payload;
      // Logic to automatically set the next tier based on the current one
      if (action.payload === "Silver") state.nextTier = "Gold";
      else if (action.payload === "Gold") state.nextTier = "Premium";
      else state.nextTier = undefined; // Premium is max
    },

    addHours: (state, action: PayloadAction<number>) => {
      // 1. Add the small increment (e.g., 0.00027) to the current total
      const updatedTotal = state.totalHours + action.payload;

      // 2. Store with high precision (5 decimal places)
      // This ensures small increments aren't rounded down to zero immediately.
      state.totalHours = Number(updatedTotal.toFixed(5));
    },

    setProgressPercentage: (state, action: PayloadAction<number>) => {
      state.progressPercentage = Math.max(0, Math.min(100, action.payload));
    },

    resetTier: () => initialState,
  },
});

export const {
  setTier,
  resetTier,
  addHours,
  setProgressPercentage,
} = membershipTierSlice.actions;

export const selectMembershipTier = (state: any): MembershipTierState =>
  state.membershipTier;

export default membershipTierSlice.reducer;