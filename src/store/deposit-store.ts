import { create, StateCreator } from 'zustand';

type DepositState = {
  token: string | null;
  chain: string | null;
};

type DepositAction = {
  setToken: (firstName: DepositState['token']) => void;
  setChain: (lastName: DepositState['chain']) => void;
};

const withdrawStoreSlice: StateCreator<DepositState & DepositAction> = (set) => ({
  token: null,
  chain: null,
  setToken: (token) => set({ token }),
  setChain: (chain) => set({ chain }),
});

export const useDepositStore = create(withdrawStoreSlice);
