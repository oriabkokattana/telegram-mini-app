import { create, StateCreator } from 'zustand';

import { NetworkItem, WithdrawDepositToken } from '@/types';

type WithdrawState = {
  token: WithdrawDepositToken | null;
  network: NetworkItem | null;
};

type WithdrawAction = {
  setToken: (token: WithdrawState['token']) => void;
  setNetwork: (network: WithdrawState['network']) => void;
  reset: () => void;
};

const withdrawStoreSlice: StateCreator<WithdrawState & WithdrawAction> = (set) => ({
  token: null,
  network: null,
  setToken: (token) => set({ token }),
  setNetwork: (network) => set({ network }),
  reset: () => set({ token: null, network: null }),
});

export const useWithdrawStore = create(withdrawStoreSlice);
