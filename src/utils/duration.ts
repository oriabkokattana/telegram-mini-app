import { ShortDuration } from '@/types';

export const convertSeconds = (seconds?: number): string => {
  if (!seconds) {
    return '0 minutes';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  }
  return `${minutes} minutes`;
};

export const convertSecondsShort = (seconds?: number): ShortDuration => {
  if (!seconds) {
    return { number: 0, of: 'min' };
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return { number: minutes, of: 'min' };
  }
  return { number: minutes, of: 'min' };
};
