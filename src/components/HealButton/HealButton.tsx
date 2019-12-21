import React, { FC, useState } from 'react';
import styled from 'styled-components';

import { Button } from '../Button';
import { usePlayerDispatcher } from '../Player/PlayerContext';
import { useTimer } from '../utils/useTimer';
import { usePlayerSelector } from '../Player/usePlayerSelector';
import { useCombatContext, useCombatDispatcher } from '../Combat/Context';

const StyledButton = styled(Button)`
  width: 90px;
`;

export const HealButton: FC = () => {
  const playerDispatch = usePlayerDispatcher();
  const player = usePlayerSelector();

  const [nextHealTime, setNextHealTime] = useState(
    Date.now() + player.healRefreshTimeout
  );

  const refreshing = nextHealTime > Date.now();

  const onHeal = () => {
    playerDispatch({
      type: 'HealSelf'
    });
    setNextHealTime(Date.now() + player.healRefreshTimeout);
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
