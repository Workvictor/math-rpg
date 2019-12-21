import { IPlayerBase } from './IPlayerBase';

export const getStaminaPerSecond = (state: IPlayerBase) => {
  return 1 + state.spirit * 0.1;
};
