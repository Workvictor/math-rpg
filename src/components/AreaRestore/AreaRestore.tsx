import { FC, useEffect } from 'react';

import { usePlayerContext } from '../Player/PlayerContext';
import { useTimeout } from '../utils/useTimeout';

export const AreaRestore: FC = () => {
  const { state: player, dispatch } = usePlayerContext();
  const { stamina, staminaMax, healthPoints, healthPointsMax } = player;

  useTimeout(() => {
    dispatch({
      type: 'restoreStamina'
    });
  }, stamina < staminaMax);

  useTimeout(() => {
    dispatch({
      type: 'restoreHealth'
    });
  }, healthPoints < healthPointsMax);

  useEffect(() => {
    dispatch({
      type: 'visitAreaRestore'
    });
    return () => {
      dispatch({
        type: 'leaveAreaRestore'
      });
    };
  }, [dispatch]);

  return null;
};
