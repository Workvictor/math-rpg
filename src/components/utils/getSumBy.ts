function isNumber(x: any): x is number {
  return typeof x === 'number';
}

export const getSumBy = <T, P extends keyof T>(array: T[], key: P) => {
  return array.reduce((sum, c) => {
    const val = c[key];
    if (isNumber(val)) {
      return sum + val;
    }
    return sum;
  }, 0);
};
