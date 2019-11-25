import React, {
  FC,
  Dispatch,
  createContext,
  useEffect,
  useReducer,
  useContext
} from 'react';

import { GameModel } from './GameModel';
import { GameActions, gameReducer } from './gameReducer';
import { readGameState } from './readGameState';

class GameContextModel {
  state: GameModel = readGameState();
}
class GameDispatcherModel {
  dispatch: Dispatch<GameActions> = () => {};
}
const context = new GameContextModel();
const GameContext = createContext<GameContextModel>(context);
const contextDispatcher = new GameDispatcherModel();
const GameDispatcher = createContext<GameDispatcherModel>(contextDispatcher);
export const useGameContext = () => {
  return useContext(GameContext).state;
};
export const useGameDispatcher = () => {
  return useContext(GameDispatcher);
};
export const GameProvider: FC = ({ children }) => {
  // const [state, setState] = useState(initialGameStore.state);
  const [state, dispatch] = useReducer(gameReducer, context.state);

  useEffect(() => {
    localStorage.setItem(GameModel.appName, JSON.stringify(state));
  }, [state]);

  return (
    <GameDispatcher.Provider value={{ dispatch }}>
      <GameContext.Provider value={{ state }}>{children}</GameContext.Provider>
    </GameDispatcher.Provider>
  );
};
