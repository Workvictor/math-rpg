export const mathBetween = (min: number, max: number, delta: number) => {
  return Math.min(max, Math.max(min, delta));
};
