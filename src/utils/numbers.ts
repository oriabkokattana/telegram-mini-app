export const formatNumberToWhiteSpaces = (number?: number) => {
  if (!number) {
    return '0';
  }
  // Format the number using 'en-US' or any locale that uses commas or spaces as thousands separators
  const formattedNumber = number.toLocaleString('en-US');
  // Replace commas with thin spaces (U+2009)
  return formattedNumber.replace(/,/g, '\u2009');
};

export const formatNumberWithCommasAndDecimals = (number?: number) => {
  if (number === undefined || number === null) {
    return '0.00';
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatNumberWithCommas = (number?: number) => {
  if (number === undefined || number === null) {
    return '0';
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(number);
};
