export const base64UrlEncode = (input?: string) => {
  if (!input) {
    return '';
  }

  // Encode to Base64
  const base64 = btoa(input);

  // Make the Base64 URL-safe by replacing characters
  const base64Url = base64
    .replace(/\+/g, '-') // Replace + with -
    .replace(/\//g, '_') // Replace / with _
    .replace(/=+$/, ''); // Remove any trailing =

  return base64Url;
};
