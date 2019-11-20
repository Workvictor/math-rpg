import React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';

import { UIBlockInner } from '../layout';
import { Questbook } from '../Quests';
import { Character } from '../Character';
import { Towns, towns } from '../../store/world';

const tabs = [
  {
    name: 'character',
    component: Character
  },
  {
    name: 'questbook',
    component: Questbook
  },
  {
    name: 'adventure',
    component: UIBlockInner
  },
  {
    name: 'backpack',
    component: UIBlockInner
  },
  {
    name: 'map',
    component: UIBlockInner
  }
];

export const Location = (
  props: RouteComponentProps<{
    gameName: string;
    townId: Towns;
    tab: string;
  }>
) => {
  const {
    match: {
      path,
      params: { townId, gameName, tab }
    }
  } = props;
  console.log(props);
  const town = towns.find(({ id }) => id === townId);
  const pathTab = path
    .split('/')
    .slice(0, -1)
    .join('/');

  const validUrl = town && tabs.map(item => item.name).includes(tab);

  return validUrl ? (
    <>
      <Switch>
        {tabs.map(tab => (
          <Route
            key={tab.name}
            exact
            path={`${pathTab}/${tab.name}`}
            component={tab.component}
          />
        ))}
      </Switch>
      <Redirect to={`/${gameName}/${townId}/${tab}`} />
    </>
  ) : (
    <Redirect to={`/${gameName}/${townId}`} />
  );
};
