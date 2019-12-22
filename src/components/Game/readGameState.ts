import { GameModel } from './GameModel';
import { createPlayer } from '../Player/store/createPlayer';

export const readGameState = () => {
  const newGame = new GameModel('0.0.1');
  const savedGame = localStorage.getItem(GameModel.appName);

  if (!savedGame) {
    localStorage.setItem(GameModel.appName, JSON.stringify(newGame));
    return newGame;
  }

  const currentGame: GameModel = JSON.parse(savedGame);

  if (currentGame.dataVersion !== newGame.dataVersion) {
    return newGame;
  }

  const playerDataVersion = createPlayer('').dataVersion;

  //enrich game data
  return {
    ...newGame,
    ...currentGame,
    players: currentGame.players
      ? currentGame.players.map(p =>
          p.dataVersion !== playerDataVersion
            ? createPlayer(p.name, p.level, p.experience)
            : p
        )
      : []
  };
};
