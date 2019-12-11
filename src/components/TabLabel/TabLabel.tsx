import React, { FC, lazy, ReactNode, Suspense } from 'react';
import styled from 'styled-components';

import { FlexStart, Tab, Flex } from '../layout';
import { Route, Switch } from 'react-router';
const Navbar = lazy(() => import('../Navigation'));

const Wrapper = styled(FlexStart)`
  height: 42px;
  overflow: hidden;
  position: relative;
  bottom: -1px;
  font-size: 16px;
  align-items: flex-end;
  justify-content: space-between;
`;
const ChildWrapper = styled.div`
  margin-right: 4px;
`;

interface ITabLabel {
  label: ReactNode;
}

export const TabLabel: FC<ITabLabel> = props => {
  const { label, children } = props;

  return (
    <Wrapper>
      <Tab>
        <Flex>
          {children && <ChildWrapper>{children}</ChildWrapper>}
          <div>{label}</div>
        </Flex>
      </Tab>
      <Suspense fallback={null}>
        <Switch>
          <Route path={'/newgame'}>
            <Navbar />
          </Route>
          <Route path={'/:gameName'}>
            <Navbar />
          </Route>
        </Switch>
      </Suspense>
    </Wrapper>
  );
};
