import { locations } from '../Game/world';

export class PlayerModel {
  static ExperienceProgressionBase = [25, 60];
  //attributes
  level = 1;
  strength = 10;
  agility = 10;
  intelligence = 10;
  exp: number = 1;
  expMax: number = PlayerModel.ExperienceProgressionBase[0];
  healthPoints: number = 100;
  healthPointsMax: number = 100;
  //skills
  damage: number = 6;
  healValue: number = 25;
  healthPointsPerSecond: number = 1;
  skillPoints: number = 0;
  attackDelay: number = 1000;
  //utils
  targetId: number | null = null;
  nextAttackTime: number = Date.now();
  questbook: number[] = [];
  clickCount: number = 0;
  lastUpdate = Date.now();
  location = locations[0].id;
  unlockedLocations = [0];
  constructor(public name: string) {}
}

export const enrichPlayerData = (player: PlayerModel) => {
  return {
    ...new PlayerModel(player.name),
    ...player
  };
};

export const getExpByLevel = (level: number) => {
  const initial = PlayerModel.ExperienceProgressionBase.slice(0);
  for (let i = 2; i < level; i++) {
    initial.push((initial[i - 1] + initial[i - 2]) * 1.25);
  }
  return initial[Math.max(0, level - 1)];
};

export const playerAddExp = (
  player: PlayerModel,
  addValue: number
): PlayerModel => {
  const exp = player.exp + addValue;
  if (exp >= player.expMax) {
    // levelUp
    const healthPointsMax = player.healthPointsMax + 12;
    const level = player.level + 1;
    return {
      ...player,
      exp,
      level,
      healthPointsMax,
      healthPoints: healthPointsMax,
      expMax: getExpByLevel(level),
      skillPoints: player.skillPoints + 1,
      damage: Math.floor(player.damage * 0.5 + level)
    };
  }
  return {
    ...player,
    exp
  };
};
