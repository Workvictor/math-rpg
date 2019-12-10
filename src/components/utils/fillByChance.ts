import { getChanceIndex } from './getChanceIndex';
import { randomValueFromRange } from './randomValueFromRange';
import { sortBy } from './sortBy';

export const fillByChance = <T>(
  count: number,
  array: { chance: number; item: T }[]
) => {
  const maxChance = array.reduce((a, c) => a + c.chance, 0);
  const sortedByChance = sortBy(array, 'chance', -1);
  return new Array(count).fill(0).map(() => {
    return sortedByChance[
      getChanceIndex(
        randomValueFromRange([0, maxChance]),
        sortedByChance.map(i => i.chance)
      )
    ].item;
  });
};
