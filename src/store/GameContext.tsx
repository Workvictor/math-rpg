import React, {
  FC,
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState
} from 'react';

import { towns } from './world';

export class Game {
  public lastUpdate: number;
  public level: number;
  public questbook: string[];
  public location: string;

  public healthPoints: number = 100;
  public healthPointsMax: number = 100;
  public healthPointsPerSecond: number = 1;
  public exp: number = 1;
  public expMax: number = 100;
  public damage: number = 6;

  constructor(public name: string) {
    this.lastUpdate = Date.now();
    this.level = 1;
    this.questbook = [];
    this.location = towns[0].id;
  }
}

export interface IGameState {
  game: {
    [key: string]: Game;
  };
  ids: string[];
}

const appName = 'game-app';

const writeGameState = (data: IGameState) => {
  const value = JSON.stringify(data);
  localStorage.setItem(appName, value);
  return value;
};

const readGameState = (): IGameState => {
  return JSON.parse(
    localStorage.getItem(appName) ||
      writeGameState({
        game: {},
        ids: []
      })
  );
};

interface IGameContext {
  state: IGameState;
  setState: Dispatch<SetStateAction<IGameState>>;
}

const initialGameStore = {
  state: readGameState(),
  setState: () => {}
};

export const GameContext = createContext<IGameContext>(initialGameStore);

export const GameProvider: FC = ({ children }) => {
  const [state, setState] = useState(initialGameStore.state);

  useEffect(() => {
    writeGameState(state);
    // TODO bubblesUp game id in ids on change
  }, [state]);

  return (
    <GameContext.Provider value={{ state, setState }}>
      {children}
    </GameContext.Provider>
  );
};
