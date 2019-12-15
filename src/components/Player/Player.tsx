import React, { FC, memo } from 'react';
import styled from 'styled-components';

import { BorderElevated, BorderInner, FlexStart, Rythm } from '../layout';
import { usePlayerContext, usePlayerDispatcher } from './PlayerContext';
import { Avatar } from '../Avatar';
import { IconButton } from '../Button';
import { Route } from 'react-router';
import { ManaBar } from '../StatusBar/ManaBar';
import { StaminaBar } from '../StatusBar/StaminaBar';
import { ExperienceBar } from '../StatusBar/ExpirienceBar';
import { useTimeout } from '../utils/useTimeout';
import { Skills } from '../Icon/Skills';
import { Health } from './Health';

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

export const Player: FC = memo(() => {
  const { state } = usePlayerContext();
  const dispatch = usePlayerDispatcher();

  const {
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

  return (
    <Wrapper>
      <Inner>
        <FlexStart>
          <Avatar iconType={'cementShoes'} level={level} />
          <Content>
            <Rythm>
              <Rythm>{name}</Rythm>
              <Rythm>
                <Health />
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
