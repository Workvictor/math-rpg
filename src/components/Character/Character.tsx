import React, { FC } from 'react';
import styled from 'styled-components';

import { Border, BorderInner, FlexColumn } from '../layout';
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

const Avatar = styled(Border.withComponent(FlexColumn))`
  font-size: 64px;
  color: #3a3a3a;
`;

interface IPlayer {
  healthPoints: number;
  healthPointsMax: number;
  name: string;
}

export const Character: FC<IPlayer> = ({
  healthPoints = 100,
  healthPointsMax = 100,
  name
}) => {
  return (
    <Wrapper>
      <Inner>
        <Avatar>
          <SvgIcon type={'player'} />
        </Avatar>
        <Content>
          {name}
          <StatusBar value={healthPoints / healthPointsMax} />
        </Content>
      </Inner>
    </Wrapper>
  );
};
