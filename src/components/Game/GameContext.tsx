import React, {
  FC,
  createContext,
  useEffect,
  useReducer,
  useContext
} from 'react';

import { GameModel } from './GameModel';
import { GameContextModel, reducer } from './reducer';
import { UIProvider } from '../UIContext';

const context = new GameContextModel();
const GameContext = createContext<GameContextModel>(context);

export const useGameContext = () => useContext(GameContext);

export const GameProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, context.state);

  useEffect(() => {
    window.addEventListener('storage', () => {
      dispatch({ type: 'reloadGame' });
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(GameModel.appName, JSON.stringify(state));
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <UIProvider>{children}</UIProvider>
    </GameContext.Provider>
  );
};
