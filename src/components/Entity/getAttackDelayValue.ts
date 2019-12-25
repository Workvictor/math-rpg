import { IEntityBase } from './createEntityBase';

export const getAttackDelayValue = (state: IEntityBase) => {
  return Math.max(1250, Math.floor(2000 - state.agility * 25 * state.mods.asp));
};
