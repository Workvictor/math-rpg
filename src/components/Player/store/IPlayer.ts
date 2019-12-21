import { IPlayerBase } from './IPlayerBase';

export interface IPlayer extends IPlayerBase {
  healthPointsMax: number;
  staminaMax: number;
  manaMax: number;
  damage: number;
  attackDelay: number;
  healValue: number;
}
