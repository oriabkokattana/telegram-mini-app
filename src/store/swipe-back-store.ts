import { create, StateCreator } from 'zustand';

type SwipeBackState = {
  enabled: boolean;
};

type SwipeBackAction = {
  setSwipeBackEnabled: (enabled: SwipeBackState['enabled']) => void;
};

const swipeBackStoreSlice: StateCreator<SwipeBackState & SwipeBackAction> = (set) => ({
  enabled: true,
  setSwipeBackEnabled: (enabled) => set({ enabled }),
});

export const useSwipeBackStore = create(swipeBackStoreSlice);
