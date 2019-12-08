import React from 'react';

import { locations } from '../world/world';
import { ScrollArea } from '../layout';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import { Location } from '../Location';
import { IGameRoute } from '../Game/IGameRoute';
import { LocationEntity } from '../LocationEntity';

export const LocationsPage = () => {
  const { path, params } = useRouteMatch<IGameRoute>();

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <ScrollArea>
            {locations.map(l => (
              <LocationEntity key={l.id} location={l} />
            ))}
          </ScrollArea>
        </Route>

        <Route path={`${path}/:locationId`}>
          <Location />
        </Route>

        <Redirect to={`/${params.gameName}/locations`} />
      </Switch>
    </>
  );
};
