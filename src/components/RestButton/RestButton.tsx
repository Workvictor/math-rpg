import React, { FC } from 'react';
import styled from 'styled-components';

import { Button } from '../Button';
import { usePlayerContext } from '../Player/PlayerContext';
import { useTimer } from '../utils/timer';
import { useTimeout } from '../utils/useTimeout';

const StyledButton = styled(Button)`
  width: 90px;
`;

export const RestButton: FC = () => {
  const { state: player, dispatch: playerDispatch } = usePlayerContext();

  const { nextRestTime, targetId } = player;

  const refreshing = nextRestTime > Date.now();

  const onClick = () => {
    playerDispatch({
      type: 'rest'
    });
  };

  useTimeout(() => {
    playerDispatch({
      type: 'restRestore'
    });
  }, player.stamina < player.staminaMax && refreshing && targetId === null);

  useTimer(refreshing);

  const disable = player.stamina >= player.staminaMax || refreshing;

  return (
    <StyledButton soundType={'healing'} disable={disable} onClick={onClick}>
      отдых
      {refreshing && (
        <span>({Math.ceil((nextRestTime - Date.now()) / 1000)})</span>
      )}
    </StyledButton>
  );
};
