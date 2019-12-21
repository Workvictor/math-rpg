import React, { FC } from 'react';
import styled from 'styled-components';

import { Button } from '../Button';
import { usePlayerDispatcher } from '../Player/PlayerContext';
import { useTimer } from '../utils/useTimer';
import { useTimeout } from '../utils/useTimeout';
import { usePlayerSelector } from '../Player/usePlayerSelector';
import { useCombatContext, useCombatDispatcher } from '../Combat/Context';

const StyledButton = styled(Button)`
  width: 90px;
`;

export const RestButton: FC = () => {
  const player = usePlayerSelector();
  const playerDispatch = usePlayerDispatcher();

  const { nextRestTime, targetId } = useCombatContext();
  const combatDispatcher = useCombatDispatcher();

  const refreshing = nextRestTime > Date.now();

  const onClick = () => {
    combatDispatcher({
      type: 'SetNextRestTime',
      nextRestTime: player.restRefreshTimeout + Date.now()
    });
  };

  useTimeout(() => {
    playerDispatch({
      type: 'RestRestore'
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
