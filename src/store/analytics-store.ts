import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

import { SignUpMethods } from '@/types';

type AnalyticsState = {
  signUpMethod: SignUpMethods;
};

type AnalyticsAction = {
  setSignUpMethod: (signUpMethod: AnalyticsState['signUpMethod']) => void;
};

const analyticsStoreSlice: StateCreator<AnalyticsState & AnalyticsAction> = (set) => ({
  signUpMethod: 'unknown',
  setSignUpMethod: (signUpMethod) => set({ signUpMethod }),
});

const persistedAnalyticsStore = persist<AnalyticsState & AnalyticsAction>(analyticsStoreSlice, {
  name: 'analytics',
});

export const useAnalyticsStore = create(persistedAnalyticsStore);
