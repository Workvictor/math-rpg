import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import styled from 'styled-components';

import { TabLabel } from '../TabLabel';
import { Padbox, ScrollArea, BorderInner } from '../layout';
import { Player } from '../Player';
import { Divider } from '../layout/Divider';
import { Button, IconButton } from '../Button';
import { Quest } from '../Quests/Quest';
import { UnderConstruction } from '../UnderConstruction';

const TabButton = styled(IconButton)`
  font-size: 28px;
`;

export const PlayerInfo = () => {
  const {
    params: { gameName, locationName }
  } = useRouteMatch<{
    locationName: string;
    gameName: string;
  }>();

  const root = `/${gameName}/info`;

  return (
    <>
      <TabLabel label={'Информация'}>
        <Button to={`/${gameName}/locations/${locationName}`}>локации</Button>
      </TabLabel>

      <BorderInner>
        <Player />
        <Padbox>
          <Divider />
          <TabButton
            soundType={'navigation'}
            navigation
            to={root}
            type={'skills'}
          />
          <TabButton
            soundType={'navigation'}
            navigation
            to={`${root}/skills`}
            type={'checkboxTree'}
          />
          <TabButton
            soundType={'navigation'}
            navigation
            to={`${root}/backpack`}
            type={'backpack'}
          />
          <TabButton
            soundType={'navigation'}
            navigation
            to={`${root}/quests`}
            type={'bookmark'}
          />
        </Padbox>
      </BorderInner>

      <Divider />

      <ScrollArea>
        <Switch>
          <Route path={`${root}/quests/:questId`}>
            <Quest />
          </Route>
          <Route path={`${root}`}>
            <UnderConstruction />
          </Route>
          <Route path={`${root}/quests`}>
            <UnderConstruction />
          </Route>
          <Route path={`${root}/backpack`}>
            <UnderConstruction />
          </Route>
          <Route path={`${root}/skills`}>
            <UnderConstruction />
          </Route>
          <Redirect to={root} />
        </Switch>
      </ScrollArea>
    </>
  );
};
