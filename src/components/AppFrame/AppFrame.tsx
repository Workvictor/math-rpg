import React from 'react';
import styled from 'styled-components';

import { Padbox, ScrollArea } from '../layout';

const Wrapper = styled(Padbox)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-height: 812px;
  max-width: 425px;
  position: relative;
  margin: 0 auto;
  ${props => props.theme.shadows.cssBlueGlow};
  ${props => props.theme.bg.cssMarble};
`;

interface IAppFrame {
  header: React.ReactNode;
}

export const AppFrame: React.FC<IAppFrame> = ({ children, header }) => {
  return (
    <Wrapper>
      {header}
      <ScrollArea>{children}</ScrollArea>
    </Wrapper>
  );
};
