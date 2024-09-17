import { create, StateCreator } from 'zustand';

import { ChainItem, TokenItem } from '@/types';

type DepositState = {
  token: TokenItem | null;
  chain: ChainItem | null;
};

type DepositAction = {
  setToken: (token: DepositState['token']) => void;
  setChain: (chain: DepositState['chain']) => void;
};

const depositStoreSlice: StateCreator<DepositState & DepositAction> = (set) => ({
  token: null,
  chain: null,
  setToken: (token) => set({ token }),
  setChain: (chain) => set({ chain }),
});

export const useDepositStore = create(depositStoreSlice);
