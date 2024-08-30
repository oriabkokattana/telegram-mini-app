export const formatNumberToWhiteSpaces = (number?: number) => {
  if (!number) {
    return '0';
  }
  // Format the number using 'en-US' or any locale that uses commas or spaces as thousands separators
  const formattedNumber = number.toLocaleString('en-US');
  // Replace commas with thin spaces (U+2009)
  return formattedNumber.replace(/,/g, '\u2009');
};
