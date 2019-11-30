import React, { FC, lazy, ReactNode, Suspense } from 'react';
import styled from 'styled-components';

import { FlexStart, FlexEnd, Tab } from '../layout';
import { Route, Switch } from 'react-router';
const Navbar = lazy(() => import('../Navigation'));

const Wrapper = styled(FlexStart)`
  height: 42px;
  overflow: hidden;
  position: relative;
  bottom: -1px;
  font-size: 18px;
  align-items: flex-end;
  justify-content: space-between;
`;

interface ITabLabel {
  label: ReactNode;
}

export const TabLabel: FC<ITabLabel> = props => {
  const { label, children } = props;

  return (
    <Wrapper>
      <Tab>
        <FlexEnd>
          <div>{children}</div>
          <div>{label}</div>
        </FlexEnd>
      </Tab>
      <Suspense fallback={null}>
        <Switch>
          <Route path={'/newgame'}>
            <Navbar />
          </Route>
          <Route path={'/:gameName/:location?'}>
            <Navbar />
          </Route>
        </Switch>
      </Suspense>
    </Wrapper>
  );
};
