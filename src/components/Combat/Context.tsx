import { createCombatState } from './createCombatState';
import React, {
  createContext,
  Dispatch,
  FC,
  memo,
  useContext,
  useEffect,
  useReducer
} from 'react';
import { ICombatState } from './ICombatState';
import { Actions } from './actions';
import { reducer } from './reducer';

const initialState = createCombatState();

const CombatContext = createContext<ICombatState>(initialState);

const CombatDispatcher = createContext<Dispatch<Actions>>(() => {});

export const useCombatContext = () => useContext(CombatContext);
export const useCombatDispatcher = () => useContext(CombatDispatcher);

export const CombatProvider: FC = memo(({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'SetTarget',
      targetId: null
    });
  }, []);

  return (
    <CombatDispatcher.Provider value={dispatch}>
      <CombatContext.Provider value={state}>{children}</CombatContext.Provider>
    </CombatDispatcher.Provider>
  );
});
