import React, { FC } from 'react';
import styled from 'styled-components';

import { Border, BorderInner, FlexColumn, FlexWide } from '../layout';
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
  border: 1px solid #101110;
  box-shadow: inset 0 1px 14px #151515, 0 0 0 1px #000000;
`;

const Content = styled.div`
  padding: 1px 4px;
  width: 100%;
`;

const Stats = styled(FlexWide)`
  padding: 2px;
  justify-content: space-between;
`;

const Avatar = styled(Border.withComponent(FlexColumn))`
  font-size: 64px;
  color: #3a3a3a;
`;

export interface IPlayer {
  name: string;
}

export const Character: FC<IPlayer> = ({ name }) => {
  const { state } = useGameProvider();

  const {
    healthPoints,
    healthPointsMax,
    level,
    exp,
    expMax,
    damage
  } = state.game[name];

  return (
    <Wrapper>
      <Inner>
        <Avatar>
          <SvgIcon type={'player'} />
        </Avatar>
        <Content>
          <Stats>
            <div>{name}</div>
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
