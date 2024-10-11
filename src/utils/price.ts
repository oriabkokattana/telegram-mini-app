import Big from 'big.js';

export const getPriceChangePercent = (currentPrice?: string, oldPrice?: string) => {
  if (!currentPrice || !oldPrice) {
    return 0;
  }
  return Big(currentPrice).minus(oldPrice).div(oldPrice).toNumber();
};
