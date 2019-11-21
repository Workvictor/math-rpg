import React from 'react';
import styled from 'styled-components';

import { Padbox, FlexColumnWide } from '../layout';

const Wrapper = styled(Padbox)`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 425px;
  position: relative;
  margin: 0 auto;
  ${props => props.theme.shadows.cssBlueGlow};
  ${props => props.theme.bg.cssMarble};
`;

const Inner = styled(FlexColumnWide)`
  overflow: hidden;
  align-items: stretch;
  flex-shrink: 1;
  height: 100%;
`;

interface IAppFrame {
  header: React.ReactNode;
}

export const AppFrame: React.FC<IAppFrame> = ({ children, header }) => {
  return (
    <Wrapper>
      {header}
      <Inner>{children}</Inner>
    </Wrapper>
  );
};
