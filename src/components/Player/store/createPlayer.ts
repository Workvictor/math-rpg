import { IPlayerBase } from './IPlayerBase';
import { getHealthPointsValue } from './getHealthPointValue';
import { getStaminaMax } from './getStaminaMax';
import { getManaMax } from './getManaMax';
import { getExperienceForNextLevel } from './getExperienceNextForLevel';

export const skillPointsPerLevel = 1;
export const statPointsPerLevel = 3;

const dataVersion = '0.0.12';
// TODO
export const createPlayer = (
  name: string,
  level = 1,
  experience = 0
): IPlayerBase => {
  const state: IPlayerBase = {
    dataVersion,
    name,
    level,
    experience,
    baseHealthPoints: 15,
    skillPoints: (level - 1) * skillPointsPerLevel,
    statPoints: (level - 1) * statPointsPerLevel,
    physique: 5,
    agility: 5,
    spirit: 5,
    experienceNext: getExperienceForNextLevel(level),
    healthPointsFlatBonus: 0,
    healthPointsPercentBonus: 0,
    damageRange: [],
    healthPointsPerSecond: 0,
    restPointsPerSecond: 2,
    staminaCostPerAttack: 3,
    healRefreshTimeout: 45000,
    nextHealTime: 0,
    nextAttackTime: 0,
    restRefreshTimeout: 45000,
    questbook: [],
    goldAmount: 0,
    inventory: [],
    currentLocationId: 0,
    unlockedRoomIds: [0],
    unlockedLocationIds: [0],
    healthPoints: 0,
    stamina: 0,
    mana: 0
  };

  return {
    ...state,
    healthPoints: getHealthPointsValue(state),
    stamina: getStaminaMax(state),
    mana: getManaMax(state)
  };
};
