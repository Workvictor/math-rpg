import React, { FC } from 'react';
import styled from 'styled-components';

import { Button } from '../Button';
import { usePlayerContext, usePlayerDispatcher } from '../Player/PlayerContext';
import { useTimer } from '../utils/useTimer';

const StyledButton = styled(Button)`
  width: 90px;
`;

export const HealButton: FC = () => {
  const { state: player } = usePlayerContext();
  const playerDispatch = usePlayerDispatcher();

  const { nextHealTime } = player;

  const refreshing = nextHealTime > Date.now();

  const onHeal = () => {
    playerDispatch({
      type: 'healSelf'
    });
  };

  useTimer(refreshing);

  const disable = player.healthPoints >= player.healthPointsMax || refreshing;

  return (
    <StyledButton soundType={'healing'} disable={disable} onClick={onHeal}>
      лечить
      {refreshing && (
        <span>({Math.ceil((nextHealTime - Date.now()) / 1000)})</span>
      )}
    </StyledButton>
  );
};
