import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { customStorage } from '@/utils/cloud-storage';

type AutoSwapState = {
  enabled: boolean;
};

type AutoSwapAction = {
  toggleEnabled: () => void;
};

const autoSwapStoreSlice: StateCreator<AutoSwapState & AutoSwapAction> = (set) => ({
  enabled: false,
  toggleEnabled: () => set((state) => ({ enabled: !state.enabled })),
});

const persistedAutoSwapStore = persist<AutoSwapState & AutoSwapAction>(autoSwapStoreSlice, {
  name: 'auto-swap',
  storage: createJSONStorage(() => customStorage),
});

export const useAutoSwapStore = create(persistedAutoSwapStore);
