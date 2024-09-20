import { useBalancesStore } from '@/store/balances-store';

import { TokenItem } from '@/types';

export const getTokenBalanceList = (data?: TokenItem[], excludeZero?: boolean) => {
  if (!data) {
    return [];
  }

  const tokens = [...data];
  const getActualBalanceByToken = useBalancesStore.getState().getActualBalanceByToken;

  const list = tokens.map((item) => {
    return {
      name: item.name,
      symbol: item.symbol,
      balance: getActualBalanceByToken(item.symbol),
      popular: item.popular,
      precision: item.precision,
    };
  });
  list.sort((a, b) => b.balance - a.balance);

  return excludeZero ? list.filter((item) => !!item.balance) : list;
};
