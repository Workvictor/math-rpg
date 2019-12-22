import { GameModel } from './GameModel';
import { readGameState } from './readGameState';
import { UIModel } from '../UIContext/UIModel';
import { createPlayer } from '../Player/store/createPlayer';
import { IPlayerBase } from '../Player/store/IPlayerBase';

type TReloadGame = { type: 'reloadGame' };
type TLoadGame = { type: 'loadGame' };
type TDeletePlayer = { type: 'deletePlayer'; name: string };
type TStartNewGame = { type: 'startNewGame'; name: string };
type TAddClickCount = { type: 'addClickCount' };
type TOnPlayerUpdate = { type: 'onPlayerUpdate'; player: IPlayerBase };
type TOnUIModelUpdate = { type: 'onUIUpdate'; state: UIModel };

export type GameActions =
  | TStartNewGame
  | TDeletePlayer
  | TLoadGame
  | TAddClickCount
  | TOnPlayerUpdate
  | TOnUIModelUpdate
  | TReloadGame;

export const reducer = (state: GameModel, action: GameActions) => {
  switch (action.type) {
    case 'reloadGame':
      return new GameModel(state.dataVersion);
    case 'deletePlayer':
      return {
        ...state,
        players: state.players.filter(i => i.name !== action.name)
      };
    case 'loadGame':
      return readGameState();
    case 'startNewGame':
      return {
        ...state,
        players: [createPlayer(action.name), ...state.players]
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
    case 'onUIUpdate':
      return {
        ...state,
        ui: {
          ...state.ui,
          ...action.state
        }
      };
    default:
      return state;
  }
};
