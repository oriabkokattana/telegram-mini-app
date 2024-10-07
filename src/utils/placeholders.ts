export const generateUniqueArray = (n: number): number[] => {
  return Array.from({ length: n }, (_, index) => index);
};
