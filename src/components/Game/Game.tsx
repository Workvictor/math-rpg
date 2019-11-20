import React from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router';

import { Location } from '../Location';
import { Quest } from '../../pages/Quest';
import { useGameState } from '../../hooks/useGameState';
import { towns } from '../../store/world';
import { Town } from '../Town';

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
      url,
      params: { gameName }
    }
  } = props;
  const gameState = useGameState();
  const isGameEnable = gameState.ids.includes(gameName);

  const town = towns.find(
    town => gameState.game[gameName].location === town.id
  );
  const townId = town ? town.id : '';

  return isGameEnable ? (
    <Switch>
      <Route exact path={`${path}/:townId`} component={Town} />
      <Route path={`${path}/quest/:id`} component={Quest} />
      <Route path={`${path}/:townId/:tab`} component={Location} />
      <Redirect to={`/${gameName}/${townId}`} />
    </Switch>
  ) : (
    <Redirect to={'/'} />
  );
};
