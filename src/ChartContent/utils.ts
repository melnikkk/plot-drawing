export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const parseNumericInput = (value: string): string => {
  return value.replace(/\D/g, '');
};
