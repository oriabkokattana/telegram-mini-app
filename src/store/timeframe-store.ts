import { create, StateCreator } from 'zustand';
import { EPeriod, ETimeframe } from '@/enums';

const periodToTimeframe = (period: EPeriod) => {
  switch (period) {
    case EPeriod.day:
      return ETimeframe.d;
    case EPeriod.all:
      return ETimeframe.y;
    default:
      return ETimeframe.d;
  }
};

type TimeframeState = {
  balanceTimeframe: ETimeframe;
};

type TimeframeAction = {
  setBalanceTimeframe: (timeframe: ETimeframe) => void;
  setBalanceTimeframeViaPeriod: (period: EPeriod) => void;
};

const timeframeStoreSlice: StateCreator<TimeframeState & TimeframeAction> = (set) => ({
  balanceTimeframe: ETimeframe.d,
  setBalanceTimeframe: (timeframe) => set({ balanceTimeframe: timeframe }),
  setBalanceTimeframeViaPeriod: (period) => set({ balanceTimeframe: periodToTimeframe(period) }),
});

export const useTimeframeStore = create(timeframeStoreSlice);
