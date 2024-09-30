export const getPriceChangePercent = (currentPrice?: number, oldPrice?: number) => {
  if (!currentPrice || !oldPrice) {
    return 0;
  }
  return ((currentPrice - oldPrice) / oldPrice) * 100;
};
