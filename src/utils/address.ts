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

export function splitAddress(address?: string): string[][] {
  if (!address) {
    return [];
  }

  // Remove the "0x" prefix
  const cleanAddress = address.slice(2);

  // Split the address into the desired format:
  // First part is 1 byte (2 hex characters), the rest are 2 bytes (4 hex characters)
  const parts: string[] = [
    cleanAddress.slice(0, 2), // First part (1 byte)
    cleanAddress.slice(2, 6), // 2nd part (2 bytes)
    cleanAddress.slice(6, 10), // 3rd part (2 bytes)
    cleanAddress.slice(10, 14), // 4th part (2 bytes)
    cleanAddress.slice(14, 18), // 5th part (2 bytes)
    cleanAddress.slice(18, 22), // 6th part (2 bytes)
    cleanAddress.slice(22, 26), // 7th part (2 bytes)
    cleanAddress.slice(26, 30), // 8th part (2 bytes)
    cleanAddress.slice(30, 34), // 9th part (2 bytes)
    cleanAddress.slice(34, 38), // 10th part (2 bytes)
    cleanAddress.slice(38, 42), // 11th part (2 bytes)
  ];

  // Group into 3 arrays with 4 parts, and 1 array with 3 parts
  return [
    ['0x' + parts[0], '0x' + parts[1], '0x' + parts[2], '0x' + parts[3]],
    ['0x' + parts[4], '0x' + parts[5], '0x' + parts[6], '0x' + parts[7]],
    ['0x' + parts[8], '0x' + parts[9], '0x' + parts[10]],
  ];
}
