import { TIcons } from '../Icon/icons';
import { getAttackDelayValue } from './getAttackDelayValue';
import { getCritChance } from './getCritChance';
import { getHealthPointsValue } from './getHealthPointValue';
import { getDamageValue } from './getDamageValue';
import { createEntityBase, IEntityBase } from './createEntityBase';
import { getExperienceValue } from './getExperienceValue';

export interface IEntity extends IEntityBase {
  name: string;
  level: number;
  icon: TIcons;
  index: number;
  attackDelay: number;
  critChance: number;
  healthPoints: number;
  damage: number;
  experience: number;
}

interface IProps extends Pick<IEntity, 'level' | 'icon' | 'name'> {
  overrides: Partial<IEntityBase>;
}

let index = 0;

export const createEntity = (props: IProps): IEntity => {
  const { overrides = {}, ...rest } = props;
  const state = {
    ...createEntityBase(rest.level, overrides),
    ...rest
  };
  return {
    index: index++,
    ...state,
    attackDelay: getAttackDelayValue(state),
    critChance: getCritChance(state),
    healthPoints: getHealthPointsValue(state, props.level),
    damage: getDamageValue(state),
    experience: getExperienceValue(state)
  };
};
