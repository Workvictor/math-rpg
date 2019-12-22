import React, { FC, lazy, ReactNode, Suspense } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router';

import { FlexStart, Tab } from '../layout';
import layout from '../layout/layout.module.scss';

const Navbar = lazy(() => import('../Navigation'));

const Wrapper = styled(FlexStart)`
  overflow: hidden;
  position: relative;
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
        <div className={layout.flexBetween}>
          <div>{label}</div>
          <div>
            <div className={layout.flexCenter}>
              <div>{children && <ChildWrapper>{children}</ChildWrapper>}</div>
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
            </div>
          </div>
        </div>
      </Tab>
    </Wrapper>
  );
};
