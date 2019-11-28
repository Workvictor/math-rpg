import { PlayerModel } from '../Player/PlayerModel';

export class GameModel {
  static appName = 'game-app';
  appVersion = '0.1.1';
  players: PlayerModel[] = [];
  ids: string[] = [];
  settings = {
    fullscreen: true,
    sfxVolume: 0.5,
    masterVolume: 0.5,
    musicVolume: 0.5
  };
  selectedGame = '';
  clickCount = 0;
}
