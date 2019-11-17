import React from 'react';
import styled from 'styled-components';

import { FlexColumnWide, UIBlockInner } from '../import';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Tab } from '../../../../components/layout/Tab';
import { Rythm } from '../../../../components/layout';
import { Quest } from '../../../Quest';
import { Character } from '../Character';
import { Questbook } from '../Questbook';
import { Creatures } from './Creatures';
import { TabLabel } from '../../../../components/TabLabel';

interface ICreature {
  id: string;
  name: string;
  hp: number;
  dmg: number;
}

interface ILocation {
  name: string;
  creatureIds: string[];
}

const creatures: { [key: string]: ICreature } = {
  '1': {
    id: '1',
    name: 'Kobold',
    hp: 10,
    dmg: 2
  }
};

type TLocation = 'northshire' | 'elvin';

export const locations: { [key in TLocation]: ILocation } = {
  northshire: {
    name: 'northshire',
    creatureIds: ['1', '1', '1', '1'].map((id, index) => `${id}-${index}`)
  },
  elvin: {
    name: 'elvin',
    creatureIds: ['1', '1', '1', '1'].map((id, index) => `${id}-${index}`)
  }
};

export const Location = (
  props: RouteComponentProps<{
    gameName: string;
    location: TLocation;
    tab: string;
  }>
) => {
  const {
    match: {
      path,
      params: { location, tab }
    }
  } = props;
  const loc = locations[location];
  const pathTab = path
    .split('/')
    .slice(0, -1)
    .join('/');

  return loc ? (
    <FlexColumnWide>
      <TabLabel visible={Boolean(!tab)} label={location} />
      <Switch>
        {/*<Route path={`${pathTab}/quest/:id`} component={Quest} />*/}
        <Route path={`${pathTab}/character`} component={Character} />
        <Route path={`${pathTab}/questbook`} component={Questbook} />
        <Route path={`${pathTab}/adventure`} component={Creatures} />
        <Route path={`${pathTab}/backpack`} component={UIBlockInner} />
        <Route path={`${pathTab}/map`} component={UIBlockInner} />
        <Route exact path={`${path}`} component={UIBlockInner} />
      </Switch>
    </FlexColumnWide>
  ) : (
    <div>нет такой локации здесь</div>
  );
};
