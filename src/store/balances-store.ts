import { create, StateCreator } from 'zustand';

import { BalanceItem } from '@/types';

type BalancesState = {
  pnl_percent: string;
  pnl_usd: string;
  total_balance_usd: string;
  balances: Record<
    string,
    { currency_name: string; precision: number; total_balance: BalanceItem }
  >;
  balancesLoading: boolean;
};

type BalancesAction = {
  setBalances: (balances: Omit<BalancesState, 'balancesLoading'>) => void;
  setBalancesLoading: (balancesLoading: BalancesState['balancesLoading']) => void;
};

const balancesStoreSlice: StateCreator<BalancesState & BalancesAction> = (set) => ({
  pnl_percent: '0',
  pnl_usd: '0',
  total_balance_usd: '0',
  balances: {},
  balancesLoading: false,
  setBalances: (balances) => set({ ...balances }),
  setBalancesLoading: (balancesLoading) => set({ balancesLoading }),
});

export const useBalancesStore = create(balancesStoreSlice);
