import { IPlayerBase } from './IPlayerBase';
import { IPlayerStats } from './IPlayerStats';

export const upgradeStat = (
  state: IPlayerBase,
  statName: keyof IPlayerStats,
  amount: number
): IPlayerBase => {
  return {
    ...state,
    [statName]: state[statName] + amount,
    statPoints: state.statPoints - amount
  };
};
