import React from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router';

import { Location } from '../Location';
import { Quest } from '../../pages/Quest';
import { useGameState } from '../../hooks/useGameState';
import { towns } from '../../store/world';
import { Town } from '../Town';
import { Adventure } from '../Adventure';

export const path = {
  character: 'character',
  map: 'map',
  backpack: 'backpack',
  questbook: 'questbook',
  quest: 'quest'
};

export const Game = (props: RouteComponentProps<{ gameName: string }>) => {
  const {
    match: {
      path,
      params: { gameName }
    }
  } = props;
  const gameState = useGameState();

  return gameState.ids.includes(gameName) ? (
    <Switch>
      <Route exact path={`${path}/:townId`} component={Town} />
      <Route exact path={`${path}/adventure/:id`} component={Adventure} />
      <Route path={`${path}/quest/:id`} component={Quest} />
      <Route
        path={`${path}/:townId/:tab(character|questbook|adventure|backpack|map)`}
        component={Location}
      />
      <Redirect to={`/${gameName}/${towns[0].id}`} />
    </Switch>
  ) : (
    <Redirect to={'/'} />
  );
};
