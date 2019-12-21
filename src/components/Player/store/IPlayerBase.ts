import { IPlayerStats } from './IPlayerStats';

export interface IPlayerBase extends IPlayerStats {
  dataVersion: string;
  name: string;
  level: number;
  baseHealthPoints: number;
  experience: number;
  experienceNext: number;
  experienceCache: number[];
  healthPoints: number;
  stamina: number;
  mana: number;
  healthPointsFlatBonus: number;
  healthPointsPercentBonus: number;
  damageRange: number[];
  healRefreshTimeout: number;
  healthPointsPerSecond: number;
  skillPoints: number;
  statPoints: number;
  restPointsPerSecond: number;
  staminaCostPerAttack: number;
  restRefreshTimeout: number;
  goldAmount: number;
  questbook: number[];
  inventory: number[];
  currentLocationId: number;
  unlockedLocationIds: number[];
  unlockedRoomIds: number[];
}
