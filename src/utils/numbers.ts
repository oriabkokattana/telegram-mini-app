import Big from 'big.js';

type FormatterNumber = string | Big | number;

const removeTrailingZeros = (number: string) =>
  number.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');

export const formatNumber = (number?: FormatterNumber, fractionDigits = 12) => {
  if (!number) {
    return '0';
  }
  const big = Big(number);
  return removeTrailingZeros(big.toFixed(fractionDigits));
};

export const formatNumberWithSpaces = (number?: FormatterNumber, fractionDigits = 5) => {
  if (!number) {
    return '0';
  }
  const big = Big(number);
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  }).format(big.toNumber());
  // Format the number using 'en-US' or any locale that uses commas or spaces as thousands separators
  return formatted.replace(/,/g, ' ');
};

export const formatNumberWithCommas = (number?: FormatterNumber, fractionDigits = 5) => {
  if (number === undefined || number === null) {
    return '0';
  }
  const big = Big(number);
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  }).format(big.toNumber());
  return formatted;
};

export const formatPercent = (number?: FormatterNumber) => {
  if (number === undefined || number === null) {
    return '0';
  }
  const big = Big(number).times(100);
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(big.toNumber());
  return formatted;
};

export const transformCommaToDot = (input: string): string => {
  // Check for the presence of a dot and comma in the input
  const lastCommaIndex = input.lastIndexOf(',');
  const lastDotIndex = input.lastIndexOf('.');

  // If there's no need for transformation, return early
  if (lastCommaIndex === -1 && lastDotIndex === -1) {
    return input;
  }

  // Replace all commas and dots
  let result = input.replace(/[,.]/g, '');

  // If either a comma or a dot exists, add the last one as a dot
  const lastSeparatorIndex = Math.max(lastCommaIndex, lastDotIndex);
  result = result.slice(0, lastSeparatorIndex) + '.' + result.slice(lastSeparatorIndex);

  return result === '.' ? '0.' : result;
};

export const replaceAfterDot = (str: string, n: number): string => {
  const [integerPart, decimalPart] = str.split('.');

  if (!decimalPart || decimalPart.length <= n) {
    return str; // No change needed if no decimal or length is within limit
  }

  const newDecimalPart = decimalPart.substring(0, n) + decimalPart[decimalPart.length - 1];

  return `${integerPart}.${newDecimalPart}`;
};

export const trimToPrecision = (value: number, precision: number): number => {
  // Convert the value to scientific notation using toPrecision to ensure significant digits are retained
  const trimmedValue = value.toPrecision(precision);

  // Convert back to a float to ensure it's not a string representation
  return parseFloat(trimmedValue);
};
