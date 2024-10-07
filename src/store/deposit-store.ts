import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { NetworkItem, WithdrawDepositToken } from '@/types';

type DepositState = {
  token: WithdrawDepositToken | null;
  network: NetworkItem | null;
};

type DepositAction = {
  setToken: (token: DepositState['token']) => void;
  setNetwork: (network: DepositState['network']) => void;
  reset: () => void;
};

const depositStoreSlice: StateCreator<DepositState & DepositAction> = (set) => ({
  token: null,
  network: null,
  setToken: (token) => set({ token }),
  setNetwork: (network) => set({ network }),
  reset: () => set({ token: null, network: null }),
});

const persistedDepositStore = persist<DepositState & DepositAction>(depositStoreSlice, {
  name: 'deposit',
  storage: createJSONStorage(() => sessionStorage),
});

export const useDepositStore = create(persistedDepositStore);
