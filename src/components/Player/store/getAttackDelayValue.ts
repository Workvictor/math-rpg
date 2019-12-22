import { IPlayerBase } from './IPlayerBase';

export const getAttackDelayValue = (state: IPlayerBase) => {
  return Math.max(500, Math.floor(1750 - state.agility * 25));
};
