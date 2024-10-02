import { create, StateCreator } from 'zustand';
import { ETimeframe } from '@/enums';

type TimeframeState = {
  balanceTimeframe: ETimeframe;
};

type TimeframeAction = {
  setBalanceTimeframe: (timeframe: ETimeframe) => void;
};

const timeframeStoreSlice: StateCreator<TimeframeState & TimeframeAction> = (set) => ({
  balanceTimeframe: ETimeframe.d,
  setBalanceTimeframe: (timeframe) => set({ balanceTimeframe: timeframe }),
});

export const useTimeframeStore = create(timeframeStoreSlice);
