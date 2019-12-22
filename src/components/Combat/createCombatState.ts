import { ICombatState } from './ICombatState';

export const createCombatState = (): ICombatState => {
  return {
    outOfCombat: true,
    nextHealTime: Date.now(),
    nextAttackTime: Date.now(),
    nextRestTime: Date.now(),
    targetId: null
  };
};
