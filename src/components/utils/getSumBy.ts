import { getSum } from './getSum';

export const getSumBy = <T, P extends keyof T>(array: T[], key: P) =>
  getSum(array.map(i => Number(i[key])));
