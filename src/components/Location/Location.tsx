import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { UIBlockInner } from '../layout';
import { Town } from '../Town';
import { Questbook } from '../Quests';
import { Character } from '../Character';
import { Towns, towns } from '../../store/world';

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
      params: { townId, tab }
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
        <Route path={`${pathTab}/character`} component={Character} />
        <Route path={`${pathTab}/questbook`} component={Questbook} />
        <Route path={`${pathTab}/adventure`} component={UIBlockInner} />
        <Route path={`${pathTab}/backpack`} component={UIBlockInner} />
        <Route path={`${pathTab}/map`} component={UIBlockInner} />
        <Route exact path={`${path}`} component={Town} />
      </Switch>
    </>
  ) : (
    <div>нет такой локации здесь</div>
  );
};
