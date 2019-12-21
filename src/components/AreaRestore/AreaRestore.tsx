import { FC } from 'react';

import { usePlayerDispatcher } from '../Player/PlayerContext';
import { useTimeout } from '../utils/useTimeout';
import { usePlayerSelector } from '../Player/usePlayerSelector';

export const AreaRestore: FC = () => {
  const dispatch = usePlayerDispatcher();
  const player = usePlayerSelector();

  useTimeout(() => {
    dispatch({
      type: 'RestoreStamina'
    });
  }, player.stamina < player.staminaMax);

  useTimeout(() => {
    dispatch({
      type: 'RestoreHealth',
      amount: 5
    });
  }, player.healthPoints < player.healthPointsMax);

  return null;
};
