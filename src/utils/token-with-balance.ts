import { useBalancesStore } from '@/store/balances-store';

import { TokenItem } from '@/types';

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
