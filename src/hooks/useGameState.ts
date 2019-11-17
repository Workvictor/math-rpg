import React from 'react';

import { GameContext } from '../store/GameContext';

export const useGameState = () => {
  const value = React.useContext(GameContext);
  return value.state;
};
