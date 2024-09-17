import { create, StateCreator } from 'zustand';

import { BalanceItem } from '@/types';

type BalancesState = {
  balances: Record<
    string,
    { total_balance: BalanceItem; network_balances: Record<string, BalanceItem> }
  >;
};

type BalancesAction = {
  setBalances: (balances: BalancesState['balances']) => void;
  getBalanceByToken: (token: string) => BalanceItem | undefined;
  getBalanceByTokenAndChain: (token: string, chain: string) => BalanceItem | undefined;
};

const balancesStoreSlice: StateCreator<BalancesState & BalancesAction> = (set, get) => ({
  balances: {},
  setBalances: (balances) => set({ balances }),
  getBalanceByToken: (token) => get().balances[token]?.total_balance,
  getBalanceByTokenAndChain: (token, chain) => get().balances[token]?.network_balances[chain],
});

export const useBalancesStore = create(balancesStoreSlice);
