import { IEntityBase } from './createEntityBase';

export const getHealthPointsValue = (
  state: IEntityBase,
  level: number,
  flatBonus: number = 0,
  percentBonus: number = 0
) => {
  const flat = state.baseHP + level * 12 + state.physique * 8 + flatBonus;
  return flat * (1 + percentBonus);
};
