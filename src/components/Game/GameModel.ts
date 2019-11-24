import { PlayerModel } from './PlayerModel';

export class GameModel {
  static appName = 'game-app';
  appVersion = '0.1.0';
  game: { [key: string]: PlayerModel } = {};
  ids: string[] = [];
  settings = {
    fullscreen: true
  };
  selectedGame = '';
}
