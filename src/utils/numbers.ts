export const formatNumber = (number?: number, fractionDigits = 12) => {
  if (!number) {
    return '0';
  }
  return number % 1 === 0
    ? number.toString()
    : number.toFixed(fractionDigits).replace(/\.?0+$/, '');
};

export const formatNumberWithSpaces = (number?: number, fractionDigits = 5) => {
  if (!number) {
    return '0';
  }
  // Format the number using 'en-US' or any locale that uses commas or spaces as thousands separators
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  })
    .format(number)
    .replace(/,/g, ' ');
};

export const formatNumberWithCommas = (number?: number, fractionDigits = 5) => {
  if (number === undefined || number === null) {
    return '0';
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  }).format(number);
};

export const formatPercent = (number?: number) => {
  if (number === undefined || number === null) {
    return '0';
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};

export const transformCommaToDot = (input: string): string => {
  // Remove all commas first
  let noCommas = input.replace(/,/g, '');

  // Replace the last comma with a dot if a comma exists
  if (input.includes(',')) {
    const parts = input.split(',');
    noCommas = parts.slice(0, -1).join('') + '.' + parts[parts.length - 1];
  }

  return noCommas;
};
