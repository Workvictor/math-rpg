import React from 'react';
import styled from 'styled-components';

import { Padbox, FlexColumnWide } from '../layout';
import { useGameProvider } from '../../hooks/useGameProvider';
import { Navbar } from '../Navigation/Navbar';
import { Route } from 'react-router';

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

export const AppFrame: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Route path={'/:gameName?/:location?'} component={Navbar} />
      <Inner>{children}</Inner>
    </Wrapper>
  );
};
