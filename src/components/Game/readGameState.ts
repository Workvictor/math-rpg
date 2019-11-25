import { GameModel } from './GameModel';

export const readGameState = () => {
  const newGame = new GameModel();
  const savedGame = localStorage.getItem(GameModel.appName);

  if (!savedGame) {
    localStorage.setItem(GameModel.appName, JSON.stringify(newGame));
    return newGame;
  }

  const currentGame: GameModel = JSON.parse(savedGame);

  if (
    currentGame.appVersion !== newGame.appVersion ||
    currentGame! instanceof GameModel
  ) {
    return newGame;
  }

  return currentGame;
};
