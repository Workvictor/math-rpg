export const mathAPS = (attackDelay: number) => {
  return attackDelay > 0 ? Math.floor((1000 / attackDelay) * 100) / 100 : 0;
};
