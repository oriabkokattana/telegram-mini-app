export const transformAddress = (address?: string): string => {
  if (!address) {
    return '';
  }
  if (address.length <= 12) {
    return address;
  }
  const start = address.slice(0, 7);
  const end = address.slice(-5);
  return `${start}...${end}`;
};

export const formatAddressShort = (address?: string): string => {
  if (!address) {
    return '';
  }
  if (address.length <= 8) {
    return address;
  }
  const start = address.slice(0, 4);
  const end = address.slice(-4);
  return `${start}...${end}`;
};
