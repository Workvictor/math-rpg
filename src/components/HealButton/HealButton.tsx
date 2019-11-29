import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button } from '../Button';
import { usePlayerContext } from '../Player/PlayerContext';

const StyledButton = styled(Button)`
  width: 90px;
`;

export const HealButton: FC = () => {
  const { state: playerState, dispatch: playerDispatch } = usePlayerContext();

  const player = playerState;

  const healRefreshTimeout = 5000;

  const [healRefresh, setHealRefresh] = useState(healRefreshTimeout);

  const onHeal = () => {
    if (healRefresh === 0) {
      playerDispatch({
        type: 'healSelf'
      });
      setHealRefresh(healRefreshTimeout);
    }
  };

  useEffect(() => {
    if (healRefresh > 0) {
      const tId = setTimeout(() => {
        setHealRefresh(prev => Math.max(0, prev - 1000));
      }, 1000);
      return () => {
        clearTimeout(tId);
      };
    }
  }, [healRefresh]);

  const disable = player.healthPoints >= player.healthPointsMax;

  return (
    <StyledButton
      soundType={'healing'}
      disable={disable || healRefresh > 0}
      onClick={onHeal}
    >
      лечить
      {healRefresh > 0 && <span>({Math.floor(healRefresh / 1000)})</span>}
    </StyledButton>
  );
};
