import React from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router';

import { Location } from './components/Location';
import { Quest } from '../Quest';
import { useGameState } from '../../hooks/useGameState';
import { useGameProvider } from '../../hooks/useGameProvider';
import { towns } from '../../store/world';

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
      <Route path={`${path}/quest/:id`} component={Quest} />
      <Route path={`${path}/:location/:tab?`} component={Location} />
      <Redirect to={`${url}/${townId}`} />
    </Switch>
  ) : (
    <Redirect to={'/'} />
  );
};
