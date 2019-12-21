import { usePlayerContext } from './PlayerContext';
import { IPlayer } from './store/IPlayer';
import { getHealthPointsValue } from './store/getHealthPointValue';
import { getStaminaMax } from './store/getStaminaMax';
import { getManaMax } from './store/getManaMax';
import { getAttackDelayValue } from './store/getAttackDelayValue';
import { getHealValue } from './store/getHealValue';
import { getDamageValue } from './store/getDamageValue';

export const usePlayerSelector = (): IPlayer => {
  const state = usePlayerContext();

  return {
    ...state,
    healthPointsMax: getHealthPointsValue(state),
    staminaMax: getStaminaMax(state),
    manaMax: getManaMax(state),
    damage: getDamageValue(state),
    attackDelay: getAttackDelayValue(state),
    healValue: getHealValue(state)
  };
};
