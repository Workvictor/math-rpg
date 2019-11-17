import React from 'react';

interface IStore {
  isAuthenticated: boolean;
}

const initialState = {
  isAuthenticated: false
};

interface IContext {
  state: IStore;
  dispatch: (action: IAction) => void;
}

interface IAction {
  type: 'update' | 'signIn';
  payload: Partial<IStore>;
}

const reducer = (state: IStore, { payload = {}, type }: IAction) => {
  if (type === 'update') {
    return {
      ...state,
      ...payload
    };
  }
  if (type === 'signIn') {
    return {
      ...state,
      isAuthenticated: true
    };
  }
  return state;
};

export const StoreContext = React.createContext<IContext>({
  state: initialState,
  dispatch: () => {}
});

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
