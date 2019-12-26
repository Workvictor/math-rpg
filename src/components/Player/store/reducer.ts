import { Actions } from './actions';
import { IPlayerBase } from './IPlayerBase';
import { upgradeStat } from './upgradeStat';
import { getStaminaMax } from './getStaminaMax';
import { addExp } from './addExp';
import { getHealthPointsValue } from './getHealthPointValue';
import { getHealValue } from './getHealValue';
import { getStaminaPerSecond } from './getStaminaPerSecond';
import { getAttackDelayValue } from './getAttackDelayValue';

export const reducer = (state: IPlayerBase, action: Actions): IPlayerBase => {
  switch (action.type) {
    case 'UpgradeStat':
      return upgradeStat(state, action.statName, action.amount);
    case 'PickGold':
      return {
        ...state,
        goldAmount: state.goldAmount + action.amount
      };
    case 'RemoveSkillPoint':
      return {
        ...state,
        skillPoints: state.skillPoints - action.amount
      };
    case 'RestRestore':
      return {
        ...state,
        stamina: Math.min(
          getStaminaMax(state),
          state.stamina + state.restPointsPerSecond
        )
      };
    case 'DidAttack':
      return {
        ...state,
        stamina: state.stamina - state.staminaCostPerAttack,
        nextAttackTime: getAttackDelayValue(state) + Date.now()
      };
    case 'AddUnlockedRoomId':
      return {
        ...state,
        unlockedRoomIds: [
          ...state.unlockedRoomIds.filter(i => i !== action.roomId),
          action.roomId
        ]
      };
    case 'LoseStamina':
      return {
        ...state,
        stamina: state.stamina - action.amount
      };
    case 'AddUnlockedLocationId':
      return {
        ...state,
        unlockedLocationIds: [
          ...state.unlockedLocationIds.filter(i => i !== action.locationId),
          action.locationId
        ]
      };
    case 'ChangeLocation':
      return {
        ...state,
        currentLocationId: action.locationId
      };
    case 'AddExp':
      return addExp(state, action.expReward, action.targetLevel);
    case 'AddQuest':
      return {
        ...state,
        questbook: [...state.questbook, action.questId]
      };
    case 'RemoveQuest':
      return {
        ...state,
        questbook: state.questbook.filter(i => i !== action.questId)
      };
    case 'TakeDamage':
      return {
        ...state,
        healthPoints: Math.max(0, state.healthPoints - action.damage)
      };
    case 'HealSelf':
      return {
        ...state,
        healthPoints: Math.min(
          getHealthPointsValue(state),
          state.healthPoints + getHealValue(state)
        ),
        nextHealTime: state.healRefreshTimeout + Date.now()
      };
    case 'RestoreHealth':
      return {
        ...state,
        healthPoints: Math.min(
          getHealthPointsValue(state),
          state.healthPoints + action.amount
        )
      };
    case 'RegenerateHealth':
      return {
        ...state,
        healthPoints: Math.min(
          getHealthPointsValue(state),
          state.healthPoints + state.healthPointsPerSecond
        )
      };
    case 'RestoreStamina':
      return {
        ...state,
        stamina: Math.min(
          getStaminaMax(state),
          state.stamina + getStaminaPerSecond(state)
        )
      };
    default:
      return state;
  }
};
