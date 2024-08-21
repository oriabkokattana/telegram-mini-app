import { create, StateCreator } from 'zustand';

type WithdrawState = {
  token: string | null;
  chain: string | null;
};

type WithdrawAction = {
  setToken: (firstName: WithdrawState['token']) => void;
  setChain: (lastName: WithdrawState['chain']) => void;
};

const withdrawStoreSlice: StateCreator<WithdrawState & WithdrawAction> = (set) => ({
  token: null,
  chain: null,
  setToken: (token) => set({ token }),
  setChain: (chain) => set({ chain }),
});

export const useWithdrawStore = create(withdrawStoreSlice);
