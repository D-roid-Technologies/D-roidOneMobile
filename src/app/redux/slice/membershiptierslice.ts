import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MembershipTierState = {
  tier: string;
  nextTier?: string;
  totalHours: number;
  progressPercentage: number;
};

const initialState: MembershipTierState = {
  tier: "Silver",
  nextTier: "Gold",
  totalHours: 0,
  progressPercentage: 33,
};

export const membershipTierSlice = createSlice({
  name: "membershipTier",
  initialState,
  reducers: {
    setTier: (state, action: PayloadAction<string>) => {
      state.tier = action.payload;
    },
    setNextTier: (state, action: PayloadAction<string | undefined>) => {
      state.nextTier = action.payload;
    },

    // ➤ Add hours to user's total tracked time
    addHours: (state, action: PayloadAction<number>) => {
      state.totalHours += action.payload;
    },

    // ➤ Set progress percentage (0–100)
    setProgressPercentage: (state, action: PayloadAction<number>) => {
      const p = action.payload;
      state.progressPercentage = Math.max(0, Math.min(100, p)); // clamps to 0–100
    },

    resetTier: () => {
      return {
        tier: "Silver",
        nextTier: "Gold",
        totalHours: 0,
        progressPercentage: 0,
      };
    },
  },
});

export const {
  setTier,
  setNextTier,
  resetTier,
  addHours,
  setProgressPercentage,
} = membershipTierSlice.actions;

export const selectMembershipTier = (state: any): MembershipTierState =>
  state.membershipTier;

export default membershipTierSlice.reducer;