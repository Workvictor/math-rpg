import { IPlayerBase } from './IPlayerBase';
import { IPlayerStats } from './IPlayerStats';

interface AddExp {
  type: 'AddExp';
  expReward: number;
  targetLevel: number;
}
interface AddQuest {
  type: 'AddQuest';
  questId: number;
}
interface RemoveQuest {
  type: 'RemoveQuest';
  questId: number;
}
interface TakeDamage {
  type: 'TakeDamage';
  damage: number;
}
interface RestoreHealth {
  type: 'RestoreHealth';
  amount: number;
}
interface RegenerateHealth {
  type: 'RegenerateHealth';
}
interface RestoreStamina {
  type: 'RestoreStamina';
}
interface HealSelf {
  type: 'HealSelf';
}
interface AddUnlockedLocationId {
  type: 'AddUnlockedLocationId';
  locationId: number;
}
interface AddUnlockedRoomId {
  type: 'AddUnlockedRoomId';
  roomId: number;
}
interface ChangeLocation {
  type: 'ChangeLocation';
  locationId: number;
}
interface LoseStamina {
  type: 'LoseStamina';
  amount: number;
}
interface PickGold {
  type: 'PickGold';
  amount: number;
}
interface RestRestore {
  type: 'RestRestore';
}
interface UpgradeStat {
  type: 'UpgradeStat';
  statName: keyof IPlayerStats;
  amount: number;
}
interface DidAttack {
  type: 'DidAttack';
}
interface RemoveSkillPoint {
  type: 'RemoveSkillPoint';
  amount: number;
}

export type Actions =
  | AddExp
  | RemoveSkillPoint
  | RegenerateHealth
  | AddQuest
  | RemoveQuest
  | TakeDamage
  | RestoreHealth
  | RestoreStamina
  | HealSelf
  | AddUnlockedLocationId
  | AddUnlockedRoomId
  | ChangeLocation
  | LoseStamina
  | PickGold
  | RestRestore
  | UpgradeStat
  | DidAttack;
