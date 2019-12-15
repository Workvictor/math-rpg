import React, {
  FC,
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState, memo
} from 'react';
import { Redirect } from 'react-router';

import { ContextModel, ContextDispatcherModel, reducer } from './store/reducer';
import { useGameContext, useGameDispatcher } from '../Game/GameContext';

const context = new ContextModel();
const contextDispatcher = () => {};
const PlayerContext = createContext<ContextModel>(context);
const PlayerDispatcherContext = createContext<ContextDispatcherModel>(
  contextDispatcher
);

export const usePlayerContext = () => useContext(PlayerContext);
export const usePlayerDispatcher = () => useContext(PlayerDispatcherContext);

interface IProps {
  gameName: string;
}

export const PlayerProvider: FC<IProps> = memo(({ children, gameName }) => {
  const gameState = useGameContext();
  const gameDispatch = useGameDispatcher();
  const [player] = useState(gameState.players.find(i => i.name === gameName));
  const [state, dispatch] = useReducer(reducer, player || context.state);

  useEffect(() => {
    if (player) {
      gameDispatch({
        type: 'onPlayerUpdate',
        player: state
      });
    }
  }, [gameDispatch, state, player]);

  useEffect(() => {
    dispatch({
      type: 'setTarget',
      targetId: null
    });
  }, []);

  return gameName && player ? (
    <PlayerDispatcherContext.Provider value={dispatch}>
      <PlayerContext.Provider value={{ state }}>
        {children}
      </PlayerContext.Provider>
    </PlayerDispatcherContext.Provider>
  ) : (
    <Redirect to={'/'} />
  );
});
