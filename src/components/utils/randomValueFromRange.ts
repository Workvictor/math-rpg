export const randomValueFromRange = (range: number[]) =>
  Math.round(range[0] + Math.random() * (range[1] - range[0]));
