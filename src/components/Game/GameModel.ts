import { PlayerModel } from '../Player/PlayerModel';

export class GameModel {
  static appName = 'game-app';
  players: PlayerModel[] = [];
  settings = {
    fullscreen: true,
    sfxVolume: 0.5,
    masterVolume: 0.5,
    musicVolume: 0.5
  };
  clickCount = 0;
}
