import React, {
  FC,
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState
} from 'react';
import { Redirect } from 'react-router';

import { ContextModel, reducer } from './store/reducer';
import { useGameContext } from '../Game/GameContext';

const context = new ContextModel();
const PlayerContext = createContext<ContextModel>(context);

export const usePlayerContext = () => useContext(PlayerContext);

interface IProps {
  gameName: string;
}

export const PlayerProvider: FC<IProps> = ({ children, gameName }) => {
  const { dispatch: gameDispatch, state: gameState } = useGameContext();
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

  return gameName && player ? (
    <PlayerContext.Provider
      value={{ state, dispatch, actions: context.actions }}
    >
      {children}
    </PlayerContext.Provider>
  ) : (
    <Redirect to={'/'} />
  );
};
