import { Dispatch } from 'react';

import { playerAddExp, PlayerModel } from '../PlayerModel';
import { TRoomName } from '../../world/rooms';

type ITargetId = number | null;

type TUpdate = { type: 'update'; payload: Partial<PlayerModel> };
type TSetTarget = { type: 'setTarget'; targetId: ITargetId };
type TAddExp = { type: 'addExp'; expReward: number; targetLevel: number };
type TAddQuest = { type: 'addQuest'; questId: number };
type TRemoveQuest = { type: 'removeQuest'; questId: number };
type TTakeDamage = { type: 'takeDamage'; damage: number };
type TRestoreHealth = { type: 'restoreHealth' };
type TRestoreStamina = { type: 'restoreStamina' };
type THealSelf = { type: 'healSelf' };
type TAddUnlockedLocation = { type: 'addUnlockedLocation'; locationId: number };
type TChangeLocation = { type: 'changeLocation'; locationId: number };
type TLoseStamina = { type: 'loseStamina'; amount: number };
type TUnlockRoom = { type: 'unlockRoom'; roomName: TRoomName };
type TPickGold = { type: 'pickGold'; amount: number };

type TVisitAreaRestore = { type: 'visitAreaRestore' };
type TLeaveAreaRestore = { type: 'leaveAreaRestore' };
type TRest = { type: 'rest' };
type TRestRestore = { type: 'restRestore' };

type TDidAttack = {
  type: 'didAttack';
  loseStaminaAmount: number;
  targetId: ITargetId;
};

export type TActions =
  | TUpdate
  | TRest
  | TPickGold
  | TRestRestore
  | TVisitAreaRestore
  | TLeaveAreaRestore
  | TDidAttack
  | TUnlockRoom
  | TSetTarget
  | TAddExp
  | TAddQuest
  | TRemoveQuest
  | TTakeDamage
  | TRestoreHealth
  | TRestoreStamina
  | TAddUnlockedLocation
  | TChangeLocation
  | TLoseStamina
  | THealSelf;

export class ContextModel {
  state: PlayerModel = new PlayerModel('');
}

export type ContextDispatcherModel = Dispatch<TActions>;

export const reducer = (state: PlayerModel, action: TActions) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        ...action.payload
      };
    case 'pickGold':
      return {
        ...state,
        goldAmount: state.goldAmount + action.amount
      };
    case 'rest':
      return {
        ...state,
        nextRestTime: Date.now() + state.restRefreshTimeout,
        targetId: null,
        outOfCombat: true
      };
    case 'restRestore':
      return {
        ...state,
        stamina: Math.min(
          state.staminaMax,
          state.stamina + state.restPointsPerSecond
        )
      };
    case 'didAttack':
      return {
        ...state,
        nextAttackTime: Date.now() + state.attackDelay,
        stamina: state.stamina - action.loseStaminaAmount,
        targetId: action.targetId
      };
    case 'visitAreaRestore':
      return {
        ...state,
        areaRestore: true
      };
    case 'leaveAreaRestore':
      return {
        ...state,
        areaRestore: false
      };
    case 'unlockRoom':
      return {
        ...state,
        unlockedRoomNames: [
          ...state.unlockedRoomNames.filter(i => i !== action.roomName),
          action.roomName
        ]
      };
    case 'loseStamina':
      return {
        ...state,
        stamina: state.stamina - action.amount
      };
    case 'addUnlockedLocation':
      return {
        ...state,
        unlockedLocations: [
          ...state.unlockedLocations.filter(i => i !== action.locationId),
          action.locationId
        ]
      };
    case 'changeLocation':
      return {
        ...state,
        location: action.locationId
      };
    case 'addExp':
      return playerAddExp(state, action.expReward, action.targetLevel);
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
        outOfCombat: false,
        healthPoints: Math.max(0, state.healthPoints - action.damage)
      };
    case 'healSelf':
      return {
        ...state,
        healthPoints: Math.min(
          state.healthPointsMax,
          state.healthPoints + state.healValue
        ),
        nextHealTime: Date.now() + state.healRefreshTimeout
      };
    case 'restoreHealth':
      return {
        ...state,
        healthPoints: Math.min(
          state.healthPointsMax,
          state.healthPoints + state.healthPointsPerSecond
        )
      };
    case 'restoreStamina':
      return {
        ...state,
        stamina: Math.min(
          state.staminaMax,
          state.stamina + state.staminaPerSecond
        )
      };
    default:
      return state;
  }
};
