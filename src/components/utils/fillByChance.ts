import { getChanceIndex } from './getChanceIndex';
import { randomValueFromRange } from './randomValueFromRange';
import { sortBy } from './sortBy';
import { getSumBy } from './getSumBy';

interface IChanceObject<T> {
  chance: number;
  item: T;
}

export const fillByChance = <T>(count: number, array: IChanceObject<T>[]) => {
  const maxChance = getSumBy(array, 'chance');
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
