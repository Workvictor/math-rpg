import { IPlayerBase } from './IPlayerBase';

export const getStaminaMax = (state: IPlayerBase) => {
  return 100 + state.spirit * 0.2;
};
