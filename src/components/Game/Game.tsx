import React, { FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { GameTabs } from './GameTabs';
import { Quest } from '../../pages/Quest';
import { locations } from './world';
import { Location } from '../Location';
import { Room } from '../Room';
import { PlayerProvider } from '../Player/PlayerContext';
import { UnderConstruction } from '../UnderConstruction';

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
        <Route exact path={`${path}/locations`}>
          <UnderConstruction />
        </Route>
        <Route exact path={`${path}/locations/:locationName`}>
          <Location />
        </Route>
        <Route exact path={`${path}/locations/:locationName/:roomName`}>
          <Room />
        </Route>
        <Route path={`${path}/quests/:questId`}>
          <Quest />
        </Route>
        <Route
          path={`${path}/:locationName/:tab(player|quests|locations|backpack)`}
        >
          <GameTabs />
        </Route>
        <Redirect to={`/${gameName}/locations/${locations[0].name}`} />
      </Switch>
    </PlayerProvider>
  );
};
