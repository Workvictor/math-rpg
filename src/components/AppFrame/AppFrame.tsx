import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';

import { Padbox, FlexColumnWide } from '../layout';
import { Route, Switch } from 'react-router';
const Navbar = lazy(() => import('../Navigation'));

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
    <Wrapper as={'main'}>
      <Suspense fallback={null}>
        {/*<Switch>*/}
        {/*  <Route path={'/newgame'}>*/}
        {/*    <Navbar />*/}
        {/*  </Route>*/}
        {/*  <Route path={'/:gameName/:location?'}>*/}
        {/*    <Navbar />*/}
        {/*  </Route>*/}
        {/*</Switch>*/}
      </Suspense>
      <Inner>{children}</Inner>
    </Wrapper>
  );
};
