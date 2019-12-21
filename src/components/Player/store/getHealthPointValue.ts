import { IPlayerBase } from './IPlayerBase';

export const getHealthPointsValue = (state: IPlayerBase) => {
  const flat =
    state.baseHealthPoints +
    state.level * 12 +
    state.physique * 4 +
    state.healthPointsFlatBonus;
  return flat * (1 + state.healthPointsPercentBonus);
};
