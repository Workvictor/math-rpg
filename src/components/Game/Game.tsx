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
import layout from '../layout/layout.module.scss';
import { Icon } from '../Icon';

export const Game: FC = () => {
  const { params, path } = useRouteMatch<IGameRoute>();

  return (
    <PlayerProvider gameName={params.gameName}>
      <Route path={`${path}`}>
        <GameTabs />
      </Route>
      <Divider />

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

      <Route path={`${path}`}>
        <Divider />
        <BorderInner>
          <Padbox>
            <Route path={`${path}/locations/:locationId`}>
              <ButtonGroup>
                <Route exact path={`${path}/locations/:locationId`}>
                  <Button
                    to={`/${params.gameName}/info`}
                    className={layout.typography4}
                  >
                    <Icon type={'skills'} className={layout.marginRight} />
                    skills
                  </Button>
                </Route>
                <Route exact path={`${path}/locations/:locationId/:roomIndex`}>
                  <HealButton />
                </Route>
                {/*<RestButton />*/}
                {/*<Route exact path={`${path}/locations/:locationId`}>*/}
                {/*  <Button disable>чинить(скоро)</Button>*/}
                {/*</Route>*/}
              </ButtonGroup>
            </Route>
            <Divider />
          </Padbox>
          <Route path={`${path}/locations/:locationId`}>
            <Player />
          </Route>
        </BorderInner>
      </Route>
    </PlayerProvider>
  );
};
