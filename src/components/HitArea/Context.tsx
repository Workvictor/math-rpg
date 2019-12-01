import React, {
  createContext,
  Dispatch,
  FC,
  useContext,
  useReducer
} from 'react';

type TAddHit = {
  type: 'addHit';
  pageX: number;
  pageY: number;
  value: number;
};

type TRemoveHit = {
  type: 'removeHit';
  id: number;
};

interface IHit {
  id: number;
  pageX: number;
  pageY: number;
  value: number;
}

type Actions = TAddHit | TRemoveHit;

class ContextModel {
  state: IHit[] = [];
  dispatch: Dispatch<Actions> = () => {};
}

export const reducer = (state: IHit[], action: Actions) => {
  switch (action.type) {
    case 'addHit':
      return [...state, { ...action, id: Date.now() }];
    case 'removeHit':
      return state.filter(i => i.id !== action.id);
    default:
      return state;
  }
};

const context = new ContextModel();
const HitContext = createContext<ContextModel>(context);

export const useHitContext = () => useContext(HitContext);

export const HitContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, context.state);

  return (
    <HitContext.Provider value={{ state, dispatch }}>
      {children}
    </HitContext.Provider>
  );
};
