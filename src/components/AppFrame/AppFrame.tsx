import React from 'react';
import styled from 'styled-components';

import { Padbox, FlexColumnWide } from '../layout';

const Wrapper = styled(Padbox)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 425px;
  position: relative;
  margin: 0 auto;
  ${props => props.theme.shadows.cssBlueGlow};
  ${props => props.theme.bg.cssMarble};
  & a.link {
    text-decoration: underline;
  }
`;

const Inner = styled(FlexColumnWide)`
  overflow: hidden;
  align-items: stretch;
  flex-shrink: 1;
  height: 100%;
`;

export const AppFrame: React.FC = ({ children }) => {
  return (
    <Wrapper as={'main'}>
      <Inner>{children}</Inner>
    </Wrapper>
  );
};
