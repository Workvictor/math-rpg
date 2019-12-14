export const sort = (arr: any[], dir: 1 | -1 = 1) => {
  return arr.slice().sort((a, b) => {
    if (a > b) {
      return dir;
    }
    if (a < b) {
      return -1 * dir;
    }
    return 0;
  });
};
