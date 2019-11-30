import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { locations } from '../Game/world';
import { UnderConstruction } from '../UnderConstruction';

export const GameTabs = () => {
  const {
    path,
    params: { locationName, gameName }
  } = useRouteMatch<{
    gameName: string;
    locationName: string;
  }>();
  const location = locations.find(({ name }) => name === locationName);
  const pathTab = path
    .split('/')
    .slice(0, -1)
    .join('/');

  return location ? (
    <>
      <Switch>
        <Route path={`${pathTab}/player`} component={UnderConstruction} />
        <Route path={`${pathTab}/quests`} component={UnderConstruction} />
        <Route
          exact
          path={`${pathTab}/locations`}
          component={UnderConstruction}
        />
        <Redirect to={`/${gameName}/locations/${locationName}`} />
      </Switch>
    </>
  ) : (
    <Redirect to={`/${gameName}/locations/${locationName}`} />
  );
};
