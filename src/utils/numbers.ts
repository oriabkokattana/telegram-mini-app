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

export const trimToPrecision = (value: number, precision: number): number => {
  const [integerPart, fractionalPart] = value.toString().split('.');
  const integerLength = integerPart.length;

  // If the total digits are within the precision limit, return the number as is
  if (integerLength >= precision) {
    return Math.floor(value); // Only integer part fits the precision, truncate after decimal
  }

  const allowedFractionDigits = precision - integerLength;

  if (!fractionalPart || fractionalPart.length <= allowedFractionDigits) {
    return value; // No trimming needed
  }

  // Trim the fractional part based on the allowed digits
  const trimmedFraction = fractionalPart.slice(0, allowedFractionDigits);

  return parseFloat(`${integerPart}.${trimmedFraction}`);
};

export const roundNumber = (number: number) => Math.round(number * 10 ** 8) / 10 ** 8;
