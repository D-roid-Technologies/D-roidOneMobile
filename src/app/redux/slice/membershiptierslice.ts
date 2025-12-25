import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the valid tiers
export type TierType = "Silver" | "Gold" | "Platinum";

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
    setTier: (state, action: PayloadAction<any>) => {
      const {
        tier,
        nextTier,
        progressPercentage,
        status,
        desc,
      } = action.payload;

      state.tier = tier;
      state.nextTier = nextTier;
      state.progressPercentage = progressPercentage;
      state.status = status;
      state.desc = desc;
    },

    addHours: (state, action: PayloadAction<number>) => {
      const updatedTotal = state.totalHours + action.payload;
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