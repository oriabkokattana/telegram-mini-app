export const formatDate = (timestamp?: number) => {
  if (!timestamp) {
    return '';
  }

  return new Date(timestamp * 1000).toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
