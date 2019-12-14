import React, { FC } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { Quest } from '../Quests/Quest';
import { PlayerProvider } from '../Player/PlayerContext';
import { Info } from '../Info';
import { IGameRoute } from './IGameRoute';
import { GameTabs } from '../GameTabs';
import { BorderInner, Padbox } from '../layout';
import { Player } from '../Player';
import { Divider } from '../layout/Divider';
import { ButtonGroup } from '../Button/ButtonGroup';
import { HealButton } from '../HealButton';
import { Button } from '../Button';
import { LocationSuspense } from '../LocationSuspense';
import { RestButton } from '../RestButton';

export const Game: FC = () => {
  const { params, path } = useRouteMatch<IGameRoute>();

  return (
    <PlayerProvider gameName={params.gameName}>
      <Route path={`${path}`}>
        <GameTabs />
        <BorderInner>
          <Route path={`${path}/locations/:locationId`}>
            <Player />
          </Route>
          <Padbox>
            <Divider />
            <Route path={`${path}/locations/:locationId`}>
              <BorderInner>
                <Padbox>
                  <ButtonGroup>
                    <HealButton />
                    <RestButton />
                    <Route exact path={`${path}/locations/:locationId`}>
                      <Button disable>чинить(скоро)</Button>
                    </Route>
                  </ButtonGroup>
                </Padbox>
              </BorderInner>
            </Route>
          </Padbox>
        </BorderInner>
        <Divider />
      </Route>

      <Switch>
        <Route path={`${path}/locations`}>
          <LocationSuspense />
        </Route>
        <Route path={`${path}/info`}>
          <Info />
        </Route>
        <Route path={`${path}/quests/:questId`}>
          <Quest />
        </Route>
        <Redirect to={`/${params.gameName}/locations`} />
      </Switch>
    </PlayerProvider>
  );
};
