import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

export const formatDate = (timestamp?: number): string => {
  if (!timestamp) {
    return '—';
  }
  return dayjs(timestamp * 1000).format('Do MMMM YYYY');
};

export const formatDateWithTime = (timestamp?: number): string => {
  if (!timestamp) {
    return '—';
  }
  return dayjs(timestamp * 1000).format('DD.MM.YYYY, HH:mm');
};

export const formatDateWithTimeShort = (timestamp?: number): string => {
  if (!timestamp) {
    return '—';
  }
  return dayjs(timestamp * 1000).format('Do MMMM HH:mm');
};
