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
const initialState: IHit[] = [];
const HitContext = createContext<IHit[]>(initialState);
const HitDispatch = createContext<Dispatch<Actions>>(() => {});

export const useHitContext = () => useContext(HitContext);
export const useHitDispatcher = () => useContext(HitDispatch);

export const HitContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HitDispatch.Provider value={dispatch}>
      <HitContext.Provider value={state}>{children}</HitContext.Provider>
    </HitDispatch.Provider>
  );
};
