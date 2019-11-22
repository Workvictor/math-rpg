import React, { FC, useEffect, useState } from 'react';

import { useGameProvider } from '../../hooks/useGameProvider';
import { Button } from '../Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  width: 90px;
`;

export const HealButton: FC<{
  gameName: string;
}> = props => {
  const { gameName } = props;
  const { updateGame, state } = useGameProvider();

  const player = state.game[gameName];

  const healRefreshTimeout = 5000;

  const [healRefresh, setHealRefresh] = useState(healRefreshTimeout);

  const onHeal = () => {
    if (healRefresh === 0) {
      updateGame(gameName, prev => ({
        healthPoints: Math.min(
          prev.healthPointsMax,
          prev.healthPoints + player.healValue
        )
      }));
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
