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
};

const balancesStoreSlice: StateCreator<BalancesState & BalancesAction> = (set) => ({
  pnl_percent: '0',
  pnl_usd: '0',
  total_balance_usd: '0',
  balances: {},
  setBalances: (balances) => set({ ...balances }),
});

export const useBalancesStore = create(balancesStoreSlice);
