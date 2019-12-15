export const mathAPS = (attackDelay: number) => {
  return Math.floor((1000 / attackDelay) * 100) / 100;
};
