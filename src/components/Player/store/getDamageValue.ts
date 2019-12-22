import { IPlayerBase } from './IPlayerBase';

export const getDamageValue = (state: IPlayerBase) => {
  return Math.floor(state.physique * 0.25 + state.agility * 0.1);
};
