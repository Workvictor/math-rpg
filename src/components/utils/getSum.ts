export const getSum = (array: number[]) => {
  return array.reduce((s, c) => {
    return s + c;
  }, 0);
};
