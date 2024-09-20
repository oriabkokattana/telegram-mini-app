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
  getTotalBalanceByToken: (token?: string) => number;
  getTotalUSDBalanceByToken: (token?: string) => number;
  getActualBalanceByToken: (token?: string) => number;
  getActualUSDBalanceByToken: (token?: string) => number;
  getTotalBalanceByTokenAndChain: (token?: string, chain?: string) => number;
  getTotalUSDBalanceByTokenAndChain: (token?: string, chain?: string) => number;
  getActualBalanceByTokenAndChain: (token?: string, chain?: string) => number;
  getActualUSDBalanceByTokenAndChain: (token?: string, chain?: string) => number;
};

const balancesStoreSlice: StateCreator<BalancesState & BalancesAction> = (set, get) => ({
  balances: {},
  setBalances: (balances) => set({ balances }),
  getTotalBalanceByToken: (token) => {
    if (!token) {
      return 0;
    }
    return get().balances[token]?.total_balance.balance || 0;
  },
  getTotalUSDBalanceByToken: (token) => {
    if (!token) {
      return 0;
    }
    return get().balances[token]?.total_balance.balance_usd || 0;
  },
  getActualBalanceByToken: (token) => {
    if (!token) {
      return 0;
    }
    const tokenBalance = get().balances[token];
    const total = tokenBalance?.total_balance.balance || 0;
    const reserved = tokenBalance?.total_balance.reserved_balance || 0;
    return total - reserved;
  },
  getActualUSDBalanceByToken: (token) => {
    if (!token) {
      return 0;
    }
    const tokenBalance = get().balances[token];
    const total = tokenBalance?.total_balance.balance_usd || 0;
    const reserved = tokenBalance?.total_balance.reserved_balance_usd || 0;
    return total - reserved;
  },
  getTotalBalanceByTokenAndChain: (token, chain) => {
    if (!token || !chain) {
      return 0;
    }
    return get().balances[token]?.network_balances[chain]?.balance || 0;
  },
  getTotalUSDBalanceByTokenAndChain: (token, chain) => {
    if (!token || !chain) {
      return 0;
    }
    return get().balances[token]?.network_balances[chain]?.balance_usd || 0;
  },
  getActualBalanceByTokenAndChain: (token, chain) => {
    if (!token || !chain) {
      return 0;
    }
    const tokenWithChainBalance = get().balances[token]?.network_balances[chain];
    const total = tokenWithChainBalance?.balance || 0;
    const reserved = tokenWithChainBalance?.reserved_balance || 0;
    return total - reserved;
  },
  getActualUSDBalanceByTokenAndChain: (token, chain) => {
    if (!token || !chain) {
      return 0;
    }
    const tokenWithChainBalance = get().balances[token]?.network_balances[chain];
    const total = tokenWithChainBalance?.balance_usd || 0;
    const reserved = tokenWithChainBalance?.reserved_balance_usd || 0;
    return total - reserved;
  },
});

export const useBalancesStore = create(balancesStoreSlice);
