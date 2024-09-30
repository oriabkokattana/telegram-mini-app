import { TextProps } from '@radix-ui/themes';

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
