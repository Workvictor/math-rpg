import { mathBetween } from './mathBetween';

export const getChanceIndex = (chance: number, array: number[]) =>
  mathBetween(
    0,
    array.length - 1,
    array.findIndex(current => {
      if (chance <= current) {
        return true;
      }
      chance -= current;
      return false;
    }, 0)
  );
