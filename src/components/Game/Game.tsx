import React, { FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { Room } from '../Room';
import { Quest } from '../../pages/Quest';
import { locations } from './world';
import { Location } from '../Location';
import { Adventure } from '../Adventure';
import { PlayerProvider } from '../Player/PlayerContext';

export const path = {
  character: 'character',
  map: 'map',
  backpack: 'backpack',
  questbook: 'questbook',
  quest: 'quest'
};

export const Game: FC = () => {
  const {
    params: { gameName },
    path
  } = useRouteMatch<{ gameName: string }>();

  return (
    <PlayerProvider gameName={gameName}>
      <Switch>
        <Route exact path={`${path}/:locationId`}>
          <Location />
        </Route>
        <Route exact path={`${path}/adventure/:id`}>
          <Adventure />
        </Route>
        <Route path={`${path}/quest/:id`}>
          <Quest />
        </Route>
        <Route
          path={`${path}/:townId/:tab(character|questbook|adventure|backpack|map)`}
        >
          <Room />
        </Route>
        <Redirect to={`/${gameName}/${locations[0].id}`} />
      </Switch>
    </PlayerProvider>
  );
};
