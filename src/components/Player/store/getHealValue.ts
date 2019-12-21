import { IPlayerBase } from './IPlayerBase';

export const getHealValue = (state: IPlayerBase) => {
  return 25 + state.spirit * 4;
};
