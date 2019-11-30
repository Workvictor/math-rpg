import { Dispatch } from 'react';

import { GameModel } from './GameModel';
import { PlayerModel } from '../Player/PlayerModel';
import { readGameState } from './readGameState';

type TReloadGame = { type: 'reloadGame' };
type TStartNewGame = { type: 'startNewGame'; name: string };
type TAddClickCount = { type: 'addClickCount' };
type TOnPlayerUpdate = { type: 'onPlayerUpdate'; player: PlayerModel };

export type GameActions =
  | TStartNewGame
  | TAddClickCount
  | TOnPlayerUpdate
  | TReloadGame;

export class GameContextModel {
  state: GameModel = readGameState();
  dispatch: Dispatch<GameActions> = () => {};
}

export const reducer = (state: GameModel, action: GameActions) => {
  switch (action.type) {
    case 'reloadGame':
      return new GameModel();
    case 'startNewGame':
      return {
        ...state,
        players: [new PlayerModel(action.name), ...state.players]
      };
    case 'addClickCount':
      return {
        ...state,
        clickCount: state.clickCount + 1
      };
    case 'onPlayerUpdate':
      return {
        ...state,
        players: [
          action.player,
          ...state.players.filter(i => i.name !== action.player.name)
        ]
      };
    default:
      return state;
  }
};
