import { EPeriod, ETimeframe } from '@/enums';

export const periodToTimeframe = (period: EPeriod) => {
  switch (period) {
    case EPeriod.day:
      return ETimeframe.d;
    case EPeriod.all:
      return ETimeframe.y;
    default:
      return ETimeframe.d;
  }
};
