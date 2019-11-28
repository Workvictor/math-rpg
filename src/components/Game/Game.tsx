import React, { FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { Location } from '../Location';
import { Quest } from '../../pages/Quest';
import { locations } from './world';
import { Town } from '../Town';
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
        <Route exact path={`${path}/:townId`} component={Town} />
        <Route exact path={`${path}/adventure/:id`} component={Adventure} />
        <Route path={`${path}/quest/:id`} component={Quest} />
        <Route
          path={`${path}/:townId/:tab(character|questbook|adventure|backpack|map)`}
          component={Location}
        />
        <Redirect to={`/${gameName}/${locations[0].id}`} />
      </Switch>
    </PlayerProvider>
  );
};
