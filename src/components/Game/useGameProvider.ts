import { useCallback, useContext, useEffect } from 'react';

import { useGameDispatcher, useGameContext } from './GameContext';
import { PlayerModel } from './PlayerModel';
import { GameModel } from './GameModel';

export const useGameProvider = () => {
  const state = useGameContext();
  const { dispatch } = useGameDispatcher();
  const setState = (player: PlayerModel) =>
    dispatch({
      type: 'updatePlayer',
      payload: player
    });
  const player = state.game[state.selectedGame];

  const setGame = (
    name: string,
    callback: (game: PlayerModel) => Partial<PlayerModel>
  ) => (prevState: GameModel) => ({
    ...prevState,
    game: {
      ...prevState.game,
      [name]: {
        ...prevState.game[name],
        ...callback(prevState.game[name]),
        lastUpdate: Date.now()
      } as PlayerModel
    }
  });

  const updateGame = useCallback(
    (name: string, callback: (game: PlayerModel) => Partial<PlayerModel>) => {
      // setState(setGame(name || state.selectedGame, callback));
    },
    [setState, state]
  );

  const incrementClickCount = () => {
    // if (state.selectedGame) {
    //   setState((prevState: GameModel) => ({
    //     ...prevState,
    //     game: {
    //       ...prevState.game,
    //       [prevState.selectedGame]: {
    //         ...prevState.game[prevState.selectedGame],
    //         clickCount: prevState.game[prevState.selectedGame].clickCount + 1
    //       } as PlayerModel
    //     }
    //   }));
    // }
  };

  const startNewGame = (name: string) => {
    // setState((prevState: GameModel) => ({
    //   ...setGame(name, () => new PlayerModel(name))(prevState),
    //   ids: [...prevState.ids, name],
    //   selectedGame: name
    // }));
  };

  const addQuest = useCallback(
    (gameName: string, questId: string) => {
      // setState(
      //   setGame(gameName, game => ({
      //     questbook: [...game.questbook, questId]
      //   }))
      // );
    },
    [setState]
  );

  const removeQuest = useCallback(
    (gameName: string, questId: string) => {
      // setState(
      //   setGame(gameName, game => ({
      //     questbook: game.questbook.filter(id => id !== questId)
      //   }))
      // );
    },
    [setState]
  );

  const setSelectedGame = (gameName: string) => {
    if (state.selectedGame !== gameName) {
      // setState((prevState: GameModel) => ({
      //   ...prevState,
      //   selectedGame: gameName
      // }));
    }
  };
  //levelUp
  useEffect(() => {
    if (player && player.exp >= player.expMax) {
      updateGame(state.selectedGame, prevGameState => {
        const nextHpMax = prevGameState.healthPointsMax + 12;
        const nextLevel = prevGameState.level + 1;
        return {
          level: nextLevel,
          skillPoints: prevGameState.skillPoints + 1,
          healthPointsPerSecond:
            prevGameState.healthPointsPerSecond +
            prevGameState.healthPointsMax / 100,
          healthPointsMax: nextHpMax,
          healthPoints: nextHpMax,
          expMax: prevGameState.expMax + nextLevel * 100,
          damage: Math.floor(prevGameState.damage + nextLevel * 1.2)
        };
      });
    }
  }, [player, state.selectedGame, updateGame]);

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
