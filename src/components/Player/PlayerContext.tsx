import React, {
  FC,
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
  memo,
  Dispatch,
} from 'react';
import { Redirect } from 'react-router';

import { reducer } from './store/reducer';
import { useGameContext, useGameDispatcher } from '../Game/GameContext';
import { createPlayer } from './store/createPlayer';
import { IPlayerBase } from './store/IPlayerBase';
import { Actions } from './store/actions';

const initialState = createPlayer('');
const contextDispatcher = () => {};

const PlayerContext = createContext<IPlayerBase>(initialState);

const PlayerDispatcherContext = createContext<Dispatch<Actions>>(
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
  const [state, dispatch] = useReducer(reducer, player || initialState);

  useEffect(() => {
    if (player) {
      gameDispatch({
        type: 'onPlayerUpdate',
        player: state
      });
    }
  }, [gameDispatch, state, player]);

  return gameName && player ? (
    <PlayerDispatcherContext.Provider value={dispatch}>
      <PlayerContext.Provider value={state}>{children}</PlayerContext.Provider>
    </PlayerDispatcherContext.Provider>
  ) : (
    <Redirect to={'/'} />
  );
});
