import { TextProps } from '@/modules/core/design-system/text';

export const getTotalBalanceFontSize = (balanceString: string): TextProps => {
  if (balanceString.length > 22) {
    return { size: '4' };
  }
  if (balanceString.length > 17) {
    return { size: '5' };
  }
  if (balanceString.length > 13) {
    return { size: '6' };
  }
  if (balanceString.length > 10) {
    return { size: '7' };
  }
  return { size: '8' };
};

export const getBalanceFontSize = (balanceString: string): TextProps => {
  if (balanceString.length > 8) {
    return { size: '1' };
  }
  return { size: '3' };
};
