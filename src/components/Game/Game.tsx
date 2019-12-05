import React, { FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { Quest } from '../Quests/Quest';
import { Location } from '../Location';
import { PlayerProvider } from '../Player/PlayerContext';
import { Locations } from '../Location/Locations';
import { PlayerInfo } from '../PlayerInfo';
import { RoomCheck } from '../Room/RouteCheck';

export const Game: FC = () => {
  const {
    params: { gameName },
    path
  } = useRouteMatch<{ gameName: string }>();

  return (
    <PlayerProvider gameName={gameName}>
      <Switch>
        <Route exact path={`${path}/locations`}>
          <Locations />
        </Route>
        <Route exact path={`${path}/locations/:locationName`}>
          <Location />
        </Route>
        <Route exact path={`${path}/locations/:locationName/:roomName`}>
          <RoomCheck />
        </Route>
        <Route path={`${path}/info`}>
          <PlayerInfo />
        </Route>
        <Route path={`${path}/quests/:questId`}>
          <Quest />
        </Route>
        <Redirect to={`/${gameName}/locations`} />
      </Switch>
    </PlayerProvider>
  );
};
