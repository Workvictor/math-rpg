import { Actions } from './actions';
import { ICombatState } from './ICombatState';

export const reducer = (state: ICombatState, action: Actions): ICombatState => {
  switch (action.type) {
    case 'SetTarget':
      return {
        ...state,
        targetId: action.targetId
      };
    case 'SetNextHealTime':
      return {
        ...state,
        nextHealTime: action.nextHealTime
      };
    case 'SetNextRestTime':
      return {
        ...state,
        nextRestTime: action.nextRestTime
      };
    case 'SetNextAttackTime':
      return {
        ...state,
        nextAttackTime: action.nextAttackTime
      };
    default:
      return state;
  }
};
