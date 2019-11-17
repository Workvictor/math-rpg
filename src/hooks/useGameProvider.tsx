import { useCallback, useContext } from 'react';

import { Game, GameContext, IGameState } from '../store/GameContext';

export const useGameProvider = () => {
  const { setState } = useContext(GameContext);

  const setGame = (name: string, callback: (game: Game) => Partial<Game>) => (
    prevState: IGameState
  ) => ({
    ...prevState,
    game: {
      ...prevState.game,
      [name]: {
        ...prevState.game[name],
        ...callback(prevState.game[name]),
        lastUpdate: Date.now()
      } as Game
    }
  });

  const updateGame = useCallback(
    (name: string) => {
      setState(setGame(name, game => game));
    },
    [setState]
  );

  const startNewGame = (name: string) => {
    setState(prevState => ({
      ...setGame(name, () => new Game(name))(prevState),
      ids: [...prevState.ids, name]
    }));
  };

  const addQuest = useCallback(
    (gameName: string, questId: string) => {
      setState(
        setGame(gameName, game => ({
          questbook: [...game.questbook, questId]
        }))
      );
    },
    [setState]
  );

  const removeQuest = useCallback(
    (gameName: string, questId: string) => {
      setState(
        setGame(gameName, game => ({
          questbook: game.questbook.filter(id => id !== questId)
        }))
      );
    },
    [setState]
  );

  return {
    setState,
    addQuest,
    startNewGame,
    updateGame,
    removeQuest
  };
};