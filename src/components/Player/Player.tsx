import React, { FC } from 'react';
import styled from 'styled-components';

import { Border, BorderInner } from '../layout';
import { StatusBar } from '../StatusBar';

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

const Avatar = styled(Border)`
  min-width: 64px;
  height: 64px;
  border-radius: 50%;
  background: url(${props => props.theme.images.guard}) no-repeat center;
  background-size: cover;
`;

interface IPlayer {
  healthPoints: number;
  healthPointsMax: number;
  reloadProgress: number;
  name: string;
}

export const Player: FC<IPlayer> = ({
  healthPoints,
  healthPointsMax,
  reloadProgress,
  name
}) => {
  return (
    <Wrapper>
      <Inner>
        <Avatar />
        <Content>
          {name}
          <StatusBar value={healthPoints / healthPointsMax} />
          <StatusBar value={reloadProgress} />
        </Content>
      </Inner>
    </Wrapper>
  );
};
