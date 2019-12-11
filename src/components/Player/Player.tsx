import React, { FC, memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BorderElevated, BorderInner, FlexStart, Rythm } from '../layout';
import { usePlayerContext } from './PlayerContext';
import { Avatar } from '../Avatar';
import { IconButton } from '../Button';
import { Route, useHistory } from 'react-router';
import { ManaBar } from '../StatusBar/ManaBar';
import { HealthBar } from '../StatusBar/HealthBar';
import { StaminaBar } from '../StatusBar/StaminaBar';
import { ExperienceBar } from '../StatusBar/ExpirienceBar';
import { useTimeout } from '../utils/useTimeout';
import { useUIContext } from '../UIContext';
import { locations } from '../world/world';
import { Skills } from '../Icon/Skills';
import { ProgressBar } from '../ProgressBar';

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
  margin-left: 8px;
`;

const SkillsButton = styled(IconButton)`
  font-size: 24px;
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 4px;
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
    name,
    location,
    nextAttackTime,
    attackDelay
  } = state;

  const history = useHistory();

  const [attackTimer, setAttackTimer] = useState(0);

  useEffect(() => {
    setAttackTimer(0);
  }, [nextAttackTime]);

  useTimeout(
    () => {
      setAttackTimer(Date.now());
    },
    nextAttackTime > Date.now(),
    300
  );

  useTimeout(() => {
    dispatch({
      type: 'restoreStamina'
    });
  }, stamina < staminaMax);

  const { dispatch: dispatchUI, state: uiState } = useUIContext();

  const onToggleShowPlayerHealthText = () => {
    dispatchUI({
      type: 'toggleShowPlayerHealthText'
    });
  };

  useEffect(() => {
    if (healthPoints <= 0) {
      // TODO set player [Home] link
      history.push(`/${name}/locations/${locations[location].id}`);
    }
  }, [healthPoints, history, location, name]);

  return (
    <Wrapper>
      <Inner>
        <FlexStart>
          <Avatar iconType={'cementShoes'} level={level}>
            <StyledProgressBar
              value={nextAttackTime - Date.now()}
              max={attackDelay}
            />
          </Avatar>
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
            <SkillsButton to={`/${name}/info`}>
              <Skills />
            </SkillsButton>
          </Route>
        </FlexStart>
        <ExperienceBar value={exp} max={expMax} />
      </Inner>
    </Wrapper>
  );
});
