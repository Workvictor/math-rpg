import { Dispatch } from 'react';

import { playerAddExp, PlayerModel } from '../PlayerModel';

type TUpdate = { type: 'update'; payload: Partial<PlayerModel> };
type TSetTarget = { type: 'setTarget'; targetId: number | null };
type TAddExp = { type: 'addExp'; expReward: number };
type TAddQuest = { type: 'addQuest'; questId: string };
type TRemoveQuest = { type: 'removeQuest'; questId: string };
type TTakeDamage = { type: 'takeDamage'; damage: number };
type TRestoreHealth = { type: 'restoreHealth' };
type THealSelf = { type: 'healSelf' };

type TActions =
  | TUpdate
  | TSetTarget
  | TAddExp
  | TAddQuest
  | TRemoveQuest
  | TTakeDamage
  | TRestoreHealth
  | THealSelf;

export class ContextModel {
  state: PlayerModel = new PlayerModel('');
  dispatch: Dispatch<TActions> = () => {};
}

export const reducer = (state: PlayerModel, action: TActions) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        ...action.payload
      };
    case 'addExp':
      return playerAddExp(state, action.expReward);
    case 'setTarget':
      return {
        ...state,
        targetId: action.targetId
      };
    case 'addQuest':
      return {
        ...state,
        questbook: [...state.questbook, action.questId]
      };
    case 'removeQuest':
      return {
        ...state,
        questbook: state.questbook.filter(i => i !== action.questId)
      };
    case 'takeDamage':
      return {
        ...state,
        healthPoints: Math.max(0, state.healthPoints - action.damage)
      };
    case 'healSelf':
      return {
        ...state,
        healthPoints: Math.min(
          state.healthPointsMax,
          state.healthPoints + state.healValue
        )
      };
    case 'restoreHealth':
      return {
        ...state,
        healthPoints: Math.min(
          state.healthPointsMax,
          state.healthPoints + state.healthPointsPerSecond
        )
      };
    default:
      return state;
  }
};
