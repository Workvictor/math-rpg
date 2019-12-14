import { getChanceIndex } from './getChanceIndex';
import { randomValueFromRange } from './randomValueFromRange';
import { getSum } from './getSum';

export const fillByChance = <T>(
  sortedItems: T[],
  sortedChances: number[],
  count: number
) => {
  const maxChance = getSum(sortedChances);
  return new Array(count).fill(0).map(() => {
    const index = getChanceIndex(
      randomValueFromRange([0, maxChance]),
      sortedChances
    );
    return sortedItems[index];
  });
};
