import React, { FC } from 'react';
import styled from 'styled-components';

import { Border, BorderInner, FlexColumn, FlexWide } from '../layout';
import { StatusBar } from '../StatusBar';
import { SvgIcon } from '../icons';

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
  name?: string;
  level?: number;
  healthPoints?: number;
  healthPointsMax?: number;
  exp?: number;
  expMax?: number;
  attack?: number;
}

export const Character: FC<IPlayer> = ({
  healthPoints = 100,
  healthPointsMax = 100,
  name,
  exp = 1,
  expMax = 1,
  attack = 0,
  level = 1
}) => {
  return (
    <Wrapper>
      <Inner>
        <Avatar>
          <SvgIcon type={'player'} />
        </Avatar>
        <Content>
          <Stats>{name}</Stats>
          <StatusBar value={healthPoints / healthPointsMax} />
          <Stats>
            <div>
              Здоровье: {healthPoints}/{healthPointsMax}
            </div>
            <div>
              Опыт: {exp}/{expMax}
            </div>
          </Stats>
          <Stats>
            <div>Атака: {attack}</div>
            <div>Уровень: {level}</div>
          </Stats>
        </Content>
      </Inner>
    </Wrapper>
  );
};
