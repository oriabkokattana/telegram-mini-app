import Big from 'big.js';

import { AvailableBalance, BalanceItem } from '@/types';

export const getAvailableBalance = (item?: BalanceItem): AvailableBalance => {
  if (!item) {
    return { balance: 0, balanceUSD: 0 };
  }
  return {
    balance: Big(item.balance).minus(item.reserved_balance).toNumber(),
    balanceUSD: Big(item.balance_usd).minus(item.reserved_balance_usd).toNumber(),
  };
};
