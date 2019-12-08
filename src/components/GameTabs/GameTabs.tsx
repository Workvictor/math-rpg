import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';

import { TabLabel } from '../TabLabel';
import { IGameRoute } from '../Game/IGameRoute';
import { LocationTab } from './LocationTab';
import { RoomTab } from './RoomTab';
import { PlayerTab } from './PlayerTab';

export const GameTabs = () => {
  const { path } = useRouteMatch<IGameRoute>();
  return (
    <Switch>
      <Route exact path={`${path}/locations`}>
        <TabLabel label={'Локации'} />
      </Route>
      <Route exact path={`${path}/locations/:locationId`}>
        <LocationTab />
      </Route>
      <Route exact path={`${path}/locations/:locationId/:roomName`}>
        <RoomTab />
      </Route>
      <Route path={`${path}/:tab?`}>
        <PlayerTab />
      </Route>
    </Switch>
  );
};
