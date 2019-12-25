import { IEntityBase } from './createEntityBase';

export const getCritChance = (state: IEntityBase) => {
  return Math.floor(state.agility * 0.1 * 100) / 100;
};
