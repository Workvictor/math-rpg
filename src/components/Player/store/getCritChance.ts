import { IPlayerBase } from './IPlayerBase';

export const getCritChance = (state: IPlayerBase) => {
  return Math.floor(state.agility * 0.1 * 100) / 100;
};
