import { locations } from '../world/world';
import { HealthModel } from '../Model/HealthModel';

export class PlayerModel {
  static ExperienceProgressionBase = [25, 60];
  //attributes
  level = 1;
  strength = 10;
  agility = 10;
  intelligence = 10;
  exp = 0;
  expMax = PlayerModel.ExperienceProgressionBase[0];
  healthPoints = 100;
  healthPointsMax = 100;
  stamina = 100;
  staminaMax = 100;
  mana = 100;
  manaMax = 100;
  healthPointsFlatBonus = 0;
  healthPointsPercentBonus = 0;
  //skills
  damage = Math.floor(6 * (1 + this.strength * 0.02));
  healValue = Math.floor(25 + this.intelligence * 0.025);
  healthPointsPerSecond = 0;
  staminaPerSecond = 1 + Math.floor(this.stamina * 0.005);
  manaPerSecond = Math.floor(this.mana * 0.0075);
  skillPoints = 0;
  attackDelay = Math.max(500, Math.floor(2000 - this.agility * 25));
  //utils
  targetId: number | null = null;
  nextAttackTime = Date.now();
  questbook: number[] = [];
  clickCount = 0;
  lastUpdate = Date.now();
  // TODO вынести логику локаций в отдельную сущность
  location = locations[0].id;
  unlockedLocations = [locations[0].id];
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
    initial.push((initial[i - 1] + initial[i - 2]) * 1.5);
  }
  return Math.floor(initial[Math.max(0, level - 1)]);
};

export const playerAddExp = (
  player: PlayerModel,
  addValue: number
): PlayerModel => {
  const exp = player.exp + addValue;
  if (exp >= player.expMax) {
    // levelUp
    const level = player.level + 1;
    const healthModel = new HealthModel(
      level,
      player.strength,
      player.healthPointsFlatBonus,
      player.healthPointsPercentBonus
    );
    const healthPointsMax = healthModel.healthPointsMax;
    return {
      ...player,
      exp: 0,
      level,
      healthPointsMax: healthPointsMax,
      healthPoints: healthPointsMax,
      expMax: getExpByLevel(level),
      skillPoints: player.skillPoints + 1,
      damage: Math.floor(6 * (1 + player.strength * 0.02))
    };
  }
  return {
    ...player,
    exp
  };
};
