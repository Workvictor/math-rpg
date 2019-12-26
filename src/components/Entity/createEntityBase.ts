import { createEntityMods, IEntityModifiers } from './createEntityMods';

export interface IEntityBase {
  physique: number;
  agility: number;
  spirit: number;
  baseDMG: number;
  baseHP: number;
  baseMP: number;
  baseExp: number;
  mods: IEntityModifiers;
}

export const createEntityBase = (
  level: number,
  props: Partial<IEntityBase>
): IEntityBase => {
  const { mods: m = {}, ...rest } = props;
  const mods = createEntityMods(m);
  const pas = mods.pas.split('-').map(Number);
  return {
    physique: 3 + level * pas[0],
    agility: 3 + level * pas[1],
    spirit: 3 + level * pas[2],

    baseDMG: 1,
    baseHP: 20,
    baseMP: 5,
    baseExp: 5 * level,
    ...rest,
    mods
  };
};
