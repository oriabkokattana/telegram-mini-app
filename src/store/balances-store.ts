import { create, StateCreator } from 'zustand';

import { BalanceItem } from '@/types';

type BalancesState = {
  pnl_percent: string;
  pnl_usd: string;
  total_balance_usd: string;
  balances: Record<string, { currency_name: string; total_balance: BalanceItem }>;
};

type BalancesAction = {
  setBalances: (balances: BalancesState) => void;
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
  pnl_percent: '0',
  pnl_usd: '0',
  total_balance_usd: '0',
  balances: {},
  setBalances: (balances) => set({ ...balances }),
  getTotalBalanceByToken: (token) => {
    if (!token) {
      return 0;
    }
    return Number(get().balances[token]?.total_balance.balance || 0);
  },
  getTotalUSDBalanceByToken: (token) => {
    if (!token) {
      return 0;
    }
    return Number(get().balances[token]?.total_balance.balance_usd || 0);
  },
  getActualBalanceByToken: (token) => {
    if (!token) {
      return 0;
    }
    const tokenBalance = get().balances[token];
    const total = Number(tokenBalance?.total_balance.balance || 0);
    const reserved = Number(tokenBalance?.total_balance.reserved_balance || 0);
    return total - reserved;
  },
  getActualUSDBalanceByToken: (token) => {
    if (!token) {
      return 0;
    }
    const tokenBalance = get().balances[token];
    const total = Number(tokenBalance?.total_balance.balance_usd || 0);
    const reserved = Number(tokenBalance?.total_balance.reserved_balance_usd || 0);
    return total - reserved;
  },
  getTotalBalanceByTokenAndChain: () => {
    return 0;
  },
  getTotalUSDBalanceByTokenAndChain: () => {
    return 0;
  },
  getActualBalanceByTokenAndChain: () => {
    return 0;
  },
  getActualUSDBalanceByTokenAndChain: () => {
    return 0;
  },
});

export const useBalancesStore = create(balancesStoreSlice);
