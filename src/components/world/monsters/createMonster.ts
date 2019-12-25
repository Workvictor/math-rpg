import { TIcons } from '../../Icon/icons';
import { createMonsterModifiers } from './createMonsterModifiers';

interface IMonsterBase {
  physique: number;
  agility: number;
  spirit: number;

  damage: number;
  attackDelay: number;
  critChance: number;

  baseHP: number;
  baseMP: number;
  baseGold: number;
}

const createMonsterBase = (props: Partial<IMonsterBase>): IMonsterBase => {
  return {
    physique: 3,
    agility: 3,
    spirit: 3,

    damage: 3,
    attackDelay: 1500,
    critChance: 3,

    baseHP: 9,
    baseMP: 9,
    baseGold: 9
  };
};

interface IMonsterProps {
  name: string;
  icon: TIcons;
  level: number;
  modifiers?: ReturnType<typeof createMonsterModifiers>;
}

interface IMonster extends IMonsterProps, IMonsterBase {
  index: number;
}

export const createMonster = (
  props: IMonsterProps & Partial<IMonsterBase>
) => {
  return {
    index: 0,
    ...props
  };
};
