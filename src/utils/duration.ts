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
