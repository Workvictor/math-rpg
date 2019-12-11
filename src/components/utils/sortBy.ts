export const sortBy = <T, P extends keyof T>(
  arr: T[],
  prop: P,
  dir: 1 | -1 = 1
) => {
  return arr.slice().sort((a, b) => {
    if (a[prop] > b[prop]) {
      return dir;
    }
    if (a[prop] < b[prop]) {
      return -1 * dir;
    }
    return 0;
  });
};
