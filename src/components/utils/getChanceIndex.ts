export const getChanceIndex = (chance: number, array: number[]) =>
  array.findIndex(current => {
    if (chance < current) {
      return true;
    }
    chance -= current;
    return false;
  }, 0);
