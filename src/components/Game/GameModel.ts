import { IPlayerBase } from '../Player/store/IPlayerBase';

export class GameModel {
  static appName = 'game-app';
  players: IPlayerBase[] = [];
  settings = {
    fullscreen: true,
    sfxVolume: 0.5,
    masterVolume: 0.5,
    musicVolume: 0.5
  };
  ui = {
    showPlayerHealthText: false,
    showPlayerManaText: false,
    showPlayerStaminaText: false,
    showPlayerExperienceText: false
  };
  clickCount = 0;
  constructor(public dataVersion: string) {}
}
