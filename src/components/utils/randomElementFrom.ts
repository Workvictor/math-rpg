import { randomValueFromRange } from './randomValueFromRange';

export const randomElementFrom = <T>(arr: T[]) => {
  return arr[randomValueFromRange([0, arr.length - 1])];
};
