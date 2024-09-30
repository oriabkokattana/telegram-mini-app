export const transformAddress = (address?: string): string => {
  if (!address) {
    return '';
  }
  if (address.length <= 20) {
    return address;
  }
  const start = address.slice(0, 10);
  const end = address.slice(-10);
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
