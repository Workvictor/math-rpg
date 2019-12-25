import { IEntityBase } from './createEntityBase';

export const getDamageValue = (state: IEntityBase) => {
  return Math.floor(state.physique * 0.25 + state.agility * 0.1);
};
