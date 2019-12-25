import { IPlayerBase } from './IPlayerBase';

export const getDamageValue = (state: IPlayerBase) => {
  return Math.floor(3 + state.physique * 0.25 + state.agility * 0.1);
};
