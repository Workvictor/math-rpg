import React, {
  FC,
  createContext,
  useEffect,
  useReducer,
  useContext,
  Dispatch
} from 'react';

import { GameModel } from './GameModel';
import { GameActions, reducer } from './reducer';
import { UIProvider } from '../UIContext';
import { readGameState } from './readGameState';

const initialState = readGameState();

const GameContext = createContext<GameModel>(initialState);
const GameDispatch = createContext<Dispatch<GameActions>>(() => {});

export const useGameContext = () => useContext(GameContext);
export const useGameDispatcher = () => useContext(GameDispatch);

export const GameProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    window.addEventListener('storage', (e: StorageEvent) => {
      if (e.key === GameModel.appName && e.newValue !== null) {
        return dispatch({ type: 'loadGame' });
      }
      dispatch({ type: 'reloadGame' });
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(GameModel.appName, JSON.stringify(state));
  }, [state]);

  return (
    <GameDispatch.Provider value={dispatch}>
      <GameContext.Provider value={state}>
        <UIProvider>{children}</UIProvider>
      </GameContext.Provider>
    </GameDispatch.Provider>
  );
};
