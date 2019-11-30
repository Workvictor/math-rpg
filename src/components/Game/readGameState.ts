import { GameModel } from './GameModel';
import { enrichPlayerData } from '../Player/PlayerModel';

export const readGameState = () => {
  const newGame = new GameModel();
  const savedGame = localStorage.getItem(GameModel.appName);

  if (!savedGame) {
    localStorage.setItem(GameModel.appName, JSON.stringify(newGame));
    return newGame;
  }

  const currentGame: GameModel = JSON.parse(savedGame);

  //enrich game data
  return {
    ...newGame,
    ...currentGame,
    players: currentGame.players
      ? currentGame.players.map(enrichPlayerData)
      : []
  };
};
