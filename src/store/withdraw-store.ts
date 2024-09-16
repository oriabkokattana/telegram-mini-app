import { create, StateCreator } from 'zustand';

import { ChainItem, TokenItem } from '@/types';

type WithdrawState = {
  token: TokenItem | null;
  chain: ChainItem | null;
};

type WithdrawAction = {
  setToken: (token: WithdrawState['token']) => void;
  setChain: (chain: WithdrawState['chain']) => void;
};

const withdrawStoreSlice: StateCreator<WithdrawState & WithdrawAction> = (set) => ({
  token: null,
  chain: null,
  setToken: (token) => set({ token }),
  setChain: (chain) => set({ chain }),
});

export const useWithdrawStore = create(withdrawStoreSlice);
