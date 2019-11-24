import { useCallback, useContext } from 'react';

import { Game, GameContext, IGameState } from './GameContext';

export const useGameProvider = () => {
  const { setState, state } = useContext(GameContext);

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
    (name: string, callback: (game: Game) => Partial<Game>) => {
      setState(setGame(name || state.selectedGame, callback));
    },
    [setState, state]
  );

  const incrementClickCount = () => {
    if (state.selectedGame) {
      setState(prevState => ({
        ...prevState,
        game: {
          ...prevState.game,
          [prevState.selectedGame]: {
            ...prevState.game[prevState.selectedGame],
            clickCount: prevState.game[prevState.selectedGame].clickCount + 1
          } as Game
        }
      }));
    }
  };

  const startNewGame = (name: string) => {
    setState(prevState => ({
      ...setGame(name, () => new Game(name))(prevState),
      ids: [...prevState.ids, name],
      selectedGame: name
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

  const setSelectedGame = (gameName: string) => {
    if (state.selectedGame !== gameName) {
      setState(prevState => ({
        ...prevState,
        selectedGame: gameName
      }));
    }
  };

  return {
    state,
    setState,
    addQuest,
    startNewGame,
    setSelectedGame,
    incrementClickCount,
    updateGame,
    removeQuest
  };
};
