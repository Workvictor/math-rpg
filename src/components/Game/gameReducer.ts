import { GameModel } from './GameModel';
import { PlayerModel } from './PlayerModel';

type TUpdatePlayer = { type: 'updatePlayer'; payload: Partial<PlayerModel> };
type TStartNewGame = { type: 'startNewGame'; payload: { name: string } };
type TIncrementClickCount = { type: 'incrementClickCount' };
type TAddQuest = { type: 'addQuest'; payload: { questId: string } };
type TRemoveQuest = { type: 'removeQuest'; payload: { questId: string } };
type TSetSelectedGame = {
  type: 'setSelectedGame';
  payload: { gameName: string };
};
type TSetTarget = { type: 'setTarget'; payload: { targetId: number | null } };
type TAddExp = { type: 'addExp'; payload: { expReward: number } };

export type GameActions =
  | TUpdatePlayer
  | TStartNewGame
  | TRemoveQuest
  | TIncrementClickCount
  | TAddQuest
  | TSetSelectedGame
  | TSetTarget
  | TAddExp;

export const gameReducer = (state: GameModel, action: GameActions) => {
  switch (action.type) {
    case 'updatePlayer':
      return {
        ...state,
        game: {
          ...state.game,
          [state.selectedGame]: {
            ...state.game[state.selectedGame],
            ...action.payload
          }
        }
      };
    case 'startNewGame':
      return {
        ...state,
        game: {
          ...state.game,
          [action.payload.name]: new PlayerModel(action.payload.name)
        },
        ids: [...state.ids, action.payload.name],
        selectedGame: action.payload.name
      };
    case 'incrementClickCount':
      return {
        ...state,
        game: {
          ...state.game,
          [state.selectedGame]: {
            ...state.game[state.selectedGame],
            clickCount: state.game[state.selectedGame].clickCount + 1
          }
        }
      };
    case 'addQuest':
      return {
        ...state,
        game: {
          ...state.game,
          [state.selectedGame]: {
            ...state.game[state.selectedGame],
            questbook: [
              ...state.game[state.selectedGame].questbook,
              action.payload.questId
            ]
          }
        }
      };
    case 'removeQuest':
      return {
        ...state,
        game: {
          ...state.game,
          [state.selectedGame]: {
            ...state.game[state.selectedGame],
            questbook: state.game[state.selectedGame].questbook.filter(
              id => id !== action.payload.questId
            )
          }
        }
      };
    case 'setSelectedGame':
      return {
        ...state,
        selectedGame: action.payload.gameName
      };
    case 'setTarget':
      return {
        ...state,
        game: {
          ...state.game,
          [state.selectedGame]: {
            ...state.game[state.selectedGame],
            targetId: action.payload.targetId
          }
        }
      };
    case 'addExp':
      return {
        ...state,
        game: {
          ...state.game,
          [state.selectedGame]: {
            ...state.game[state.selectedGame],
            exp: action.payload.expReward
          }
        }
      };
    default:
      return state;
  }
};
