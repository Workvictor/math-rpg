import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import { Border, BorderInner, FlexWide } from '../layout';
import { StatusBar } from '../StatusBar';
import { SvgIcon } from '../icons';
import { useGameProvider } from '../Game';
import { TextSize } from '../layout/TextSize';

const Wrapper = styled(Border)`
  width: 100%;
  flex-shrink: 0;
  padding: 6px;
  ${props => props.theme.bg.cssMarble};
`;

const Inner = styled(BorderInner)`
  display: flex;
  border: 1px solid ${props => props.theme.colors.grey15};
  box-shadow: inset 0 1px 14px ${props => props.theme.colors.grey20},
    0 0 0 1px ${props => props.theme.colors.grey0};
`;

const Content = styled.div`
  padding: 1px 4px;
  width: 100%;
`;

const Stats = styled(FlexWide)`
  padding: 2px;
  justify-content: space-between;
`;

const Avatar = styled(Border)`
  font-size: 64px;
  display: flex;
  color: ${props => props.theme.colors.grey65};
`;

export const Character: FC = () => {
  const { state, updateGame } = useGameProvider();

  const {
    healthPoints,
    healthPointsMax,
    level,
    exp,
    expMax,
    damage
  } = state.game[state.selectedGame];

  useEffect(() => {
    updateGame(state.selectedGame, () => ({
      targetId: null
    }));
  }, []);

  useEffect(() => {
    if (healthPoints < healthPointsMax) {
      const tid = setTimeout(() => {
        updateGame(state.selectedGame, prev => ({
          healthPoints: Math.min(
            healthPointsMax,
            prev.healthPoints + prev.healthPointsPerSecond
          )
        }));
      }, 1000);
      return () => {
        clearTimeout(tid);
      };
    }
  }, [healthPoints, healthPointsMax, state.selectedGame, updateGame]);

  return (
    <Wrapper>
      <Inner>
        <Avatar>
          <SvgIcon type={'player'} />
        </Avatar>
        <Content>
          <Stats>
            <div>{state.selectedGame}</div>
            <div>
              Здоровье: {healthPoints}/{healthPointsMax}
            </div>
          </Stats>
          <StatusBar value={healthPoints / healthPointsMax} />
          <Stats>
            <div>Атака: {damage}</div>
            <div>Уровень: {level}</div>
          </Stats>
          <Stats>
            <TextSize size={'small'}>
              Опыт: {exp}/{expMax}
            </TextSize>
          </Stats>
        </Content>
      </Inner>
    </Wrapper>
  );
};
