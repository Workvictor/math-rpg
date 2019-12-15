import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import styled from 'styled-components';

import { Padbox, ScrollArea, BorderInner } from '../layout';
import { Divider } from '../layout/Divider';
import { IconButton } from '../Button';
import { Quest } from '../Quests/Quest';
import { UnderConstruction } from '../UnderConstruction';
import { Skills } from '../Icon/Skills';
import { CheckboxTree } from '../Icon/CheckboxTree';
import { Backpack } from '../Icon/Backpack';
import { Bookmark } from '../Icon/Bookmark';
import { IGameRoute } from '../Game/IGameRoute';
import { Stats } from './Stats';
import { SmoothScroll } from '../SmoothScroll';

const TabButton = styled(IconButton)`
  font-size: 28px;
`;

export const Info = () => {
  const { params } = useRouteMatch<IGameRoute>();

  const root = `/${params.gameName}/info`;

  return (
    <>
      <BorderInner>
        <Padbox>
          <TabButton soundType={'navigation'} navigation to={root}>
            <Skills />
          </TabButton>
          <TabButton soundType={'navigation'} navigation to={`${root}/skills`}>
            <CheckboxTree />
          </TabButton>
          <TabButton
            soundType={'navigation'}
            navigation
            to={`${root}/backpack`}
          >
            <Backpack />
          </TabButton>
          <TabButton soundType={'navigation'} navigation to={`${root}/quests`}>
            <Bookmark />
          </TabButton>
        </Padbox>
      </BorderInner>

      <Divider />

      <SmoothScroll>
        <Switch>
          <Route exact path={`${root}`}>
            <Stats />
          </Route>
          <Route path={`${root}/quests/:questId`}>
            <Quest />
          </Route>
          <Route path={`${root}/quests`}>
            <UnderConstruction />
          </Route>
          <Route path={`${root}/backpack`}>
            <UnderConstruction />
          </Route>
          <Route path={`${root}/skills`}>
            <UnderConstruction />
          </Route>
          <Redirect to={root} />
        </Switch>
      </SmoothScroll>
    </>
  );
};
