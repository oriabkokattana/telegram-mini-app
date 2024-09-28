import { useBalancesStore } from '@/store/balances-store';

import { AvailableBalance, BalanceItem, TokenItem } from '@/types';

export const getAvailableBalance = (item?: BalanceItem): AvailableBalance => {
  if (!item) {
    return { balance: 0, balanceUSD: 0 };
  }
  return {
    balance: Number(item.balance) - Number(item.reserved_balance),
    balanceUSD: Number(item.balance_usd) - Number(item.reserved_balance_usd),
  };
};

export const getTokenBalanceList = (data?: TokenItem[], excludeZero?: boolean) => {
  if (!data) {
    return [];
  }

  const tokens = [...data];
  const getActualBalanceByToken = useBalancesStore.getState().getActualBalanceByToken;
  const getActualUSDBalanceByToken = useBalancesStore.getState().getActualUSDBalanceByToken;

  const list = tokens.map((item) => {
    return {
      name: item.name,
      symbol: item.symbol,
      balance: getActualBalanceByToken(item.symbol),
      balanceUSD: getActualUSDBalanceByToken(item.symbol),
      popular: item.popular,
      precision: item.precision,
    };
  });
  list.sort((a, b) => b.balanceUSD - a.balanceUSD);

  return excludeZero ? list.filter((item) => !!item.balance) : list;
};
