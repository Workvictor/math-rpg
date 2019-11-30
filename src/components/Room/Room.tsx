import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { ETowns, locations } from '../Game/world';
import { UnderConstruction } from '../UnderConstruction';

export const Room = () => {
  const {
    path,
    params: { townId, gameName }
  } = useRouteMatch<{
    gameName: string;
    townId: ETowns;
  }>();
  const town = locations.find(({ id }) => id === townId);
  const pathTab = path
    .split('/')
    .slice(0, -1)
    .join('/');

  return town ? (
    <>
      <Switch>
        <Route
          exact
          path={`${pathTab}/character`}
          component={UnderConstruction}
        />
        <Route
          exact
          path={`${pathTab}/questbook`}
          component={UnderConstruction}
        />
        <Route
          exact
          path={`${pathTab}/adventure`}
          component={UnderConstruction}
        />
        <Route
          exact
          path={`${pathTab}/backpack`}
          component={UnderConstruction}
        />
        <Route exact path={`${pathTab}/map`} component={UnderConstruction} />
        <Redirect to={`/${gameName}/${townId}`} />
      </Switch>
    </>
  ) : (
    <Redirect to={`/${gameName}/${locations[0].id}`} />
  );
};
