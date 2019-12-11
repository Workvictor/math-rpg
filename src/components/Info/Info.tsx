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

const TabButton = styled(IconButton)`
  font-size: 28px;
`;

export const Info = () => {
  const {
    params: { gameName }
  } = useRouteMatch<{
    locationId: string;
    gameName: string;
  }>();

  const root = `/${gameName}/info`;

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

      <ScrollArea>
        <Switch>
          <Route path={`${root}/quests/:questId`}>
            <Quest />
          </Route>
          <Route path={`${root}`}>
            <UnderConstruction />
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
      </ScrollArea>
    </>
  );
};
