import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export type MembershipTierState = {
  tier: string;
  nextTier?: string;
  totalHours: number;
  progressPercentage: number;
  status: string,
  desc: string
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
    setTier: (state, action: PayloadAction<string>) => {
      state.tier = action.payload;
    },
    setNextTier: (state, action: PayloadAction<string | undefined>) => {
      state.nextTier = action.payload;
    },

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
        progressPercentage: 33,
        status: "Active",
        desc: "You are making great progress on your membership journey."
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