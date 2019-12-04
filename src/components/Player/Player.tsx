import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BorderElevated, BorderInner, FlexStart, Rythm } from '../layout';
import { usePlayerContext } from './PlayerContext';
import { Avatar } from '../Avatar';
import { IconButton } from '../Button';
import { Route } from 'react-router';
import { ManaBar } from '../StatusBar/ManaBar';
import { HealthBar } from '../StatusBar/HealthBar';
import { StaminaBar } from '../StatusBar/StaminaBar';
import { ExperienceBar } from '../StatusBar/ExpirienceBar';
import { useRaf } from '../RAF';
import { useTimer } from '../utils/timer';
import { useTimeout } from '../utils/useTimeout';
import { useUIContext } from '../UIContext';

const Wrapper = styled(BorderElevated)`
  width: 100%;
  flex-shrink: 0;
  padding: 6px;
  ${props => props.theme.bg.cssMarble};
`;

const Inner = styled(BorderInner)`
  border: 1px solid ${props => props.theme.colors.grey15};
  box-shadow: inset 0 1px 14px ${props => props.theme.colors.grey20},
    0 0 0 1px ${props => props.theme.colors.grey0};
`;

const Content = styled.div`
  width: 100%;
`;

const SkillsButton = styled(IconButton)`
  font-size: 24px;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 4px;
`;

const Name = styled(BorderElevated)`
  display: inline-flex;
  justify-content: center;
  padding: 2px 4px;
`;

const Level = styled(Name)`
  min-width: 20px;
  padding: 2px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
`;

export const Player: FC = memo(() => {
  const { state, dispatch } = usePlayerContext();

  const {
    healthPoints,
    healthPointsMax,
    level,
    exp,
    expMax,
    mana,
    manaMax,
    stamina,
    staminaMax,
    name
  } = state;

  useTimeout(() => {
    dispatch({
      type: 'restoreStamina'
    });
  }, stamina < staminaMax);

  const { dispatch: dispatchUI, state: uiState } = useUIContext();

  const onToggleShowPlayerHealthText = () => {
    console.log('onToggleShowPlayerHealthText');
    dispatchUI({
      type: 'toggleShowPlayerHealthText'
    });
  };

  return (
    <Wrapper>
      <Inner>
        <FlexStart>
          <StyledAvatar type={'cementShoes'}>
            <Level>{level}</Level>
          </StyledAvatar>
          <Content>
            <Rythm>
              <Rythm>{name}</Rythm>
              <Rythm>
                <HealthBar
                  textIsVisible={uiState.showPlayerHealthText}
                  onClick={onToggleShowPlayerHealthText}
                  value={healthPoints}
                  max={healthPointsMax}
                />
              </Rythm>
              <Rythm>
                <ManaBar value={mana} max={manaMax} />
              </Rythm>
              <Rythm>
                <StaminaBar value={stamina} max={staminaMax} />
              </Rythm>
            </Rythm>
          </Content>
          <Route path={`/${name}/locations`}>
            <SkillsButton type={'skills'} to={`/${name}/info`} />
          </Route>
        </FlexStart>
        <ExperienceBar value={exp} max={expMax} />
      </Inner>
    </Wrapper>
  );
});
