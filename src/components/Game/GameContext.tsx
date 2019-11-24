import React, {
  FC,
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from 'react';

import { GameModel } from './GameModel';

const readGameState = () => {
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

interface IGameContext {
  state: GameModel;
  setState: Dispatch<SetStateAction<GameModel>>;
}

const initialGameStore = {
  state: readGameState(),
  setState: () => {}
};

export const GameContext = createContext<IGameContext>(initialGameStore);

export const GameProvider: FC = ({ children }) => {
  const [state, setState] = useState(initialGameStore.state);

  useEffect(() => {
    localStorage.setItem(GameModel.appName, JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, setState }}>
      {children}
    </GameContext.Provider>
  );
};
