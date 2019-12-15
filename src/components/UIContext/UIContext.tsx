import React, {
  FC,
  createContext,
  useReducer,
  useContext,
  useEffect
} from 'react';

import { ContextModel, reducer } from './reducer';
import { useGameContext, useGameDispatcher } from '../Game/GameContext';

const initial = new ContextModel();
const UI = createContext<ContextModel>(initial);

export const UIProvider: FC = ({ children }) => {
  const gameState = useGameContext();
  const gameDispatch = useGameDispatcher();

  const [state, dispatch] = useReducer(reducer, gameState.ui || initial.state);

  useEffect(() => {
    gameDispatch({
      type: 'onUIUpdate',
      state
    });
  }, [gameDispatch, state]);

  return <UI.Provider value={{ state, dispatch }}>{children}</UI.Provider>;
};

export const useUIContext = () => useContext(UI);
