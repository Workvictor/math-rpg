import React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';

import { Towns, towns } from '../../store/world';
import { Questbook } from '../Quests';
import { UnderConstruction } from '../UnderConstruction';

export const Location = (
  props: RouteComponentProps<{
    gameName: string;
    townId: Towns;
  }>
) => {
  const {
    match: {
      path,
      params: { townId, gameName }
    }
  } = props;
  const town = towns.find(({ id }) => id === townId);
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
    <Redirect to={`/${gameName}/${towns[0].id}`} />
  );
};
