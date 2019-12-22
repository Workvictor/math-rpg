import { IPlayerBase } from './IPlayerBase';

export const getManaMax = (state: IPlayerBase) => {
  return 100 + state.spirit * 0.5;
};
