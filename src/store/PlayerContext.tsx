import React, { SetStateAction } from 'react';

export interface IPlayer {
  name: string;
  level: number;
}

export const initialState = {
  name: '',
  level: 1
};

export interface IContext {
  state: IPlayer;
  dispatch: (action: IAction) => void;
}

interface IAction {
  type: 'update';
  payload: Partial<IPlayer>;
}

export const reducer = (state: IPlayer, { payload, type }: IAction) => {
  if (type === 'update') {
    return {
      ...state,
      ...payload
    };
  }
  return state;
};

export const PlayerContext = React.createContext<IContext>({
  state: initialState,
  dispatch: () => {}
});

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state);
  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};
